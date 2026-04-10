<!-- type: architecture -->

# Atomic Design Methodology and Three-Layer Model

## Overview

The design system uses **atomic design methodology** (atoms → molecules → organisms → templates → pages) combined with a **three-layer architecture** that separates concerns across implementation levels.

This document explains:
- Atomic design principles and why they work
- The three-layer model and what each layer provides
- How components compose across layers
- When to use each layer
- Why this structure prevents design decay

---

## Atomic Design Principles

**Atomic design** is a methodology for creating design systems by breaking interfaces into fundamental building blocks and assembling them into increasingly complex components.

### The Five Levels

| Level | Definition | Examples |
|-------|-----------|----------|
| **Atoms** | Smallest, indivisible units | Button, Input, Label, Icon, Badge |
| **Molecules** | Simple combinations of atoms | Form Group (Label + Input), Search Box (Input + Icon), Menu Item (Icon + Text) |
| **Organisms** | Complex combinations of molecules | Form (multiple Form Groups), Navigation Bar (Logo + Nav Items + CTA Button), Card Grid |
| **Templates** | Page-level layouts with placeholders | Blog Post Template (Header + Sidebar + Content + Footer), Dashboard Template (Sidebar + Header + Grid) |
| **Pages** | Fully-realized instances of templates | Home Page (with actual content), Blog Post Article (with actual post data) |

### Why Atomic Design Works

1. **Clarity** — Clear naming convention (everyone understands "atom" vs. "organism")
2. **Composability** — Atoms build molecules, molecules build organisms, etc.
3. **Reusability** — Atoms are used across many molecules and organisms
4. **Testability** — Test atoms in isolation, then molecules, then organisms
5. **Documentation** — Each level has clear responsibility and examples
6. **Scalability** — Works for small systems (50 components) and large systems (500+)

### Common Atomic Design Mistakes to Avoid

❌ **Mistake:** Creating molecules that only appear in one organism (not reusable)
✅ **Solution:** Keep molecules generic; make organisms specific

❌ **Mistake:** Creating atoms that are too opinionated (hardcoded styles)
✅ **Solution:** Atoms should be unstyled or minimally styled primitives

❌ **Mistake:** Skipping levels (atoms jump directly to organisms)
✅ **Solution:** Always compose through molecules first; breaks are more obvious

---

## Three-Layer Architecture

The design system is built in three distinct layers, each with different governance and usage rules.

### Layer 1: Primitives (Radix UI)

**Purpose:** Unstyled, accessible primitives that handle behavior and keyboard navigation.

**What it includes:**
- Basic building blocks with zero opinion about styling
- Built-in accessibility (WCAG AA)
- Keyboard navigation (Tab, Enter, Escape, Arrow keys)
- Focus management
- Semantic HTML

**Examples:**
- `<Dialog>` (behavior: open/close, focus trap, Escape to close)
- `<Combobox>` (behavior: filtering, keyboard selection, open/close)
- `<Tabs>` (behavior: Arrow key navigation between tabs, focus management)
- `<Tooltip>` (behavior: timing, positioning, keyboard trigger)

**Governance:**
- ❌ Never modify (read-only)
- ✅ Always import directly from Radix
- ✅ Wrap if you need styling or behavioral changes

**When to use:**
- Building custom components that need specific behavior
- Need accessibility guarantees
- Need semantic HTML without styling baggage

**Example import:**
```typescript
import * as Dialog from "@radix-ui/react-dialog"

export function MyDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>Open</Dialog.Trigger>
      <Dialog.Content>
        {/* Custom styling here */}
      </Dialog.Content>
    </Dialog.Root>
  )
}
```

---

### Layer 2: Styled Components (shadcn/ui)

**Purpose:** Atoms and molecules: Radix primitives + Tailwind styling + design tokens.

**What it includes:**
- 46 shadcn components (fully typed, styled, composable)
- Tailwind CSS classes (semantic token-based)
- Dark mode support
- Animation support (CSS transitions)
- TypeScript interfaces for all props

**Examples:**
- `<Button>` (Radix's unstyled primitive + Tailwind styling + variants)
- `<Dialog>` wrapper with full styling
- `<Form>` with validation support
- `<Input>`, `<Select>`, `<Checkbox>`, `<RadioGroup>`
- `<Card>`, `<Badge>`, `<Avatar>`
- `<Tooltip>`, `<Popover>`, `<DropdownMenu>`

**Governance:**
- ❌ Never modify source files (read-only from Radix)
- ✅ Wrap components if you need custom behavior
- ✅ Combine components to create molecules
- ✅ Import and use directly

**When to use:**
- Building simple interfaces (buttons, forms, dialogs)
- Need both behavior AND styling
- Need quick, accessible, tested components
- Prototyping or MVP phase

**Example structure:**
```typescript
// Atom
import { Button } from "@/components/ui/button"

// Molecule (Button + Icon)
export function IconButton({ icon: Icon, ...props }) {
  return (
    <Button variant="ghost" size="icon" {...props}>
      <Icon className="h-4 w-4" />
    </Button>
  )
}

// Organism (Form group = Label + Input + Error)
export function FormField({ label, error, ...props }) {
  return (
    <div>
      <label>{label}</label>
      <Input {...props} />
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  )
}
```

---

### Layer 3: Composed Patterns (Tailwind UI Blocks)

**Purpose:** Organisms and templates: Pre-composed, production-ready patterns.

**What it includes:**
- 364 Tailwind UI blocks (organized by category)
- Page examples (6 full pages)
- All components token-swapped to design system
- Storybook stories with usage examples
- Real-world patterns (hero sections, pricing tables, testimonials, etc.)

**Categories (11 total):**
- **Page Examples** (6) — Full pages: Catalyst, Studio, Spotlight, Compass, Radiant, Sandbox
- **Feedback** (12) — Empty states, alerts, confirmations, toasts
- **Headings** (25) — Hero titles, section headings, gradient text
- **Application Shells** (23) — Sidebars, headers, layouts
- **Data Display** (19) — Stats, tables, cards, metrics
- **Overlays** (24) — Modals, dropdowns, popovers, tooltips
- **Layout** (38) — Grids, spacing, responsive patterns
- **Lists** (44) — Tables, lists, feeds, comments
- **Elements** (45) — Cards, buttons, badges, avatars
- **Navigation** (54) — Navbars, menus, breadcrumbs, tabs
- **Forms** (74) — Input patterns, multi-step forms, validation states

**Governance:**
- ⚠️ Use as-is or use as reference (study patterns, don't copy-paste raw)
- ✅ Adapt for your needs (different text, layout tweaks)
- ✅ Extract patterns for your project
- ❌ Don't modify unless adding to design system
- 🔖 Always include `@source: tailwind-ui` provenance

**When to use:**
- Building full pages or complex layouts
- Need production-tested patterns
- Time is critical (don't rebuild from atoms)
- Learning how components work together
- Complex forms, data tables, dashboards

**Example usage:**
```typescript
// Finding a block
// 1. Check: design-system-shadcn-tailwind/src/blocks/INDEX.md
// 2. Search for pattern: "hero with CTA" → page-examples/
// 3. Find: HeroWithCTA.tsx
// 4. Import and adapt:

import HeroWithCTA from "@/blocks/page-examples/HeroWithCTA"

// Then customize text, images, links:
<HeroWithCTA
  title="Your Title"
  subtitle="Your subtitle"
  ctaText="Your CTA"
  ctaLink="/your-link"
/>
```

---

## Custom Components Layer

When Layer 1, 2, and 3 don't cover your needs, build a **custom component** that fills the gap.

**What it includes:**
- 12 custom components (charts, date pickers, animations, data grid, navbar, file upload)
- 7 magic/animation components (BlurFade, Marquee, FadeText, etc.)
- All TypeScript, all token-compliant, all with Storybook stories
- Provenance: `@source: custom`

**Examples:**
- `DashboardLineChart` — Trend visualization (custom because shadcn has no charts)
- `DatePicker` — Date selection (custom because shadcn has no date picker)
- `BlurFade` — Blur reveal animation (custom because it's a specific animation effect)
- `DataGrid` — Sortable/filterable table (custom because shadcn Table doesn't have those features)

**Governance:**
- ✅ Can modify and improve
- ✅ Must follow component-conventions.md
- ✅ Must have Storybook story
- ✅ Must have TypeScript interface
- ✅ Must include @source header

**When to use:**
- After checking all three layers
- Building something genuinely new
- Will be reused (not a one-off)
- Generic enough to live in design system

**Process:**
1. Check component-inventory.md → Does it exist?
2. Check src/blocks/INDEX.md → Is there a pattern?
3. If "no" to both → Build custom component
4. Follow docs/component-conventions.md
5. Add Storybook story
6. Update component-inventory.md
7. Run token-audit-prompt.md to verify compliance

---

## Composition Patterns Across Layers

### Pattern 1: Atom → Molecule → Organism

The classic composition chain:

```typescript
// Layer 2, Atom: Button (shadcn)
import { Button } from "@/components/ui/button"

// Layer 2, Atom: Input (shadcn)
import { Input } from "@/components/ui/input"

// Layer 2, Molecule: Search (Button + Input)
export function SearchBox() {
  return (
    <div className="flex gap-2">
      <Input placeholder="Search..." />
      <Button>Search</Button>
    </div>
  )
}

// Layer 3, Organism: Hero with Search (Block from Tailwind UI)
import HeroWithSearch from "@/blocks/page-examples/HeroWithSearch"

// Uses SearchBox molecule inside
export function HomePage() {
  return <HeroWithSearch searchComponent={SearchBox} />
}
```

### Pattern 2: Layer 3 Block + Custom Wrapper

Sometimes a block is 90% right but needs a custom wrapper:

```typescript
// Layer 3, Block (Tailwind UI)
import PricingTable from "@/blocks/data-display/PricingTable"

// Custom wrapper (Layer 2 → 3 extension)
export function StripePricingTable() {
  const [prices, setPrices] = useState([])

  useEffect(() => {
    // Fetch from Stripe API
    fetchPrices().then(setPrices)
  }, [])

  return <PricingTable plans={prices} onSelect={handlePlanSelect} />
}
```

### Pattern 3: Custom Component Using Atoms + Blocks

Custom component that combines primitives and blocks:

```typescript
// Custom: DataGridWithFilters
// Uses: shadcn Table atom + shadcn Select atom + custom filter logic

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DataGridWithFilters({ data, columns }) {
  const [filter, setFilter] = useState("")

  const filtered = data.filter(row =>
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(filter.toLowerCase())
    )
  )

  return (
    <div>
      <Select value={filter} onValueChange={setFilter}>
        <SelectTrigger>
          <SelectValue placeholder="Filter..." />
        </SelectTrigger>
        <SelectContent>
          {/* Options */}
        </SelectContent>
      </Select>

      <Table>
        <TableHeader>
          {columns.map(col => (
            <TableHead key={col}>{col}</TableHead>
          ))}
        </TableHeader>
        <TableBody>
          {filtered.map(row => (
            <TableRow key={row.id}>
              {columns.map(col => (
                <TableCell key={col}>{row[col]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
```

---

## Design System Hierarchy in Practice

### Decision Tree: "What should I use?"

```
┌─────────────────────────────────────┐
│ I need to build X                   │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ Does shadcn have it? (Layer 2)      │
│ Check: component-inventory.md       │
└────────────┬────────────────────────┘
        YES  │  NO
             │
      ┌──────▼──────┐
      │ Use shadcn  │
      │ (import)    │
      └─────────────┘
             │
        NO   │
             ▼
┌─────────────────────────────────────┐
│ Is there a Tailwind UI block?       │
│ Check: src/blocks/INDEX.md          │
└────────────┬────────────────────────┘
        YES  │  NO
             │
      ┌──────▼────────────┐
      │ Use block as      │
      │ reference or      │
      │ adapt for your    │
      │ needs             │
      └───────────────────┘
             │
        NO   │
             ▼
┌─────────────────────────────────────┐
│ Is there a custom component?        │
│ Check: component-inventory.md       │
└────────────┬────────────────────────┘
        YES  │  NO
             │
      ┌──────▼──────────┐
      │ Use custom      │
      │ (import)        │
      └─────────────────┘
             │
        NO   │
             ▼
┌─────────────────────────────────────┐
│ Build custom component              │
│ Follow: component-conventions.md    │
└─────────────────────────────────────┘
```

### Real Example: "I need a pricing page"

1. **Check Layer 2 (shadcn)** → No pricing table component
2. **Check Layer 3 (blocks)** → Yes! `blocks/data-display/PricingTable.tsx`
3. **Use Layer 3** → Copy block, customize text, add your features
4. **If block doesn't fit** → Use as reference, build wrapper in Layer 2
5. **If still missing** → Add custom component to Layer 4

---

## Why This Structure Works

### Benefit 1: Separation of Concerns

Each layer has one job:
- Layer 1 (Radix): **Behavior** — keyboard nav, focus management, accessibility
- Layer 2 (shadcn): **Styling** — colors, spacing, dark mode, animations
- Layer 3 (Blocks): **Composition** — real-world patterns, complex layouts
- Layer 4 (Custom): **Gaps** — fill when layers 1-3 don't cover it

### Benefit 2: Prevents Design Decay

Without layers, you get "frankenstein components" (inconsistent, unmaintainable):
- ❌ Hardcoded colors instead of tokens
- ❌ Inconsistent spacing
- ❌ Missing accessibility
- ❌ Duplicate patterns (same thing built 3 different ways)

With layers:
- ✅ All atoms use the same primitives
- ✅ All molecules follow the same patterns
- ✅ All organisms use tokens (checked via token-audit-prompt.md)
- ✅ New patterns get added to blocks, not duplicated

### Benefit 3: Scalability

Works the same at 50 components and 500:
- New team member? Check component-inventory.md first
- Time pressure? Use a block from Layer 3
- Need something custom? Follow component-conventions.md
- Want consistency? All components use same tokens and patterns

### Benefit 4: AI-Friendly Documentation

AI tools (Claude, Cursor) can navigate this system:
- Layer 2: "Here are all 46 shadcn components with props and examples"
- Layer 3: "Here are 364 blocks organized by category"
- Layer 4: "Here's how to build a custom component"

---

## Detailed Layer Responsibilities

### Layer 1: Radix UI (Primitives)

| Aspect | Responsibility | Example |
|--------|-----------------|---------|
| **Behavior** | Keyboard nav, open/close, focus trap | Dialog Escape key closes |
| **Accessibility** | WCAG AA, semantic HTML, ARIA | Dialog manages focus automatically |
| **Styling** | None (unstyled) | No colors, spacing, or typography |
| **TypeScript** | Props interface, type safety | `DialogProps extends HTMLAttributes` |
| **Ownership** | Radix maintainers (read-only) | Can't modify source |

### Layer 2: shadcn/ui (Atoms & Molecules)

| Aspect | Responsibility | Example |
|--------|-----------------|---------|
| **Behavior** | Inherits from Radix | Button click handler works |
| **Accessibility** | Inherits from Radix | Button has focus state |
| **Styling** | Tailwind + tokens | `bg-primary text-primary-foreground` |
| **Variants** | cva-based (props) | `variant="primary" \| "secondary"` |
| **TypeScript** | Extended props interface | `ButtonProps extends HTMLButtonElement` |
| **Ownership** | Design system (read-only source) | Can wrap or extend, not modify |

### Layer 3: Tailwind UI Blocks (Organisms & Templates)

| Aspect | Responsibility | Example |
|--------|-----------------|---------|
| **Behavior** | Uses Layer 2 components | Form submission handled by Form component |
| **Accessibility** | Inherits from Layer 1-2 | All buttons inherit focus states |
| **Styling** | Tailwind + tokens (swapped) | All colors use `bg-primary`, not hardcoded |
| **Composition** | Multi-component patterns | Hero = Heading + Badge + Button + Image |
| **TypeScript** | Optional props, sensible defaults | Some props optional for simplicity |
| **Ownership** | Tailwind UI (reference) → Design system (adapted) | Token-swapped, document as reference |

### Layer 4: Custom Components (Fills Gaps)

| Aspect | Responsibility | Example |
|--------|-----------------|---------|
| **Behavior** | Specific to use case | DatePicker handles date selection logic |
| **Accessibility** | WCAG AA required | DatePicker has keyboard nav |
| **Styling** | Tokens required (token-audit) | `var(--color-primary)` not hardcoded |
| **Composition** | Can use layers 1-3 internally | DataGrid uses shadcn Table atoms |
| **TypeScript** | Full interface required | Complete props documentation |
| **Ownership** | Design system (full control) | Can modify, improve, deprecate |

---

## Common Questions

### Q: Can I modify a shadcn component?

**A:** Not the source file (read-only). Instead:
1. **Wrap it** — Create a new component that uses shadcn as base
2. **Compose it** — Combine it with other components
3. **Check custom layer** — Maybe you need a Layer 4 custom component

```typescript
// ❌ Don't modify shadcn Button directly
// src/components/ui/button.tsx — READ ONLY

// ✅ Create a wrapper instead
import { Button } from "@/components/ui/button"

export function PrimaryButton(props) {
  return <Button variant="default" size="lg" {...props} />
}
```

### Q: Can I use a Tailwind UI block as-is?

**A:** Yes, as reference or adapted:
```typescript
// ✅ Use as reference
import PricingTable from "@/blocks/data-display/PricingTable"

// ✅ Adapt with your data
<PricingTable plans={yourPlans} onSelect={handleSelect} />

// ✅ Or extract pattern and rebuild
// (take the structure, rebuild with your logic)
```

### Q: When should I build a custom component vs. wrapping an existing one?

**A:** Build custom if:
- Layers 1-3 don't solve the problem
- Will be reused (not one-off)
- Generic enough (not project-specific)

Otherwise: Wrap existing + add your logic.

### Q: If I find a design system gap, what do I do?

**A:** Report it:
1. Document what you needed
2. Propose where it fits (new block? custom component?)
3. Add to DESIGN-SYSTEM-CHECKLIST.md
4. Or build + contribute back to design system

---

## Further Reading

- **Philosophy & Principles:** `philosophy.md`
- **Component Decisions:** `component-guide.md`
- **Building Custom Components:** `design-system-shadcn-tailwind/docs/component-conventions.md`
- **Token System:** `token-system.md`
- **Available Components:** `design-system-shadcn-tailwind/docs/component-inventory.md`
- **Available Blocks:** `design-system-shadcn-tailwind/src/blocks/INDEX.md`
