<!-- type: how-to -->

# Block Intake Prompt Template

**Use this prompt when ingesting Tailwind UI blocks into the design system.**

Paste this into Claude Code, replacing [BRACKETED VALUES] with actual paths and file names.

---

## Block Intake Workflow

You are ingesting [NUMBER] Tailwind UI Plus blocks from `javcb-templates/[CATEGORY]/` into the design system's `src/blocks/[CATEGORY]/` directory.

### PHASE 1: Inventory First (Report Only)

**Do NOT make any changes yet.** First, read the source block files and report what needs to be done.

**For each block file at:** `C:\dev\00_Github Repos\javcb\javcb-templates\[CATEGORY]\[FILENAME].tsx`

Read the file and report:

1. **Hardcoded Tailwind Color Classes Found:**
   - List every `text-*`, `bg-*`, `border-*`, `ring-*`, `fill-*`, `stroke-*` class
   - Group by category: neutral/gray (text-gray-*, bg-gray-*), brand colors (bg-blue-*, text-blue-*), etc.
   - Mark as `[DECORATIVE]` if it's purely visual (avatar backgrounds, illustrations, chart colors)
   - Example output:
     ```
     - text-gray-900 (3 occurrences)
     - bg-white, bg-gray-50 (2 occurrences each)
     - bg-blue-600 [5 occurrences] — needs to be bg-primary
     - border-gray-200 [2 occurrences] — needs to be border-border
     - text-blue-500 [avatar background, DECORATIVE]
     ```

2. **Raw Interactive Elements Found:**
   - List every `<button>`, `<input>`, `<textarea>`, `<select>`, `<a role="button">`, etc.
   - Include context: what does it do?
   - Example output:
     ```
     - <button> (3 total) — search, submit form, toggle menu
     - <input type="text"> (2 total) — search input, email field
     - <input type="checkbox"> (1) — agree to terms
     - <a href="..." role="button"> (1) — CTA link
     ```

3. **Interactive Event Handlers:**
   - List any `onClick`, `onChange`, `onSubmit`, etc.
   - Note if they're simple (navigation, toggle) or complex (state management)
   - Example: "onClick={() => setOpen(!open)}" — simple toggle

4. **Recommendation:**
   - Can fully convert with shadcn components? → YES/NO
   - Any complex interactions that need special handling? → LIST THEM
   - Estimate effort: Easy / Moderate / Complex

**Submit inventory report before proceeding to PHASE 2.**

---

### PHASE 2: Token Swap (Replace Color Classes)

Once you have approval to proceed, replace hardcoded Tailwind color classes with semantic token equivalents.

**Mapping Table:**

| Original Class | Token Replacement | Context |
|---|---|---|
| `bg-white`, `bg-gray-50`, `bg-gray-100` | `bg-background` or `bg-muted` | Surface colors |
| `bg-gray-900`, `bg-black` | `bg-foreground` | Text on light backgrounds |
| `text-gray-900`, `text-black` | `text-foreground` | Text on light backgrounds |
| `text-gray-500`, `text-gray-600` | `text-muted-foreground` | Muted/secondary text |
| `text-white` | `text-primary-foreground` or `text-background` | Text on colored backgrounds |
| `border-gray-200`, `border-gray-300` | `border-border` | Borders |
| `bg-blue-600`, `bg-indigo-600`, `bg-violet-600` | `bg-primary` | Primary brand color |
| `text-blue-600`, `text-indigo-600` | `text-primary` | Primary brand text |
| `hover:bg-blue-700`, `hover:bg-indigo-700` | `hover:bg-primary/90` | Primary hover state |
| `focus:ring-blue-500`, `focus:ring-indigo-500` | `focus:ring-ring` | Focus ring |
| `bg-red-*` (destructive actions) | `bg-destructive` | Danger/delete actions |
| `text-red-*` | `text-destructive` | Danger/delete text |
| `bg-green-*`, `bg-emerald-*` (success) | `bg-success` | Success states (if available; fallback to green token) |
| `bg-amber-*`, `bg-yellow-*` (warnings) | `bg-warning` | Warning states |
| `bg-cyan-*`, `bg-blue-*` (info) | `bg-info` | Info states |

**Special Case: Decorative Colors**

If a color is purely visual/decorative (avatar backgrounds, chart colors, illustration tints), keep the original class but add a comment:

```tsx
{/* DECORATIVE: avatar background color, not part of design token system */}
<div className="bg-blue-400" />
```

**Instructions for each file:**

1. Open the source file
2. Find and replace using the mapping table above
3. For classes not in the table, check if they're: 
   - **Neutral/gray** → use `border-border` or `text-muted-foreground`
   - **Accent colors** → check context; usually `bg-accent` or semantic state color
   - **Custom brand colors** → document as `// CUSTOM: [reason]` with original class
4. Save to `src/blocks/[CATEGORY]/[BLOCK-NAME].tsx` in design-system-shadcn-tailwind

---

### PHASE 3: shadcn Substitution (Replace HTML Elements)

Replace raw HTML interactive elements with shadcn components.

**Mapping Table:**

| Original | shadcn Replacement | Import Statement |
|---|---|---|
| `<button>...</button>` | `<Button>...</Button>` | `import { Button } from "@/components/ui/button"` |
| `<button variant="outline">` | `<Button variant="outline">` | (same import) |
| `<button disabled>` | `<Button disabled>` | (same import) |
| `<input type="text">` | `<Input type="text">` | `import { Input } from "@/components/ui/input"` |
| `<input type="email">` | `<Input type="email">` | (same import) |
| `<input type="search">` | `<Input type="search">` | (same import) |
| `<textarea>` | `<Textarea>` | `import { Textarea } from "@/components/ui/textarea"` |
| `<select>` | `<Select><SelectTrigger>...<SelectContent><SelectItem>...` | `import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"` |
| `<input type="checkbox">` | `<Checkbox>` | `import { Checkbox } from "@/components/ui/checkbox"` |
| `<input type="radio">` | `<RadioGroup><RadioGroupItem>` | `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"` |
| `<a href="..." role="button">` | `<Button asChild><a href="...">` | `import { Button } from "@/components/ui/button"` |

**Preservation Rules:**

- Keep the exact same className structure (Tailwind classes on the component)
- Preserve ALL event handlers: `onClick`, `onChange`, `onSubmit`, `onFocus`, etc. → move to shadcn component as-is
- Preserve ALL props: `disabled`, `required`, `placeholder`, `value`, `defaultValue`, etc.
- Preserve accessibility attributes: `id`, `aria-label`, `aria-describedby`, etc.
- Preserve form integration: `name`, `form`, `type` attributes if present

**Example:**

Before (raw HTML):
```tsx
<button 
  onClick={handleSearch} 
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
  type="submit"
>
  Search
</button>
```

After (shadcn):
```tsx
import { Button } from "@/components/ui/button"

<Button 
  onClick={handleSearch} 
  className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded"
  type="submit"
>
  Search
</Button>
```

---

### PHASE 4: Create Story File

Create `[BLOCK-NAME].stories.tsx` in the same directory as the block.

**Template:**

```tsx
import type { Meta, StoryObj } from "@storybook/react"
import [BlockName] from "./[BlockName]"

const meta: Meta = {
  title: "Blocks/[CATEGORY]/[BlockName]",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen", // blocks are full-width
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <[BlockName] />,
}

export const Interactive: Story = {
  render: () => {
    // If the block has interactive state, show it here
    // Example: with a modal open, with form filled, etc.
    return <[BlockName] />
  },
}
```

**Rules:**
- Title format: `"Blocks/[CATEGORY]/[BlockName]"` (matches directory structure)
- Default story shows the block as-is
- If the block has interactive state (modal, form state, expanded section), create second story showing that state
- Layout: `"fullscreen"` so blocks display at full width in Storybook

---

### PHASE 5: Verify & Commit

1. **For each block converted, run:**
   ```bash
   npm run typecheck
   npm run build-storybook
   ```

2. **After all blocks in category are done:**
   ```bash
   npm run typecheck    # Should pass (exit 0)
   npm run build-storybook  # Should show "X modules transformed"
   ```

3. **If any errors:**
   - Fix TypeScript errors (import paths, prop types)
   - Fix Storybook story issues (missing imports, render errors)
   - Re-run verification

4. **If all pass:**
   - Commit the block intake batch
   - Update the block intake log in global-docs

---

## Summary Report Template

After completing the block intake, provide this summary:

```
╔════════════════════════════════════════════════════════════════════════════╗
║                      BLOCK INTAKE SUMMARY REPORT                          ║
║                        [CATEGORY] / [DATE]                                ║
╚════════════════════════════════════════════════════════════════════════════╝

Source: javcb-templates/[CATEGORY]/
Target: design-system-shadcn-tailwind/src/blocks/[CATEGORY]/

BLOCKS PROCESSED: [NUMBER]
├─ Block 1: [FILENAME] → [CHANGES MADE]
├─ Block 2: [FILENAME] → [CHANGES MADE]
└─ Block N: [FILENAME] → [CHANGES MADE]

TOKENS SWAPPED:
├─ Hardcoded color classes: [COUNT]
├─ Raw interactive elements: [COUNT]
└─ Decorative colors (no swap): [COUNT]

SHADCN COMPONENTS ADDED:
├─ Buttons: [COUNT]
├─ Inputs: [COUNT]
├─ Selects: [COUNT]
└─ [OTHER]: [COUNT]

STORY FILES CREATED: [NUMBER]

VERIFICATION RESULTS:
├─ npm run typecheck: ✅ PASS / ❌ FAIL
└─ npm run build-storybook: ✅ PASS ([X] modules) / ❌ FAIL

NEXT STEPS:
├─ Commit batch
├─ Browse in Storybook: http://localhost:6006/?path=/docs/blocks-[category]-...
└─ [ANY OUTSTANDING ITEMS]
```

---

## Examples of Common Block Conversions

### Example 1: Hero Section

**Source:** `javcb-templates/marketing/hero-with-gradient.tsx`

**Inventory Report:**
- Color classes: `bg-blue-600`, `text-white`, `bg-gradient-to-r from-blue-600 to-purple-600`
- Elements: `<a href="..." className="..." role="button">` (CTA), `<button>` (secondary CTA)

**After Token Swap:**
- `bg-blue-600` → `bg-primary`
- `text-white` → `text-primary-foreground`
- `bg-gradient-to-r from-blue-600 to-purple-600` → `bg-gradient-to-r from-primary to-accent`

**After shadcn Wire:**
- `<a ... role="button">` → `<Button asChild><a href="...">`
- Plain `<button>` → `<Button variant="outline">`

**Result:** Full hero section using tokens + shadcn buttons ✅

---

### Example 2: Feature Grid

**Source:** `javcb-templates/app-ui/feature-grid.tsx`

**Inventory Report:**
- Color classes: `border-gray-200`, `bg-gray-50`, `text-gray-900`
- Elements: No interactive elements (display only)

**After Token Swap:**
- `border-gray-200` → `border-border`
- `bg-gray-50` → `bg-muted`
- `text-gray-900` → `text-foreground`

**After shadcn Wire:**
- No interactive elements to replace

**Result:** Feature grid displaying with semantic tokens ✅

---

### Example 3: Data Input Form

**Source:** `javcb-templates/app-ui/user-form.tsx`

**Inventory Report:**
- Color classes: `text-red-600`, `focus:ring-blue-500`
- Elements: `<input type="email">`, `<input type="text">`, `<textarea>`, `<button type="submit">`

**After Token Swap:**
- `text-red-600` → `text-destructive` (error message)
- `focus:ring-blue-500` → `focus:ring-ring`

**After shadcn Wire:**
- `<input type="email">` → `<Input type="email">`
- `<input type="text">` → `<Input type="text">`
- `<textarea>` → `<Textarea>`
- `<button type="submit">` → `<Button type="submit">`

**Result:** Form fully using shadcn inputs + tokens ✅

---

## Questions?

Refer to:
- **Token values:** `design-system-shadcn-tailwind/src/styles/tokens.css`
- **shadcn component props:** `design-system-shadcn-tailwind/docs/usage-for-ai.md`
- **Architecture:** `global-docs/docs/design-system/architecture.md`
