<!-- type: explanation -->

# Design System Architecture

## Overview

**Purpose:** A single, browsable, AI-friendly design system that can be used to build or recreate any app or website on demand.

**Stack:** Next.js 15, Tailwind v4, shadcn/ui, Storybook v10, Radix UI

**Repository:** `design-system-shadcn-tailwind` (in this profile)

**Access:** Storybook at `http://localhost:6006/` (run `npm run storybook` in the repo)

---

## The Three-Layer Model

The design system is built as a composable stack where each layer builds on the one below. Understanding this hierarchy is essential for knowing what to use when.

### Layer 1 — Unstyled Primitives (Radix UI)

**What it is:** Low-level, accessibility-first component primitives from the Radix UI library.

**Provides:**
- Full keyboard navigation (Tab, Enter, Escape, Arrow keys)
- Screen reader support (ARIA labels, roles, live regions)
- Focus management and focus trapping
- Accessible patterns (modal focus, menu keyboard shortcuts, etc.)
- Event handling and state management primitives

**How you access it:** Automatically, via shadcn/ui. You never import Radix directly.

**Location:** `node_modules/@radix-ui/*` (not source-controlled)

**Rule:** Treat Radix as read-only. It's the accessibility foundation — all components build on top of it.

**Example components using Radix:**
- Dialog (uses `@radix-ui/react-dialog`)
- Select (uses `@radix-ui/react-select`)
- Dropdown Menu (uses `@radix-ui/react-dropdown-menu`)
- Tabs, Accordion, Collapsible, etc.

---

### Layer 2 — Styled Primitives (shadcn/ui)

**What it is:** Radix UI primitives wrapped with Tailwind CSS styling and design token integration.

**Provides:**
- All Radix accessibility + keyboard behavior
- Tailwind CSS styling with design tokens
- CVA (Class Variance Authority) for variant management
- TypeScript types and full prop support
- Storybook documentation with stories for every component

**How you access it:** Import directly from `@/components/ui/[component]`

**Location:** `src/components/ui/` in design-system-shadcn-tailwind

**Components included:** 43 shadcn/ui components installed and story-covered
- Form inputs (Button, Input, Textarea, Select, Checkbox, RadioGroup, Switch, Slider, etc.)
- Content & Display (Card, Badge, Avatar, Skeleton, Table, etc.)
- Navigation (Navbar, Sidebar, Pagination, Tabs, Breadcrumb, etc.)
- Overlays & Dialogs (Dialog, AlertDialog, Drawer, Sheet, Popover, Tooltip, etc.)
- Layout (ScrollArea, Resizable, AspectRatio, Carousel, Accordion, etc.)

**Rule:** Never rewrite shadcn internals. Customize via:
1. **CVA variants** — the shadcn pattern for styling
2. **Design tokens** — for color, spacing, typography
3. **Wrapper components** — build custom components that use shadcn as a base

**Anti-pattern:** Forking shadcn components or modifying `src/components/ui/[component].tsx` internals. If a component doesn't work for your use case, build a wrapper or custom component in Layer 3.

---

### Layer 3 — Blocks (Tailwind UI Plus)

**What it is:** Pre-composed, production-quality UI sections and patterns from Tailwind UI Plus (licensed, premium Tailwind component library).

**Provides:**
- Full page sections (hero, CTAs, navigation layouts, footers, etc.)
- Marketing components (testimonials, pricing tables, feature grids, etc.)
- App UI patterns (dashboards, tables, forms, cards, etc.)
- E-commerce patterns (product grids, checkout flows, etc.)
- Complex interactions and animations

**Source:** `javcb-templates` repo (private, licensed Tailwind UI Plus resource) → processed through block intake workflow → copied into `src/blocks/[category]/`

**Location:** `src/blocks/[category]/[block-name]/` in design-system-shadcn-tailwind

**How they're prepared:** 
1. Copy block from javcb-templates
2. Token-swap: Replace hardcoded Tailwind color classes with semantic tokens
3. shadcn-wire: Replace raw HTML interactive elements with shadcn components
4. Add `.stories.tsx` file for Storybook catalog
5. Treat as read-only after intake (source of truth is javcb-templates)

**Rule:** Blocks are read-only. If you need to modify a block, the change goes back to javcb-templates, gets re-ingested, and then merged locally.

**Browsable in:** Storybook under the `Blocks/` section, organized by category (Marketing, App UI, Ecommerce, etc.)

---

### Custom Components (Layer 2 Extension)

**What they are:** Components that fill gaps shadcn doesn't cover, built with the same patterns as shadcn components.

**Location:** `src/components/[ComponentName]/` in design-system-shadcn-tailwind

**Included custom components:**
- **Stat** — KPI metric card with value, trend, change indicator (for dashboards)
- **DataGrid** — Sortable/filterable data table wrapper (extends Table with interactivity)
- **Navbar** — Top navigation bar with brand, items, actions (app/site header)
- **SearchInput** — Enhanced input with search icon, clear button, loading state
- **FileUpload** — Drag-and-drop file upload area with validation and feedback

**Requirements for custom components:**
1. **File structure:** Every custom component has exactly 3 files:
   - `[Name].tsx` — component implementation
   - `[Name].stories.tsx` — Storybook stories (Default, AllVariants, EdgeCases)
   - `index.ts` — named export

2. **Patterns:**
   - Use `forwardRef` + `displayName` if it's a DOM-wrapping component
   - Use `cva` (Class Variance Authority) for all variant styling
   - Import shadcn components as needed (e.g., DataGrid uses Table)
   - Use semantic tokens for colors/spacing (no hardcoded hex values)

3. **TypeScript:** Full prop typing, `React.ReactNode` for children, optional props clearly marked

**Full conventions:** See `design-system-shadcn-tailwind/docs/component-conventions.md`

---

## Token System

**Purpose:** A single source of truth for all design decisions — colors, spacing, typography, radius, shadows.

**Location:** `src/styles/tokens.css` in design-system-shadcn-tailwind

**Technology:** Tailwind CSS v4 CSS-first approach (not a JS config file)
- Tokens are CSS custom properties (variables)
- Defined in `@theme` blocks
- Override mechanism via `[data-theme="dark-default"]` attribute

**Token Types:**

| Category | Examples | Usage |
|----------|----------|-------|
| **Colors** | `--color-primary`, `--color-neutral-900`, `--color-error` | Used in Tailwind classes: `bg-primary`, `text-foreground` |
| **Spacing** | `--spacing: 0.25rem` (base unit) | Used as Tailwind spacing: `p-4`, `gap-6`, `m-8` |
| **Typography** | `--font-sans`, `--font-mono` | Used in Tailwind font classes |
| **Semantic** | `--color-background`, `--color-foreground`, `--color-border` | Platform-level tokens for colors |

**Dark Mode:** 
- Light theme is default (applied to `:root`)
- Dark theme applied when `[data-theme="dark-default"]` attribute is set on root element
- Fallback for system preference via `@media (prefers-color-scheme: dark)`

**Tailwind Bridge:**
- `src/styles/shadcn-bridge.css` maps design tokens to shadcn CSS variables
- Example: `--background: var(--color-surface);`
- This allows shadcn components to use token values

**Critical Rules:**

❌ **Never do:**
- Hardcoded hex values: `color: '#2563eb'`
- Concrete Tailwind colors: `bg-blue-600`, `text-slate-900`, `border-gray-200`
- Hardcoded spacing: `padding: '16px'`

✅ **Always do:**
- Use semantic token names: `bg-primary`, `text-muted-foreground`, `border-border`
- Use Tailwind token scale: `p-4` (not `p-5`), `gap-6` (not `gap-5`)
- Reference CSS variables in code: `var(--color-primary)`

---

## Storybook Catalog Structure

**Purpose:** Browser-based component discovery and documentation. Every component has interactive stories.

**URL:** `http://localhost:6006/` (run `npm run storybook` in design-system-shadcn-tailwind)

**Left Sidebar Grouping:**

```
Primitives/
├── ui/
│   ├── button
│   ├── input
│   ├── dialog
│   └── [40+ more shadcn components]
└── Each component has 3 stories: Default, AllVariants, EdgeCases

Custom/
├── stat
├── data-grid
├── navbar
├── search-input
└── file-upload

Blocks/
├── Marketing/
│   ├── hero-with-cta
│   ├── testimonials
│   └── [marketing components]
├── AppUI/
│   ├── dashboard-card
│   ├── data-table
│   └── [app UI components]
└── [more categories...]
```

**Story Pattern (every component):**

1. **Default** — Basic usage with minimal props
2. **AllVariants** — Shows every size/variant combination
3. **EdgeCases** — Boundary conditions, empty states, special scenarios

**Dark Theme Toggle:** Top-right corner in Storybook UI. Uses Storybook's addon-themes with the `[data-theme="dark-default"]` attribute.

---

## Provenance Rules

Understanding what came from where is essential for knowing what's safe to modify.

| Source | Location | Modifiable? | Rules |
|--------|----------|-------------|-------|
| **Radix UI** | `node_modules/@radix-ui/*` | ❌ No | Read-only. Accessibility foundation. |
| **shadcn/ui** | `src/components/ui/[component]` | ❌ No | Read-only. Use CVA + tokens to customize. |
| **Custom Components** | `src/components/[Name]` | ✅ Yes | Built by us. Follow component-conventions.md |
| **Blocks (Tailwind UI)** | `src/blocks/[category]/[block]` | ⚠️ Sync only | Token-swapped + shadcn-wired. Changes go to javcb-templates, then re-ingested. |

**How to know:**
- Files in `components/ui/` → check if named in component-inventory.md → if yes, it's shadcn, don't modify
- Files in `components/[Name]/` → it's custom, follow component-conventions.md
- Files in `blocks/` → they're from Tailwind UI, token-swapped. Modify javcb-templates source instead.

---

## When to Use What (Decision Tree)

Use this flowchart when deciding where a component should come from:

```
"I need a component/pattern for [description]"
    │
    ├─→ "Does shadcn have it?" (check component-inventory.md)
    │   ├─→ YES → Use it from src/components/ui/[component]
    │   └─→ NO ↓
    │
    ├─→ "Does a Tailwind UI block cover this pattern?" (check Storybook Blocks/)
    │   ├─→ YES → Use it from src/blocks/[category]/[block]
    │   └─→ NO ↓
    │
    └─→ "Build a custom component in src/components/[Name]/"
        Follow: component-conventions.md
        Use: forwardRef, cva, tokens, Storybook stories
```

**Examples:**

| Need | Source | Why |
|------|--------|-----|
| A button | shadcn Button | Primitive, already styled |
| A checkbox with label | shadcn Checkbox + Label | Primitives, compose together |
| A marketing hero section | Tailwind UI block | Full pre-designed section |
| A KPI metric card | Custom Stat component | Gap shadcn doesn't fill |
| A sortable data table | Custom DataGrid (uses Table) | Wrapper around shadcn Table |
| A full dashboard layout | Blocks + primitives | Compose from both layers |

---

## Block Intake Process (Summary)

When adding a new Tailwind UI block to the system:

1. **Copy** the block from `javcb-templates/[category]/[block-name]`
2. **Token-Swap** all hardcoded Tailwind color classes (text-blue-*, bg-gray-*, etc.) to semantic tokens (text-primary, bg-background, etc.)
3. **shadcn-Wire** replace raw HTML interactive elements (<button>, <input>, <a role="button">) with shadcn equivalents (Button, Input, etc.)
4. **Create Story** add `[BlockName].stories.tsx` with Default story showing full block
5. **Verify** `npm run typecheck && npm run build-storybook` pass clean
6. **Commit** update gets pushed, source of truth remains in javcb-templates

**Full intake prompt template:** See `prompts/block-intake.md` in global-docs

---

## AI Usage

When instructing Claude or Cursor to build something using this design system:

1. **Point to reproduction prompt:** `design-system-shadcn-tailwind/docs/reproduction-prompt.md`
   - Gives the AI a structured workflow for recreating external UIs

2. **Always check component inventory first:** AI should read `docs/component-inventory.md`
   - Before writing any JSX, verify components are available
   - Prevents building what already exists

3. **Token audit after every build:** Use `docs/token-audit-prompt.md`
   - Verify no hardcoded colors, no concrete Tailwind classes
   - Ensure semantic tokens used throughout

4. **Storybook as source of truth:** Always point to Storybook stories as examples
   - Shows working code + visual preview
   - Every component has Default, AllVariants, EdgeCases examples

**Example Instruction:**
> "Recreate [external UI] using design-system-shadcn-tailwind. Follow docs/reproduction-prompt.md. 
> Check component-inventory.md before writing code. Audit with token-audit-prompt.md when done."

---

## Reference Files

- **Component Conventions:** `design-system-shadcn-tailwind/docs/component-conventions.md`
- **Component Inventory:** `design-system-shadcn-tailwind/docs/component-inventory.md`
- **Component Usage Reference:** `design-system-shadcn-tailwind/docs/usage-for-ai.md`
- **Reproduction Prompt:** `design-system-shadcn-tailwind/docs/reproduction-prompt.md`
- **Token Audit Prompt:** `design-system-shadcn-tailwind/docs/token-audit-prompt.md`
- **Project Status:** `design-system-shadcn-tailwind/DESIGN-SYSTEM-CHECKLIST.md`
- **Session Instructions:** `design-system-shadcn-tailwind/CLAUDE.md` and `.cursorrules`
