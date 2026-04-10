<!-- type: reference -->

# Token System Reference

## Overview

All design decisions live in one file:

```
design-system-shadcn-tailwind/src/styles/tokens.css
```

This is the source of truth. Every color, spacing, radius, and typography decision flows from here. Change a token once, update everywhere.

Two additional files extend tokens:
- **shadcn-bridge.css** — maps `--color-*` tokens to shadcn CSS variables
- **animation-tokens.css** — animation durations, easings, spring configurations

---

## Dark Mode

**Selector:** `[data-theme="dark-default"]` (NOT `.dark` class)

**Why?** Storybook needs to toggle themes without hydration issues. Using a `data-` attribute prevents CSS conflicts and makes theme switching transparent to the framework.

**In practice:**
- Storybook theme switcher uses `data-theme="dark-default"`
- `globals.css` includes Tailwind dark variant aligned to this selector
- CSS variables automatically update when attribute changes

**Testing dark mode:**
1. Open component in Storybook
2. Use theme switcher (top-right corner)
3. Verify all colors adjust
4. Verify contrast meets WCAG AA

---

## Token Rules (enforced by CLAUDE.md)

### ✅ DO

```tsx
// Use semantic token classes
<div className="bg-background text-foreground">

// Use CSS variables in custom styles
<div style={{ color: 'var(--color-primary)' }}>

// Use Tailwind with token-based classes
<Button className="bg-primary text-primary-foreground">
```

### ❌ DON'T

```tsx
// Concrete Tailwind colors
<div className="bg-gray-100 text-blue-500">  // ❌

// Hardcoded hex/rgb
<div style={{ color: '#2563eb' }}>           // ❌

// Hardcoded spacing
<div className="mt-[14px]">                  // ❌
```

---

## Semantic Color Reference

All colors are named semantically (what they mean), not literally (blue, gray, etc).

| Token Class | CSS Variable | Use Case | Example |
|---|---|---|---|
| `bg-background` | `--color-bg` | Page/app background | Body background |
| `bg-muted` | `--color-surface` | Card, panel backgrounds | Card, dialog |
| `text-foreground` | `--color-text` | Primary body text | Paragraph text |
| `text-muted-foreground` | `--color-text-muted` | Secondary text | Labels, hints, captions |
| `text-primary` | `--color-primary` | Brand accent, interactive | Links, active states |
| `bg-primary` | `--color-primary` | Primary actions | Primary button background |
| `text-primary-foreground` | `--color-text-primary` | Text on primary | Button text color |
| `border-border` | `--color-border` | Dividers, input borders | Horizontal rules, input borders |
| `bg-destructive` | `--color-error` | Error states | Error messages, delete actions |
| `text-destructive` | `--color-error` | Error text | Error labels, validation |
| `bg-success` | `--color-success` | Success states | Success banners, checkmarks |
| `text-success` | `--color-success` | Success text | Success labels |
| `bg-warning` | `--color-warning` | Warning states | Warning banners |
| `text-warning` | `--color-warning` | Warning text | Warning labels |

---

## Animation Token Reference

File: `src/styles/animation-tokens.css`
Utilities: `src/lib/animation.ts`

### Durations

Used for controlling animation timing:

| Token | Value | Use Case |
|---|---|---|
| `--duration-instant` | 0ms | Disabled animations, prefers-reduced-motion |
| `--duration-fast` | 150ms | Hovers, quick feedback |
| `--duration-normal` | 300ms | Typical animations |
| `--duration-slow` | 500ms | Page transitions |
| `--duration-lazy` | 1000ms | Entrance animations |

### Easings

Predefined easing curves:

| Token | Value | Use Case |
|---|---|---|
| `--ease-in` | cubic-bezier(0.4, 0, 1, 1) | Exit animations |
| `--ease-out` | cubic-bezier(0, 0, 0.2, 1) | Entrance animations |
| `--ease-in-out` | cubic-bezier(0.4, 0, 0.2, 1) | Symmetric animations |
| `--ease-bounce` | cubic-bezier(0.68, -0.55, 0.265, 1.55) | Bouncy entrances |

### Spring Configs

For physics-based animations:

| Token | Config | Use Case |
|---|---|---|
| `--spring-smooth` | stiffness: 100, damping: 15 | Gentle, flowing |
| `--spring-bounce` | stiffness: 200, damping: 10 | Lively, bouncy |
| `--spring-stiff` | stiffness: 300, damping: 30 | Snappy, quick |

### Available Animation Variants

From `src/lib/animation.ts`:

**Entrance animations:**
- `fadeIn` — simple opacity fade
- `fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight` — directional fades
- `scaleIn`, `scaleInBounce` — scale from center
- `slideInLeft`, `slideInRight`, `slideInUp`, `slideInDown` — directional slides
- `rotateIn` — rotation entrance
- `blurReveal` — blur-out to sharp reveal

**Container patterns:**
- `staggerContainer` — container for staggered children
- `staggerItem` — individual item in stagger sequence

**Scroll animations:**
- `scrollReveal` — triggers on scroll into viewport

### Prefers-Reduced-Motion

**Automatic:** All animations automatically respect user OS settings.

The `animation-tokens.css` file includes:
```css
@media (prefers-reduced-motion: reduce) {
  /* All --duration-* set to 0ms */
}
```

This means:
- Users with "Prefer Reduced Motion" enabled get instant, non-animated versions
- Developers don't need special handling — it's built in
- Test with `prefers-reduced-motion` story in Storybook

---

## Using Tokens in Components

### In Tailwind Classes

```tsx
// ✅ Token-based
<div className="bg-primary text-primary-foreground rounded-md">

// ❌ Concrete colors
<div className="bg-blue-600 text-white rounded-md">
```

### In CSS Variables (custom styles)

```tsx
// ✅ Token-based
<div style={{ borderColor: 'var(--color-border)', padding: 'var(--spacing-md)' }}>

// ❌ Hardcoded
<div style={{ borderColor: '#e5e7eb', padding: '12px' }}>
```

### In Component Styling (cva)

```tsx
// ✅ Token-based variant
const buttonStyles = cva(
  'px-3 py-2 rounded-md transition-colors',
  {
    variants: {
      intent: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
      },
    },
  }
)

// ❌ Concrete colors
const buttonStyles = cva(
  'px-3 py-2 rounded-md transition-colors',
  {
    variants: {
      intent: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      },
    },
  }
)
```

---

## Token Audit

Use this prompt to audit any file for token compliance:

```
Path: design-system-shadcn-tailwind/docs/token-audit-prompt.md
```

Checks:
- ✅ No hardcoded hex colors
- ✅ No concrete Tailwind classes (bg-blue-500, text-gray-700, etc.)
- ✅ No hardcoded spacing (mt-[14px], p-6, etc.)
- ✅ All animation durations use CSS variables
- ✅ forwardRef + displayName pattern on components
- ✅ Proper imports (no barrel imports)

---

## Changing a Token

To change a design decision globally:

1. **Edit tokens.css**
   ```css
   --color-primary: #your-new-color;
   ```

2. **Rebuild**
   ```bash
   npm run build
   ```

3. **Review in Storybook**
   ```bash
   npm run storybook
   ```

4. **Test in browser** (desktop, mobile, dark mode)

5. **Commit**
   ```bash
   git commit -m "Update primary color token"
   ```

That's it. Every component using `bg-primary` or `text-primary` automatically updates.

---

## Further Reading

- **Animation reference:** `docs/design-system/token-system.md` (this file, scroll to Animation section)
- **Component decisions:** `docs/design-system/component-guide.md`
- **Architecture:** `docs/design-system/architecture.md`
- **Token audit prompt:** `design-system-shadcn-tailwind/docs/token-audit-prompt.md`
