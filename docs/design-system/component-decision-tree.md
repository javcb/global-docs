<!-- type: decision-tree -->

# Component Decision Tree

When building any UI element, follow this decision tree to determine what to use and how to use it.

This document is the definitive answer to "What component should I use?"

---

## Quick Reference: The Five Questions

Ask these five questions in order. The first "yes" is your answer.

1. **Does shadcn/ui have this?** → Use shadcn (import from `@/components/ui/`)
2. **Is there a Tailwind UI block?** → Use block as reference (in `@/blocks/[category]/`)
3. **Is there a custom component?** → Use custom (import from `@/components/[name]/`)
4. **Do I have time to build?** → Build custom (follow `component-conventions.md`)
5. **Do I need to ship now?** → Copy a block and adapt it

---

## Level 1: Check shadcn/ui Components

### The Question

**Does shadcn/ui already have this component?**

### How to Check

**Read:** `design-system-shadcn-tailwind/docs/component-inventory.md`

Search the "shadcn/ui Components" section for your component.

### What shadcn Provides (46 Total)

| Category | Components | Count |
|----------|-----------|-------|
| **Inputs** | Button, Input, Textarea, Checkbox, RadioGroup, Select, Switch, Slider, Label, InputOTP, InputGroup | 11 |
| **Display** | Card, Badge, Avatar, Skeleton, Separator, Alert, Breadcrumb, Progress, Calendar, Table, Carousel | 11 |
| **Navigation** | NavigationMenu, Menubar, Pagination, Tabs, Sidebar | 5 |
| **Overlays** | Dialog, AlertDialog, Drawer, Sheet, Popover, Tooltip, DropdownMenu, HoverCard, ContextMenu, Command | 10 |
| **Layout** | ScrollArea, Resizable, AspectRatio, Accordion, Collapsible | 5 |
| **Data** | Chart, Sonner (toast notifications) | 2 |

**Plus:** TypeScript interfaces, dark mode support, WCAG AA keyboard navigation, Storybook stories.

### When to Use shadcn

✅ **Use shadcn when:**
- Building simple, standard UI elements (buttons, forms, dialogs)
- Need accessibility guarantees (WCAG AA built-in)
- Need dark mode support (automatic)
- Time is tight (copy-paste ready)
- Need type-safe props (full TypeScript)

❌ **Don't use shadcn when:**
- Component is too opinionated (need customization)
- Need something fancy (animation, custom effects)
- Performance is critical and even small overhead matters

### How to Import

**Correct pattern:**
```typescript
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"

export function MyComponent() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>Content</DialogContent>
    </Dialog>
  )
}
```

**Wrong patterns:**
```typescript
// ❌ Don't import everything
import * from "@/components/ui"

// ❌ Don't modify shadcn source
// src/components/ui/button.tsx is read-only!
```

### Customizing shadcn

If shadcn is 90% right but needs adjustment:

**Option 1: Wrap it**
```typescript
import { Button, type ButtonProps } from "@/components/ui/button"

export function PrimaryButton(props: ButtonProps) {
  return <Button variant="default" size="lg" {...props} />
}
```

**Option 2: Compose it**
```typescript
import { Button } from "@/components/ui/button"
import { Icon } from "lucide-react"

export function IconButton({ icon: IconComponent, ...props }: ButtonProps & { icon: React.ComponentType }) {
  return (
    <Button variant="ghost" size="icon" {...props}>
      <IconComponent className="h-4 w-4" />
    </Button>
  )
}
```

**Option 3: Build custom if needs differ significantly**
→ Move to Level 4

---

## Level 2: Check Tailwind UI Blocks

### The Question

**Is there a Tailwind UI block that implements this pattern?**

### How to Check

**Read:** `design-system-shadcn-tailwind/src/blocks/INDEX.md`

This file lists all 364 blocks organized by category.

### What Blocks Provide (364 Total)

Tailwind UI blocks are pre-composed, production-ready patterns combining multiple shadcn components.

| Category | Blocks | Examples |
|----------|--------|----------|
| **Page Examples** | 6 | Full pages: Catalyst, Studio, Spotlight, Compass |
| **Feedback** | 12 | Empty states, alerts, confirmations, toasts |
| **Headings** | 25 | Hero titles, section headings, gradient text |
| **Application Shells** | 23 | Sidebars, headers, layout containers |
| **Data Display** | 19 | Stats, tables, cards, metrics, dashboards |
| **Overlays** | 24 | Modals, dropdowns, popovers, tooltips |
| **Layout** | 38 | Grids, spacing, responsive containers |
| **Lists** | 44 | Tables, feeds, comments, grouped lists |
| **Elements** | 45 | Cards, buttons, badges, avatars, icons |
| **Navigation** | 54 | Navbars, menus, breadcrumbs, tabs, pagination |
| **Forms** | 74 | Input patterns, multi-step forms, validation states |

### When to Use Blocks

✅ **Use blocks when:**
- Building complex layouts (multiple components together)
- Need production-tested patterns (Tailwind UI maintains them)
- Time is critical (don't rebuild from atoms)
- Learning how components compose (see real examples)
- Pattern is common (pricing tables, hero sections, forms)

❌ **Don't use blocks when:**
- Component is too generic (shadcn is better)
- Block is too opinionated (design doesn't match)
- Block is 30%+ wrong (customization cost too high)

### How to Use Blocks

**Step 1: Find the block**
```bash
# In src/blocks/INDEX.md, search by keyword
# "hero with CTA" → check page-examples/
# "pricing table" → check data-display/
# "mobile nav" → check navigation/
# "form with steps" → check forms/
```

**Step 2: Import and use**
```typescript
// All blocks are token-swapped and ready to use
import HeroWithCTA from "@/blocks/page-examples/HeroWithCTA"

export function HomePage() {
  return (
    <HeroWithCTA
      title="Your Title"
      subtitle="Your Subtitle"
      ctaText="Call to Action"
      ctaLink="/action"
      backgroundImage="/hero.jpg"
    />
  )
}
```

**Step 3: Customize if needed**
```typescript
// Blocks accept props for customization
<HeroWithCTA
  title={customTitle}
  className="custom-class"  // if supported
  onCTA={handleClick}       // if supported
/>
```

### Adapting Blocks

If block is 80% right:

**Option 1: Use with props**
```typescript
<HeroWithCTA title="Custom" ctaText="Custom Text" />
```

**Option 2: Wrap and extend**
```typescript
import HeroWithCTA from "@/blocks/page-examples/HeroWithCTA"

export function CustomHero() {
  return (
    <div>
      <HeroWithCTA title="Our Title" />
      <div className="mt-lg">
        {/* Additional custom content */}
      </div>
    </div>
  )
}
```

**Option 3: Extract pattern and rebuild**
```typescript
// Don't copy-paste. Instead:
// 1. Study the block structure (layout, spacing, colors)
// 2. Note which shadcn components it uses
// 3. Rebuild with your specific needs
// 4. Reference block as guidance (@source: tailwind-ui, adapted)
```

---

## Level 3: Check Custom Components

### The Question

**Is there an existing custom component that solves this?**

### How to Check

**Read:** `design-system-shadcn-tailwind/docs/component-inventory.md`

Look in "Custom Components" and "Magic Components" sections.

### What Custom Components Provide (19 Total)

#### Data Visualization (5)
- `DashboardLineChart` — Trend charts with axes
- `DashboardBarChart` — Categorical comparison
- `DashboardAreaChart` — Filled trends
- `DashboardDonutChart` — Proportional display
- `KpiCard` — Metric with trend

#### Form & Input (3)
- `DatePicker` — Single date selection
- `DateRangePicker` — Date range (from/to)
- `SearchInput` — Enhanced search with icons

#### Data & Content (3)
- `Stat` — KPI display with indicator
- `DataGrid` — Sortable/filterable table
- `Navbar` — Top navigation bar

#### File Handling (1)
- `FileUpload` — Drag/drop upload area

#### Animation & Magic (7)
- `BlurFade` — Blur reveal animation
- `BorderBeam` — Rotating gradient border
- `Marquee` — Horizontally scrolling content
- `FadeText` — Word-by-word fade
- `NumberTicker` — Animated counting
- `ShimmerButton` — Traveling shimmer effect
- `SparklesText` — Animated sparkles

### When to Use Custom

✅ **Use custom when:**
- Exact component exists and solves your problem
- Component is production-ready and tested
- Maintenance is handled by design system
- You want to ensure consistency

❌ **Don't use custom when:**
- shadcn covers it (use shadcn instead)
- Block covers it (use block instead)
- Component is project-specific (build your own)

### How to Import Custom

**Correct pattern:**
```typescript
// Charts
import { DashboardLineChart } from "@/components/charts"

// Date pickers
import { DatePicker, DateRangePicker } from "@/components/date-picker"

// Magic/Animation
import { BlurFade, Marquee, FadeText } from "@/components/magic"

// Data
import { DataGrid } from "@/components/data-grid"

export function MyComponent() {
  return (
    <DashboardLineChart
      data={[{ name: "Jan", value: 100 }, { name: "Feb", value: 120 }]}
      color="var(--color-primary)"
    />
  )
}
```

**Wrong patterns:**
```typescript
// ❌ Don't import from magic/index (use named imports)
import * as Magic from "@/components/magic"

// ❌ Don't rename components
import { DashboardLineChart as Chart } from "@/components/charts"
```

### Customizing Custom Components

Custom components are meant to be used as-is, but can be wrapped:

```typescript
import { DashboardLineChart } from "@/components/charts"

export function ProjectMetrics({ projectId }) {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchMetrics(projectId).then(setData)
  }, [projectId])

  return (
    <div className="p-lg bg-muted rounded-lg">
      <h3 className="text-lg font-semibold mb-md">Project Metrics</h3>
      <DashboardLineChart data={data} />
    </div>
  )
}
```

---

## Level 4: Build Custom Component

### The Question

**Nothing in levels 1-3 covers this. Should I build it?**

### Prerequisites for Building Custom

✅ **Build custom if:**
- All three levels don't have it
- Will be used in multiple places (not one-off)
- Generic enough (not project-specific)
- Have time to do it properly (with Storybook, types, tests)

❌ **Don't build if:**
- One-time use in one page (just build it inline)
- Project-specific logic (belongs in project repo)
- Will only be used once ever (not worth maintaining)

### How to Build

**Read:** `design-system-shadcn-tailwind/docs/component-conventions.md`

**Quick process:**

1. **Create directory**
   ```
   src/components/MyComponent/
   ├── MyComponent.tsx
   ├── MyComponent.stories.tsx
   └── index.ts
   ```

2. **Implement component**
   ```typescript
   import { forwardRef } from "react"
   import { cva, type VariantProps } from "class-variance-authority"

   /**
    * @source custom
    * @category inputs
    * @token-compliant
    * @date 2026-04-09
    */

   const myComponentStyles = cva("px-md py-sm rounded-md", {
     variants: {
       variant: {
         primary: "bg-primary text-primary-foreground",
         secondary: "bg-secondary text-secondary-foreground"
       }
     }
   })

   export interface MyComponentProps extends VariantProps<typeof myComponentStyles> {
     children: React.ReactNode
   }

   export const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
     ({ variant = "primary", ...props }, ref) => (
       <div
         ref={ref}
         className={myComponentStyles({ variant })}
         {...props}
       />
     )
   )

   MyComponent.displayName = "MyComponent"
   ```

3. **Add Storybook story**
   ```typescript
   export default {
     title: "Inputs/MyComponent",
     component: MyComponent
   }

   export const Default = () => <MyComponent>Default</MyComponent>
   export const Primary = () => <MyComponent variant="primary">Primary</MyComponent>
   export const Secondary = () => <MyComponent variant="secondary">Secondary</MyComponent>
   ```

4. **Update inventory**
   - Add to `docs/component-inventory.md`
   - Update `DESIGN-SYSTEM-CHECKLIST.md`

5. **Run audit**
   - `npm run typecheck` (must pass)
   - `npm run build-storybook` (must pass)
   - Run `token-audit-prompt.md` (verify compliance)

---

## Animation Component Decision Tree

When adding animation to a component:

### Level 1: Simple Hover/Focus

**Use:** CSS transitions (already in `globals.css`)

```css
/* No code needed — transitions are automatic */
transition: all 300ms ease-out;
```

### Level 2: Enter/Exit Animation

**Use:** framer-motion with animation variant from `lib/animation.ts`

```typescript
import { fadeInUp } from "@/lib/animation"
import { motion } from "framer-motion"

<motion.div initial="hidden" animate="visible" variants={fadeInUp}>
  Content fades in and slides up
</motion.div>
```

### Level 3: Scroll-Triggered Animation

**Use:** `useScrollAnimation` hook + variant

```typescript
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { fadeInUp } from "@/lib/animation"
import { motion } from "framer-motion"

const { ref, isInView } = useScrollAnimation()

<motion.div
  ref={ref}
  animate={isInView ? "visible" : "hidden"}
  variants={fadeInUp}
>
  Animates when scrolled into view
</motion.div>
```

### Level 4: Staggered List Animations

**Use:** `staggerContainer` + `staggerItem` variants

```typescript
import { staggerContainer, staggerItem } from "@/lib/animation"
import { motion } from "framer-motion"

<motion.div variants={staggerContainer}>
  {items.map(item => (
    <motion.div key={item.id} variants={staggerItem}>
      {item.name}
    </motion.div>
  ))}
</motion.div>
```

### Level 5: Pre-built Magic UI Effects

**Use:** Magic components for common effects

```typescript
import { BlurFade, Marquee, FadeText } from "@/components/magic"

// Blur fade
<BlurFade>
  <h1>Heading with blur reveal</h1>
</BlurFade>

// Scrolling content
<Marquee>
  <div>Logo 1</div>
  <div>Logo 2</div>
</Marquee>

// Word-by-word fade
<FadeText text="Animate this text" splitBy="word" />
```

### Level 6: Number Animation

**Use:** `NumberTicker` component

```typescript
import { NumberTicker } from "@/components/magic"

<div>
  Customers: <NumberTicker value={1000} />+
</div>
```

### Level 7: Custom Animation

**Use:** framer-motion custom variants

Build custom using `lib/animation.ts` as reference. Add new variants there if reusable.

---

## Decision Matrix Quick Reference

| Need | Component | Location | Modifiable | Import |
|------|-----------|----------|-----------|--------|
| Button, input, dialog | shadcn | `@/components/ui/` | ❌ No (wrap instead) | `from "@/components/ui/[name]"` |
| Hero, navbar, pricing | Block | `@/blocks/[cat]/` | ⚠️ Adapt via props | `from "@/blocks/[cat]/[Name]"` |
| Chart, date picker | Custom | `@/components/[name]` | ✅ Yes (wrap) | `from "@/components/[name]"` |
| Blur fade, border beam | Magic | `@/components/magic` | ✅ Yes (wrap) | `from "@/components/magic"` |
| Animations | Variants | `lib/animation.ts` | ✅ Yes (extend) | `from "@/lib/animation"` |
| Nothing above | Build | `src/components/[Name]/` | ✅ Full control | Custom (follow conventions) |

---

## Real-World Examples

### Example 1: "I need a button"

```
Q1: Does shadcn have Button?
→ YES
✓ Use: import { Button } from "@/components/ui/button"
```

### Example 2: "I need a hero section with CTA"

```
Q1: Does shadcn have it?
→ NO (too complex)

Q2: Is there a Tailwind block?
→ YES (page-examples/HeroWithCTA)
✓ Use: import HeroWithCTA from "@/blocks/page-examples/HeroWithCTA"
```

### Example 3: "I need a data table with sorting"

```
Q1: Does shadcn have it?
→ Table exists (basic), but no sorting/filtering

Q2: Is there a block?
→ YES (lists/ category)
✓ Use: import DataTable from "@/blocks/lists/DataTable"
(or use DataGrid custom component if available)
```

### Example 4: "I need to show animated metrics"

```
Q1: Does shadcn have it?
→ NO

Q2: Is there a block?
→ data-display/ has metric cards

Q3: Is there a custom component?
→ YES (Stat + NumberTicker for animations)
✓ Use: import { Stat, NumberTicker } from "@/components/"
```

### Example 5: "I need a unique animated component not found anywhere"

```
Q1-Q3: None of the above
→ Build custom

✓ Follow: component-conventions.md
✓ Create: src/components/UniqueComponent/
✓ Test: Storybook story + token audit
✓ Register: Add to component-inventory.md
```

---

## Import Patterns Summary

**shadcn:**
```typescript
import { Component } from "@/components/ui/component-name"
```

**Blocks:**
```typescript
import BlockName from "@/blocks/category/BlockName"
```

**Custom:**
```typescript
import { Component } from "@/components/component-name"
import { Component } from "@/components/magic"
```

**Animations:**
```typescript
import { fadeInUp, staggerContainer } from "@/lib/animation"
```

**Hooks:**
```typescript
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
```

---

## Avoiding Duplicates

**Before building anything, ask:**

1. Search `component-inventory.md` for keyword
2. Search `src/blocks/INDEX.md` for pattern
3. Ask teammates: "Has anyone built this?"
4. Check git history: `git log --grep="component-name"`

**If you find it exists elsewhere:**
- Update inventory (might be undocumented)
- Use the existing one
- Report the gap (it should have been documented)

---

## Common Mistakes

### ❌ Mistake 1: Modifying shadcn Source

```typescript
// Wrong: don't edit src/components/ui/button.tsx
// It's read-only and gets overwritten

// Right: wrap it
import { Button } from "@/components/ui/button"

export function PrimaryButton(props) {
  return <Button variant="default" {...props} />
}
```

### ❌ Mistake 2: Copying Block Code

```typescript
// Wrong: copy-paste entire block
const MyHero = () => {
  return (
    /* entire HeroWithCTA code copied here */
  )
}

// Right: import and use
import HeroWithCTA from "@/blocks/page-examples/HeroWithCTA"

// Or if customization needed: study, then rebuild with @source: tailwind-ui, adapted
```

### ❌ Mistake 3: Building Before Checking

```typescript
// Wrong: build custom before checking inventory
export function CustomButton() {
  return <button className="bg-blue-600">...

// Right: check first, then decide
// Q1: shadcn Button exists → use it
// Q2: Doesn't fit → wrap it
// Q3: Wrap doesn't work → maybe build custom
```

---

## Further Reading

- **Component Guide:** `component-guide.md` (quick reference)
- **Component Conventions:** `design-system-shadcn-tailwind/docs/component-conventions.md`
- **Component Inventory:** `design-system-shadcn-tailwind/docs/component-inventory.md`
- **Block Index:** `design-system-shadcn-tailwind/src/blocks/INDEX.md`
- **Animation System:** `animation-system-complete.md`
- **Token System:** `token-system-complete.md`
