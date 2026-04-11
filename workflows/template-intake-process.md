# Template Intake Process

**Version:** 2026-04-10  
**Status:** Operational  

**Invoked by:** `add template source [source-name]` (GATED mode)

---

## Overview

The gated process for ingesting a new template source (e.g. Magic UI Pro, Tailwind UI, Appy, Next.js Commerce) into the design system so it becomes available for recreations and pattern harvesting.

**This workflow runs in GATED mode** — each phase requires explicit "proceed" confirmation before continuing.

---

## Pre-Intake Requirements

Before starting:

1. Template source must be in the templates repo or a known location
2. If provided as zip file:
   - Extract to `/extracted/[source-name]/` per templates repo policy
   - Keep source zips immutable (read-only, never modify)
   - Log extraction in `/extracted/EXTRACTION-LOG.md`

3. Confirm read access to all template files
4. Ensure design system repo is on latest main branch

---

## Phase 1 — Pre-Intake Assessment

### Goal: 
Understand what we're ingesting before touching anything.

### Steps:

1. **Read all template files** in `/extracted/[source-name]/`

2. **Inventory everything:**
   - [ ] Number of templates/pages/sections
   - [ ] Component types present (buttons, inputs, cards, etc.)
   - [ ] Token system used (Tailwind config? CSS vars? both?)
   - [ ] Animation libraries used (Framer Motion? custom CSS? other?)
   - [ ] Font dependencies (Google Fonts? custom? system fonts?)
   - [ ] Any non-standard dependencies (libraries, plugins, etc.)

3. **Cross-reference against current design system:**
   - Which components overlap (already have equivalent)?
   - Which components are net-new additions?
   - Which tokens overlap vs are new?
   - Estimated effort: Low / Medium / High

4. **Deliver pre-intake report:**
   - Template inventory table (name, type, complexity)
   - Component overlap analysis (existing vs new)
   - Token gap analysis (overlap vs new values)
   - Estimated new additions (component count, block count)
   - Effort estimate (quick / moderate / extensive)

### Checkpoint:
```
STEP 1 ✅ — [N] templates, [N] new components estimated, 
[N] new blocks estimated — proceed to Phase 2?
```

---

## Phase 2 — Token Analysis

### Goal: 
Identify token additions needed **without touching tokens.css yet**.

### Steps:

1. **Extract all CSS variables and Tailwind config values** from template source

2. **Map each to existing design system tokens:**

   | Source Variable | Source Value | DS Token | Gap? | Notes |
   |----------------|-------------|----------|------|-------|
   | --color-brand | #7c3aed | --color-primary | Close match | Purple, matches our primary |
   | --radius-pill | 9999px | none | New token | Specific rounded pill style |
   | --spacing-hero | 12rem | var(--spacing-64) | Direct match | 192px = 64 * 3px |

3. **Categorize all gaps:**
   - **Direct match:** existing token covers it (no action needed)
   - **Semantic remap:** different name, same value (document mapping)
   - **New token:** genuinely new value needed in global DS tokens
   - **Project-override:** too specific for global DS, use theme-override.css instead

4. **Produce TOKEN-GAP-ANALYSIS.md** with:
   - [ ] All tokens mapped
   - [ ] Gap categories listed
   - [ ] Decision (new token vs override vs existing) for each gap
   - **NO changes to tokens.css yet**

### Checkpoint:
```
STEP 2 ✅ — [N] direct matches, [N] remaps, 
[N] new tokens needed — proceed to Phase 3?
```

---

## Phase 3 — Block Extraction

### Goal: 
Extract reusable section blocks into `src/blocks/`.

### Steps:

1. **For each template/page in the source:**
   - [ ] a. Identify distinct, reusable section patterns (hero, features, pricing, etc.)
   - [ ] b. Check if equivalent already exists in `src/blocks/`
   - [ ] c. For net-new sections: extract and adapt to design system tokens

2. **Name extracted blocks per existing convention:**
   ```
   [pattern]-[variant]-[number]
   Examples:
   - hero-centered-02
   - pricing-three-tier-01
   - features-grid-with-icons-03
   - testimonials-carousel-01
   ```

3. **Adapt extracted blocks:**
   - [ ] Replace source color values with DS token equivalents
   - [ ] Replace source fonts with DS font variables
   - [ ] Replace hardcoded spacing with DS spacing tokens
   - [ ] Maintain visual character but use DS as vehicle
   - [ ] Run TypeScript check on each: `npm run typecheck`

4. **Add each new block to `src/blocks/INDEX.md` with:**
   - Block ID and name
   - Source template it came from
   - Description (1-2 sentences)
   - Key props/variants
   - Responsive behavior notes

5. **Run full build after each block added:**
   ```bash
   npm run build    # must pass with 0 errors
   ```

### Checkpoint:
```
STEP 3 ✅ — [N] blocks extracted and tokens swapped — 
proceed to Phase 4?
```

---

## Phase 4 — Story Creation

### Goal: 
Every new component and block has a Storybook story.

### Steps:

1. **For each new block extracted in Phase 3:**
   - [ ] Write `[BlockName].stories.tsx`
   - [ ] Cover: default, all variants, interactive controls
   - [ ] Include responsive story at 375px, 768px, 1280px

2. **Run full Storybook build:**
   ```bash
   npm run build-storybook
   ```
   Must complete with 0 errors before proceeding

3. **Verify stories are discoverable:**
   ```bash
   npm run storybook
   # Manually browse and verify all new stories appear
   ```

### Checkpoint:
```
STEP 4 ✅ — [N] stories written — Storybook builds clean — 
proceed to Phase 5?
```

---

## Phase 5 — Index and Gap Report Update

### Goal: 
Register all new content in system inventories.

### Steps:

1. **Confirm `src/blocks/INDEX.md` reflects all new blocks** from Phase 3
   - [ ] All blocks listed
   - [ ] All blocks link to story paths
   - [ ] All source attribution documented

2. **Update `MASTER-GAP-REPORT.md`:**
   - [ ] Add new template source with full assessment
   - [ ] Template name, block count, readiness percentage
   - [ ] Visual fidelity notes (decorative complexity, key visual identity)
   - [ ] Known extraction challenges
   - [ ] Recommendations for future recreations

3. **If new tokens were identified in Phase 2:**
   - [ ] If they belong in global DS: create a separate "update tokens" GATED task
   - [ ] If project-specific: document in template's theme-override notes
   - [ ] Token decision log: which new tokens vs which overrides

### Checkpoint:
```
STEP 5 ✅ — Indexes updated — Gap report updated — 
proceed to Phase 6?
```

---

## Phase 6 — Delivery

### Goal:
Commit all new content and deliver intake report.

### Steps:

1. **Commit all new files:**
   ```bash
   git add .
   git commit -m "feat: intake [source-name] — [N] blocks, [N] components"
   git push
   ```

2. **Deliver INTAKE-REPORT-[source-name].md:**
   - [ ] New blocks added (with IDs and story paths)
   - [ ] New components added (if any)
   - [ ] Token gaps identified and decisions made
   - [ ] Storybook story count
   - [ ] Updated MASTER-GAP-REPORT.md summary
   - [ ] Estimated effort for recreations
   - [ ] Recommended next: "ready for recreations" or "N items pending"

3. **Provide summary:**

   ```markdown
   ## Template Intake Complete: [source-name]
   
   **New Blocks Added:** [N]
   - [block-name-01]
   - [block-name-02]
   
   **Token Status:** [N] new tokens identified
   - [N] added to global DS
   - [N] project-override only
   
   **Stories:** [N] Storybook stories created
   
   **Readiness:** [N]% ready for Phase 5 recreations
   
   **Next Steps:**
   - Ready for recreation commands: "recreate template [source-name]"
   - Or: [list any pending work]
   ```

### Completion Signal:
```
Template intake complete — [source-name] — [N] blocks ready — 
MASTER-GAP-REPORT.md updated
```

---

## Gated Mode Checkpoints Summary

This workflow is GATED. Here are all checkpoints that require "proceed" confirmation:

| Phase | Checkpoint | Confirmation Required |
|-------|-----------|----------------------|
| 1 | Pre-intake complete, effort estimated | ✅ proceed? |
| 2 | Token gaps identified, decisions made | ✅ proceed? |
| 3 | All blocks extracted and token-swapped | ✅ proceed? |
| 4 | Stories written, Storybook builds clean | ✅ proceed? |
| 5 | Indexes and gap report updated | ✅ proceed? |
| 6 | Commit and delivery (no confirmation needed) | — |

Do not proceed to next phase without explicit "proceed" from Javier.

---

## Troubleshooting

**Phase 2 token extraction is unclear:**
- Compare source Tailwind config side-by-side with our tokens.css
- List both in the TOKEN-GAP-ANALYSIS.md for visual comparison

**Phase 3 block has hardcoded color:**
- Find: `grep -r "#[0-9a-fA-F]" src/blocks/[BlockName]/`
- Replace with: `var(--color-xyz)` or className like `text-primary`

**Phase 4 story won't compile:**
- Check imports: `import { [BlockName] } from "@/blocks/[BlockName]"`
- Run: `npm run typecheck -- [BlockName].stories.tsx`
- Error messages will show exact issue

**Phase 5 gap report feels incomplete:**
- Run: `npm run build` to ensure all blocks compile
- Compare token count in new blocks vs total blocks
- Document any incomplete work under "Recommended next"
