<!-- type: reference -->

# Complete Token System Reference

## Overview

The design system's **single source of truth** for all design decisions lives here:

```
design-system-shadcn-tailwind/src/styles/tokens.css
```

This file contains every color, spacing measurement, border radius, shadow, typography rule, and animation timing used in the entire system. Change a token once, and it updates everywhere.

Two supporting files extend tokens:
- **shadcn-bridge.css** — Maps custom color tokens to shadcn's CSS variable naming convention
- **animation-tokens.css** — Animation durations, easing curves, spring configurations

---

## Token System Architecture

### How Tokens Flow

```
tokens.css (source of truth)
   ↓
   ├── @theme { --color-primary: #2563eb; ... }
   ├── @theme { --spacing-xs: 0.25rem; ... }
   ├── @theme { --radius-md: 0.375rem; ... }
   └── @theme { --shadow-sm: 0 1px 2px rgba(0,0,0,0.05); ... }
   ↓
Tailwind CSS (generates utility classes)
   ├── bg-primary (background-color: var(--color-primary))
   ├── p-md (padding: var(--spacing-md))
   ├── rounded-md (border-radius: var(--radius-md))
   └── shadow-sm (box-shadow: var(--shadow-sm))
   ↓
Your components (use utilities)
   <div className="bg-primary p-md rounded-md shadow-sm">
```

### File Organization

```
src/styles/
├── tokens.css              ← Source of truth
├── shadcn-bridge.css       ← Radix/shadcn variable mapping
├── animation-tokens.css    ← Animation configurations
└── globals.css             ← Framework setup, imports all above
```

---

## Semantic Color Tokens

All colors are named by **meaning**, not by **appearance**. Instead of `--color-blue-600`, use `--color-primary` (what it means) and `--color-error` (what it means).

### Color Token Reference

| Token | CSS Variable | Use Case | Example | Light | Dark |
|-------|--------------|----------|---------|-------|------|
| **Primary** | `--color-primary` | Brand color, interactive elements, primary actions | Link, primary button, active state | `#2563eb` | `#3b82f6` |
| **Primary Foreground** | `--color-text-primary` | Text on primary background | Button text | `#ffffff` | `#000000` |
| **Secondary** | `--color-secondary` | Secondary actions, alternative emphasis | Secondary button | `#f3f4f6` | `#374151` |
| **Secondary Foreground** | `--color-text-secondary` | Text on secondary background | Secondary button text | `#111827` | `#f9fafb` |
| **Background** | `--color-bg` | App/page background | Body background | `#ffffff` | `#0f172a` |
| **Foreground** | `--color-text` | Primary text color | Paragraph text, body copy | `#111827` | `#f1f5f9` |
| **Muted** | `--color-surface` | Card, panel, section backgrounds | Card background, input field | `#f9fafb` | `#1e293b` |
| **Muted Foreground** | `--color-text-muted` | Secondary text, labels, hints | Label text, placeholder, caption | `#6b7280` | `#cbd5e1` |
| **Border** | `--color-border` | Dividers, input borders, subtle lines | Input border, horizontal rule | `#e5e7eb` | `#334155` |
| **Accent** | `--color-accent` | Highlights, special emphasis | Highlight background, badge | `#f59e0b` | `#fbbf24` |
| **Accent Foreground** | `--color-text-accent` | Text on accent | Badge text | `#000000` | `#000000` |
| **Destructive** | `--color-error` | Errors, delete actions, warnings | Error message, delete button | `#dc2626` | `#ef4444` |
| **Destructive Foreground** | `--color-text-error` | Text on destructive | Error button text | `#ffffff` | `#000000` |
| **Success** | `--color-success` | Success states, confirmations | Success message, checkmark | `#16a34a` | `#22c55e` |
| **Success Foreground** | `--color-text-success` | Text on success | Success button text | `#ffffff` | `#000000` |
| **Warning** | `--color-warning` | Warnings, cautions | Warning message, alert | `#ea580c` | `#fb923c` |
| **Warning Foreground** | `--color-text-warning` | Text on warning | Warning button text | `#ffffff` | `#000000` |
| **Info** | `--color-info` | Information, hints | Info badge, info message | `#0ea5e9` | `#06b6d4` |
| **Info Foreground** | `--color-text-info` | Text on info | Info text | `#ffffff` | `#000000` |

### Using Color Tokens in Components

**✅ Correct: Use Tailwind semantic classes**
```tsx
<div className="bg-primary text-primary-foreground">
  <h1 className="text-foreground">Heading</h1>
  <p className="text-muted-foreground">Secondary text</p>
</div>
```

**✅ Correct: Use CSS variables for inline styles**
```tsx
<div style={{ 
  backgroundColor: 'var(--color-primary)',
  color: 'var(--color-text-primary)'
}}>
  Content
</div>
```

**❌ Wrong: Hardcoded colors**
```tsx
<div style={{ backgroundColor: '#2563eb', color: '#fff' }}>  // ❌
<div className="bg-blue-600 text-white">  // ❌
```

### Dark Mode Color Mapping

Dark mode uses `[data-theme="dark-default"]` selector. Colors automatically invert:

```css
/* In tokens.css */
:root {
  --color-primary: #2563eb;      /* Light mode */
  --color-text: #111827;
}

[data-theme="dark-default"] {
  --color-primary: #3b82f6;      /* Dark mode (lighter version) */
  --color-text: #f1f5f9;         /* Light text for dark bg */
}
```

**Testing dark mode:**
```bash
npm run storybook
# Toggle theme switcher (top-right corner) to test
```

---

## Spacing Tokens

Spacing is based on a **scale** (4px increment system). This ensures consistent sizing.

### Spacing Scale

| Token | Value | Use Case | Example |
|-------|-------|----------|---------|
| `--spacing-0` | 0 | Reset, no space | `margin: 0` |
| `--spacing-px` | 1px | Thin borders, lines | Border width |
| `--spacing-xs` | 0.25rem (4px) | Tiny gaps | Icon spacing, badge padding |
| `--spacing-sm` | 0.5rem (8px) | Small gaps | Button padding, input spacing |
| `--spacing-md` | 1rem (16px) | Default gap | Card padding, section spacing |
| `--spacing-lg` | 1.5rem (24px) | Large gap | Container padding, heading margin |
| `--spacing-xl` | 2rem (32px) | Extra large gap | Section padding |
| `--spacing-2xl` | 3rem (48px) | Hero spacing | Page section gap |
| `--spacing-3xl` | 4rem (64px) | Large layout spacing | Hero margin, full-page gap |
| `--spacing-4xl` | 6rem (96px) | Extra large layout | Header to content gap |

### Using Spacing Tokens

**✅ Correct: Use Tailwind spacing classes**
```tsx
<div className="p-md m-lg">
  <h1 className="mb-sm">Heading</h1>
  <p className="mb-md">Paragraph</p>
</div>
```

**✅ Correct: Use CSS variables**
```tsx
<div style={{ 
  padding: 'var(--spacing-md)',
  marginBottom: 'var(--spacing-lg)'
}}>
  Content
</div>
```

**❌ Wrong: Hardcoded values**
```tsx
<div className="p-[16px] mb-[24px]">  // ❌ Arbitrary values
<div style={{ padding: '16px' }}>      // ❌ Hardcoded
```

### Tailwind Spacing Classes

Tailwind generates utilities for all spacing tokens:

```html
<!-- Padding -->
<div class="p-xs">  padding: var(--spacing-xs)
<div class="p-sm">  padding: var(--spacing-sm)
<div class="p-md">  padding: var(--spacing-md)
<div class="px-lg"> padding-left/right: var(--spacing-lg)
<div class="py-xl"> padding-top/bottom: var(--spacing-xl)
<div class="pt-2xl"> padding-top: var(--spacing-2xl)

<!-- Margin -->
<div class="m-xs">  margin: var(--spacing-xs)
<div class="mt-sm"> margin-top: var(--spacing-sm)
<div class="mb-md"> margin-bottom: var(--spacing-md)
<div class="mx-lg"> margin-left/right: var(--spacing-lg)

<!-- Gap (flex/grid) -->
<div class="gap-md"> gap: var(--spacing-md)
```

---

## Typography Tokens

Typography tokens control font families, sizes, weights, and line heights.

### Font Family Tokens

| Token | Value | Use Case | Example |
|-------|-------|----------|---------|
| `--font-sans` | System font stack | Body text, UI | Paragraphs, buttons |
| `--font-mono` | `ui-monospace`, Menlo, etc. | Code, technical text | Code blocks, timestamps |

### Font Size Tokens

| Token | Value (rem/px) | Use Case | Example |
|-------|----------------|----------|---------|
| `--text-xs` | 0.75rem / 12px | Small labels, captions | Form label, helper text |
| `--text-sm` | 0.875rem / 14px | Body copy, input text | Paragraph, input placeholder |
| `--text-base` | 1rem / 16px | Standard body text | Normal paragraph, button |
| `--text-lg` | 1.125rem / 18px | Larger body text | Lead paragraph |
| `--text-xl` | 1.25rem / 20px | Subheading | Section subtitle |
| `--text-2xl` | 1.5rem / 24px | Heading level 3 | Card title |
| `--text-3xl` | 1.875rem / 30px | Heading level 2 | Section heading |
| `--text-4xl` | 2.25rem / 36px | Heading level 1 | Page title |
| `--text-5xl` | 3rem / 48px | Extra large heading | Hero title |
| `--text-6xl` | 3.75rem / 60px | Massive heading | Landing page hero |

### Font Weight Tokens

| Token | Value | Use Case | Example |
|-------|-------|----------|---------|
| `--font-light` | 300 | De-emphasized text | Hint, secondary info |
| `--font-normal` | 400 | Body text | Standard paragraphs |
| `--font-medium` | 500 | Emphasis, labels | Form labels, badges |
| `--font-semibold` | 600 | Strong emphasis, headings | Subheadings, bold text |
| `--font-bold` | 700 | Strong headings | Headings, important titles |

### Line Height Tokens

| Token | Value | Use Case | Example |
|-------|-------|----------|---------|
| `--leading-tight` | 1.25 | Headlines (compact) | Headings |
| `--leading-snug` | 1.375 | Headings (slightly loose) | Subheadings |
| `--leading-normal` | 1.5 | Body text (readable) | Paragraphs, standard text |
| `--leading-relaxed` | 1.625 | Large body text (very readable) | Long-form content |
| `--leading-loose` | 2 | Extra space (accessibility) | Code blocks, poetry |

### Using Typography Tokens

**✅ Correct: Use Tailwind utilities**
```tsx
<h1 className="text-4xl font-bold leading-snug">
  Heading
</h1>
<p className="text-base font-normal leading-normal">
  Body paragraph with proper line height.
</p>
```

**✅ Correct: Use CSS variables**
```tsx
<h1 style={{
  fontSize: 'var(--text-4xl)',
  fontWeight: 'var(--font-bold)',
  lineHeight: 'var(--leading-snug)'
}}>
  Heading
</h1>
```

**❌ Wrong: Hardcoded values**
```tsx
<h1 className="text-[36px] font-bold">  // ❌ Arbitrary size
<p style={{ fontSize: '16px' }}>         // ❌ Hardcoded
```

---

## Border Radius Tokens

Radius tokens control corner roundness for a consistent look.

### Radius Scale

| Token | Value (rem/px) | Use Case | Example |
|-------|----------------|----------|---------|
| `--radius-none` | 0 | Sharp corners | Cards without radius |
| `--radius-sm` | 0.125rem / 2px | Subtle rounding | Small UI elements |
| `--radius-md` | 0.375rem / 6px | Default rounding | Buttons, inputs, cards |
| `--radius-lg` | 0.5rem / 8px | Larger rounding | Modal dialogs, large cards |
| `--radius-xl` | 0.75rem / 12px | Extra rounding | Buttons with more personality |
| `--radius-2xl` | 1rem / 16px | Very rounded | Prominent cards, badges |
| `--radius-full` | 9999px | Fully round | Circular avatars, pills |

### Using Radius Tokens

**✅ Correct: Use Tailwind utilities**
```tsx
<button className="rounded-md">        {/* radius-md */}
<div className="rounded-lg">           {/* radius-lg */}
<div className="rounded-full">         {/* circular */}
```

**✅ Correct: Use CSS variables**
```tsx
<div style={{ borderRadius: 'var(--radius-md)' }}>
  Content
</div>
```

**❌ Wrong: Hardcoded values**
```tsx
<div className="rounded-[6px]">        // ❌ Arbitrary
<div style={{ borderRadius: '6px' }}>  // ❌ Hardcoded
```

---

## Shadow Tokens

Shadows create depth and hierarchy. Tokens provide a consistent elevation scale.

### Shadow Scale

| Token | Use Case | CSS Value | Example |
|-------|----------|-----------|---------|
| `--shadow-none` | Flat surfaces | none | No shadow |
| `--shadow-sm` | Subtle elevation | `0 1px 2px rgba(0,0,0,0.05)` | Hover state, subtle lift |
| `--shadow-md` | Default elevation | `0 4px 6px rgba(0,0,0,0.1)` | Cards, dropdowns |
| `--shadow-lg` | Strong elevation | `0 10px 15px rgba(0,0,0,0.1)` | Modals, prominently raised |
| `--shadow-xl` | Maximum elevation | `0 20px 25px rgba(0,0,0,0.1)` | Full-page modals, overlays |
| `--shadow-inner` | Inset shadow | `inset 0 2px 4px rgba(0,0,0,0.05)` | Pressed state, depth inward |

### Using Shadow Tokens

**✅ Correct: Use Tailwind utilities**
```tsx
<div className="shadow-md">       {/* default card shadow */}
<div className="shadow-lg">       {/* larger elevation */}
<button className="shadow-sm hover:shadow-md">  {/* hover effect */}
```

**✅ Correct: Use CSS variables**
```tsx
<div style={{ boxShadow: 'var(--shadow-lg)' }}>
  Content
</div>
```

**❌ Wrong: Hardcoded values**
```tsx
<div className="shadow-[0_4px_6px_rgba(0,0,0,0.1)]">  // ❌ Arbitrary
<div style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>  // ❌ Hardcoded
```

---

## Animation Tokens

Animation tokens control timing, easing, and spring physics for consistent motion.

### Duration Tokens

Durations specify how long an animation takes.

| Token | Value | Use Case | Example |
|-------|-------|----------|---------|
| `--duration-instant` | 0ms | Disabled animations (prefers-reduced-motion) | When user has motion preference |
| `--duration-fast` | 150ms | Quick feedback, hover effects | Button hover, tooltip appear |
| `--duration-normal` | 300ms | Standard animations | Fade in, slide in, dialog open |
| `--duration-slow` | 500ms | Noticeable transitions | Page transitions, large content reveals |
| `--duration-lazy` | 1000ms | Entrance animations, storytelling | Hero section reveal, title animation |

### Easing Tokens

Easing curves control acceleration and deceleration.

| Token | Cubic Bezier Value | Feel | Use Case |
|-------|-------------------|------|----------|
| `--ease-linear` | `cubic-bezier(0, 0, 1, 1)` | Constant speed | Progress bars, mechanical |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Accelerating exit | Objects leaving screen |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Decelerating entrance | Objects entering screen |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Symmetric | Natural motion, morphs |
| `--ease-bounce` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Bouncy | Playful entrances, attention |

### Spring Configuration Tokens

Spring configs provide physics-based animations using framer-motion.

```javascript
// Three preset springs
--spring-smooth   // stiffness: 100,  damping: 15  → gentle flow
--spring-bounce   // stiffness: 200,  damping: 10  → lively bounce
--spring-stiff    // stiffness: 300,  damping: 30  → snappy, quick
```

**Using in framer-motion:**
```typescript
import { motion } from "framer-motion"

// Using duration + easing
<motion.div
  animate={{ opacity: 1 }}
  transition={{
    duration: 'var(--duration-normal)',
    ease: 'var(--ease-out)'
  }}
/>

// Using spring
<motion.div
  animate={{ scale: 1 }}
  transition={{
    type: "spring",
    stiffness: 100,
    damping: 15
  }}
/>
```

### Animation Variants

The design system exports 15+ animation variants in `src/lib/animation.ts`:

```typescript
// Entrance animations
fadeIn, fadeInUp, fadeInDown, fadeInLeft, fadeInRight
scaleIn, scaleInBounce
slideInLeft, slideInRight, slideInUp, slideInDown
rotateIn, blurReveal

// Container patterns
staggerContainer, staggerItem

// Scroll animations
scrollReveal
```

**Usage:**
```typescript
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animation"
import { motion } from "framer-motion"

// Single element
<motion.div
  initial="hidden"
  animate="visible"
  variants={fadeInUp}
/>

// Staggered list
<motion.div variants={staggerContainer}>
  {items.map(item => (
    <motion.div key={item.id} variants={staggerItem}>
      {item.name}
    </motion.div>
  ))}
</motion.div>
```

---

## Prefers-Reduced-Motion Handling

Users with "Prefer Reduced Motion" enabled should not see animations. The system handles this automatically:

```css
/* In animation-tokens.css */
@media (prefers-reduced-motion: reduce) {
  --duration-instant: 0ms;
  --duration-fast: 0ms;
  --duration-normal: 0ms;
  --duration-slow: 0ms;
  --duration-lazy: 0ms;
}
```

**Result:** Animations instantly complete when user has motion preference enabled.

**Testing:**
```bash
# Storybook story exists for testing
npm run storybook
# Look for "WithReducedMotion" variant in animation component stories
```

---

## How to Add New Tokens

When you need a new token, add it to the appropriate section in `tokens.css`:

### Adding a Color Token

```css
/* In tokens.css, in the @theme block */
:root {
  @theme {
    /* Existing colors... */
    --color-primary: #2563eb;
    
    /* New token: */
    --color-brand-dark: #1e40af;  /* Add your token */
  }
}

[data-theme="dark-default"] {
  @theme {
    /* Dark mode version */
    --color-brand-dark: #3b82f6;
  }
}
```

**Then use:**
```tsx
// Tailwind (if using default semantic naming)
<div className="bg-brand-dark">  // Tailwind auto-generates this

// CSS variable (always works)
<div style={{ backgroundColor: 'var(--color-brand-dark)' }}>
```

### Adding a Spacing Token

```css
/* In tokens.css */
:root {
  @theme {
    --spacing-5xl: 8rem;  /* 128px */
  }
}
```

**Then use:**
```tsx
<div className="p-5xl">  {/* padding: var(--spacing-5xl) */}
```

### Adding a Duration Token

```css
/* In animation-tokens.css */
:root {
  --duration-xslow: 1500ms;  /* very slow animations */
}

@media (prefers-reduced-motion: reduce) {
  --duration-xslow: 0ms;  /* Respect motion preference */
}
```

**Then use:**
```typescript
<motion.div transition={{ duration: 'var(--duration-xslow)' }}>
```

### Token Naming Conventions

**✅ Good token names (semantic, descriptive):**
```css
--color-primary
--color-error
--spacing-md
--radius-lg
--duration-slow
--ease-in-out
```

**❌ Bad token names (literal, unclear):**
```css
--color-blue-600      /* What does blue mean? */
--spacing-14px        /* Just use 14px then? */
--duration-fast-quick /* Which one? */
```

---

## Token Audit and Compliance

Before committing, always run the token audit prompt to verify compliance:

```
Path: design-system-shadcn-tailwind/docs/token-audit-prompt.md
```

**What it checks:**
- ✅ No hardcoded hex colors (use tokens)
- ✅ No concrete Tailwind classes (use semantic tokens)
- ✅ No hardcoded spacing (use spacing tokens)
- ✅ All animation durations use CSS variables
- ✅ forwardRef + displayName on DOM-wrapping components
- ✅ Proper imports (no barrel imports from shadcn)

**How to run:**
```bash
# Copy the prompt from above file
# Paste into Claude Code
# It will scan your components and flag violations
```

---

## Changing Tokens Globally

To change a token across the entire system:

1. **Edit tokens.css**
   ```css
   --color-primary: #your-new-color;  /* Update value */
   ```

2. **Rebuild**
   ```bash
   npm run build
   ```

3. **Review in Storybook**
   ```bash
   npm run storybook
   # Check all affected components
   ```

4. **Test in browser**
   - Desktop view (1280px)
   - Mobile view (375px)
   - Dark mode (toggle theme)
   - Contrast (WCAG AA)

5. **Commit**
   ```bash
   git commit -m "Update primary color token to #your-new-color"
   ```

**That's it.** Every component using `--color-primary` automatically updates.

---

## Complete Token Reference Table

### All Token Categories

| Category | File | Examples | Count |
|----------|------|----------|-------|
| **Colors** | tokens.css | primary, secondary, error, success, warning, info | 18 tokens |
| **Spacing** | tokens.css | xs, sm, md, lg, xl, 2xl, 3xl, 4xl | 10+ tokens |
| **Typography** | tokens.css | text-xs through text-6xl, font-light through font-bold | 20+ tokens |
| **Radius** | tokens.css | none, sm, md, lg, xl, 2xl, full | 7 tokens |
| **Shadows** | tokens.css | none, sm, md, lg, xl, inner | 6 tokens |
| **Durations** | animation-tokens.css | instant, fast, normal, slow, lazy | 5 tokens |
| **Easings** | animation-tokens.css | linear, in, out, in-out, bounce | 5 tokens |
| **Springs** | animation-tokens.css | smooth, bounce, stiff | 3 configurations |

**Total: 70+ tokens**

---

## Common Token Mistakes

### ❌ Mistake 1: Hardcoded Color

```tsx
// Wrong
<div style={{ backgroundColor: '#2563eb' }}>
<div className="bg-blue-600">
```

**Fix:**
```tsx
// Correct
<div className="bg-primary">
<div style={{ backgroundColor: 'var(--color-primary)' }}>
```

### ❌ Mistake 2: Arbitrary Spacing

```tsx
// Wrong
<div className="mt-[14px]">
<div style={{ marginTop: '14px' }}>
```

**Fix:**
```tsx
// Correct (use nearest token)
<div className="mt-sm">    {/* 8px, close to 14px */}
<div style={{ marginTop: 'var(--spacing-md)' }}>
```

### ❌ Mistake 3: Hardcoded Font Size

```tsx
// Wrong
<h1 className="text-[36px]">
<h1 style={{ fontSize: '36px' }}>
```

**Fix:**
```tsx
// Correct
<h1 className="text-4xl">
<h1 style={{ fontSize: 'var(--text-4xl)' }}>
```

### ❌ Mistake 4: Animation Without Variable

```tsx
// Wrong
<motion.div transition={{ duration: 0.3 }}>

// Wrong (seconds vs ms confusion)
<motion.div transition={{ duration: 300 }}>  {/* 300 seconds?! */}
```

**Fix:**
```tsx
// Correct (use CSS variable)
<motion.div transition={{
  duration: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--duration-normal'))
}}>

// Better: Use the lib/animation.ts variants directly
<motion.div variants={fadeInUp} initial="hidden" animate="visible">
```

---

## Token System Examples

### Example 1: Card Component

```typescript
export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted rounded-lg shadow-md p-md">
      {children}
    </div>
  )
}

/* Uses tokens:
   - bg-muted (color token)
   - rounded-lg (radius token)
   - shadow-md (shadow token)
   - p-md (spacing token)
*/
```

### Example 2: Button Variants

```typescript
const buttonStyles = cva(
  "px-md py-sm rounded-md font-medium transition-colors",
  {
    variants: {
      intent: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90"
      }
    }
  }
)

/* Uses tokens:
   - px-md, py-sm (spacing)
   - rounded-md (radius)
   - bg-primary, bg-secondary, bg-destructive (colors)
   - text-primary-foreground, text-secondary-foreground (colors)
*/
```

### Example 3: Typography

```typescript
export function Heading({ level, children }) {
  const sizes = {
    h1: "text-4xl font-bold leading-snug",
    h2: "text-3xl font-bold leading-snug",
    h3: "text-2xl font-semibold leading-snug",
    h4: "text-xl font-semibold leading-normal"
  }
  
  const Tag = `h${level}`
  return <Tag className={sizes[`h${level}`]}>{children}</Tag>
}

/* Uses tokens:
   - text-4xl, text-3xl, text-2xl, text-xl (typography)
   - font-bold, font-semibold (typography)
   - leading-snug, leading-normal (typography)
*/
```

---

## Dark Mode Token Testing

### Testing Steps

1. **Open Storybook**
   ```bash
   npm run storybook
   ```

2. **Locate theme switcher** (top-right corner)

3. **Switch to dark mode**
   - Check colors are readable
   - Check contrast is WCAG AA (4.5:1 minimum)
   - Check no images are broken
   - Check no hardcoded colors show (they don't change)

4. **Verify specific colors:**
   - Text is light on dark background
   - Buttons have proper contrast
   - Borders are visible
   - Shadows are subtle but visible

### Automated Dark Mode Checking

```bash
# Color contrast checker (in Storybook)
# See: src/components/Button/Button.stories.tsx
# Look for: WithDarkMode story
```

---

## Further Reading

- **Token System Overview:** `token-system.md`
- **Component Decisions:** `component-guide.md`
- **Token Audit Prompt:** `design-system-shadcn-tailwind/docs/token-audit-prompt.md`
- **Animation System:** `animation-system-complete.md` (proposed)
- **Dark Mode Guide:** `dark-mode-guide.md` (proposed)
