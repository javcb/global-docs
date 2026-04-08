<!-- type: how-to -->

# Block Intake Prompt — Tailwind UI Plus → Design System

Reusable template for ingesting UI blocks from Tailwind UI Plus library into the design system component library.

---

## How to Use This Prompt

1. Replace all [BRACKETED PLACEHOLDERS] with actual values
2. Run the prompt in Claude Code with the design-system-shadcn-tailwind repo context
3. Follow the report format at the end of each batch
4. Do NOT commit until all blocks in a category are verified

---

## The Prompt

```
Process the following Tailwind UI Plus block category for design system integration:

SOURCE: ../javcb-templates/templates_tailwind-plus/[CATEGORY]/
TARGET CATEGORY: [CATEGORY NAME]
BLOCKS TO PROCESS: [FILE1.tsx, FILE2.tsx, FILE3.tsx, ...]

Follow this workflow for each block file:

### STEP 1: Inventory & Report

Read [BLOCK FILE] completely. Before making any changes, report:

1. **Hardcoded Tailwind color classes found:**
   List every class matching: text-*, bg-*, border-*, ring-*, fill-*, stroke-*
   Examples: text-gray-900, bg-blue-600, border-gray-200, ring-indigo-500
   Format: [ClassName] found on [Element]

2. **Raw interactive elements found:**
   List every: <button>, <input>, <textarea>, <select>, <a role="button">
   Format: <[Tag]> with classes="..." and props={...}

3. **Summary:**
   Total color swaps needed: [N]
   Total shadcn substitutions needed: [N]
   Decorative/special colors: [list any]

Do not proceed until this inventory is confirmed.

### STEP 2: Token Swap

Replace hardcoded colors with semantic design tokens using this mapping:

**Neutral backgrounds:**
- bg-white / bg-gray-50 / bg-gray-100 → bg-background / bg-muted / bg-muted
- bg-gray-900 / bg-black → bg-foreground

**Neutral text:**
- text-gray-900 / text-black → text-foreground
- text-gray-500 / text-gray-600 → text-muted-foreground
- text-white → text-primary-foreground

**Neutral borders:**
- border-gray-200 / border-gray-300 → border-border

**Primary colors:**
- bg-blue-600 / bg-indigo-600 / bg-cyan-600 → bg-primary
- text-blue-600 / text-indigo-600 / text-cyan-600 → text-primary
- hover:bg-blue-700 / hover:bg-indigo-700 → hover:bg-primary/90
- focus:ring-blue-500 / focus:ring-indigo-500 → focus:ring-ring

**Destructive colors:**
- bg-red-* → bg-destructive
- text-red-* → text-destructive
- hover:bg-red-* → hover:bg-destructive/90

**Decorative colors (DO NOT SWAP):**
For illustration colors, avatar backgrounds, chart series colors, or design accents:
Add `// DECORATIVE: [original class]` comment above the element.
Leave the original class unchanged.

Preserve all other attributes (onClick, onChange, className composition, event handlers, etc.) exactly.

### STEP 3: shadcn Component Substitution

Replace raw interactive elements with shadcn/ui components:

**Button:**
```
FROM: <button className="...">...</button>
TO:   import { Button } from "@/components/ui/button"
      <Button className="...">...</Button>
```

**Input:**
```
FROM: <input className="..." type="..." />
TO:   import { Input } from "@/components/ui/input"
      <Input className="..." type="..." />
```

**Textarea:**
```
FROM: <textarea className="...">...</textarea>
TO:   import { Textarea } from "@/components/ui/textarea"
      <Textarea className="..." />
```

**Select:**
```
FROM: <select className="..."><option>...</option></select>
TO:   import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
      <Select>
        <SelectTrigger className="...">
          <SelectValue placeholder="..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="...">...</SelectItem>
        </SelectContent>
      </Select>
```

**Link (if used as button):**
```
FROM: <a role="button" className="...">...</a>
TO:   import { Button } from "@/components/ui/button"
      <Button asChild>
        <a href="...">...</a>
      </Button>
```

Preserve all classNames, event handlers, data attributes, and accessibility props exactly.

### STEP 4: Create Story File

Create: `src/blocks/[CATEGORY]/[BlockName].stories.tsx`

```tsx
import type { Meta, StoryObj } from "@storybook/react"
import { [BlockName] } from "./[BlockName]"

const meta: Meta<typeof [BlockName]> = {
  title: "Blocks/[Category]/[BlockName]",
  component: [BlockName],
  layout: "fullscreen",
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <[BlockName] />,
}

export const Dark: Story = {
  parameters: {
    theme: "dark",
  },
  render: () => <[BlockName] />,
}
```

If block accepts props, add AllVariants and EdgeCases stories matching 
design-system-shadcn-tailwind/docs/component-conventions.md pattern.

### STEP 5: Verify Build

Run: `npm run typecheck`

If errors: fix TypeScript issues and re-run.
Report any errors and fixes.

### STEP 6: Report

For each processed block, provide:

**[BlockName.tsx] → [BlockName] component**
- Original file: ../javcb-templates/templates_tailwind-plus/[CATEGORY]/[BlockName.tsx]
- Target: src/blocks/[CATEGORY]/[BlockName].tsx
- Changes:
  - Token swaps: [N] classes (examples: bg-blue-600 → bg-primary, text-gray-500 → text-muted-foreground)
  - shadcn substitutions: [N] elements (examples: 3x <button> → Button, 1x <input> → Input)
  - Decorative colors preserved: [list any]
- Story created: src/blocks/[CATEGORY]/[BlockName].stories.tsx
- Build status: ✅ typecheck passes

**End of batch report:**
- Total blocks processed: [N]
- Total token swaps: [N]
- Total shadcn substitutions: [N]
- Files created: [N] components + [N] story files
- Manual review flags: [list any issues needing human decision]

```

---

## Placeholder Reference

| Placeholder | Example | Notes |
|---|---|---|
| [CATEGORY] | buttons, forms, tables, cards | Folder name from templates_tailwind-plus |
| [CATEGORY NAME] | Buttons, Forms, Tables, Cards | Human-readable category name (title case) |
| [BlockName] | PrimaryButton, SearchForm, DataTable | Converted from filename to PascalCase |
| [FILE1.tsx, FILE2.tsx, ...] | button-primary.tsx, button-secondary.tsx | Exact filenames from category folder |

---

## When to Use This Prompt

- Before adding any Tailwind UI Plus block to the design system
- When converting design-only blocks into code
- When you need consistent token mapping and shadcn substitution

---

## See Also

- `../global-docs/docs/design-system/architecture.md` — Design system context
- `../design-system-shadcn-tailwind/docs/component-conventions.md` — Story structure reference
- `../design-system-shadcn-tailwind/docs/token-audit-prompt.md` — Token compliance verification
