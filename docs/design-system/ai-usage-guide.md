<!-- type: procedure -->

# Using the Design System with AI Tools

## The Golden Workflow

Every AI-assisted build session follows this sequence:

1. **Run the audit trigger** to confirm system state
2. **Read component-inventory.md + INDEX.md** before building anything
3. **Follow reproduction-prompt.md** template for template recreations
4. **Run token-audit-prompt.md** after building to verify compliance
5. **Review in browser** (desktop + mobile + dark mode) before committing
6. **Update the design system checklist** with new components or findings

---

## Starting a New Session (any repo)

### Step 1: Confirm System State

Always begin by pasting the audit trigger into Claude Code:

```
See: ../global-docs/prompts/audit-trigger.md
```

This confirms:
- What's complete in the design system
- What's broken or missing
- Where to start
- Any recent changes you need to know about

**Never start building from a cold start.** That audit eliminates surprises.

---

## Building a New App or Page

### Step 1: Inventory Components & Blocks

Before writing any JSX:

1. Read `design-system-shadcn-tailwind/docs/component-inventory.md`
2. Read `design-system-shadcn-tailwind/src/blocks/INDEX.md`
3. Ask: "Does this component exist?" → If yes, use it
4. Ask: "Is there a block for this pattern?" → If yes, use it
5. Ask: "Does nothing cover it?" → Then and only then, plan a custom component

### Step 2: Use the Reproduction Prompt (for templates)

If you're recreating a template, use the structured prompt:

```
Path: design-system-shadcn-tailwind/docs/reproduction-prompt.md
```

Steps:
1. Identify the source (template name, competitor site, sketch, etc.)
2. Paste the reproduction prompt into Claude Code
3. Claude inventories the source → maps to design system → reports gaps
4. You review and approve the gap-fill plan
5. Claude builds using approved components only
6. Token audit runs automatically
7. You review output in browser

### Step 3: Run Token Audit

After building, paste this prompt:

```
Path: design-system-shadcn-tailwind/docs/token-audit-prompt.md
```

This checks:
- ✅ No hardcoded hex colors
- ✅ No concrete Tailwind classes (bg-blue-500, etc.)
- ✅ All components have forwardRef + displayName
- ✅ Token compliance across the board
- ❌ Flags any violations with fixes

### Step 4: Browser Review (Critical)

Before committing, test in browser:
- **Desktop (1280px)** — full layout
- **Mobile (375px)** — touch targets, scrolling, inputs
- **Dark mode** — toggle `[data-theme="dark-default"]`
- **Keyboard nav** — Tab, Enter, Escape, Arrow keys
- **Screen reader** (NVDA/VoiceOver on at least one page)

---

## Recreating a Premium Template

All premium templates have been pre-analyzed.

### Step 1: Check Template Readiness

Before starting any recreation, read:

```
design-system-shadcn-tailwind/src/blocks/MASTER-GAP-REPORT.md
```

This shows:
- Current readiness % for each template
- Critical gaps (if any)
- Hours to ready
- Which templates are ready **right now** (0 hours)

**Current status (as of 2026-04-09):**
- ✅ 13 templates at 95%+ coverage (ready now)
- ⚠️ 1 template blocked by CMS (Radiant — post-Phase-5)

### Step 2: Locate Template Sources

Template sources are in private repos (reference only):

| Source | Location |
|--------|----------|
| Cruip + Mosaic | `../javcb-templates/templates_cruip-including-mosaic/` |
| Magic UI Pro | `../javcb-templates/templates_magic-ui-pro/` |
| Tailwind Plus | `../javcb-templates/templates_tailwind-plus/` |

### Step 3: Follow Reproduction Prompt

Use the structured template recreation prompt:

```
Path: design-system-shadcn-tailwind/docs/reproduction-prompt.md
```

This ensures:
- All gaps are identified upfront
- No surprises mid-build
- Consistent rebuild approach across all templates

---

## Harvesting a UI Pattern from Any App

When you've seen a pattern you like (Asana, Linear, Notion, etc.) and want your own version:

### Use the Pattern Harvest Workflow

```
See: ../global-docs/workflows/pattern-harvest.md
```

Steps:
1. Screenshot or describe the pattern
2. Identify what shadcn/Block components could approximate it
3. Report gaps
4. Build the custom component following `component-conventions.md`
5. Add provenance header, Storybook story
6. Update component-inventory.md

---

## Competitive Analysis → Build Better

When building for a specific market (local business, SaaS, etc.):

### Use the Competitive Analysis Workflow

```
See: ../global-docs/workflows/competitive-analysis.md
```

Tools:
- **HTTrack** or **wget** for mirroring competitor sites locally
- **Claude** analyzes → SWOT per competitor → maps to design system → builds

Steps:
1. Mirror 3-5 competitor sites
2. Ask Claude: "What are the top 5 UI patterns in these sites?"
3. Map each pattern to design system (component or block)
4. Report gaps
5. Build improved versions
6. Add to design system as new blocks or components

---

## When to Build a Custom Component

Build custom when:

1. **shadcn doesn't have it** (checked component-inventory.md)
2. **No block covers the pattern** (checked INDEX.md)
3. **It's specific to your use case** (not general-purpose)
4. **It will be reused** (not a one-off)

**Process:**

1. Read `design-system-shadcn-tailwind/docs/component-conventions.md`
2. Create in `src/components/[ComponentName]/`
3. Include:
   - Component file (TypeScript)
   - Story file (Storybook)
   - Index export
   - Provenance header
4. Add to `component-inventory.md`
5. Update `DESIGN-SYSTEM-CHECKLIST.md`

---

## Troubleshooting: "I Can't Find What I Need"

1. **Check component-inventory.md** → Search for keyword
2. **Check src/blocks/INDEX.md** → Search by category
3. **Check MASTER-GAP-REPORT.md** → Is this a known gap?
4. **Ask: Is this a custom component opportunity?** → Follow component-conventions.md

If still stuck:
1. Update the audit checklist with the gap
2. Document what you'd need
3. Propose a solution (custom component, new block, etc.)
4. Get approval before building

---

## Files You'll Use Regularly

| I need to... | File |
|-------------|------|
| Start a new session | `../global-docs/prompts/audit-trigger.md` |
| Recreate a template | `design-system-shadcn-tailwind/docs/reproduction-prompt.md` |
| Audit token compliance | `design-system-shadcn-tailwind/docs/token-audit-prompt.md` |
| Find a component | `design-system-shadcn-tailwind/docs/component-inventory.md` |
| Find a block | `design-system-shadcn-tailwind/src/blocks/INDEX.md` |
| Check template readiness | `design-system-shadcn-tailwind/src/blocks/MASTER-GAP-REPORT.md` |
| Learn component rules | `design-system-shadcn-tailwind/docs/component-conventions.md` |
| Build a custom component | `design-system-shadcn-tailwind/docs/component-conventions.md` |
| Analyze a competitor | `../global-docs/workflows/competitive-analysis.md` |
| Harvest a UI pattern | `../global-docs/workflows/pattern-harvest.md` |

---

## Key Principles When Using AI

1. **Always inventory first.** Don't let AI guess what exists.
2. **Always run token audit.** Compliance is not optional.
3. **Always review in browser.** Screenshots are not proof of working UI.
4. **Always test accessibility.** WCAG AA is the bar.
5. **Always document what you build.** Future sessions depend on it.

---

## Further Reading

- **Component decisions:** `docs/design-system/component-guide.md`
- **Token reference:** `docs/design-system/token-system.md`
- **Architecture:** `docs/design-system/architecture.md`
- **Philosophy:** `docs/design-system/philosophy.md`
