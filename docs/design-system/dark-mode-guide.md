<!-- type: guide -->

# Dark Mode Implementation Guide

## Overview

Dark mode in this design system uses **semantic token overrides** rather than CSS class toggles. When a user enables dark mode, CSS variables automatically adjust, and all components using tokens adapt instantly.

**How it works:**
```css
/* Light mode (default) */
:root {
  --color-primary: #2563eb;
  --color-text: #111827;
}

/* Dark mode (with [data-theme="dark-default"]) */
[data-theme="dark-default"] {
  --color-primary: #3b82f6;   /* lighter version */
  --color-text: #f1f5f9;      /* light text */
}
```

Add `[data-theme="dark-default"]` to any element, and all descendants use dark-mode colors automatically.

---

## Why [data-theme] Instead of .dark Class

The design system **intentionally uses `[data-theme="dark-default"]`** instead of the `.dark` class pattern. Here's why:

### Problem with .dark Class

```html
<!-- Tailwind's .dark pattern -->
<html class="dark">
  <body class="bg-white dark:bg-black">
```

**Issues:**
- ❌ Class toggles affect DOM (Storybook, Next.js RSC have issues)
- ❌ Hydration mismatches (server renders one, client renders another)
- ❌ Hard to sync with system preferences
- ❌ CSS specificity complexity (which selector wins?)

### Solution: data-theme Attribute

```html
<!-- Our approach -->
<html data-theme="dark-default">
  <body style="background-color: var(--color-bg)">
```

**Benefits:**
- ✅ Data attributes don't affect CSS specificity
- ✅ No hydration issues (attribute updates = CSS updates)
- ✅ Works in Storybook (themes toggle without page reload)
- ✅ Works with Next.js Server Components (RSC render unaffected)
- ✅ Easy to implement (single attribute change)
- ✅ Sync with system preference is straightforward

---

## How Dark Mode Works in Practice

### Light Mode (Default)

```html
<!-- No attribute needed -->
<div style="background-color: var(--color-bg);">
  {/* --color-bg = #ffffff (light) */}
</div>
```

### Dark Mode (Active)

```html
<!-- Add data-theme attribute to any element -->
<div data-theme="dark-default" style="background-color: var(--color-bg);">
  {/* --color-bg = #0f172a (dark) */}
</div>
```

**All descendants automatically use dark colors.**

### At Root Level (Entire App)

```tsx
// In your layout or app shell
export default function RootLayout({ children }) {
  const [isDark, setIsDark] = useState(false)

  return (
    <html data-theme={isDark ? "dark-default" : undefined}>
      <body>
        {children}
        
        {/* Theme toggle button */}
        <button onClick={() => setIsDark(!isDark)}>
          {isDark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </body>
    </html>
  )
}
```

### At Component Level

```tsx
// Dark mode for just this section
export function DarkSection({ children }) {
  return (
    <section data-theme="dark-default" className="p-lg rounded-lg bg-muted">
      {children}
    </section>
  )
}
```

---

## CSS Variable Overrides

### In tokens.css

```css
/* Light mode (default) */
:root {
  --color-primary: #2563eb;
  --color-primary-foreground: #ffffff;
  --color-bg: #ffffff;
  --color-text: #111827;
  --color-text-muted: #6b7280;
  --color-border: #e5e7eb;
  --color-error: #dc2626;
  --color-success: #16a34a;
  --color-warning: #ea580c;
}

/* Dark mode overrides */
[data-theme="dark-default"] {
  --color-primary: #3b82f6;
  --color-primary-foreground: #000000;
  --color-bg: #0f172a;
  --color-text: #f1f5f9;
  --color-text-muted: #cbd5e1;
  --color-border: #334155;
  --color-error: #ef4444;
  --color-success: #22c55e;
  --color-warning: #fb923c;
}
```

### What Gets Overridden

**Colors that change in dark mode:**
- ✅ Backgrounds (lighter → darker)
- ✅ Text (darker → lighter)
- ✅ Borders (gray → lighter gray)
- ✅ Accent colors (adjust for visibility)

**Colors that DON'T change (usually):**
- ⚠️ Logos and branding (maintain identity)
- ⚠️ User-uploaded images (show as-is)
- ⚠️ Charts with branded colors (maintain consistency)

---

## Testing Dark Mode

### In Storybook

```bash
npm run storybook
# Opens http://localhost:6006/
```

**To test dark mode:**
1. Look for theme switcher in top-right corner
2. Click to toggle between light and dark
3. Watch component update in real-time
4. Check contrast (WCAG AA: 4.5:1 minimum)

### Testing Checklist

- [ ] **Text readability** — Can you read all text?
- [ ] **Contrast** — Text color vs background (4.5:1 minimum)
- [ ] **Buttons** — Are they still clickable and visible?
- [ ] **Images** — Do they look good on dark background?
- [ ] **Icons** — Are icon colors visible?
- [ ] **Borders** — Can you see all border lines?
- [ ] **Shadows** — Are shadows still visible (or too dark)?
- [ ] **Animations** — Do animations still look good?

### Browser Testing

You can manually test dark mode in browser dev tools:

```javascript
// In console, toggle dark mode on any element
document.documentElement.setAttribute('data-theme', 'dark-default')

// Turn it off
document.documentElement.removeAttribute('data-theme')
```

### Automated Testing

Create a story variant for dark mode:

```typescript
// Component.stories.tsx
export default {
  title: "Category/Component",
  component: Component
}

export const Default = () => <Component />

export const WithDarkMode = () => (
  <div data-theme="dark-default" className="p-lg bg-muted rounded-lg">
    <Component />
  </div>
)
```

---

## WCAG AA Contrast Requirements

Dark mode must maintain accessibility. **Minimum contrast ratio: 4.5:1**

### Contrast Testing Tools

1. **WebAIM Contrast Checker** — https://webaim.org/resources/contrastchecker/
   - Paste foreground and background colors
   - Check both WCAG AA (4.5:1) and AAA (7:1)

2. **Storybook Accessibility Addon**
   ```bash
   npm run storybook
   # Look for "Accessibility" tab in Storybook panel
   ```

3. **Axe DevTools Browser Extension**
   - Scans page for contrast violations
   - Reports which elements fail WCAG AA

### Common Dark Mode Contrast Issues

#### ❌ Issue: Text Too Dark

```css
/* Problem: dark gray on dark background */
--color-text: #374151;      /* gray-600 */
--color-bg: #0f172a;        /* very dark blue */
/* Result: 2:1 contrast (FAILS) */

/* Solution: use lighter text */
--color-text: #f1f5f9;      /* slate-100 */
/* Result: 5.2:1 contrast (PASSES) */
```

#### ❌ Issue: Borders Invisible

```css
/* Problem: border same color as background */
--color-border: #0f172a;    /* same as bg */
--color-bg: #0f172a;

/* Solution: use lighter border */
--color-border: #334155;    /* slate-700 */
/* Result: visible contrast */
```

#### ❌ Issue: Icons Disappear

```tsx
/* Problem: icon color hardcoded to dark gray */
<Icon color="#6b7280" />     /* ❌ Invisible on dark bg */

/* Solution: use semantic color token */
<Icon className="text-foreground" />  /* ✅ Adapts to theme */
```

---

## Component-Specific Dark Mode Handling

### Images and Assets

**Problem:** Dark mode CSS variables only affect CSS. Images and assets are static.

**Solution 1: Use CSS filter (simple)**
```tsx
export function Image({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        filter: 'var(--image-filter)'  // defined per theme
      }}
    />
  )
}
```

**In tokens.css:**
```css
:root {
  --image-filter: brightness(1);       /* light mode: no change */
}

[data-theme="dark-default"] {
  --image-filter: brightness(0.85);    /* dark mode: slightly darker */
}
```

**Solution 2: Source-specific images (better)**
```tsx
export function Image({ srcLight, srcDark, alt }) {
  const isDark = useTheme().isDark  // from context

  return (
    <img
      src={isDark ? srcDark : srcLight}
      alt={alt}
    />
  )
}
```

### Charts and Data Visualization

**Problem:** Recharts charts use CSS variables for colors.

**Solution:** Ensure all chart colors use tokens:

```typescript
import { LineChart, Line, CartesianGrid, XAxis } from "recharts"

export function Chart({ data }) {
  return (
    <LineChart data={data}>
      <CartesianGrid stroke="var(--color-border)" />
      <XAxis stroke="var(--color-text-muted)" />
      <Line stroke="var(--color-primary)" />
    </LineChart>
  )
}
```

### Logos and Branding

**Problem:** Logo is often white or branded color, doesn't adapt to dark mode.

**Solution 1: Logo adapts (best)**
```tsx
export function Logo() {
  return (
    <svg className="fill-foreground">
      {/* Uses semantic color class */}
    </svg>
  )
}
```

**Solution 2: Different logos per theme**
```tsx
export function Logo() {
  const isDark = useTheme().isDark

  return (
    <img
      src={isDark ? "/logo-dark.svg" : "/logo-light.svg"}
      alt="Logo"
    />
  )
}
```

**Solution 3: SVG with CSS properties**
```tsx
<svg className="logo">
  <circle fill="var(--color-primary)" />
</svg>

<style>
  .logo { --color-primary: #2563eb; }
  [data-theme="dark-default"] .logo { --color-primary: #3b82f6; }
</style>
```

---

## Dark Mode in Storybook

### Theme Switcher Setup

Storybook's theme switcher is in `.storybook/preview.tsx`:

```typescript
import { DARK_MODE_CLASS_NAME } from "@storybook/addon-styling"

export const decorators = [
  (Story) => (
    <div data-theme={isDarkMode ? "dark-default" : undefined}>
      <Story />
    </div>
  )
]
```

### Testing Dark Mode Stories

```typescript
// Button.stories.tsx
export const Default = () => <Button>Click me</Button>

export const WithDarkMode = () => (
  <div
    data-theme="dark-default"
    className="p-lg bg-muted rounded-lg"
  >
    <Button>Click me</Button>
  </div>
)

export const BothModes = () => (
  <div className="grid grid-cols-2 gap-lg p-lg">
    {/* Light mode */}
    <div>
      <h3>Light</h3>
      <Button>Click me</Button>
    </div>

    {/* Dark mode */}
    <div data-theme="dark-default" className="bg-muted p-lg rounded-lg">
      <h3>Dark</h3>
      <Button>Click me</Button>
    </div>
  </div>
)
```

### Storybook Accessibility Testing

Storybook has a built-in a11y addon that checks contrast:

1. Open Storybook
2. Click "Accessibility" tab (bottom panel)
3. Check "Violations" section
4. It will flag contrast failures

---

## Dark Mode in Next.js

### App Router Setup

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDark, setIsDark] = useState(false)

  return (
    <html data-theme={isDark ? "dark-default" : undefined}>
      <body>
        <ThemeProvider isDark={isDark} setIsDark={setIsDark}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Syncing with System Preference

```tsx
// hooks/useSystemTheme.ts
export function useSystemTheme() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setIsDark(mediaQuery.matches)

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches)
    mediaQuery.addEventListener("change", handler)

    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  return isDark
}

// Use in layout
const isDark = useSystemTheme()
// OR override with user preference
const isDark = userPreference ?? useSystemTheme()
```

### Persistent Theme Selection

Store user's preference in localStorage:

```tsx
// hooks/useTheme.ts
export function useTheme() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check localStorage first
    const saved = localStorage.getItem("theme")
    if (saved) {
      setIsDark(saved === "dark")
    } else {
      // Fall back to system preference
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDark(systemDark)
    }
  }, [])

  const toggleTheme = (newValue: boolean) => {
    setIsDark(newValue)
    localStorage.setItem("theme", newValue ? "dark" : "light")
  }

  return { isDark, toggleTheme }
}
```

---

## Common Dark Mode Mistakes

### ❌ Mistake 1: Hardcoding Colors in Dark Mode

```tsx
// Wrong
export function Card() {
  return (
    <div
      style={{
        backgroundColor: '#0f172a',  // ❌ hardcoded dark color
        color: '#f1f5f9'              // ❌ hardcoded light text
      }}
    >
      Content
    </div>
  )
}
```

**Fix:**
```tsx
export function Card() {
  return (
    <div className="bg-muted text-foreground">
      {/* Tokens handle light/dark automatically */}
    </div>
  )
}
```

### ❌ Mistake 2: Conditional Rendering Based on Theme

```tsx
// Wrong
export function Component() {
  const isDark = useTheme().isDark

  if (isDark) {
    return <DarkVersion />  // ❌ component duplication
  } else {
    return <LightVersion /> // ❌ maintenance nightmare
  }
}
```

**Fix:**
```tsx
export function Component() {
  return (
    <div className="bg-muted text-foreground">
      {/* Single component, tokens handle both themes */}
    </div>
  )
}
```

### ❌ Mistake 3: Forgetting to Test Dark Mode

```tsx
// Incomplete Storybook story
export const MyComponent = () => <Component />

// ❌ Missing dark mode variant
// Users won't see it in dark mode until production!
```

**Fix:**
```tsx
export const MyComponent = () => <Component />

export const MyComponentDark = () => (
  <div data-theme="dark-default" className="bg-muted p-lg rounded">
    <Component />
  </div>
)
```

### ❌ Mistake 4: Poor Contrast in Dark Mode

```tsx
// Wrong: text color too dark
<div className="text-gray-600">  // ❌ Only 3:1 contrast on dark bg
  Important message
</div>

// Wrong: border invisible
<div className="border-slate-900">  // ❌ Same color as dark bg
  Card content
</div>
```

**Fix:**
```tsx
// Use semantic colors
<div className="text-foreground">  // ✅ Automatic contrast
  Important message
</div>

<div className="border-border">  // ✅ Visible in both modes
  Card content
</div>
```

---

## Dark Mode Testing Checklist

Before shipping a component, verify dark mode:

- [ ] **Text readability** — All text legible (light on dark)
- [ ] **Contrast** — WCAG AA minimum (4.5:1)
- [ ] **Buttons** — Visible and clickable
- [ ] **Inputs** — Focus states visible
- [ ] **Icons** — All icons visible
- [ ] **Borders** — All borders visible (not same as background)
- [ ] **Shadows** — Shadows visible (or removed if not needed)
- [ ] **Images** — User images look good
- [ ] **Logos** — Branding maintained
- [ ] **Charts** — Data visible and readable
- [ ] **Storybook** — Story includes WithDarkMode variant
- [ ] **Token audit** — No hardcoded colors
- [ ] **Accessibility** — No contrast violations (Axe DevTools)

---

## Further Reading

- **Token System:** `token-system-complete.md`
- **Semantic Colors:** `token-system-complete.md#semantic-color-tokens`
- **Accessibility:** `accessibility-and-mobile.md`
- **Storybook Stories:** `testing-strategy.md`
- **Component Conventions:** `design-system-shadcn-tailwind/docs/component-conventions.md`
