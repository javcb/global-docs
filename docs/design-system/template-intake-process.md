<!-- type: process -->

# Template Intake Process

## Overview

**Template intake** is the process of integrating a new design template (from Tailwind UI, Cruip, Magic UI, etc.) into the design system. This turns a standalone template into reusable blocks and components.

The intake process ensures:
- ✅ Components are token-compliant (no hardcoded colors)
- ✅ Storybook stories exist (documented with examples)
- ✅ Block inventory is updated (findable by others)
- ✅ Provenance is tracked (where did this come from?)
- ✅ Quality standards are met (accessibility, types, etc.)

---

## When to Intake a Template

Intake a template when:

✅ **Do intake:**
- Official template from known source (Tailwind UI, Cruip, Magic UI)
- Reusable pattern (will be used in multiple projects)
- Want to document for team reference
- Plan to base future projects on this template

❌ **Don't intake:**
- One-off project template (not reusable)
- Project-specific customization (belongs in project repo)
- Incomplete or broken template
- Template you don't plan to use again

---

## Pre-Intake Assessment

Before starting intake, answer these questions:

### 1. What's New About This Template?

```
Document:
- Template name and source (e.g., "Magic UI SaaS Template")
- What does it show? (e.g., "SaaS dashboard with sidebar, header, data table")
- What's novel? (new patterns, animations, layouts not in system)
- Reusable blocks? (e.g., "Hero section", "Pricing table", "Feature grid")
```

### 2. What's Redundant?

```
Check:
- Do we already have components for this? (Button, Card, Dialog, etc.)
- Do we already have similar blocks? (different hero, but same pattern)
- New animations? Or variations of existing ones?
- New charts? Or just different data in existing charts?
```

### 3. What Do We Need to Build/Adapt?

```
Estimate:
- How many new blocks? (e.g., 3-5 significant blocks)
- How many new custom components? (e.g., 0-2)
- How many tokens missing? (new colors, spacing, etc.)
- How many animation variants? (e.g., 2-3 new effects)
```

### 4. When Should This Be Ready?

```
Timeline:
- High priority (needed for project) → start immediately
- Medium priority (useful reference) → queue for next phase
- Low priority (nice-to-have) → document for future
```

---

## Token Swap Process

Token swap means replacing hardcoded colors with design system tokens.

### Step 1: Identify Hardcoded Colors

```bash
# In your editor/IDE, search the template code for:
grep -r "#[0-9A-F]\{6\}" src/  # Hex colors
grep -r "rgb(" src/            # RGB colors
grep -r "bg-blue-600" src/     # Concrete Tailwind classes
```

### Step 2: Map to Design System Tokens

Create a mapping document:

```markdown
## Color Swap Map

| Hardcoded | Design Token | Reasoning |
|-----------|--------------|-----------|
| #2563eb (primary blue) | --color-primary | Brand color |
| #ffffff (white text) | --color-text-primary-foreground | Text on primary bg |
| #f3f4f6 (light gray) | --color-muted | Card/panel background |
| #111827 (dark text) | --color-text | Body text |
| #e5e7eb (border) | --color-border | Input/card borders |
```

### Step 3: Replace Colors in Code

**Before:**
```tsx
export function HeroSection() {
  return (
    <div className="bg-blue-600 text-white">
      <h1 className="text-4xl">Welcome</h1>
    </div>
  )
}
```

**After:**
```tsx
/**
 * @source: tailwind-ui
 * @token-swapped: 2026-04-09
 */

export function HeroSection() {
  return (
    <div className="bg-primary text-primary-foreground">
      <h1 className="text-4xl">Welcome</h1>
    </div>
  )
}
```

### Step 4: Verify in Storybook

```bash
npm run storybook
# View component in Storybook
# Toggle dark mode (theme switcher, top-right)
# Verify colors adapt correctly
```

---

## shadcn Component Substitution

When a template uses non-shadcn components, substitute with shadcn equivalents.

### Substitution Guide

| Template Uses | Replace With | Notes |
|---------------|--------------|-------|
| Custom button | shadcn Button | Use variants: primary, secondary, ghost, etc. |
| Custom input | shadcn Input | Same styling, better accessibility |
| Custom dialog | shadcn Dialog | Better keyboard nav, focus management |
| Custom form | shadcn Form (+ RHF) | Validation, error handling |
| Custom table | shadcn Table (+ custom wrapper) | Table is unstyled; wrap if sorting/filtering needed |
| Custom dropdown | shadcn DropdownMenu | Same functionality, better accessibility |
| Custom modal | shadcn Dialog | Better UX, focus trap built-in |

### Example Substitution

**Before (template's custom button):**
```tsx
<button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
  Click me
</button>
```

**After (shadcn Button):**
```tsx
import { Button } from "@/components/ui/button"

<Button variant="default">Click me</Button>
```

---

## Block Extraction and Organization

Extract reusable patterns from the template and organize them as blocks.

### Step 1: Identify Blocks

In the template, find cohesive UI patterns:

```
Template: Magic UI SaaS Dashboard
  ├── Hero section with CTA
  ├── Sidebar navigation
  ├── Header with user menu
  ├── Data table with filtering
  ├── Stats cards (KPI metrics)
  ├── Feature grid (3-column layout)
  └── Footer with links

→ These become 7 blocks
```

### Step 2: Extract into Separate Files

```
src/blocks/page-examples/
├── HeroWithCTA.tsx
├── HeroWithCTA.stories.tsx
└── index.ts

src/blocks/navigation/
├── DashboardSidebar.tsx
├── DashboardSidebar.stories.tsx
└── index.ts

src/blocks/application-shells/
├── DashboardLayout.tsx
├── DashboardLayout.stories.tsx
└── index.ts

... (more blocks)
```

### Step 3: Ensure Token Compliance

Each block file must:
- [ ] Use semantic color tokens (no `bg-blue-600`)
- [ ] Use spacing tokens (no `mt-[14px]`)
- [ ] Use radius tokens (no `rounded-[6px]`)
- [ ] Use animation tokens (no hardcoded durations)
- [ ] Include `@source` header
- [ ] Have TypeScript interface for props

---

## Storybook Story Creation

Every block must have a Storybook story showing:
1. Default usage
2. Variants (different props)
3. Edge cases (empty state, loading, error)
4. Dark mode version

### Story Template

```typescript
// SidebarNav.stories.tsx
import { SidebarNav } from "./SidebarNav"
import type { Meta, StoryObj } from "@storybook/react"

const meta = {
  title: "Navigation/SidebarNav",
  component: SidebarNav,
  parameters: {
    layout: "fullscreen"
  }
} satisfies Meta<typeof SidebarNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { label: "Dashboard", href: "/" },
      { label: "Settings", href: "/settings" },
      { label: "Users", href: "/users" }
    ]
  }
}

export const WithActiveItem: Story = {
  args: {
    ...Default.args,
    activeItem: "Dashboard"
  }
}

export const Collapsed: Story = {
  args: {
    ...Default.args,
    collapsed: true
  }
}

export const WithDarkMode: Story = {
  args: Default.args,
  decorators: [
    (Story) => (
      <div data-theme="dark-default" className="bg-muted p-lg rounded-lg">
        <Story />
      </div>
    )
  ]
}

export const LongItemList: Story = {
  args: {
    items: Array.from({ length: 20 }, (_, i) => ({
      label: `Item ${i + 1}`,
      href: `/${i}`
    }))
  }
}
```

---

## INDEX.md Update

Update `src/blocks/INDEX.md` with the new block:

```markdown
## Navigation

### SidebarNav

**Location:** `src/blocks/navigation/SidebarNav.tsx`
**Source:** Magic UI SaaS Template (token-swapped)
**Props:**
- `items` — Array of nav items ({ label, href })
- `activeItem` — Currently active item label
- `collapsed` — Sidebar collapse toggle
- `onCollapse` — Callback when collapsed

**Use case:** Main navigation sidebar in dashboards
**Story:** Storybook Navigation/SidebarNav
```

---

## MASTER-GAP-REPORT Analysis

After intake, update `src/blocks/MASTER-GAP-REPORT.md`:

```markdown
## Magic UI SaaS Template

**Intake Date:** 2026-04-09
**Status:** 95% coverage (ready for Phase 5)
**Blocks Added:** 7

| Block | Status | Notes |
|-------|--------|-------|
| HeroWithCTA | ✅ Complete | Token-swapped, Storybook story added |
| SidebarNav | ✅ Complete | Fully functional with collapse |
| DataTable | ⚠️ Partial | Needs sorting/filtering implementation |
| StatsCard | ✅ Complete | Single card + grid layout |
| FeatureGrid | ✅ Complete | 3-column responsive layout |

**Critical Gaps:** None
**Minor Gaps:** 
- DataTable sorting (can be added as custom component)

**Hours to Ready:** 2-3 hours (DataTable implementation)
**Go/No-Go:** ✅ Ready to recreate
```

---

## Gap Identification and Documentation

Identify and document gaps:

### 1. Missing Components

```markdown
## Gap: Advanced Data Table

**Needed for:** DataTable block with sorting and filtering
**Current:** shadcn Table is unstyled; doesn't have sorting/filtering
**Solution:** Build custom DataTable component (already in system)
**Status:** Ready to use
```

### 2. Missing Animations

```markdown
## Gap: Parallax Scrolling

**Needed for:** Hero section background parallax effect
**Current:** framer-motion supports scroll-triggered, but not parallax offset
**Solution:** Build custom hook or use external library
**Decision:** Use framer-motion scroll with reduced offset for subtle effect
```

### 3. Missing Tokens

```markdown
## Gap: Gradient Token

**Needed for:** Gradient backgrounds in feature section
**Current:** Design system has colors, not gradients
**Solution:** Add --gradient-primary token to tokens.css
**Status:** Will add in Phase 5 token expansion
```

---

## Testing Intake

Before finishing, verify everything works:

```bash
# 1. TypeScript check
npm run typecheck
# ✅ All files pass type checking

# 2. Build Storybook
npm run build-storybook
# ✅ Storybook builds successfully

# 3. Token audit
# Paste token-audit-prompt.md into Claude Code
# ✅ No hardcoded colors found
```

### Browser Testing

```bash
# 1. Open Storybook
npm run storybook

# 2. View each block
# 3. Toggle dark mode (theme switcher, top-right)
# 4. Check responsiveness:
#    - Desktop (1280px)
#    - Tablet (768px)
#    - Mobile (375px)

# 5. Test keyboard navigation:
#    - Tab through inputs
#    - Enter to activate buttons
#    - Escape to close dialogs
```

---

## Provenance Header Application

Every block must have proper `@source` header:

```typescript
/**
 * @source: tailwind-ui
 * @category: page-examples
 * @template: Magic UI SaaS
 * @token-swapped: 2026-04-09
 * @date-added: 2026-04-09
 * 
 * Hero section with CTA from Magic UI SaaS template.
 * All colors token-swapped to match design system.
 * @source: tailwind-ui → read-only reference
 */
```

---

## Commit Standards for Intakes

When committing an intake, follow commit message format:

```
feat: intake Magic UI SaaS template (7 blocks)

Added blocks from Magic UI SaaS template:
- HeroWithCTA (page-examples)
- SidebarNav (navigation)
- DashboardLayout (application-shells)
- DataTable (lists)
- StatsCard (data-display)
- FeatureGrid (elements)
- Footer (elements)

All blocks:
✓ Token-swapped (no hardcoded colors)
✓ shadcn substitutions applied
✓ Storybook stories added (with dark mode + edge cases)
✓ TypeScript strict mode ✓
✓ Token audit passed ✓
✓ INDEX.md updated
✓ MASTER-GAP-REPORT updated

Gap: DataTable sorting/filtering (planned for follow-up)

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Post-Intake Template Readiness Assessment

After intake, assess when the template is ready to recreate:

```markdown
## Magic UI SaaS Template — Readiness Assessment

**Current Status:** 95% ready
**Date:** 2026-04-09

### Completeness

| Component Type | Count | Status |
|---|---|---|
| Page Examples | 1 | ✅ HeroWithCTA ready |
| Blocks | 6 | ✅ All ready |
| Custom Components | 0 | ✅ All needed exist |
| Animations | 3 | ✅ All ready |
| Gaps | 1 | ⚠️ Sorting/filtering in DataTable |

### Gap Handling

**Gap:** DataTable sorting/filtering

Options:
1. ✅ Use existing DataGrid custom component (best)
2. ⚠️ Build DataTable wrapper around shadcn Table (quick)
3. ❌ Implement from scratch (too slow)

**Decision:** Use DataGrid custom component
**Effort:** 0 hours (already exists)
**Ready:** YES

### Verdict

🟢 **READY TO RECREATE** (0 hours remaining)

Template can be recreated today using:
- 7 intake blocks
- 2 shadcn components (Button, Card)
- 2 custom components (DataGrid, Stat)
- Design system tokens (100% coverage)

**Next Step:** Create reproduction-prompt.md for this template
```

---

## Complete Intake Checklist

Use this checklist for every template intake:

- [ ] **Pre-intake assessment** complete (what's new, redundant, gaps)
- [ ] **Token swap** done (all hardcoded colors → tokens)
- [ ] **shadcn substitution** complete (non-shadcn → shadcn equivalents)
- [ ] **Blocks extracted** (7-20 cohesive patterns)
- [ ] **Storybook stories** created (default + variants + dark mode)
- [ ] **TypeScript passes** (`npm run typecheck` ✓)
- [ ] **Storybook builds** (`npm run build-storybook` ✓)
- [ ] **Token audit passes** (no hardcoded values)
- [ ] **INDEX.md updated** (all new blocks documented)
- [ ] **MASTER-GAP-REPORT updated** (gaps documented, readiness %  estimated)
- [ ] **Provenance headers** added (@source tags)
- [ ] **Commit message** follows standard format
- [ ] **Template readiness** assessed (% ready, gaps, effort hours)
- [ ] **Go/No-Go decision** made (can we recreate this now?)

---

## Further Reading

- **Provenance System:** `provenance-system.md`
- **Token System:** `token-system-complete.md`
- **Component Conventions:** `design-system-shadcn-tailwind/docs/component-conventions.md`
- **Block Index:** `design-system-shadcn-tailwind/src/blocks/INDEX.md`
- **Master Gap Report:** `design-system-shadcn-tailwind/src/blocks/MASTER-GAP-REPORT.md`
- **Template Catalog:** `templates-catalog.md`
