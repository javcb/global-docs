<!-- type: skill-execution -->

# Skill: Block Intake

Ingest Tailwind UI Plus blocks into design system. Five-phase workflow: inventory, token swap, shadcn substitution, story file creation, verification.

---

## Metadata

| Attribute | Value |
|---|---|
| **Skill ID** | `skill-block-intake` |
| **Type** | execution (procedural) |
| **Version** | 2.0 |
| **Status** | ACTIVE |
| **Created** | 2026-04-08 (migrated from prompts/) |
| **Last Reviewed** | 2026-04-08 |
| **Dependencies** | skill-prompting-core |
| **Domains** | professional-work (design) |

---

## Summary

**Ingest Tailwind UI blocks into the design system.**

Takes raw Tailwind UI Plus components from `javcb-templates/[CATEGORY]/` and converts them into design-system-native blocks by swapping hardcoded colors for semantic tokens and replacing raw HTML with shadcn components. Process requires approval gates between phases.

---

## When to Use This Skill

- **Use this skill when:** Importing a new batch of Tailwind UI blocks into the design system
- **Do NOT use this skill when:** Refactoring existing design system blocks, fixing bugs in existing blocks, or updating styling
- **Prerequisite state:** 
  - Target design system repo is cloned locally
  - Source Tailwind UI blocks exist in `javcb-templates/[CATEGORY]/`
  - shadcn components are installed in target repo
  - Semantic token system is defined in `src/styles/tokens.css`

---

## Input Requirements

### Required Inputs
- **Source directory:** Path to Tailwind UI blocks (e.g., `C:\dev\00_Github Repos\javcb\javcb-templates\[CATEGORY]\`)
- **Target directory:** Design system repo path (e.g., `design-system-shadcn-tailwind/src/blocks/[CATEGORY]/`)
- **Category:** Which category of blocks (e.g., marketing, app-ui, forms)
- **Block filenames:** Which specific block files to ingest (e.g., hero-with-gradient.tsx)

### Optional Inputs
- **Variant stories:** Should stories include interactive state variants? (default: yes)

### Assumptions
- Source blocks use Tailwind utility classes only (no custom CSS)
- All interactive elements use standard HTML (button, input, textarea, select, checkbox, radio)
- Design system semantic tokens are up to date
- shadcn components are already installed in design system

---

## Execution Flow

### Phase 1: Inventory (Report Only)

**Goal:** Catalog all color classes, interactive elements, and handlers. Recommend if this block can be fully converted.

**Do NOT make any changes in this phase.** Report only.

For each block file:

1. Read the source file completely
2. Catalog **hardcoded Tailwind color classes:**
   - List every `text-*`, `bg-*`, `border-*`, `ring-*`, `fill-*`, `stroke-*` class
   - Group by category: neutral/gray, brand colors, state colors (destructive, success, warning, info)
   - Mark as `[DECORATIVE]` if purely visual (avatars, illustrations, chart colors)
3. Catalog **raw interactive elements:**
   - Every `<button>`, `<input>`, `<textarea>`, `<select>`, `<a role="button">`, etc.
   - Include purpose (search, submit, toggle, navigation, etc.)
4. Catalog **interactive handlers:**
   - Every `onClick`, `onChange`, `onSubmit`, `onFocus`, etc.
   - Note if simple (navigation, toggle) or complex (state management)
5. Assess **convertibility:**
   - Can this block be fully converted using shadcn components? → YES / PARTIAL / NO
   - Any complex interactions needing special handling? → List them
   - Estimate effort: Easy / Moderate / Complex

**Approval Gate:** Submit inventory report. Pause before proceeding. User must approve before moving to Phase 2.

**Output Format:**

```
INVENTORY REPORT — [BLOCK-NAME]

Source: [SOURCE-PATH]
Target: [TARGET-PATH]

HARDCODED COLORS:
├─ text-gray-900 (3 occurrences) → text-foreground
├─ bg-white, bg-gray-50 (2 occurrences each) → bg-background / bg-muted
├─ bg-blue-600 (5 occurrences) → bg-primary
├─ border-gray-200 (2 occurrences) → border-border
└─ [DECORATIVE] bg-blue-400 (avatar background)

INTERACTIVE ELEMENTS:
├─ <button> (3 total) — search, submit form, toggle menu
├─ <input type="text"> (2 total) — search input, email field
├─ <input type="checkbox"> (1) — agree to terms
└─ <a href="..." role="button"> (1) — CTA link

HANDLERS:
├─ onClick={handleSearch} — simple (navigation)
├─ onChange={setOpen(!open)} — simple (toggle)
└─ onSubmit={submitForm} — simple (form submission)

CONVERTIBILITY: YES
Effort: [Easy / Moderate / Complex]
Issues: [None / List any issues]

Ready to proceed to Phase 2.
```

---

### Phase 2: Token Swap (Replace Color Classes)

**Goal:** Replace hardcoded Tailwind color classes with semantic token equivalents.

Once you have approval to proceed:

1. Open each source block file
2. Apply color class mappings (see reference table below)
3. For classes not in the table:
   - If neutral/gray → `border-border` or `text-muted-foreground`
   - If accent → `bg-accent`
   - If custom → add comment `// CUSTOM: [reason]` with original class
4. For **decorative colors**, keep original class and add comment:
   ```tsx
   {/* DECORATIVE: avatar background color, not part of design token system */}
   <div className="bg-blue-400" />
   ```

**Approval Gate:** Report token swaps per-file. Pause before proceeding to Phase 3.

**Output Format:**

```
TOKEN SWAP — [BLOCK-NAME]

Source: [SOURCE-PATH]
Status: ✅ COMPLETE

REPLACEMENTS:
├─ bg-white → bg-background (1 occurrence)
├─ text-gray-900 → text-foreground (3 occurrences)
├─ bg-blue-600 → bg-primary (5 occurrences)
├─ border-gray-200 → border-border (2 occurrences)
└─ bg-blue-400 [DECORATIVE] — kept as-is, added comment

Total classes swapped: [NUMBER]
Decorative classes: [NUMBER]

Ready to proceed to Phase 3.
```

**Color Mapping Reference Table:**

| Original Class | Token Replacement | Context |
|---|---|---|
| `bg-white`, `bg-gray-50`, `bg-gray-100` | `bg-background` or `bg-muted` | Surface colors |
| `bg-gray-900`, `bg-black` | `bg-foreground` | Strong foreground |
| `text-gray-900`, `text-black` | `text-foreground` | Text on light backgrounds |
| `text-gray-500`, `text-gray-600` | `text-muted-foreground` | Muted/secondary text |
| `text-white` | `text-primary-foreground` or `text-background` | Text on colored backgrounds |
| `border-gray-200`, `border-gray-300` | `border-border` | Borders |
| `bg-blue-600`, `bg-indigo-600`, `bg-violet-600` | `bg-primary` | Primary brand color |
| `text-blue-600`, `text-indigo-600` | `text-primary` | Primary brand text |
| `hover:bg-blue-700`, `hover:bg-indigo-700` | `hover:bg-primary/90` | Primary hover state |
| `focus:ring-blue-500`, `focus:ring-indigo-500` | `focus:ring-ring` | Focus ring |
| `bg-red-*` (destructive) | `bg-destructive` | Danger/delete actions |
| `text-red-*` | `text-destructive` | Danger/delete text |
| `bg-green-*`, `bg-emerald-*` (success) | `bg-success` | Success states |
| `bg-amber-*`, `bg-yellow-*` (warnings) | `bg-warning` | Warning states |
| `bg-cyan-*`, `bg-blue-*` (info) | `bg-info` | Info states |

---

### Phase 3: shadcn Substitution (Replace HTML Elements)

**Goal:** Replace raw HTML interactive elements with shadcn components. Preserve all props, handlers, and accessibility attributes.

Once approved:

1. For each interactive element, apply shadcn mapping (see reference table below)
2. **Preserve everything:** className, all event handlers, all props, all accessibility attributes
3. Example transformation:

**Before:**
```tsx
<button 
  onClick={handleSearch} 
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
  type="submit"
>
  Search
</button>
```

**After:**
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

**Approval Gate:** Report shadcn substitutions per-file. Pause before proceeding to Phase 4.

**Output Format:**

```
SHADCN SUBSTITUTION — [BLOCK-NAME]

Source: [SOURCE-PATH]
Status: ✅ COMPLETE

COMPONENTS ADDED:
├─ Button (3 instances)
├─ Input (2 instances: type="text", type="email")
├─ Checkbox (1 instance)
└─ Total: 6 shadcn components

IMPORTS ADDED:
├─ import { Button } from "@/components/ui/button"
├─ import { Input } from "@/components/ui/input"
└─ import { Checkbox } from "@/components/ui/checkbox"

PRESERVATION NOTES:
├─ All onClick handlers preserved
├─ All form attributes preserved (type, name, required, disabled)
├─ All accessibility attributes preserved (id, aria-label, aria-describedby)
└─ All Tailwind className attributes preserved

Ready to proceed to Phase 4.
```

**HTML to shadcn Mapping Reference Table:**

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

---

### Phase 4: Create Story File

**Goal:** Add Storybook story file for documentation and visual testing.

Once approved:

1. Create file: `[BLOCK-NAME].stories.tsx` in same directory as block
2. Use Storybook template (see below)
3. Create stories:
   - **Default:** Block as-is with default props
   - **Interactive:** If block has interactive state (modal open, form filled, etc.), create variant showing that state

**Approval Gate:** None (automated from Phase 3 output)

**Output Format:**

```
STORY FILE CREATED — [BLOCK-NAME]

File: [TARGET-PATH]/[BLOCK-NAME].stories.tsx
Status: ✅ CREATED

STORIES:
├─ Default — Block in default state
└─ [Interactive — Block with state variant if applicable]

Storybook path: http://localhost:6006/?path=/docs/blocks-[category]-[blockname]
```

**Storybook Template:**

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
- Default story shows the block in default state
- If block has interactive state, create Interactive story showing that state
- Layout: `"fullscreen"` so blocks display at full width

---

### Phase 5: Verify & Commit

**Goal:** Run TypeScript and Storybook checks. Verify all conversions are valid. Commit batch.

Once all blocks in category are converted:

1. Run TypeScript check:
   ```bash
   npm run typecheck
   ```
   - Should pass (exit 0)
   - If errors: Fix import paths, prop types, TypeScript errors

2. Run Storybook build:
   ```bash
   npm run build-storybook
   ```
   - Should show "X modules transformed"
   - If errors: Fix story imports, render errors, missing exports

3. If all pass:
   - Commit the block intake batch
   - Update block intake log in global-docs (reference tracking)

**Approval Gate:** None (verification only; if checks fail, return to Phase 3)

**Output Format:**

```
VERIFICATION REPORT — [CATEGORY] / [DATE]

Blocks processed: [NUMBER]
├─ [FILENAME] → [token swaps], [components added]
├─ [FILENAME] → [token swaps], [components added]
└─ [FILENAME] → [token swaps], [components added]

VERIFICATION RESULTS:
├─ npm run typecheck: ✅ PASS (0 errors)
├─ npm run build-storybook: ✅ PASS (X modules transformed)
└─ Manual Storybook review: ✅ All stories render correctly

SUMMARY:
├─ Total token classes swapped: [NUMBER]
├─ Total shadcn components added: [NUMBER]
├─ Total story files created: [NUMBER]
└─ Status: ✅ READY TO COMMIT

Next: Commit batch and merge to main.
```

---

## Output Format (All Phases)

Always report per-file at each phase. Use structured format above for each phase. Pause at approval gates.

---

## Error Handling

| Error Condition | Resolution |
|---|---|
| Source block file not found | Stop. Verify source path and filename. |
| Interactive elements use framework state (e.g., `useState`) | Preserve handler as-is; note in output that handler logic is preserved. |
| Color class not in mapping table | Classify as neutral/gray/accent, apply default token, add comment `// [REASON]`. |
| shadcn component requires additional props | Update implementation with required props; note in Phase 3 output. |
| TypeScript errors after shadcn substitution | Check import paths, prop types, React version compatibility. Fix and re-run typecheck. |
| Storybook build fails | Check story imports, component exports, render syntax. Fix and re-run build. |

---

## Examples

### Example 1: Hero Section with CTA

**Input:**
- Source: `javcb-templates/marketing/hero-with-gradient.tsx`
- 2 buttons (primary + secondary), 1 heading, gradient background

**Phase 1 Output:**
```
INVENTORY REPORT — hero-with-gradient

Hardcoded colors:
├─ bg-gradient-to-r from-blue-600 to-purple-600
├─ text-white (3 occurrences)
└─ bg-blue-600 (hover state)

Interactive elements:
├─ <button> (2 total) — primary CTA, secondary CTA
└─ onClick handlers (simple navigation)

Convertibility: YES | Effort: Easy
```

**Phase 2 Output:**
```
TOKEN SWAP — hero-with-gradient

├─ bg-gradient-to-r from-blue-600 to-purple-600 → bg-gradient-to-r from-primary to-accent
├─ text-white → text-primary-foreground
└─ bg-blue-600 → bg-primary

Total swapped: 5 classes
```

**Phase 3 Output:**
```
SHADCN SUBSTITUTION — hero-with-gradient

├─ <button> → <Button> (2 instances)
└─ Imports added: Button

All onClick handlers preserved.
```

**Phase 5 Output:**
```
VERIFICATION REPORT — marketing / 2026-04-08

✅ npm run typecheck: PASS
✅ npm run build-storybook: PASS (12 modules)
Ready to commit.
```

---

### Example 2: Data Input Form

**Input:**
- Source: `javcb-templates/app-ui/user-form.tsx`
- 3 inputs (email, text, search), 1 textarea, 1 select, 1 checkbox, 1 submit button
- Error display (red text for validation errors)

**Phase 1 Output:**
```
INVENTORY REPORT — user-form

Hardcoded colors:
├─ text-red-600 (error message) → text-destructive
├─ focus:ring-blue-500 (focus ring) → focus:ring-ring
└─ bg-gray-50 (field background) → bg-muted

Interactive elements:
├─ <input type="email"> (1)
├─ <input type="text"> (1)
├─ <input type="search"> (1)
├─ <textarea> (1)
├─ <select> (1)
├─ <input type="checkbox"> (1)
└─ <button type="submit"> (1)

Handlers: onSubmit (form submission), onChange (field updates) — simple

Convertibility: YES | Effort: Moderate
```

**Phase 3 Output:**
```
SHADCN SUBSTITUTION — user-form

├─ <input type="email"> → <Input type="email">
├─ <input type="text"> → <Input type="text">
├─ <input type="search"> → <Input type="search">
├─ <textarea> → <Textarea>
├─ <select> → <Select>
├─ <input type="checkbox"> → <Checkbox>
└─ <button type="submit"> → <Button type="submit">

Imports: Input, Textarea, Select, Checkbox, Button
All form handlers preserved (onSubmit, onChange, validation)
```

---

## Reference

- **Related skills:** None (block-intake is standalone)
- **External references:**
  - Token system: `design-system-shadcn-tailwind/src/styles/tokens.css`
  - shadcn docs: `design-system-shadcn-tailwind/docs/usage-for-ai.md`
  - Design system architecture: `global-docs/docs/architecture/design-system-architecture.md`
- **Domain context:** `domains/professional-work-context.md`

---

## Maintenance

- **How often to review:** When shadcn components or Tailwind token system changes
- **What triggers an update:** New token types, new shadcn components, changes to color system
- **Owner:** Professional-work domain (design)

---

## Migration Notes (v2.0)

**Changes from v1.0:**
- Mapping table now includes Context column for clarity on when to use each token
- Output reporting now required per-file at each phase (previously optional)
- Explicit approval gates between phases (previously implicit)

**If upgrading automation:**
- Update parsers to expect per-file output format at each phase
- Update automation to wait for approval between phases (implement pause logic)
- See SKILL-CHANGELOG.md for full details
