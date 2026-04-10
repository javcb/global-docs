# Competitive Analysis Workflow

Step-by-step workflow for studying and replicating competitor UI patterns. Use this when analyzing external products to understand their design approaches and implement similar patterns in the design system.

## Overview

This workflow guides you through:
1. Capturing and documenting competitor UI patterns
2. Analyzing component structure and interactions
3. Mapping patterns to design system components
4. Planning implementation and validation

**Time estimate:** 2-4 hours per template (depends on complexity and number of unique patterns)

---

## Phase 1: Discovery & Documentation

### 1.1 Prepare Your Capture Tools

- **Screenshot tool:** Use native OS capture or Figma screenshot plugin
- **Note-taking app:** Notion, Google Docs, or Obsidian
- **Screen recording (optional):** For interactions and animations
- **Color picker:** Browser DevTools or eyedropper utility

### 1.2 Visit the Competitor Site

- Open in latest Chrome/Firefox (for accurate rendering)
- Test on multiple screen sizes (desktop, tablet, mobile)
- Capture full-page screenshots of key views
- Note responsive breakpoints and layout shifts

### 1.3 Document Page Structure

For each major page/view, create a documentation entry:

**Template:**
```
## [Page Name]

**URL:** [link]

**Key Sections:**
- [Section 1] — purpose, components
- [Section 2] — purpose, components
- [Section 3] — purpose, components

**Responsive Behavior:**
- Desktop (1200px+): [layout description]
- Tablet (768px-1199px): [layout description]
- Mobile (320px-767px): [layout description]

**Unique Interactions:**
- [Interaction 1] — description, trigger
- [Interaction 2] — description, trigger

**Notable Patterns:**
- [Pattern 1] — why it works
- [Pattern 2] — why it works
```

### 1.4 Identify Component Patterns

For each UI element, note:
- **Component type** (button, card, table, etc.)
- **Visual treatment** (color, typography, spacing)
- **Interactions** (hover, click, keyboard)
- **Responsive changes** (does it change on mobile?)
- **Accessibility cues** (labels, icons, status indicators)

---

## Phase 2: Gap Analysis

### 2.1 Create a Component Inventory Cross-Reference

**Spreadsheet columns:**
| Feature | Component Type | Design System Match | Status | Notes |
|---------|----------------|-------------------|--------|-------|
| [Feature name] | [Type] | [Exact / Similar / Gap] | [TODO / IMPLEMENT / DONE] | [Specific details] |

### 2.2 Categorize Components

**Exact Matches:** Component exists in design system and requires no customization
- Action: Use as-is, verify in Phase 3

**Similar Matches:** Component exists but needs minor customization
- Action: Evaluate wrapper or variant approach
- Decision needed: Build vs. use existing + tweaks

**Gaps:** Component or pattern doesn't exist in design system
- Action: Evaluate using pattern-harvest workflow
- Decision needed: Build new / Use alternative / Defer

### 2.3 Severity Assessment

Mark each gap with severity:
- **CRITICAL:** Blocks core functionality or visual identity (implement first)
- **HIGH:** Significant UX feature or consistency (implement phase 1)
- **MEDIUM:** Nice-to-have or can be approximated (implement phase 2)
- **LOW:** Edge case or rarely visible (implement phase 3 / deprioritize)

---

## Phase 3: Design System Mapping

### 3.1 Component Matching

For each competitor component, identify design system equivalent:

**Example mappings:**
```
Competitor: "Call-to-action banner"
Design System: Button (primary) + Card (or layout block)

Competitor: "Tiered pricing table"
Design System: Table + Badge components + custom layout block

Competitor: "Animated hero carousel"
Design System: Carousel block (if exists) OR custom with Framer Motion + existing blocks
```

### 3.2 Token Mapping

Document color, typography, and spacing decisions:

```
Competitor Primary Color: #1E40AF (Tailwind blue-800)
Design System Token: bg-primary (semantic, respects theme)

Competitor Spacing: 16px, 24px, 32px increments
Design System: Tailwind spacing scale (16px base)

Competitor Font: -apple-system, Segoe UI, sans-serif
Design System: Uses CSS variable with system font stack
```

### 3.3 Interaction Mapping

Document interactions that need implementation:

```
Interaction: "Hover on nav item → slides underline"
Implementation: CSS transition on border-bottom + group-hover

Interaction: "Click hamburger → sidebar animates from left"
Implementation: HeadlessUI Disclosure component + Tailwind transform

Interaction: "Search box focus → dropdown appears"
Implementation: Combobox component + Dialog overlay
```

---

## Phase 4: Implementation Planning

### 4.1 Create Build Plan

Order components by:
1. **Dependencies** (build foundations first)
   - Buttons → Cards → Layout → Complex sections
2. **Impact** (high-visibility features first)
   - Navigation → Hero → Primary content → Secondary details
3. **Complexity** (easier components build momentum)
   - Simple → Moderate → Complex

**Example plan:**
```
## Build Order (Mosaic Template)

Phase 1 (Foundations — 4 hours)
- [ ] Navigation block (existing Sidebar Navigation + tokens)
- [ ] Hero section block (custom)
- [ ] Pricing cards (Card component + Badge variants)

Phase 2 (Content — 6 hours)
- [ ] Feature grid (existing Grid layout + Card blocks)
- [ ] Testimonials section (Avatar + Card + custom styling)
- [ ] FAQ accordion (Accordion component + typography)

Phase 3 (Polish — 3 hours)
- [ ] Footer (custom layout block)
- [ ] Responsive adjustments
- [ ] Token refinements
```

### 4.2 Identify Blockers

Mark anything that might slow implementation:

```
🚧 BLOCKER: Need chart component for metrics visualization
   → Decision: Use Chart.js wrapper OR replicate with SVG
   
⚠️  CAUTION: Competitor uses custom animation library
   → Decision: Use Framer Motion OR CSS animations
   
ℹ️  INFO: Color scheme differs significantly from default tokens
   → Decision: Create new theme variant OR override tokens
```

### 4.3 Define Acceptance Criteria

For each section, document what "done" means:

```
## Hero Section — Done When:
- ✅ Layout matches desktop screenshot
- ✅ Responsive at 1200px, 768px, 320px breakpoints
- ✅ Text is readable (contrast 4.5:1)
- ✅ CTA button is 48px+ touch target
- ✅ No horizontal scroll on mobile
- ✅ Uses design system tokens (no #hex colors)
- ✅ Keyboard accessible (Tab, Enter)
```

---

## Phase 5: Validation & Documentation

### 5.1 Verify Against Original

Before marking "done":

1. **Visual comparison**
   - [ ] Screenshot original side-by-side
   - [ ] Check alignment, spacing, proportions
   - [ ] Verify responsive breakpoints match

2. **Interaction validation**
   - [ ] Hover states match
   - [ ] Click behavior is correct
   - [ ] Animations are smooth (60fps if animated)

3. **Accessibility check**
   - [ ] Keyboard navigation works
   - [ ] Screen reader announces content correctly
   - [ ] Color contrast meets WCAG AA

4. **Design system compliance**
   - [ ] No hardcoded hex colors (only tokens)
   - [ ] No concrete Tailwind classes (use semantic tokens)
   - [ ] Components use cva for variants
   - [ ] forwardRef + displayName on DOM elements

### 5.2 Document Findings

Create a summary document:

```markdown
# Mosaic Dashboard — Competitive Analysis Findings

## Overview
- Source: [URL]
- Analysis Date: 2026-04-09
- Status: 95% design system coverage
- Critical gaps: 3 (chart component, advanced table, datepicker)

## Key Insights
1. Navigation uses left sidebar (matches our existing pattern)
2. Uses consistent 4-column grid throughout
3. Heavy use of data visualization (charts)
4. Accent color is purple, not blue (requires token override)

## Components Implemented
- ✅ Sidebar Navigation (existing)
- ✅ Data cards (existing Card + custom styling)
- ✅ Button variants (existing)

## Gaps Requiring New Work
- ⚠️ Chart component (HIGH priority)
- ⚠️ Advanced DataTable (MEDIUM priority)
- ⚠️ Datepicker with range selection (MEDIUM priority)

## Phase 5 Recommended Intake Order
1. Chart component (blocks most pages)
2. Enhanced DataTable (secondary views)
3. Datepicker (less critical, can defer)
```

### 5.3 File Organization

Store all competitive analysis work in a consistent location:

```
design-system-shadcn-tailwind/
├── docs/
│   ├── competitive-analysis/
│   │   ├── mosaic-dashboard.md
│   │   ├── magic-ui-pro.md
│   │   └── [other-templates].md
│   └── ...
└── ...
```

---

## Troubleshooting

### "The competitor pattern doesn't match any design system component"

**Solution:**
1. Check if a similar pattern exists (layout blocks, composition)
2. Use pattern-harvest workflow to evaluate building new block
3. Consider if pattern is worth replicating (brand differentiation vs. utility)
4. Document as a gap for Phase 3D intake discussion

### "Colors don't match our token values"

**Solution:**
1. Check if semantic token (primary, secondary, etc.) maps correctly
2. If not, create a new theme variant or override specific token
3. Document the override and rationale
4. Verify contrast still meets WCAG AA

### "Interaction is too complex for current component library"

**Solution:**
1. Break into smaller, composable interactions
2. Check headlessui/radix-ui documentation for similar patterns
3. Evaluate if Framer Motion is needed for smooth animations
4. Mark as BLOCKER and escalate to developer

---

## References

- **Design System Compliance:** See `docs/token-audit-prompt.md`
- **Component Inventory:** See `docs/component-inventory.md` and `src/blocks/INDEX.md`
- **For new block creation:** See `workflows/pattern-harvest.md`
- **Phase 5 planning:** See `PHASE-5-GAP-ANALYSIS.md`
