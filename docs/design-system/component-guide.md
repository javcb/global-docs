<!-- type: decision-tree -->

# Component Decision Guide

When building any UI element, follow this decision tree to determine what to use.

---

## Level 1: Check shadcn/ui

**Question:** Does shadcn/ui have this component?

**How to check:**
```
design-system-shadcn-tailwind/docs/component-inventory.md
Look for component in "shadcn/ui Components" section
```

**46 shadcn components available:**
- **Form Inputs:** Button, Input, Textarea, Checkbox, RadioGroup, Select, Switch, Slider, Label, InputOTP, InputGroup
- **Content & Display:** Card, Badge, Avatar, Skeleton, Separator, Alert, Breadcrumb, Progress, Calendar, Table, Carousel
- **Navigation:** NavigationMenu, Menubar, Pagination, Tabs, Sidebar
- **Overlays & Dialogs:** Dialog, AlertDialog, Drawer, Sheet, Popover, Tooltip, DropdownMenu, HoverCard, ContextMenu, Command
- **Layout:** ScrollArea, Resizable, AspectRatio, Accordion, Collapsible
- **Data & Utility:** Chart, Sonner

**Action:**
```tsx
import { Component } from "@/components/ui/component"
// Example:
import { Button } from "@/components/ui/button"
```

**Rule:** Never modify shadcn components. They're read-only. If they don't fit, build a wrapper or custom component.

---

## Level 2: Check Tailwind UI Blocks

**Question:** Is there a Tailwind UI block for this pattern?

**How to check:**
```
design-system-shadcn-tailwind/src/blocks/INDEX.md
Search by category
```

**364 blocks across 11 categories:**
- Page Examples, Feedback, Headings, Application Shells, Data Display, Overlays
- Layout, Lists, Elements, Navigation, Forms

**Examples:**
- "Hero section with CTA" → check `blocks/page-examples/`
- "Pricing table" → check `blocks/data-display/`
- "Mobile navigation" → check `blocks/navigation/`
- "Form with validation" → check `blocks/forms/`

**Action:**
```tsx
import ComponentName from "@/blocks/category/ComponentName"
// Example:
import HeroWithCTA from "@/blocks/page-examples/HeroWithCTA"
```

**Rule:** Blocks are token-swapped and production-ready. Use them as-is. Don't modify unless adding to design system.

---

## Level 3: Check Custom Components

**Question:** Is there a custom component that covers this?

**How to check:**
```
design-system-shadcn-tailwind/docs/component-inventory.md
Look for component in "Custom Components" section
```

**12 custom components available:**

### Data Visualization & Metrics
- **DashboardLineChart** — Trend visualization with x/y axes
- **DashboardBarChart** — Categorical comparison, stacked bars
- **DashboardAreaChart** — Filled trend visualization
- **DashboardDonutChart** — Proportional display with center label
- **KpiCard** — Metric card with trend indicator

### Form & Input
- **DatePicker** — Single date selection with calendar
- **DateRangePicker** — Date range selection (from/to)
- **SearchInput** — Enhanced search with icon, clear button, loading state

### Data & Content
- **Stat** — KPI display with value, trend, change indicator
- **DataGrid** — Sortable/filterable table with row selection
- **Navbar** — Top navigation bar with brand, links, actions
- **FileUpload** — Drag/drop upload area with validation

### Animation & Magic Components (7 total)
- **BlurFade** — Content reveals with blur-out effect
- **BorderBeam** — Rotating gradient beam around border
- **Marquee** — Horizontally scrolling content loop
- **FadeText** — Word/character-by-character text fade
- **NumberTicker** — Animated number counting
- **ShimmerButton** — Button with traveling shimmer
- **SparklesText** — Text with animated sparkles

**Action:**
```tsx
import { Component } from "@/components/magic"
// Examples:
import { BlurFade, Marquee } from "@/components/magic"
import { DatePicker } from "@/components/date-picker"
import { DashboardLineChart } from "@/components/charts"
```

---

## Level 4: Build Custom Component

**Question:** Nothing above covers it?

**Action:** Build a custom component following `component-conventions.md`

**Process:**

1. **Create file structure**
   ```
   src/components/MyComponent/
   ├── MyComponent.tsx      (implementation)
   ├── MyComponent.stories.tsx (Storybook)
   └── index.ts            (export)
   ```

2. **Follow patterns**
   - Use `forwardRef<HTMLElement, Props>` for DOM-wrapping
   - Set `displayName = "MyComponent"`
   - Use `cva` for variants
   - Include TypeScript interface
   - Add provenance header

3. **Example provenance header**
   ```tsx
   /**
    * @source custom
    * @category data
    * @token-compliant
    * @date 2026-04-09
    */
   ```

4. **Add Storybook story**
   - Default story
   - Variations (props, sizes, states)
   - Edge cases
   - With/without dark mode

5. **Update inventory**
   - Add to `docs/component-inventory.md`
   - Add to `DESIGN-SYSTEM-CHECKLIST.md`
   - Update `CLAUDE.md` if major

---

## Provenance Source Tags

Every file has a `@source` header showing where it came from:

| Source | Meaning | Can Modify? | Rules |
|---|---|---|---|
| `shadcn` | Radix + Tailwind styling | ❌ No | Read-only, import only |
| `tailwind-ui` | Tailwind UI block, token-swapped | ⚠️ Use as-is | Token-swapped, don't modify |
| `cruip` | Cruip template, token-swapped | ⚠️ Use as-is | Token-swapped, treat as reference |
| `magic-ui` | Magic UI template, adapted | ⚠️ Reference | Study patterns, build custom |
| `custom` | Built by us | ✅ Yes | Update, improve, refactor |
| `adapted` | Started from source, modified | ✅ Yes | We own it now |

---

## Animation Decision Tree

When adding motion to a component:

### Level 1: Simple hover/focus
**Use:** CSS transitions (already in `globals.css`)
```css
transition: all 300ms ease-out;
```

### Level 2: Enter/exit animation
**Use:** framer-motion with animation variant
```tsx
import { fadeInUp } from "@/lib/animation"
import { motion } from "framer-motion"

<motion.div initial="hidden" animate="visible" variants={fadeInUp}>
```

### Level 3: Scroll-triggered animation
**Use:** useScrollAnimation hook + variant
```tsx
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { fadeInUp } from "@/lib/animation"

const { ref, isInView } = useScrollAnimation()
<motion.div ref={ref} animate={isInView ? "visible" : "hidden"} variants={fadeInUp}>
```

### Level 4: Staggered list animations
**Use:** staggerContainer + staggerItem
```tsx
import { staggerContainer, staggerItem } from "@/lib/animation"

<motion.div variants={staggerContainer}>
  {items.map(item => (
    <motion.div key={item.id} variants={staggerItem}>
      {item.name}
    </motion.div>
  ))}
</motion.div>
```

### Level 5: Magic UI effects
**Use:** Pre-built Magic components
- `<BlurFade>` — blur reveal
- `<BorderBeam>` — rotating border
- `<Marquee>` — scrolling text
- `<FadeText>` — word-by-word fade
- `<NumberTicker>` — animated numbers
- `<ShimmerButton>` — shimmer effect
- `<SparklesText>` — sparkle animation

### Level 6: Number animation
**Use:** NumberTicker component
```tsx
import { NumberTicker } from "@/components/magic"

<NumberTicker value={1234} prefix="$" suffix=".00" />
```

### Level 7: Text animation
**Use:** FadeText component
```tsx
import { FadeText } from "@/components/magic"

<FadeText text="Animate this text" splitBy="word" />
```

---

## Decision Matrix Quick Reference

| Need | Component | Location | Modifiable? |
|------|-----------|----------|-------------|
| Button, Input, Dialog, etc. | shadcn | `@/components/ui/` | ❌ Read-only |
| Hero section, Navbar pattern | Tailwind UI block | `@/blocks/[category]/` | ⚠️ Use as-is |
| Chart, DatePicker, Stat | Custom | `@/components/[name]` | ✅ Reference |
| Blur reveal, Border animation | Magic component | `@/components/magic` | ✅ Reference |
| Nothing above | Build custom | `src/components/[name]/` | ✅ Full control |

---

## Common Patterns & Their Components

| Pattern | Component(s) | Location |
|---------|-------------|----------|
| "Hero with CTA" | Card + Button + BlurFade | block or custom |
| "Logo grid" | Marquee | `@/components/magic` |
| "Featured card" | Card + BorderBeam | custom |
| "Animated stats" | Stat + NumberTicker | `@/components/` |
| "Data table" | Table + DataGrid | `@/components/data-grid` |
| "Chart dashboard" | DashboardLineChart, etc. | `@/components/charts` |
| "Date selection" | DatePicker or DateRangePicker | `@/components/date-picker` |
| "File upload" | FileUpload | `@/components/file-upload` |
| "Top navigation" | Navbar | `@/components/navbar` |
| "Search box" | SearchInput | `@/components/search-input` |

---

## Inventory First!

**Always check before building:**

1. ✅ Read `component-inventory.md`
2. ✅ Read `src/blocks/INDEX.md`
3. ✅ Ask yourself: "Does this exist?"
4. ✅ Only build if answer is "no"

This prevents duplicates and keeps the system manageable.

---

## Further Reading

- **Using with AI:** `docs/design-system/ai-usage-guide.md`
- **Token reference:** `docs/design-system/token-system.md`
- **Architecture:** `docs/design-system/architecture.md`
- **Component rules:** `design-system-shadcn-tailwind/docs/component-conventions.md`
