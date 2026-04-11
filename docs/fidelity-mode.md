# Fidelity Mode — High-Trust Template Recreation

**Purpose:** Operational framework for recreating existing interfaces so they look and feel like the source template, not the design system defaults.

---

## Overview

Fidelity Mode is the execution mode for recreating an existing interface so it looks and feels like the source. The design system is the **implementation vehicle** — NOT the style source.

In Fidelity Mode:
- **Visual and experiential match with the reference template takes priority** over default design-system styling
- Tokens and components are used wherever possible as the mechanism for expressing the source's visual identity
- Where tokens cannot express a needed style, **project-scoped theme overrides** (`theme-override.css`) are created
- **Global design system is NEVER modified** in Fidelity Mode

**The failure mode this document prevents:** Claude building structurally correct but visually generic recreations that look like the design system's default palette, not the source template.

---

## When to Use Fidelity Mode

### USE when:
- Recreating a known template (Magic UI, Tailwind UI, Appy, etc.)
- Reproducing a reference URL or Figma file
- Any instruction containing "make it look like", "recreate", "clone", or naming a specific template
- Reproducing competitive analysis or template harvesting work
- Phase 5+ work (template recreation litmus tests)

### DO NOT USE for:
- Net-new UI design
- Global design system token updates
- Component library additions (those use standard build mode)
- General feature development

---

## Mandatory Pre-Build Checklist

**Before writing a single line of code**, Claude must complete all extraction steps below and output a `FIDELITY-BRIEF.md` file in the project root. **Building begins ONLY AFTER this file exists.**

If the brief cannot be completed (e.g., source not accessible), **STOP and report** — do not guess and proceed.

### Extraction Steps

---

## Step 1 — Color & Theme Extraction

Inspect the source template's CSS, Tailwind config, and rendered output. Extract and record:

### What to extract:
- Primary background color (page-level)
- Surface colors (cards, panels, input backgrounds)
- Brand/accent color(s) — primary CTAs, highlights, links
- Text colors (heading, body, muted, inverse)
- Border colors
- Any gradient definitions (background, hero, card accents)
- Section background variations (does every section use a different bg? alternating darks/lights? transparent?)

### How to record it:
Create a table in FIDELITY-BRIEF.md:

```
| Role | Source Value | DS Token | Override Needed? |
|------|-------------|----------|-----------------|
| Page bg | #0a0a0a | --color-background | No |
| Brand accent | #7c3aed | --color-primary | Yes — override to #7c3aed |
| Hero gradient | radial(purple→transparent) | none | Yes — CSS variable |
```

### Rules:
- If source accent color **differs from DS default**, override it. Do not silently use the DS default and call it "close enough."
- Write all overrides to `src/styles/theme-override.css`
- Import this AFTER design system tokens in `globals.css`
- **The recreation must FEEL like the SOURCE**, not the DS default

---

## Step 2 — Typography & Type Scale Extraction

### What to extract:
- Font families: display/headline font, body font, UI/mono font
- Weight pairings: what weights are used for h1 vs body vs label
- Type scale: approximate px/rem values for h1, h2, h3, body, small, caption
- Letter spacing and line height patterns (tight headlines? loose body?)
- Any font loading method (Google Fonts, local, variable font)

### Rules:
- Load matching fonts via `next/font` or `@import` in `globals.css`
- Override `--font-display` and `--font-body` CSS variables for this project in `theme-override.css`
- If exact font isn't available, choose closest and document why
- Never ship with the DS default fonts if source uses different ones

---

## Step 3 — Layout, Spacing & Hierarchy Extraction

### What to extract:
- Max container width (1200px? 1400px? full-bleed?)
- Section padding — vertical rhythm between sections
- Internal section padding — horizontal padding at mobile/tablet/desktop
- Grid patterns — how many columns in feature grids, card grids
- Visual hierarchy cues — what makes the hero feel "big"? (font size delta, spacing, contrast, motion?)
- Density — is this a spacious/premium layout or tight/feature-dense?

### Rules:
- Every section container MUST have explicit horizontal padding:
  - mobile: `padding-inline: var(--space-4)`
  - tablet: `padding-inline: var(--space-8)`
  - desktop: `padding-inline: var(--space-12)`
  - max-width: [extracted value] centered with `margin-inline: auto`
- **No text or content element bleeds to viewport edge** at any breakpoint
- Text alignment defaults to match source — do not left-align everything by default

---

## Step 4 — Decorative Layer Inventory

### ⚠️ THIS IS THE MOST COMMONLY SKIPPED STEP

The decorative layer is what makes modern SaaS templates feel premium vs wireframe. It must be explicitly inventoried and implemented. **Structural accuracy without decorative layer = FAILED Fidelity Mode**, regardless of token compliance.

### What to inventory:

#### Background treatments:
- Does the hero have a radial gradient glow behind the headline?
- Does any section use a mesh/noise texture?
- Are sections differentiated by background color or transparency?
- Are there any animated gradient backgrounds?

#### Depth and elevation:
- Card shadow style (soft/diffuse vs sharp/defined)
- Border treatments (subtle 1px border? gradient border? glow?)
- Glassmorphism effects (backdrop-blur + semi-transparent bg)
- Featured/highlighted card differentiation (border beam, gradient border, scale transform?)

#### Motion and interaction:
- Entrance animations (fade up? blur in? stagger?)
- Hover states on cards (lift? glow? border color shift?)
- CTA button effects (shimmer? gradient shift? scale?)
- Any continuous ambient animations (floating orbs, gradient mesh movement?)

#### Glow effects:
- Is there a hero glow (radial gradient behind main content)?
- Are there any "spotlight" or "beam" effects?
- Do any elements have colored box-shadows creating glow?

### Implementation rules:
- Implement all background treatments in CSS, not components
- Use existing `magic/` components for interactive effects (BorderBeam, BlurFade, ShimmerButton, etc.) — **DO NOT rebuild them**
- For hero glow, use pattern:
  ```css
  .hero-glow {
    background: radial-gradient(
      ellipse 80% 50% at 50% -20%,
      oklch(from var(--color-primary) l c h / 0.15),
      transparent
    );
  }
  ```
- For glassmorphism cards:
  ```css
  backdrop-filter: blur(12px);
  background: oklch(from var(--color-surface) l c h / 0.7);
  border: 1px solid oklch(from var(--color-border) l c h / 0.5);
  ```
- **Document every decorative element implemented** in FIDELITY-BRIEF.md

---

## Step 5 — Content & Media Strategy

Empty image slots and placeholder boxes destroy visual fidelity. Decide strategy before building.

### What to assess in source template:
- Hero visual: screenshot? device mockup? abstract graphic? illustrated? plain text only?
- Feature section visuals: icons? screenshots? illustrations?
- Social proof: avatar images? logos? quote styling?
- Are real assets available in the template package?
- Are stock-quality placeholder images acceptable for this run?

### Rules:
- If source uses device mockups, use a consistent device frame component or CSS frame — do not skip and leave blank space
- If source uses brand logos in social proof, use placeholder SVG logos that match scale/layout
- **Never leave a content region visually empty** that the source populates with visual content
- Document media strategy in FIDELITY-BRIEF.md with a table:
  ```
  | Section | Source uses | Recreation uses | Acceptable? |
  |---------|------------|-----------------|-------------|
  | Hero | App screenshot | next/image placeholder | Yes |
  | Logos | 6 brand logos | Inline SVG placeholders | Yes |
  ```

---

## Step 6 — Build Rules

### Shop-First (MANDATORY)
Before building ANY component, check:
1. `src/components/magic/` — custom-built animated components
2. `src/components/ui/` — shadcn/ui primitives
3. `src/blocks/` — full section blocks

**If it exists, USE IT.** Do not rebuild.  
If you are rebuilding something that already exists, **STOP and explain why** the existing component cannot be used.

**Violations of shop-first are bugs, not style choices.**

### Token-First
All colors, spacing, radii, shadows: use CSS variables from design system tokens. Override via `theme-override.css` — never hardcode hex values inline.

### Component Assembly Order
1. Write `theme-override.css` with color/font/spacing overrides
2. Build section by section, bottom-up (smallest components first)
3. Wire sections into page layout
4. Apply decorative layer (backgrounds, glows, borders)
5. Add motion (entrances, hovers, ambient)
6. Run visual QA

---

## Step 7 — Visual QA and Honest Scoring

**Visual QA is mandatory before declaring a recreation complete.**  
Self-assessment without visual comparison is not QA.

### How to run visual QA:
1. Spin up local dev server: `npm run dev`
2. If source template is available locally, run it on `:3001`
3. Screenshot recreation at:
   - 375px (mobile)
   - 768px (tablet)
   - 1280px (desktop)
4. For each screenshot, compare against source at same breakpoint
5. Score the following dimensions honestly:

### Scoring rubric (each 0–10, target ≥ 8 to ship):

| Dimension | What you're evaluating |
|-----------|----------------------|
| Color/Theme | Does palette match source identity? |
| Typography | Font match, weight, scale, hierarchy? |
| Layout/Spacing | Rhythm, density, container width, padding? |
| Decorative Layer | Gradients, glows, depth, motion present? |
| Content/Media | No empty sections, placeholders used correctly? |
| Responsiveness | Layout holds at all 3 breakpoints? |
| Component Fidelity | Magic components used, not rebuilt? |

### Rules:
- **A score without screenshot evidence is not valid**
- If any dimension scores below 6, do not declare complete — fix and rescore
- **All scores are ESTIMATES**. Mark them as such. Human review is required before production use.
- Add actual screenshot paths to RECREATION-REPORT.md

---

## Anti-Patterns and Failure Modes

These are named failure modes to self-check against:

### 🚩 "Wireframe Mode"
**Problem:** Structure present, decorative layer absent. Page is technically correct but looks undesigned.  
**Missing:** section backgrounds, gradients, card depth, glow effects, shadows.  
**Detection:** every section has identical background color.  
**Fix:** Inventory and implement decorative layer from Step 4.

### 🚩 "Design System Override Mode"
**Problem:** Global tokens changed to match one template. Now every project uses this template's colors.  
**Prevention:** ALL source-specific overrides go in `theme-override.css` only. Never touch `tokens.css`.  
**Fix:** Revert any global token changes. Move to theme-override.

### 🚩 "Self-Grading Inflation"
**Problem:** Claude reports 9/10 visual fidelity without visual comparison.  
**Prevention:** Fidelity score must cite specific screenshot paths. Any score not backed by screenshot evidence is invalid.  
**Fix:** Run visual QA, compare with source, provide evidence.

### 🚩 "Component Bypass"
**Problem:** Manually recreating an animated component (shimmer button, border beam, blur fade) instead of using the existing one.  
**Prevention:** Shop-first check is mandatory before any build step.  
**Fix:** Delete custom version, import from `src/components/magic/`.

### 🚩 "Default Font Drift"
**Problem:** Recreation ships with DS default fonts instead of source fonts.  
**Detection:** Font family in rendered output doesn't match source.  
**Prevention:** Typography extraction is a required pre-build step.  
**Fix:** Import source font, override `--font-display` and `--font-body` in theme-override.css.

### 🚩 "Left-Align Everything"
**Problem:** All text left-aligned regardless of source alignment.  
**Common in:** hero sections, pricing, CTA blocks.  
**Prevention:** Typography extraction includes alignment patterns.  
**Fix:** Apply `text-center` or `text-right` where source uses it.

### 🚩 "Edge Bleed"
**Problem:** Content touches viewport edges at mobile breakpoint.  
**Detection:** Check at 375px — any text or card flush to edge?  
**Prevention:** Padding rule in Step 3 applied to every section.  
**Fix:** Add padding-inline to all section containers.

---

## Integration Points

This file is referenced by:
- `src/docs/reproduction-prompt.md` (include as mandatory pre-build)
- `global-docs/workflows/project-lifecycle.md` (Phase 5+ step)
- `CLAUDE.md` (Fidelity Mode section — link here)
- `global-docs/docs/commands.md` ("recreate template" command)

**When you see any "recreate" instruction:**  
**READ THIS FILE COMPLETELY BEFORE WRITING CODE.**

---

## Quick Reference

**Pre-Build Checklist (copy-paste into FIDELITY-BRIEF.md):**
- [ ] Color & theme extraction complete (table filled)
- [ ] Typography extraction complete (fonts identified, scale documented)
- [ ] Layout & spacing rules extracted (container widths, padding, grid)
- [ ] Decorative layer inventory complete (all effects listed)
- [ ] Media strategy defined (all content regions planned)
- [ ] Shop-first check passed (no rebuilds of existing components)
- [ ] theme-override.css created with all color/font overrides
- [ ] Visual QA scheduled (dev server port :3000 vs :3001)

**Build Flow:**
1. Create FIDELITY-BRIEF.md with extraction tables
2. Write theme-override.css (colors, fonts, spacing)
3. Build sections bottom-up using shop-first approach
4. Apply decorative layer (CSS only, no component rebuilds)
5. Add motion and interaction
6. Run visual QA at 375/768/1280px
7. Score each dimension with screenshot evidence
8. Document in RECREATION-REPORT.md

---

**Last Updated:** 2026-04-10  
**Status:** Complete
