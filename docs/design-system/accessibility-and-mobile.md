<!-- type: standards -->

# Accessibility and Mobile Standards

## Core Principle

**WCAG AA accessibility is not optional.** It's a requirement for every component, every page, every project built with this design system.

This document outlines accessibility requirements and mobile-first design standards.

---

## WCAG AA Standards

### What is WCAG AA?

**WCAG** = Web Content Accessibility Guidelines (managed by W3C)
**AA** = Level AA (intermediate accessibility standard)

WCAG AA covers four principles:

1. **Perceivable** — Users can see/hear content
2. **Operable** — Users can navigate with keyboard
3. **Understandable** — Content is clear and predictable
4. **Robust** — Works with assistive technologies

### Why WCAG AA?

- ✅ Legal requirement in many countries
- ✅ Ethical responsibility (accessibility = inclusion)
- ✅ Better UX for everyone (not just disabled users)
- ✅ Better SEO (keyboard navigation helps search engines)
- ✅ More resilient design (works everywhere)

---

## Color Contrast Requirements

**Minimum ratio: 4.5:1 for normal text, 3:1 for large text**

### Understanding Contrast Ratios

```
Contrast = (L1 + 0.05) / (L2 + 0.05)

Where L = relative luminance of the lighter color

Example:
White (#FFFFFF) on Blue (#2563eb) = 8.59:1 ✅ PASS
Gray (#6B7280) on White = 4.54:1 ✅ PASS (barely)
Gray (#9CA3AF) on White = 2.3:1 ❌ FAIL (too light)
```

### Contrast Testing Tools

1. **WebAIM Contrast Checker** — https://webaim.org/resources/contrastchecker/
   - Paste foreground and background hex colors
   - Check WCAG AA (4.5:1) and AAA (7:1)

2. **Storybook Accessibility Addon**
   ```bash
   npm run storybook
   # Look for "Accessibility" panel (bottom)
   # Checks contrast automatically
   ```

3. **Axe DevTools** (Browser extension)
   - Scans page for violations
   - Reports which elements fail

### Light Mode Contrast

```
✅ PASS: Black (#111827) on White (#FFFFFF) = 21:1
✅ PASS: Blue (#2563eb) on White = 8.59:1
✅ PASS: Gray (#4B5563) on White = 7.3:1
❌ FAIL: Light gray (#D1D5DB) on White = 1.8:1
```

### Dark Mode Contrast

```
✅ PASS: White (#F1F5F9) on Dark Blue (#0f172a) = 18.7:1
✅ PASS: Light Blue (#3b82f6) on Dark Blue = 5.2:1
✅ PASS: Light Gray (#CBD5E1) on Dark Blue = 6.5:1
❌ FAIL: Dark Gray (#6B7280) on Dark Blue = 1.2:1
```

### Common Contrast Failures

| Foreground | Background | Ratio | Status |
|-----------|-----------|-------|--------|
| Gray (#9CA3AF) | White | 2.3:1 | ❌ FAIL |
| Dark Gray (#4B5563) | Dark Blue (#0f172a) | 1.8:1 | ❌ FAIL |
| Light Gray (#D1D5DB) on light bg | White | 1.8:1 | ❌ FAIL |
| Black (#111827) | Dark (#0f172a) | 1.3:1 | ❌ FAIL |

**Fix:** Use tokens that ensure contrast (see `token-system-complete.md`)

---

## Keyboard Navigation

**Every interactive element must be keyboard-accessible.**

### Required Keyboard Support

| Key | Action | Use Case |
|-----|--------|----------|
| **Tab** | Move focus forward | Navigate between buttons, inputs, links |
| **Shift+Tab** | Move focus backward | Navigate in reverse order |
| **Enter** | Activate button | Click a button, submit form |
| **Space** | Activate button/checkbox | Check checkbox, toggle switch |
| **Escape** | Close dialog/menu | Exit modal, collapse dropdown |
| **Arrow keys** | Navigate within component | List items, menu items, tabs |

### Testing Keyboard Navigation

```bash
# Manual test (no tools needed)
1. Open page
2. Press Tab repeatedly
3. Verify:
   - Every button/link/input is reachable
   - Focus ring is visible
   - Focus order makes sense (left-to-right, top-to-bottom)
   - No invisible focused elements
4. Test escape key (close dialogs)
5. Test arrow keys (navigate lists/menus/tabs)
```

### Example: Dialog Component

```typescript
export function Dialog() {
  const closeDialog = () => setOpen(false)

  return (
    <dialog open onKeyDown={(e) => {
      if (e.key === "Escape") closeDialog()  // ✅ Escape closes
    }}>
      <button onClick={closeDialog}>Close</button>
      <input placeholder="Type something" />
      <button onClick={handleSubmit}>Submit</button>
      {/* Tab order: Close → Input → Submit → (repeat) */}
    </dialog>
  )
}
```

### Focus Indicators

**Visual focus indicators MUST be visible and high-contrast.**

✅ **Good:**
```css
button:focus {
  outline: 2px solid var(--color-primary);  /* Visible ring */
  outline-offset: 2px;                      /* Space from button */
}
```

❌ **Bad:**
```css
button:focus {
  outline: none;  /* Removes focus indicator entirely */
}

/* Never do this */
button:focus {
  box-shadow: none;  /* Hides focus from shadow alone */
}
```

---

## Screen Reader Support

**Content must be readable by assistive technologies (NVDA, JAWS, VoiceOver).**

### Semantic HTML

Use correct HTML elements:

```html
<!-- ✅ Correct: button element -->
<button onClick={handleClick}>Click me</button>

<!-- ❌ Wrong: div acting as button -->
<div onClick={handleClick} className="bg-blue">Click me</div>

<!-- ✅ Correct: navigation landmark -->
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<!-- ❌ Wrong: div instead of nav -->
<div className="navbar">
  <a href="/">Home</a>
</div>
```

### ARIA Labels

When semantic HTML isn't enough, use ARIA:

```html
<!-- ✅ Label input with <label> -->
<label htmlFor="email">Email</label>
<input id="email" type="email" />

<!-- ✅ Describe icon button with aria-label -->
<button aria-label="Close menu">
  <CloseIcon />
</button>

<!-- ✅ Mark live regions that update -->
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

<!-- ❌ Don't use titles alone -->
<button title="Close">X</button>  <!-- Screen readers ignore title -->

<!-- ❌ Redundant labels -->
<button aria-label="Close menu">Close menu</button>
<!-- aria-label hides the text, screen reader reads only once -->
```

### Alt Text for Images

```html
<!-- ✅ Descriptive alt text -->
<img src="chart.png" alt="Sales by quarter, Q1: 100, Q2: 120, Q3: 95" />

<!-- ✅ Decorative image (empty alt) -->
<img src="decoration.png" alt="" />

<!-- ❌ No alt text -->
<img src="chart.png" />

<!-- ❌ Redundant alt text -->
<img src="chart.png" alt="Chart" />  <!-- Too vague -->
```

---

## Mobile-First Design

**Design for 320px width first. Expand to larger screens as needed.**

### Viewport Sizes to Test

| Device | Width | Height | Use |
|--------|-------|--------|-----|
| Mobile (small) | 320px | 568px | iPhone SE |
| Mobile (standard) | 375px | 667px | iPhone 12 |
| Mobile (large) | 430px | 932px | iPhone 14 Pro Max |
| Tablet | 768px | 1024px | iPad |
| Desktop | 1280px+ | 720px+ | Laptop |

### Mobile-First CSS

```css
/* Start small, add complexity for larger screens */

/* Mobile (320px) - default styles */
.component {
  width: 100%;
  font-size: 16px;
  padding: 1rem;
}

/* Tablet (768px) and up */
@media (min-width: 768px) {
  .component {
    width: 50%;
    font-size: 18px;
    padding: 2rem;
  }
}

/* Desktop (1280px) and up */
@media (min-width: 1280px) {
  .component {
    width: 33%;
    font-size: 20px;
  }
}
```

### Touch Targets

**Minimum 44px × 44px (Apple), 48px × 48px (Google)**

```tsx
/* ✅ Adequate touch targets */
<button className="p-md w-12 h-12">  {/* 16px + 16px = 48px */}
  Click
</button>

/* ❌ Too small */
<button className="p-xs w-6 h-6">  {/* 8px + 8px = 24px - too small */}
  X
</button>
```

### Responsive Typography

```html
<!-- ✅ Readable on all sizes -->
<h1 className="text-3xl md:text-4xl lg:text-5xl">
  Responsive heading
</h1>

<!-- ❌ Too small on mobile -->
<h1 className="text-5xl">  {/* 48px on mobile? Unreadable */}
  Heading
</h1>
```

### No Horizontal Scrolling

Avoid requiring users to scroll horizontally (except tables with indicators).

```tsx
/* ✅ Responsive, no horizontal scroll */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
  {/* Items wrap naturally */}
</div>

/* ❌ Forces horizontal scroll */
<div className="grid grid-cols-5 gap-md w-full">
  {/* 5 columns on 375px screen = horizontal scroll */}
</div>
```

---

## Form Accessibility

### Labels and Inputs

```tsx
/* ✅ Proper label association */
<label htmlFor="email">Email address</label>
<input id="email" type="email" placeholder="you@example.com" />

/* ❌ No label */
<input placeholder="Email" />

/* ❌ Label not associated */
<label>Email</label>
<input />
```

### Error Messages

```tsx
/* ✅ Clear error message */
<label htmlFor="email">Email</label>
<input
  id="email"
  aria-describedby="email-error"
  type="email"
  value={email}
/>
<span id="email-error" role="alert">
  {errors.email}  {/* Screen readers announce errors */}
</span>

/* ❌ Unclear error */
<input type="email" />
<span style={{ color: 'red' }}>Error</span>  {/* Screen reader can't see it */}
```

### Required Fields

```tsx
/* ✅ Mark required clearly */
<label htmlFor="name">
  Full name <span aria-label="required">*</span>
</label>
<input
  id="name"
  required
  aria-required="true"
  type="text"
/>

/* ❌ Only visual indicator */
<label>Full name <span style={{ color: 'red' }}>*</span></label>
<input type="text" />  {/* Screen reader doesn't know it's required */}
```

---

## Testing Accessibility

### Manual Testing Checklist

- [ ] **Color contrast** — 4.5:1 minimum (light and dark modes)
- [ ] **Keyboard navigation** — Tab through all interactive elements
- [ ] **Focus indicators** — Visible on every focused element
- [ ] **Focus order** — Logical top-to-bottom, left-to-right
- [ ] **Escape key** — Closes dialogs and menus
- [ ] **Arrow keys** — Navigate lists, menus, tabs
- [ ] **Touch targets** — 44-48px minimum
- [ ] **Mobile layout** — No horizontal scrolling, readable text
- [ ] **Form labels** — Every input has associated label
- [ ] **Error messages** — Clear and accessible
- [ ] **Alt text** — All images have descriptive alt
- [ ] **Semantic HTML** — Correct elements (button, nav, etc.)
- [ ] **Dark mode** — Works and is readable

### Automated Testing Tools

**Storybook Accessibility Addon:**
```bash
npm run storybook
# Click "Accessibility" panel
# Checks contrast, labels, ARIA
```

**Axe DevTools (Browser Extension):**
```
1. Install from Chrome Web Store
2. Open DevTools
3. Click "Axe DevTools"
4. Click "Scan ALL of my page"
5. Review violations
```

**Lighthouse (Built-in):**
```bash
1. Open DevTools (F12)
2. Click "Lighthouse"
3. Select "Accessibility"
4. Click "Analyze page load"
5. Review issues
```

### Screen Reader Testing

**VoiceOver (Mac/iOS):**
```
Cmd + F5  # Toggle VoiceOver on/off
```

**NVDA (Windows, free):**
```
Download: https://www.nvaccess.org/
Install and test with common browsers
```

**JAWS (Windows, commercial):**
```
Industry standard for Windows
Many organizations provide licenses
```

**Testing process:**
1. Turn on screen reader
2. Navigate page with keyboard only
3. Verify content is announced in logical order
4. Check form labels are read before inputs
5. Verify error messages are announced
6. Confirm interactive elements are labeled

---

## Dark Mode Accessibility

**Dark mode must maintain WCAG AA contrast.**

### Dark Mode Contrast Check

```
✅ PASS: White text on dark background
   Contrast: 18.7:1

✅ PASS: Light blue on dark background
   Contrast: 5.2:1

❌ FAIL: Dark text on dark background
   Contrast: 1.2:1 (unreadable)

❌ FAIL: Gray text on dark background
   Contrast: 2.1:1 (too low)
```

**Test in Storybook:**
```bash
npm run storybook
# Open component
# Click theme switcher (top right)
# Check "Accessibility" panel
# Verify contrast passes in both modes
```

---

## What "Done" Means

A component/page is accessible when:

- ✅ WCAG AA contrast (4.5:1, both light and dark mode)
- ✅ Keyboard navigable (Tab through all interactive)
- ✅ Focus visible (clear focus indicators)
- ✅ Screen reader compatible (semantic HTML, labels, ARIA)
- ✅ Touch-friendly (44-48px targets)
- ✅ Mobile responsive (no horizontal scroll, readable text)
- ✅ Form accessible (labels, error messages, required states)
- ✅ Tested (Axe, Lighthouse, manual keyboard/screen reader)

**Before shipping, verify ALL of the above.**

---

## Common Accessibility Mistakes

### ❌ Mistake 1: Removing Focus Indicators

```css
/* NEVER do this */
button:focus {
  outline: none;
}
```

**Fix:**
```css
button:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

---

### ❌ Mistake 2: Color-Only Information

```html
<!-- ❌ Users with color blindness can't see error -->
<input className="border-red-600" />

<!-- ✅ Add text/icon -->
<input className="border-destructive" />
<span className="text-destructive">Required field</span>
```

---

### ❌ Mistake 3: No Alt Text for Images

```html
<!-- ❌ Screen reader reads filename -->
<img src="chart-q1-2026.png" />

<!-- ✅ Descriptive alt text -->
<img src="chart-q1-2026.png" alt="Q1 2026 revenue: $100k" />
```

---

### ❌ Mistake 4: Insufficient Touch Targets

```tsx
/* ❌ 24px × 24px button */
<button className="w-6 h-6">X</button>

/* ✅ 44px × 44px button */
<button className="w-11 h-11">X</button>
```

---

### ❌ Mistake 5: Unreadable Small Text on Mobile

```tsx
/* ❌ 12px on mobile (unreadable) */
<p className="text-xs">Small text</p>

/* ✅ 16px on mobile, smaller on desktop if needed */
<p className="text-base md:text-sm">Text</p>
```

---

## Accessibility Resources

- **WebAIM** — https://webaim.org/
- **WCAG 2.1 Specification** — https://www.w3.org/WAI/WCAG21/quickref/
- **MDN Accessibility** — https://developer.mozilla.org/en-US/docs/Web/Accessibility
- **Axe DevTools** — https://www.deque.com/axe/devtools/
- **ARIA Authoring Practices** — https://www.w3.org/WAI/ARIA/apg/

---

## Further Reading

- **Token System:** `token-system-complete.md` (color tokens, contrast)
- **Dark Mode Guide:** `dark-mode-guide.md` (dark mode contrast)
- **Component Conventions:** `design-system-shadcn-tailwind/docs/component-conventions.md`
- **Testing Strategy:** `testing-strategy.md`
- **Frankenstein Guardrails:** `frankenstein-guardrails.md` (accessibility requirements)
