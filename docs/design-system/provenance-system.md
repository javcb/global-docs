<!-- type: reference -->

# Provenance System — Source Tracking

## Why Provenance Matters

**Provenance** = the origin and history of something. In a design system, it means tracking where every component, block, and pattern came from.

Why track provenance?

1. **Understand modification rights** — Can I edit this? Should I?
2. **Track responsibility** — Who owns this component? Who fixes bugs?
3. **Prevent duplicates** — Know when someone built the same thing twice
4. **Credit sources** — Acknowledge where patterns came from
5. **Plan updates** — Know when upstream changes affect us
6. **Make decisions** — Know the context behind choices

**Provenance answers:** "Where did this come from, and can I modify it?"

---

## The Source Tags

Every file in the design system has a **`@source` tag** showing its origin.

### Semantic Tag Meanings

| Source | Meaning | Can I Modify? | Rules |
|--------|---------|---|--------|
| `@source: shadcn` | Radix UI primitives + shadcn styling (from https://shadcn-ui.com) | ❌ Never | Read-only. Copy-paste technology prevents version conflicts. Wrap or build custom if changes needed. |
| `@source: tailwind-ui` | Tailwind UI blocks (from https://tailwindui.com), token-swapped to our system | ⚠️ Reference only | Token-swapped, production-tested. Use as-is, adapt via props, or study pattern and rebuild. |
| `@source: cruip` | Cruip templates (from https://cruip.com), token-swapped | ⚠️ Reference only | Same as Tailwind UI. Adapted for our token system. Document changes if you modify. |
| `@source: magic-ui` | Magic UI effects (from https://magicui.design), adapted | ⚠️ Reference | Study patterns, build custom versions. Don't modify source directly. |
| `@source: custom` | Built by us, original to this system | ✅ Yes | We own it. Update, improve, refactor as needed. Document changes. |
| `@source: adapted` | Started from external source, significantly modified by us | ✅ Yes | We own the current version. Document what we changed and why. |

---

## Where Provenance Headers Go

### In Component Files

Place at the top of the file as a doc comment:

```typescript
/**
 * @source shadcn
 * @category inputs
 * @token-compliant
 * @date-added 2025-01-15
 * 
 * shadcn Button component with Tailwind styling.
 * Read-only. Wrap if customization needed.
 */

import { forwardRef } from "react"

export const Button = forwardRef(...)
```

### In Block Files

```typescript
/**
 * @source tailwind-ui
 * @category page-examples
 * @token-swapped 2026-01-20
 * 
 * Hero section with CTA from Tailwind UI.
 * Token-swapped to match design system colors and spacing.
 * Treat as reference; adapt via props or rebuild if significant changes needed.
 */

export function HeroWithCTA({ title, subtitle, ...props }) {
  return (...)
}
```

### In Custom Component Files

```typescript
/**
 * @source custom
 * @category data-display
 * @token-compliant
 * @date-created 2026-02-10
 * @author Claude + manual review
 * 
 * Custom data table component with sorting and filtering.
 * Fully owned by this system. Update and refactor as needed.
 */

export function DataTable({ columns, data, ...props }) {
  return (...)
}
```

### In Story Files

Document the component's provenance:

```typescript
/**
 * Button stories
 * @source shadcn (read-only wrapped primitive)
 */

export default {
  title: "Inputs/Button",
  component: Button
}
```

---

## Provenance in Commit Messages

When committing changes related to provenance, document it:

### New shadcn Component

```
feat: add shadcn Button component

Added Button from shadcn/ui (copy-paste method).
@source: shadcn
Location: src/components/ui/button.tsx

This is read-only; any customization should wrap the component.
```

### Token-Swapped Block

```
feat: token-swap Tailwind UI HeroWithCTA block

Integrated HeroWithCTA from Tailwind UI, swapped colors to design system tokens:
- bg-gray-900 → bg-primary
- text-white → text-primary-foreground
- Updated spacing to use --spacing-* tokens

@source: tailwind-ui, token-swapped
Location: src/blocks/page-examples/HeroWithCTA.tsx
```

### Custom Component

```
feat: create custom DataTable component

Built custom DataTable with:
- Sortable columns (click header to sort)
- Filterable rows (search box)
- Row selection (checkboxes)
- Pagination (configurable page size)

@source: custom
Location: src/components/data-table/
Tests: added Storybook stories
Compliance: ran token-audit-prompt ✓
```

### Adapted Component

```
refactor: adapt SearchInput from custom → improved version

Started from our custom SearchInput component.
Changes:
- Added debounce to prevent excessive searches
- Improved accessibility (ARIA labels, keyboard nav)
- Added loading state during searches
- Better dark mode support

@source: adapted (from custom)
Location: src/components/search-input/
Migration: existing usage compatible (no breaking changes)
```

---

## Identifying Provenance at a Glance

### From File Paths

| Path | Likely Source | How to Verify |
|------|---------------|---------------|
| `src/components/ui/[name]` | shadcn | Check for @source: shadcn header |
| `src/blocks/[category]/[Name]` | tailwind-ui or custom | Check @source header and INDEX.md |
| `src/components/magic/` | magic-ui (adapted) | Check @source header |
| `src/components/charts/` | custom (recharts-based) | Check @source header |
| `src/components/[custom]/` | custom or adapted | Check @source header |

### From Comments and Documentation

Always trust the `@source` header over assumptions.

```typescript
// The path might suggest shadcn, but the header tells the truth
// src/components/ui/custom-button.tsx
/**
 * @source: custom
 * ← This is custom, not shadcn (even though it's in ui/)
 */
```

---

## Referencing Provenance in Documentation

When documenting components, reference their provenance:

```markdown
### Button Component

**Source:** shadcn/ui (read-only wrapper)
**Location:** `src/components/ui/button.tsx`

This is a Radix UI primitive with Tailwind styling.
Don't modify the source file directly; wrap or build custom instead.

#### Example

See: Button stories in Storybook
Learn more: https://shadcn-ui.com/docs/components/button
```

---

## Identifying Drift from Provenance

**Drift** = when a component's implementation diverges from its documented source.

### Example Drift

```typescript
/**
 * @source: shadcn
 * ← Says shadcn
 */

export const Button = forwardRef(({ ...props }, ref) => (
  <button
    ref={ref}
    style={{ color: '#2563eb' }}  // ← DRIFT: hardcoded color!
    // shadcn wouldn't hardcode colors
    {...props}
  />
))
```

**Fix:** Either:
1. Change `@source` to `custom` (if significantly modified)
2. Remove hardcoded color and use tokens (restore to shadcn pattern)

### Detecting Drift

Ask these questions:

| Question | If Yes → Action |
|----------|-----------------|
| Does file have hardcoded colors? | Remove them or change @source to custom |
| Does file import local dependencies not in shadcn? | Likely custom or adapted; update @source |
| File is mostly original code? | Change @source to custom |
| Only styling changes from original? | Keep @source as-is (styling changes are expected) |
| Behavior significantly changed? | Change @source to custom or adapted |

---

## Updating Provenance When Modifying

### Scenario 1: Minor styling changes to shadcn

```typescript
/**
 * @source: shadcn
 * Custom styling for our specific use case.
 */
// ← Keep @source: shadcn (styling tweaks are normal)
```

### Scenario 2: Major customization to shadcn

```typescript
/**
 * @source: custom (adapted from shadcn Button)
 * @original-source: shadcn
 * 
 * Extended Button with:
 * - Loading state (spinning spinner)
 * - Disabled animation (fade effect)
 * - Custom analytics tracking
 */
// ← Change to custom, note original source
```

### Scenario 3: Significant modification to a block

```typescript
/**
 * @source: tailwind-ui, adapted
 * 
 * Extended HeroWithCTA from Tailwind UI with:
 * - Video background instead of image
 * - Multi-step CTA (choose plan first)
 * - Analytics tracking
 * 
 * Token-swapped to match design system.
 */
// ← Use "adapted" when changes are significant
```

---

## Provenance in component-inventory.md

The master inventory documents provenance for every component:

```markdown
### Button

- **Source:** shadcn/ui
- **Location:** `src/components/ui/button.tsx`
- **Type:** Atoms (Radix primitive + styling)
- **Status:** Production-ready
- **Can modify:** No (wrap instead)

### DataTable

- **Source:** custom
- **Location:** `src/components/data-table/`
- **Type:** Organisms (multiple shadcn + custom logic)
- **Status:** Production-ready
- **Can modify:** Yes

### HeroWithCTA

- **Source:** Tailwind UI (token-swapped)
- **Location:** `src/blocks/page-examples/HeroWithCTA.tsx`
- **Type:** Templates (composition of shadcn + layout)
- **Status:** Production-ready
- **Can modify:** Adapt via props; rebuild if major changes needed
```

---

## Provenance and Responsibility

Each source tag implies responsibility:

### shadcn Components

```
Source: shadcn/ui
Owned by: shadcn/ui team (external)
Maintained by: shadcn/ui project
Our responsibility: Verify token compliance, add Storybook story
When to contact: Only if shadcn itself has a bug
```

### Tailwind UI Blocks

```
Source: Tailwind UI
Owned by: Tailwind Labs (external, paid)
Maintained by: Tailwind Labs
Our responsibility: Token swap, add Storybook story, verify compliance
When to contact: If we find a bug in Tailwind UI's code
```

### Custom Components

```
Source: custom
Owned by: This design system
Maintained by: This team
Our responsibility: Full maintenance, bug fixes, updates
When to contact: This team owns it
```

---

## Provenance Audit Checklist

Before releasing a new component, verify provenance:

- [ ] **@source header present** — File has doc comment with @source tag
- [ ] **Source is accurate** — Tag matches actual origin
- [ ] **No drift** — Implementation matches documented source
- [ ] **Modification rule clear** — Can I modify this? (header says so)
- [ ] **Commit message documents source** — Git history shows origin
- [ ] **Inventory updated** — component-inventory.md lists source
- [ ] **Links work** — References to shadcn/Tailwind docs are valid
- [ ] **Story exists** — Storybook story documents usage
- [ ] **Token compliant** — No hardcoded colors/spacing if token-swapped

---

## Common Provenance Mistakes

### ❌ Mistake 1: Losing the Source Header

```typescript
// Wrong: no @source header
export function Button() {
  return <button>...</button>
}

// Right: clearly document origin
/**
 * @source: custom
 */
export function Button() {
  return <button>...</button>
}
```

### ❌ Mistake 2: Wrong Source Tag

```typescript
/**
 * @source: shadcn  ← Wrong! This is heavily customized
 */

export function CustomButton() {
  return (
    <button
      style={{ /* lots of custom styles */ }}
      // ← Should be @source: custom or adapted
    >
```

### ❌ Mistake 3: No Token Swap Documentation

```typescript
/**
 * @source: tailwind-ui
 * ← Doesn't mention token-swap!
 */

// When did we swap tokens? What colors changed?
// Should document:
// "Token-swapped 2026-01-20: bg-gray-900 → bg-primary"
```

### ❌ Mistake 4: Hardcoded Colors in Token-Swapped Blocks

```tsx
/**
 * @source: tailwind-ui, token-swapped
 */

export function Hero() {
  return (
    <div style={{ backgroundColor: '#111827' }}>
      ← DRIFT: Should use var(--color-primary)
```

---

## Further Reading

- **Component Decision Tree:** `component-decision-tree.md`
- **Component Inventory:** `design-system-shadcn-tailwind/docs/component-inventory.md`
- **Token System:** `token-system-complete.md`
- **Git Standards:** `git-and-commit-standards.md` (commit message format)
