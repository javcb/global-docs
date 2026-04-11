<!-- type: guardrails -->

# Frankenstein Guardrails — Design System Decay Prevention

## What is "Design System Decay"?

**Design system decay** happens when a system gradually loses consistency, quality, and maintainability. Components start looking and behaving differently. The system becomes a "Frankenstein" — stitched together from incompatible parts.

**Signs of decay:**
- ❌ Hardcoded colors (`#2563eb` instead of `bg-primary`)
- ❌ Inconsistent spacing (some components use tokens, others don't)
- ❌ Missing focus indicators (buttons hard to tab to)
- ❌ Animations ignore prefers-reduced-motion (accessibility broken)
- ❌ Components without Storybook stories (undocumented)
- ❌ TypeScript any-types (type safety lost)
- ❌ Inconsistent naming (Button vs Btn vs CustomButton)
- ❌ Duplicate patterns (same button built 5 different ways)
- ❌ Performance degradation (unrequired animations, large bundles)

**Root cause:** No guardrails. Developers make reasonable decisions locally, but collectively they break the system.

**Solution:** Explicit rules that prevent drift. Not restrictions, but guardrails.

---

## The Seven Frankenstein Prevention Rules

### Rule 1: No Hardcoded Colors

**❌ Forbidden:**
```tsx
// Hardcoded hex
<div style={{ color: '#2563eb', backgroundColor: '#ffffff' }}>

// Concrete Tailwind classes
<div className="bg-blue-600 text-gray-900">

// RGB values
<div style={{ backgroundColor: 'rgb(37, 99, 235)' }}>
```

**✅ Required:**
```tsx
// Semantic Tailwind classes
<div className="bg-primary text-foreground">

// CSS variables (inline styles)
<div style={{ 
  color: 'var(--color-primary)',
  backgroundColor: 'var(--color-bg)'
}}>

// Token-based classes
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
```

**Why:** One color token changes everywhere. Hardcoded colors don't.

**Enforcement:**
- ✅ Code review catches this
- ✅ Token audit prompt catches this
- ✅ Storybook visual inspection catches this
- ❌ No automated linting yet (manual review)

**What to do if found:**
1. Find all hardcoded colors in file
2. Match to token (see `token-system-complete.md`)
3. Replace with token class or variable
4. Run token-audit-prompt.md to verify
5. Commit with message: "refactor: remove hardcoded colors from [file]"

---

### Rule 2: No Hardcoded Spacing

**❌ Forbidden:**
```tsx
// Arbitrary spacing values
<div className="mt-[14px] mb-[24px] px-[16px]">

// Inline hardcoded spacing
<div style={{ margin: '14px', padding: '16px' }}>

// Concrete Tailwind spacing
<div className="mt-4 mb-6 px-4">
```

**✅ Required:**
```tsx
// Token-based spacing classes
<div className="mt-sm mb-md px-md">

// CSS variables
<div style={{ 
  marginTop: 'var(--spacing-sm)',
  marginBottom: 'var(--spacing-md)',
  paddingX: 'var(--spacing-md)'
}}>
```

**Spacing scale (use only these):**
```
xs (4px), sm (8px), md (16px), lg (24px), xl (32px),
2xl (48px), 3xl (64px), 4xl (96px)
```

**Why:** Consistent rhythm. All components breathe the same.

**What to do if found:**
1. Find all hardcoded spacing
2. Find nearest token value (see `token-system-complete.md`)
3. Replace with token
4. Commit: "refactor: use spacing tokens in [file]"

---

### Rule 3: No Hardcoded Border Radius

**❌ Forbidden:**
```tsx
<div className="rounded-[6px]">
<button style={{ borderRadius: '4px' }}>
<div className="rounded-lg">  {/* Concrete Tailwind */}
```

**✅ Required:**
```tsx
<div className="rounded-md">        {/* Token-based */}
<button style={{ borderRadius: 'var(--radius-md)' }}>
```

**Radius scale:**
```
none, sm (2px), md (6px), lg (8px), xl (12px), 2xl (16px), full (circular)
```

**Why:** Consistent roundness. Gives the system a signature look.

---

### Rule 4: forwardRef + displayName Mandatory

Every component that wraps a DOM element must use `forwardRef` and `displayName`.

**❌ Wrong:**
```typescript
export function Button({ children, ...props }) {
  return <button {...props}>{children}</button>
}
```

**✅ Correct:**
```typescript
import { forwardRef } from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", ...props }, ref) => (
    <button
      ref={ref}
      className={buttonStyles({ variant })}
      {...props}
    />
  )
)

Button.displayName = "Button"
```

**Why:**
- Enables ref forwarding (required for some use cases)
- Improves debugging (console shows "Button" not "Anonymous")
- Better component composition
- DevTools inspection works correctly

**Enforcement:**
- ✅ TypeScript strict mode catches missing types
- ✅ Code review catches this
- ✅ Storybook will fail if displayName missing

---

### Rule 5: CVA for Variants (Type-Safe Props)

All component variants must use class-variance-authority (CVA).

**❌ Wrong (inline conditions):**
```typescript
export function Button({ variant, ...props }) {
  const className = variant === "primary"
    ? "bg-primary text-primary-foreground"
    : variant === "secondary"
    ? "bg-secondary text-secondary-foreground"
    : "bg-gray-600 text-white"  // ← What's this? Typo? Forgotten variant?

  return <button className={className} {...props} />
}
```

**✅ Correct (CVA):**
```typescript
import { cva, type VariantProps } from "class-variance-authority"

const buttonStyles = cva("px-md py-sm rounded-md transition-colors", {
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90"
      // ← TypeScript enforces all variants, prevents typos
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg"
    }
  }
})

type ButtonProps = VariantProps<typeof buttonStyles>

export const Button = forwardRef<HTMLButtonElement, ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={buttonStyles({ variant, size })}
      {...props}
    />
  )
)
```

**Why:**
- Type-safe variants (TypeScript catches invalid values)
- DRY (define styles once)
- Maintainable (update in one place)
- Consistency (all components follow same pattern)

---

### Rule 6: Token Audit Before Every Commit

Before committing ANY component code, run the token audit:

```bash
# Paste this prompt into Claude Code:
design-system-shadcn-tailwind/docs/token-audit-prompt.md
```

**What it checks:**
- ✅ No hardcoded hex colors
- ✅ No concrete Tailwind classes (bg-blue-600, etc.)
- ✅ No hardcoded spacing (mt-[14px])
- ✅ All animations use duration tokens
- ✅ forwardRef + displayName present
- ✅ No barrel imports from shadcn

**If audit fails:**
1. Fix violations (see errors in audit output)
2. Re-run audit
3. Only commit when it passes

---

### Rule 7: Storybook Story Required for All Components

Every component must have a Storybook story.

**❌ Wrong (no story):**
```
src/components/Button/
├── Button.tsx
├── Button.test.tsx
└── index.ts
// ← Missing: Button.stories.tsx
```

**✅ Correct (with story):**
```
src/components/Button/
├── Button.tsx
├── Button.test.tsx
├── Button.stories.tsx  ← Required!
└── index.ts
```

**Story must include:**
- Default story (normal state)
- Variants story (all prop combinations)
- Edge cases (empty state, loading, error)
- With dark mode (toggle dark theme)
- With reduced motion (respects prefers-reduced-motion)

**Example story:**
```typescript
// Button.stories.tsx
export default {
  title: "Inputs/Button",
  component: Button
}

export const Default = () => <Button>Click me</Button>
export const Primary = () => <Button variant="primary">Primary</Button>
export const Secondary = () => <Button variant="secondary">Secondary</Button>
export const Sizes = () => (
  <div className="flex gap-md">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
)
export const WithDarkMode = () => (
  <div data-theme="dark-default" className="bg-muted p-lg rounded-lg">
    <Button>Dark Mode</Button>
  </div>
)
```

**Why:**
- Documentation for developers
- Testing ground (spot issues before production)
- AI reference (Claude can understand components from stories)
- Visual regression (catch breaking changes)

---

## Red Flags That Signal Bad Contributions

### 🚩 Red Flag 1: Using Hardcoded Colors

```typescript
// ❌ This screams "haven't read the guidelines"
<div style={{ backgroundColor: '#2563eb' }}>
```

**Action:** Request changes before merging.

---

### 🚩 Red Flag 2: Concrete Tailwind Classes

```typescript
// ❌ bg-blue-600 is not a semantic color
<button className="bg-blue-600 text-white">
```

**Action:** Request changes.

---

### 🚩 Red Flag 3: Missing focus States

```typescript
// ❌ Button not tabbable or keyboard-navigable
<button className="bg-primary" onClick={handler}>
  {/* no focus:ring or focus:outline */}
</button>
```

**Action:** Request accessibility fix.

---

### 🚩 Red Flag 4: Animations Ignore prefers-reduced-motion

```typescript
// ❌ Animation not respecting user preference
<motion.div animate={{ x: 100 }} transition={{ duration: 0.5 }}>
  {/* Uses framer-motion but without respecting prefers-reduced-motion */}
</motion.div>
```

**Action:** Request fix using animation tokens (they handle it automatically).

---

### 🚩 Red Flag 5: Component Without Story

```typescript
// File exists but no .stories.tsx file
// ❌ Undocumented, can't test in Storybook
```

**Action:** Request story before merge.

---

### 🚩 Red Flag 6: No TypeScript Types

```typescript
// ❌ TypeScript any-type (defeated purpose of TypeScript)
export function Component(props: any) {
  return <div>{props.children}</div>
}
```

**Action:** Request proper types.

---

### 🚩 Red Flag 7: Inconsistent Naming

```typescript
// ❌ What's the difference between these?
export function Btn() { }
export function Button() { }
export function CustomButton() { }
```

**Action:** Standardize naming (see `naming-conventions.md`).

---

### 🚩 Red Flag 8: Duplicate Components

```typescript
// ❌ Same thing built twice
src/components/Button.tsx        (your version)
src/components/CustomButton.tsx  (my version)
src/components/PrimaryButton.tsx (their version)
```

**Action:** Before building, always check `component-inventory.md`.

---

## Automated Checks

### TypeScript Strict Mode

```bash
npm run typecheck
```

**What it catches:**
- Missing type annotations
- Type mismatches
- Implicit any-types
- Missing properties
- Function signature mismatches

**Must pass before merge.**

### Token Audit Prompt

```bash
# Paste into Claude Code
design-system-shadcn-tailwind/docs/token-audit-prompt.md
```

**What it catches:**
- Hardcoded colors
- Concrete Tailwind classes
- Missing forwardRef/displayName
- Hardcoded spacing
- Animation token violations

**Must pass before merge.**

### Storybook Build

```bash
npm run build-storybook
```

**What it catches:**
- Story syntax errors
- Missing components
- Import errors
- TypeScript errors in stories

**Must pass before merge.**

---

## Manual Review Checklist for PRs

Before approving a PR, check:

- [ ] **No hardcoded colors** — All use tokens (grep for #[A-F0-9])
- [ ] **No hardcoded spacing** — All use tokens (no mt-[14px])
- [ ] **No concrete Tailwind** — No bg-blue-600, text-gray-700, etc.
- [ ] **forwardRef + displayName** — DOM-wrapping components have both
- [ ] **CVA for variants** — Variants are type-safe
- [ ] **Token audit passed** — No violations
- [ ] **Storybook story exists** — Default + variants + dark mode
- [ ] **TypeScript passes** — npm run typecheck ✓
- [ ] **Accessibility** — WCAG AA contrast, keyboard nav, ARIA labels
- [ ] **Dark mode** — Story includes WithDarkMode variant
- [ ] **Naming** — Follows naming conventions
- [ ] **No duplicates** — Checked component-inventory.md first
- [ ] **Provenance** — @source header present (if applicable)
- [ ] **Documentation** — What this component does, when to use it
- [ ] **Tests** — Storybook stories count as tests (plus unit tests if complex)

---

## Common Decay Patterns and How to Prevent Them

### Pattern 1: Hardcoded Color Creep

**How it happens:** Developer shortcuts one color. Then another. Then five more.

**Prevention:**
- ✅ Token audit prompt mandatory
- ✅ Code review spots hardcoded colors
- ✅ Define colors in tokens.css, not components

### Pattern 2: Spacing Inconsistency

**How it happens:** "I need 14px, so I'll use mt-[14px]" instead of nearest token.

**Prevention:**
- ✅ Document spacing scale (xs, sm, md, lg, xl)
- ✅ Use token audit to find violations
- ✅ Code review enforces scale usage

### Pattern 3: Missing Accessibility

**How it happens:** Focus states forgotten, prefers-reduced-motion ignored.

**Prevention:**
- ✅ Storybook accessibility addon (flags contrast issues)
- ✅ Manual testing (keyboard nav, screen reader)
- ✅ Animation tokens handle prefers-reduced-motion automatically

### Pattern 4: Duplicate Components

**How it happens:** "I didn't know this existed, so I built it."

**Prevention:**
- ✅ Check component-inventory.md FIRST
- ✅ Decision tree (Level 1-4) before building
- ✅ Code review asks "did you check inventory?"

---

## Escalation Path

When should you escalate to architecture review?

✅ **Escalate when:**
- Significant new component (complex, impacts many uses)
- Controversial decision (new pattern, breaking change)
- Decay detected (hardcoded colors widespread)
- Performance regression (bundle size spike, animation jank)
- Accessibility failure (WCAG AA not met)

**Process:**
1. Document the issue (why is this a problem?)
2. Propose solution (what should we do?)
3. Tag architecture reviewer for discussion
4. Decide together
5. Document decision (add to decision-log later)

---

## The Decay Prevention Checklist

Use this checklist in every build session:

- [ ] **Read:** component-inventory.md (what exists?)
- [ ] **Decide:** Use existing or build new?
- [ ] **Check:** Any hardcoded colors? (should be none)
- [ ] **Check:** Any hardcoded spacing? (should be none)
- [ ] **Check:** Token audit passes? (required)
- [ ] **Check:** Storybook story exists? (required)
- [ ] **Check:** forwardRef + displayName? (if DOM-wrapping)
- [ ] **Check:** TypeScript passes? (npm run typecheck)
- [ ] **Check:** Dark mode variant? (required)
- [ ] **Check:** Accessibility tested? (keyboard nav, contrast)
- [ ] **Check:** No duplicates? (searched codebase)
- [ ] **Commit:** With proper message and Co-Authored-By

---

## Visual Fidelity Anti-Patterns

### 🚩 "Wireframe Mode"
**Problem:** Structure present, decorative layer absent. Page is technically correct but looks undesigned.  
**Missing:** section backgrounds, gradients, card depth, glow effects, shadows.  
**Detection:** every section has identical background color.  
**Fix:** Inventory and implement decorative layer from fidelity-mode.md § Step 4.

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
**Prevention:** Padding rule in fidelity-mode.md § Step 3 applied to every section.  
**Fix:** Add padding-inline to all section containers.

---

## Visual Completeness Checklist

**Before marking any recreation complete, verify:**

- [ ] Page has source-matched color palette (not DS defaults)
- [ ] Fonts match source family and weights
- [ ] Every section has explicit horizontal padding — nothing bleeds
- [ ] Section backgrounds are varied (not all identical bg-background)
- [ ] Hero section has depth treatment (gradient, glow, or visual element)
- [ ] Cards have appropriate shadow/border/depth
- [ ] Magic components used for all animated elements (not rebuilt)
- [ ] Responsive check at 375px, 768px, 1280px complete
- [ ] No empty content regions where source has visual content
- [ ] Fidelity scores backed by screenshot evidence

---

## Further Reading

- **Fidelity Mode:** `../../docs/fidelity-mode.md`
- **Token System:** `token-system-complete.md`
- **Component Conventions:** `design-system-shadcn-tailwind/docs/component-conventions.md`
- **Accessibility:** `accessibility-and-mobile.md`
- **Testing Strategy:** `testing-strategy.md`
- **Git Standards:** `git-and-commit-standards.md`
