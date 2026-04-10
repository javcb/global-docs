<!-- type: reference -->

# Technology Stack and Design Decisions

## Overview

This document explains every technology choice in the design system, why it was chosen, and what problems it solves.

**Current stack (as of 2026-04-09):**
- Next.js 15 (framework)
- React 19 (UI library)
- TypeScript (strict mode)
- Tailwind CSS v4 (styling)
- shadcn/ui (component library)
- Radix UI (primitives)
- framer-motion v12 (animations)
- Storybook v10 (documentation)
- Vitest + RTL (testing)

---

## Core Framework: Next.js 15

### What It Is
Next.js is a React framework that provides:
- File-based routing (pages automatically become routes)
- Server-side rendering (RSC = React Server Components)
- Static generation and incremental static regeneration
- Built-in optimization (images, fonts, code splitting)
- Deployment to Vercel or any Node host

### Why Next.js 15 (not plain React or other frameworks)

**✅ Server Components (RSC) — game changer**
- Render components on the server, send HTML to client
- Access databases and APIs directly (no API routes needed)
- Reduce JavaScript sent to browser
- Automatic code splitting and lazy loading
- Better security (API keys stay on server)

```typescript
// Server component (runs on server only)
async function Products() {
  const products = await db.query("SELECT * FROM products")
  return (
    <div>
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
```

**✅ Built-in Optimization**
- Image optimization (WebP, responsive sizes)
- Font optimization (no layout shift)
- CSS-in-JS elimination (Tailwind is static CSS)
- Code splitting by route (automatic)

**✅ Deployment**
- Vercel (made by Next.js creators, one-click deploy)
- Self-hosted (any Node.js server)
- Edge functions (Cloudflare Workers, Lambda@Edge)

**✅ DX (Developer Experience)**
- File-based routing (no config)
- Hot module replacement (instant updates)
- TypeScript first-class support
- Excellent error messages

**Alternative considered:** Plain React + Vite
- ❌ Requires manual API routes
- ❌ No server components
- ❌ No built-in image/font optimization
- ❌ More configuration needed

### Dependency Details

```json
{
  "next": "15.x",
  "react": "19.x",
  "react-dom": "19.x"
}
```

---

## UI Library: React 19

### What It Is
React is the JavaScript library for building user interfaces with components.

React 19 adds:
- `<form>` actions (server actions)
- `useActionState` hook (form state management)
- `useFormStatus` hook (pending state without manual tracking)
- Improved ref handling (`ref` as prop, no `forwardRef` needed... but we still use it)
- Hydration errors eliminated (JSX children anywhere)

### Why React 19 (not Vue or Svelte)

**✅ Ecosystem**
- Largest component library ecosystem (shadcn, Material-UI, Chakra, etc.)
- Every design tool exports React components
- Every SaaS provider has React SDK

**✅ Server Components (pair with Next.js)**
- Mix server and client components seamlessly
- Get the best of both worlds
- Industry standard for SSR

**✅ Job market**
- Most companies hiring for UI engineers want React
- Most freelance gigs are React
- Largest community = most StackOverflow answers

**❌ Alternatives:**
- **Vue** — Smaller ecosystem, less industry adoption
- **Svelte** — Great DX, but ecosystem is smaller
- **Solid.js** — Newer, less community support yet

### Dependency Details

```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0"
}
```

---

## Language: TypeScript (Strict Mode)

### What It Is
TypeScript is JavaScript with types. Every variable, function, and component has a declared type, which TypeScript checks before you run code.

### Why TypeScript (not JavaScript)

**✅ Catch errors before runtime**
```typescript
// TypeScript catches this:
const button: HTMLButtonElement = document.getElementById("btn")
// ❌ Element | null not assignable to HTMLButtonElement
// ✅ Use: const button = document.getElementById("btn") as HTMLButtonElement

// JavaScript allows this (crashes at runtime):
const button = document.getElementById("btn")
button.click() // ❌ Error if button is null
```

**✅ Self-documenting code**
```typescript
// You know exactly what this does
function calculateDiscount(price: number, percent: number): number {
  return price * (1 - percent / 100)
}

// vs JavaScript (type guessing)
function calculateDiscount(price, percent) {
  // What types are these? Have to read the function body
  return price * (1 - percent / 100)
}
```

**✅ Better IDE support**
- Autocomplete works (IDE knows what properties exist)
- Jump to definition (Cmd/Ctrl + click on any symbol)
- Refactoring (rename safely — IDE updates everywhere)

**✅ Component props are self-documenting**
```typescript
interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  children: React.ReactNode
}

function Button({ variant = "primary", ...props }: ButtonProps) {
  // IDE autocomplete shows all valid values for variant
}
```

**✅ AI-friendly**
- Claude, Cursor, and other AI tools understand types better
- Reduces ambiguity (AI doesn't have to guess intent)
- Catches mistakes AI makes (type checker validates AI-generated code)

### Strict Mode Enabled

In `tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitThis": true
  }
}
```

**What this means:**
- ✅ Every variable must have explicit type OR be inferred from usage
- ✅ No `any` type (cheating, disables type checking)
- ✅ Null and undefined caught (no "cannot read property of undefined" errors)
- ✅ Functions strictly typed (callbacks must match signature exactly)

### Dependency Details

```json
{
  "typescript": "^5.x",
  "@types/react": "^19.0.0",
  "@types/react-dom": "^19.0.0",
  "@types/node": "^20.x"
}
```

---

## Styling: Tailwind CSS v4

### What It Is
Tailwind CSS is a utility-first CSS framework: instead of writing CSS classes, you write HTML with utility classes.

```html
<!-- Tailwind (utility classes) -->
<button class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
  Click me
</button>

<!-- vs Traditional CSS -->
<style>
  .button {
    padding: 8px 16px;
    background-color: #2563eb;
    color: #ffffff;
    border-radius: 6px;
  }
  .button:hover {
    background-color: #1d4ed8;
  }
</style>
<button class="button">Click me</button>
```

### Why Tailwind v4 (not Bootstrap or CSS Modules)

**✅ @theme system (v4 only)**
- Define design tokens in CSS, not config file
- No `tailwind.config.js` needed
- Tokens automatically available in all files
- Dark mode baked in

```css
/* tokens.css */
@theme {
  --color-primary: #2563eb;
  --color-primary-foreground: #ffffff;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  /* ... */
}

/* Use in HTML */
<div class="bg-primary text-primary-foreground p-xs">
```

**✅ Design tokens first**
- Change `--color-primary` once → updates everywhere
- No CSS file maintenance
- No style conflicts
- System-wide consistency

**✅ Zero runtime overhead**
- Pure CSS (no JavaScript needed)
- Works everywhere (browsers, emails, static sites)
- Fast compilation (Tailwind CLI or @tailwindcss/vite)

**✅ Excellent dark mode**
- Just add `[data-theme="dark-default"]` to any element
- All utilities automatically adapt
- No custom CSS needed

```html
<!-- Light mode (default) -->
<button class="bg-primary">Light</button>

<!-- Dark mode (automatic) -->
<div data-theme="dark-default">
  <button class="bg-primary">Dark</button> <!-- automatically darker primary -->
</div>
```

**❌ Bootstrap:** Pre-built components, but:
- ❌ Opinionated (bloated if you only need buttons)
- ❌ Hard to customize without overriding CSS
- ❌ Not token-based

**❌ CSS Modules:** Component-scoped CSS, but:
- ❌ Have to maintain separate CSS files
- ❌ No design tokens system
- ❌ Hard to achieve consistency across components

### Dependency Details

```json
{
  "tailwindcss": "^4.x",
  "@tailwindcss/vite": "^4.x"  // Vite integration for fast builds
}
```

### Configuration

No `tailwind.config.js` file needed! Tokens live in:
```
src/styles/tokens.css
src/styles/shadcn-bridge.css  (maps to shadcn variables)
src/styles/animation-tokens.css (animation timings)
```

---

## Component Library: shadcn/ui

### What It Is
shadcn/ui is a collection of **copy-paste** React components built from:
- Radix UI primitives (behavior + accessibility)
- Tailwind CSS styling (tokens)
- TypeScript (fully typed)

When you run `npx shadcn@latest add button`, it copies the source code into your repo.

### Why shadcn/ui (not Material-UI or Chakra)

**✅ Copy-paste, not npm package**
- You own the code
- You can customize, refactor, delete
- No version conflicts
- No "locked into a version" problem

```bash
# Copy Button component into your repo
npx shadcn@latest add button --yes

# Now you have: src/components/ui/button.tsx
# Full control, TypeScript interface visible
```

**✅ Radix UI underneath**
- Accessibility (WCAG AA) built-in
- Keyboard navigation (Tab, Enter, Escape, Arrows)
- Focus management (dialogs, menus)
- Semantic HTML (button, input, nav, etc.)

**✅ Tailwind styling**
- Uses tokens (no hardcoded colors)
- Dark mode works out of the box
- Easy to customize per project

**✅ Small and focused**
- Only 46 components (not 500 like Material-UI)
- You use what you need
- Documentation is clear

**✅ AI-friendly**
- Components are plain TypeScript
- Source code is readable (Claude can modify)
- Storybook stories show usage

**❌ Material-UI:** Full-featured but:
- ❌ Opinionated design (Material Design only)
- ❌ Large bundle size
- ❌ Hard to fork or customize
- ❌ npm versioning lock-in

**❌ Chakra:** Great props API but:
- ❌ npm dependency
- ❌ Less control over source
- ❌ Styling less intuitive

### Dependency Details

```json
{
  "react-dom": "^19.0.0",  // Required by Radix
  "@radix-ui/react-*": "^1.x.x"  // 40+ Radix packages
}
```

When you add components, `package.json` is updated automatically.

---

## Primitives: Radix UI

### What It Is
Radix UI is a library of **unstyled** primitives (basic components) that handle behavior and accessibility. shadcn applies Tailwind styling on top.

```typescript
// Radix primitive (no styling)
import * as Dialog from "@radix-ui/react-dialog"

<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Content>
    {/* Empty — no colors, no padding, no nothing */}
  </Dialog.Content>
</Dialog.Root>

// shadcn wrapper (adds Tailwind styling)
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    {/* Full styling — colors, padding, shadows, etc. */}
  </DialogContent>
</Dialog>
```

### Why Radix UI (not DOM primitives)

**✅ Accessibility built-in**
- WCAG AA compliance (no extra work)
- Keyboard navigation (Tab, Enter, Escape, Arrows all work)
- Focus management (dialogs trap focus, menus auto-focus)
- ARIA attributes (announced to screen readers)

**✅ Consistent behavior**
- Dialog opens/closes consistently
- Dropdown menus work the same way
- Tooltips appear at the right time
- No re-implementing the wheel

**✅ Tested**
- Thousands of apps using Radix
- Edge cases already handled
- Bug fixes apply to everyone

**❌ Plain DOM:** Raw HTML elements
- ❌ No keyboard navigation (have to implement)
- ❌ No accessibility (have to add ARIA)
- ❌ No focus management (bugs happen)

### Dependency Details

```json
{
  "@radix-ui/react-dialog": "^1.x.x",
  "@radix-ui/react-dropdown-menu": "^1.x.x",
  "@radix-ui/react-tooltip": "^1.x.x",
  // ... 40+ packages total
}
```

---

## Animations: framer-motion v12

### What It Is
framer-motion is a declarative animation library for React. You describe what you want to animate, and framer-motion handles the timing and easing.

```typescript
import { motion } from "framer-motion"

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  Animated content
</motion.div>
```

### Why framer-motion v12 (not CSS animations or other libraries)

**✅ Declarative (describe outcome, not steps)**
```typescript
// framer-motion (describe what happens)
<motion.div animate={{ x: 100 }} transition={{ duration: 1 }}>

// CSS (describe steps)
@keyframes slide {
  0% { transform: translateX(0); }
  100% { transform: translateX(100px); }
}
animation: slide 1s ease-out forwards;
```

**✅ JavaScript-driven (dynamic animations)**
```typescript
// Animate to dynamic value
const [target, setTarget] = useState(0)
<motion.div animate={{ x: target }} /> // Updates when target changes
```

**✅ Performant**
- Uses GPU acceleration (transform + opacity)
- Avoids layout thrashing
- Smooth 60fps on modern devices

**✅ Accessibility built-in**
```typescript
import { useReducedMotion } from "framer-motion"

function Component() {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div animate={shouldReduce ? {} : { x: 100 }}>
      Content
    </motion.div>
  )
}
```

**✅ React integration**
- Works with hooks
- Works with React 19 Server Components (client-side boundary)
- Excellent TypeScript support

**❌ Animate.css:** CSS-based
- ❌ Limited to predefined animations
- ❌ Hard to orchestrate multiple animations
- ❌ No dynamic values

**❌ React Spring:** Physics-based but:
- ❌ Steeper learning curve
- ❌ More configuration
- ❌ Harder to reason about timing

### Dependency Details

```json
{
  "framer-motion": "^12.x.x"
}
```

### Usage in Design System

```typescript
// src/lib/animation.ts exports variants
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

// Use across design system
<motion.div variants={fadeInUp} initial="hidden" animate="visible">
  Content fades in and slides up
</motion.div>
```

---

## Carousel: embla-carousel v8

### What It Is
embla-carousel is a carousel (slider) library for React. It handles touch, keyboard, and mouse interactions, plus accessibility.

```typescript
import EmblaCarousel from "embla-carousel-react"

function Carousel({ children }) {
  return (
    <EmblaCarousel>
      {children.map(child => (
        <div key={child.id}>{child}</div>
      ))}
    </EmblaCarousel>
  )
}
```

### Why embla-carousel v8 (not Swiper or react-slick)

**✅ Lightweight**
- No jQuery dependency (react-slick needs jQuery)
- Small bundle (Swiper is heavier)
- Fast initialization

**✅ Accessibility**
- Keyboard navigation (Arrow keys)
- ARIA labels
- Screen reader support
- Pause on hover (reduces motion)

**✅ Touch-first**
- Native iOS/Android feel
- Momentum scrolling works
- No janky animations

**✅ Composable**
- Works with shadcn components
- Plays nice with Tailwind
- Easy to style

**❌ Swiper:** More features but:
- ❌ Larger bundle
- ❌ More configuration
- ❌ Harder to customize

**❌ react-slick:** Old and jQuery-dependent
- ❌ jQuery in 2025?
- ❌ Poor accessibility
- ❌ Hard to customize

### Dependency Details

```json
{
  "embla-carousel-react": "^8.x.x",
  "embla-carousel-autoplay": "^8.x.x"  // Optional: auto-advance
}
```

---

## Charts: Recharts

### What It Is
Recharts is a composable React chart library. You build charts by composing small components.

```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"

function Chart({ data }) {
  return (
    <LineChart data={data}>
      <CartesianGrid />
      <XAxis dataKey="name" />
      <YAxis />
      <Line type="monotone" dataKey="value" stroke="var(--color-primary)" />
    </LineChart>
  )
}
```

### Why Recharts (not Chart.js or Nivo)

**✅ React-native**
- Built with React, not canvas or SVG hacks
- Easy to customize (just pass props)
- Responsive by default

**✅ Token-friendly**
- Uses CSS variables (no hardcoded colors)
- Dark mode works automatically
- Easy to theme

**✅ Composable**
- Combine components to build charts
- Add/remove axis, legend, tooltip easily
- No "chart type" limitation

**✅ Lightweight**
- Smaller bundle than Nivo
- Simpler than Chart.js
- Good performance

**❌ Chart.js:** Canvas-based but:
- ❌ Not React-native
- ❌ Hard to customize
- ❌ CSS variable support is poor

**❌ Nivo:** Fully featured but:
- ❌ Heavier bundle
- ❌ Steeper learning curve
- ❌ Over-engineered for simple charts

### Dependency Details

```json
{
  "recharts": "^2.x.x"
}
```

---

## Documentation: Storybook v10 with Vite

### What It Is
Storybook is a tool for building and documenting components in isolation. Each component gets a "story" file showing all its variations.

```typescript
// src/components/ui/button.stories.tsx
export default {
  title: "Inputs/Button",
  component: Button
}

export const Default = () => (
  <Button>Click me</Button>
)

export const Primary = () => (
  <Button variant="primary">Primary</Button>
)

export const Disabled = () => (
  <Button disabled>Disabled</Button>
)
```

Visit `http://localhost:6006/` to see all stories in an interactive browser.

### Why Storybook v10 (not other documentation tools)

**✅ Interactive documentation**
- See components in isolation
- Change props without code
- Test responsive behavior
- Test dark mode

**✅ Vite-powered (v10 feature)**
- Instant hot reload (change code, see update immediately)
- Fast build time (seconds instead of minutes)
- Better DX than v8/v9

**✅ AI-readable**
- Claude can understand component API from stories
- Story format is standard and recognizable
- Makes it easy to request variations

**✅ Testing ready**
- Built-in a11y testing (accessibility linting)
- Interaction testing (click, type, verify results)
- Visual regression testing (if you add it)

**✅ Accessibility testing**
- Check contrast (WCAG AA)
- Check for focus indicators
- Test keyboard navigation
- Test with screen readers

**❌ Auto-generated docs (JSDoc only):**
- ❌ No interactive demo
- ❌ No visual component browsing
- ❌ No testing

**❌ Docusaurus:** Great for markdown docs but:
- ❌ Not designed for component demos
- ❌ Have to write demo code separately
- ❌ Hard to keep in sync

### Dependency Details

```json
{
  "@storybook/react": "^10.x.x",
  "@storybook/addon-essentials": "^10.x.x",
  "@storybook/addon-a11y": "^10.x.x",  // Accessibility testing
  "@storybook/addon-interactions": "^10.x.x"  // Interaction testing
}
```

### Configuration

`.storybook/main.ts`:
```typescript
export default {
  framework: "@storybook/react",
  stories: ["../src/**/*.stories.tsx"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y"],
}
```

---

## Testing: Vitest + React Testing Library

### What It Is
**Vitest:** JavaScript test runner (like Jest, but faster with Vite)
**React Testing Library:** Test utils for writing tests that mimic real user behavior

```typescript
import { render, screen, fireEvent } from "@testing-library/react"
import { Button } from "@/components/ui/button"

describe("Button", () => {
  it("calls onClick when clicked", () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    
    fireEvent.click(screen.getByRole("button"))
    expect(handleClick).toHaveBeenCalled()
  })
})
```

### Why Vitest + React Testing Library (not Jest + Enzyme)

**✅ Vitest is fast**
- Uses Vite (instant compilation)
- Parallel test execution
- Watch mode is responsive
- 10x faster than Jest for large test suites

**✅ React Testing Library is user-centric**
- Test what users see (not implementation details)
- Encourages accessible components
- Less brittle tests (less refactoring needed)

**✅ Both are modern**
- First-class TypeScript support
- ESM modules (not CommonJS)
- Better error messages

**❌ Jest:** Older, slower
- ❌ Still uses CommonJS
- ❌ Slow on large suites
- ❌ Configuration is complex

**❌ Enzyme:** Tests implementation details
- ❌ Tests break when you refactor (even if behavior is same)
- ❌ Doesn't test accessibility
- ❌ Harder to write realistic tests

### Dependency Details

```json
{
  "vitest": "^1.x.x",
  "@testing-library/react": "^14.x.x",
  "@testing-library/jest-dom": "^6.x.x"  // Matchers like toBeVisible()
}
```

---

## Class Variance Authority (CVA)

### What It Is
CVA is a library for managing component variants with TypeScript. It's like `classnames` but with types.

```typescript
import { cva, type VariantProps } from "class-variance-authority"

const buttonStyles = cva("px-4 py-2 rounded-md", {
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90"
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg"
    }
  }
})

interface ButtonProps extends VariantProps<typeof buttonStyles> {
  children: React.ReactNode
}

function Button({ variant = "primary", size = "md", ...props }: ButtonProps) {
  return (
    <button className={buttonStyles({ variant, size })} {...props} />
  )
}

// TypeScript now knows:
// <Button variant="primary" /> ✅ valid
// <Button variant="invalid" /> ❌ TypeScript error
```

### Why CVA (not inline classnames)

**✅ Type-safe variants**
- TypeScript catches invalid variant combinations
- IDE autocomplete shows all valid options

**✅ DRY (Don't Repeat Yourself)**
- Define styles once
- Reuse across multiple components

**✅ Maintainability**
- Change a variant in one place
- Updates everywhere

**✅ Performance**
- Styles are computed once (at definition)
- No runtime overhead

### Dependency Details

```json
{
  "class-variance-authority": "^0.7.x"
}
```

---

## Build Tool: Vite

### What It Is
Vite is a build tool that uses native ES modules for fast development and bundling for production.

```bash
npm run dev       # Vite dev server (instant hot reload)
npm run build     # Vite build (optimized bundle)
npm run preview   # Preview production build locally
```

### Why Vite (not Webpack or Rollup)

**✅ Instant startup**
- Dev server starts in milliseconds
- Not milliseconds to compile, milliseconds total

**✅ Hot Module Replacement (HMR)**
- Change code → see update instantly
- State is preserved (form inputs stay filled)
- No full page reload

**✅ Native ES modules**
- Browser loads what it needs
- No bundling in development
- Only bundle for production

**✅ Zero-config (mostly)**
- Sensible defaults
- Works with React out of the box
- TypeScript support built-in

**❌ Webpack:** Powerful but complex
- ❌ Slow dev server startup
- ❌ Complex configuration
- ❌ Overkill for most projects

**❌ Rollup:** Great for libraries but:
- ❌ Not ideal for applications
- ❌ No dev server (need plugins)

### Dependency Details

```json
{
  "vite": "^5.x.x",
  "@vitejs/plugin-react": "^4.x.x"  // React plugin
}
```

---

## Package Manager: npm (with lock file)

### What It Is
npm is the Node.js package manager. It installs dependencies from the npm registry.

### Why npm (not Yarn or pnpm)

**✅ Default**
- Comes with Node.js
- No extra installation
- Most consistent with industry

**✅ Monorepo support**
- `npm workspaces` for multi-package repos
- Good enough for most use cases

**✅ Lock file**
- `package-lock.json` ensures reproducible installs
- Commit to git → everyone gets same versions

**❌ Yarn:** Similar but:
- ❌ Extra installation needed
- ❌ Different commands (yarn vs npm)
- ❌ Not necessary for current setup

**❌ pnpm:** Efficient but:
- ❌ Extra installation needed
- ❌ Different command syntax
- ❌ Not necessary for current setup

### Dependency Details

```bash
node --version  # 20.x or higher
npm --version   # 10.x or higher
```

---

## PostCSS and Tailwind Integration

### What It Is
PostCSS is a tool that transforms CSS. Tailwind uses PostCSS to generate CSS from your HTML.

### Configuration

**`postcss.config.js`:**
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},  // Adds -webkit-, -moz- prefixes
  },
}
```

**Tailwind v4 uses `@tailwindcss/vite`:**
```javascript
// vite.config.ts
import tailwindcss from "@tailwindcss/vite"

export default {
  plugins: [
    tailwindcss(),
    react(),
  ],
}
```

### Why PostCSS + Tailwind (not SASS or styled-components)

**✅ CSS-first**
- All styling is CSS (not JavaScript)
- Smaller bundle
- Better performance
- Works in static HTML

**✅ Design tokens**
- Single source of truth (`tokens.css`)
- CSS variables used everywhere
- Dark mode automatic

**✅ No CSS-in-JS runtime**
- styled-components/Emotion add 15KB+ to bundle
- PostCSS + Tailwind is just CSS
- Faster initial load

**❌ SASS:** CSS preprocessor but:
- ❌ Still produces static CSS
- ❌ Tokens less integrated than Tailwind
- ❌ More complex configuration

**❌ styled-components:** Runtime CSS but:
- ❌ Adds JavaScript to bundle
- ❌ Creates <style> tags dynamically
- ❌ Harder to debug (generated class names)

---

## Complete Dependencies List

### Production Dependencies

```json
{
  "next": "^15.x",
  "react": "^19.x",
  "react-dom": "^19.x",
  "tailwindcss": "^4.x",
  "@tailwindcss/vite": "^4.x",
  "framer-motion": "^12.x",
  "embla-carousel-react": "^8.x",
  "embla-carousel-autoplay": "^8.x",
  "recharts": "^2.x",
  "class-variance-authority": "^0.7.x",
  "@radix-ui/react-*": "^1.x",  // 40+ packages
  "lucide-react": "^0.x",  // Icons
  "clsx": "^2.x",  // Classname utility
  "zod": "^3.x"  // Schema validation
}
```

### Development Dependencies

```json
{
  "typescript": "^5.x",
  "vite": "^5.x",
  "@vitejs/plugin-react": "^4.x",
  "@storybook/react": "^10.x",
  "@storybook/addon-essentials": "^10.x",
  "@storybook/addon-a11y": "^10.x",
  "vitest": "^1.x",
  "@testing-library/react": "^14.x",
  "@testing-library/jest-dom": "^6.x",
  "autoprefixer": "^10.x",
  "postcss": "^8.x",
  "eslint": "^8.x",
  "eslint-plugin-react": "^7.x",
  "eslint-plugin-a11y": "^6.x",  // Accessibility linting
  "prettier": "^3.x"  // Code formatter
}
```

---

## Why This Stack (Summary)

| Concern | Choice | Why |
|---------|--------|-----|
| **Framework** | Next.js 15 | Server components, optimization, DX |
| **UI Library** | React 19 | Ecosystem, market, pair with Next.js RSC |
| **Language** | TypeScript strict | Type safety, DX, AI-friendly |
| **Styling** | Tailwind v4 | @theme system, tokens, zero runtime |
| **Components** | shadcn/ui | Own source, Radix + Tailwind, composable |
| **Primitives** | Radix UI | Accessibility built-in, unstyled, composable |
| **Animations** | framer-motion | Declarative, JavaScript-driven, performant |
| **Carousel** | embla-carousel | Lightweight, accessible, touch-first |
| **Charts** | Recharts | React-native, token-friendly, composable |
| **Documentation** | Storybook v10 | Interactive demos, AI-readable, testing |
| **Testing** | Vitest + RTL | Fast, user-centric, TypeScript support |
| **Variants** | CVA | Type-safe, composable, maintainable |
| **Build** | Vite | Fast, hot reload, zero-config |
| **Package Mgr** | npm | Default, lock file, monorepo support |

---

## Performance Characteristics

### Bundle Size (estimated)

| Library | Size | Notes |
|---------|------|-------|
| Next.js runtime | 80 KB | Minimal, most code is your app |
| React 19 | 42 KB | Stable, not increasing |
| Tailwind CSS | 30-50 KB | Depends on what you use |
| framer-motion | 40 KB | Animations |
| shadcn components | ~2 KB each | You choose what to import |
| Radix UI (total) | 80 KB | Depends on what you use |
| **Total (typical app)** | ~280-350 KB | gzipped, before optimization |

All sizes are **gzipped**. Brotli compression is even smaller (~20% reduction).

### Runtime Performance

- **First Contentful Paint:** <1 second (with images optimized)
- **Time to Interactive:** <2 seconds (with code splitting)
- **Lighthouse Score:** 90+ (with best practices)

---

## Future Considerations

### Potential upgrades (not immediate)

| Technology | Timeline | Reason |
|-----------|----------|--------|
| React 20+ | 2026+ | When major features warrant it |
| TypeScript 6+ | 2025 | When ecosystem catches up |
| Tailwind v5 | 2026+ | When released with new features |
| Storybook v11+ | 2025+ | When released with better performance |

### Technologies we've rejected

| Technology | Why Not |
|-----------|---------|
| Astro | Overkill for app, less React control |
| Qwik | Too early, smaller community |
| HTMX | Not a framework, different paradigm |
| SvelteKit | Good but less ecosystem, market is React |
| Angular | Opinionated, steep learning curve |
| Vue | Good framework, but ecosystem smaller |
| TailwindUI | Using Tailwind blocks directly (no extra dependency) |
| Shadcn Themes | Custom theming with tokens is more flexible |
| Playwright | Vitest + RTL sufficient for current scope |
| Storyshot | Visual regression too heavyweight currently |

---

## Further Reading

- **Architecture & Design Decisions:** `decision-log.md` (proposed)
- **Atomic Design:** `atomic-design-and-layers.md`
- **Component Guide:** `component-guide.md`
- **Token System:** `token-system.md`
- **Animation System:** `animation-system-complete.md` (proposed)
