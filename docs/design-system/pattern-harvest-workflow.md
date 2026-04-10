<!-- type: workflow -->

# Pattern Harvest Workflow

## When to Use This

Use pattern harvest when you see a UI pattern you like (in Asana, Linear, Figma, etc.) and want to add it to the design system.

**Pattern harvesting:**
- Observes patterns in the wild (other products)
- Documents how they work
- Extracts into reusable design system components/blocks
- Makes pattern available to all future projects

---

## The Process (5 Steps)

### Step 1: Screenshot and Document

When you see a pattern you like:

1. **Take a screenshot**
   - Include surrounding context
   - Show both light and dark (if available)
   - Show mobile and desktop versions if different

2. **Document the pattern**
   ```
   Pattern Name: Inline Editable Table
   Source: Linear (issues table)
   Date Observed: 2026-04-09
   Use Case: Edit data without opening modal
   
   How it works:
   1. User clicks a cell
   2. Cell becomes editable (focused input)
   3. User types
   4. Click outside or press Enter to save
   5. Update is immediate (optimistic)
   ```

3. **Identify what components it uses**
   ```
   Components in pattern:
   - Table (shadcn)
   - Input (shadcn)
   - Button (shadcn, optional)
   - Custom: Inline edit logic
   ```

### Step 2: Identify Component Approximations

Ask: "Can I build this with design system components?"

| Component | Design System Match | Gap |
|-----------|-------------------|-----|
| Table | ✅ shadcn Table | Missing: inline editing |
| Input | ✅ shadcn Input | Complete |
| Button | ✅ shadcn Button | Complete |
| Focus ring | ✅ shadcn default | Complete |

---

### Step 3: Report Gaps

Document what design system doesn't cover:

```
## Inline Editable Table

**Available Components:**
✅ Table (shadcn)
✅ Input (shadcn)
✅ Button (shadcn)

**Missing:**
- Inline editing logic (handle click-to-edit, blur-to-save)
- Optimistic updates (update before server responds)
- Validation on edit (show errors inline)

**Build Decision:**
Build custom component: EditableTable
Location: src/components/editable-table/
Based on: shadcn Table + custom logic
```

---

### Step 4: Build Custom Component

Create the custom component following `component-conventions.md`:

```typescript
/**
 * @source: custom
 * @category: data-display
 * @date-created: 2026-04-09
 * @harvested-from: Linear
 */

import { forwardRef } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"

interface EditableTableProps {
  data: Array<Record<string, any>>
  columns: Array<{ key: string; label: string; editable?: boolean }>
  onUpdate: (rowId: string, columnKey: string, value: any) => void
}

export const EditableTable = forwardRef<HTMLTableElement, EditableTableProps>(
  ({ data, columns, onUpdate }, ref) => (
    <Table ref={ref}>
      <TableHeader>
        <TableRow>
          {columns.map(col => (
            <TableHead key={col.key}>{col.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(row => (
          <TableRow key={row.id}>
            {columns.map(col => (
              <TableCell key={col.key}>
                {col.editable ? (
                  <Input
                    defaultValue={row[col.key]}
                    onBlur={(e) => onUpdate(row.id, col.key, e.currentTarget.value)}
                  />
                ) : (
                  row[col.key]
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
)

EditableTable.displayName = "EditableTable"
```

---

### Step 5: Add Storybook Story

Document the pattern with examples:

```typescript
// EditableTable.stories.tsx
import { EditableTable } from "./EditableTable"

export default {
  title: "Data Display/EditableTable",
  component: EditableTable
}

export const Default = () => (
  <EditableTable
    data={[
      { id: "1", name: "Task 1", status: "Todo" },
      { id: "2", name: "Task 2", status: "In Progress" }
    ]}
    columns={[
      { key: "name", label: "Task", editable: true },
      { key: "status", label: "Status", editable: true }
    ]}
    onUpdate={(rowId, col, val) => console.log(`Updated ${rowId}.${col} = ${val}`)}
  />
)

export const WithDarkMode = () => (
  <div data-theme="dark-default" className="bg-muted p-lg rounded-lg">
    <Default />
  </div>
)

export const MixedEditability = () => (
  <EditableTable
    data={[{ id: "1", name: "Task 1", status: "Todo" }]}
    columns={[
      { key: "name", label: "Task", editable: false },
      { key: "status", label: "Status", editable: true }
    ]}
    onUpdate={(rowId, col, val) => console.log(`Updated`)}
  />
)
```

---

## Documentation Template

When harvesting, create documentation:

```markdown
## Pattern: Inline Editable Table

**Source:** Linear (issues table)
**Date Harvested:** 2026-04-09
**Component:** EditableTable (custom)
**Location:** src/components/editable-table/

### What It Is

A table where users can edit cells inline without opening a modal.

**How it works:**
1. User clicks a cell (if editable)
2. Cell becomes an input field
3. User types new value
4. Click outside or press Enter to save
5. Cell updates immediately

### When to Use

✅ **Use when:**
- Need to edit multiple fields quickly (faster than modal)
- Editing is non-destructive (undo available)
- Edits validate and save immediately
- Table is complex (many rows, columns)

❌ **Don't use when:**
- Edits have side effects (need confirmation)
- Validation is complex (need guidance)
- Mobile-first (inline editing is hard on mobile)
- Table is simple (modal is clearer)

### Props

| Prop | Type | Description |
|------|------|-------------|
| data | Array | Array of row objects |
| columns | Array | Column definitions (key, label, editable) |
| onUpdate | Function | Callback when cell is updated |

### Examples

```tsx
<EditableTable
  data={tasks}
  columns={[
    { key: "title", label: "Title", editable: true },
    { key: "assignee", label: "Assigned to", editable: true },
    { key: "status", label: "Status", editable: false }
  ]}
  onUpdate={handleUpdate}
/>
```

### Storybook

See: Data Display/EditableTable
```

---

## Documenting the Harvest

Update your permanent record:

**Create:** `global-docs/patterns/harvested-patterns.md`

```markdown
# Harvested UI Patterns

## Pattern Registry

| Pattern | Source | Component | Status | Date |
|---------|--------|-----------|--------|------|
| Inline Editable Table | Linear | EditableTable | ✅ Built | 2026-04-09 |
| Kanban Board | Asana | KanbanBoard | 🔄 In Progress | 2026-04-02 |
| Timeline View | Linear | TimelineView | 📋 Planned | 2026-04-09 |
| Inline Comments | Figma | InlineComments | ⏳ Not Yet | TBD |

## Harvested Details

### Inline Editable Table
- **Source:** Linear issues table
- **Why harvested:** Key pattern for data-heavy apps
- **Component built:** EditableTable
- **Status:** Ready to use
- **Added to:** component-inventory.md
```

---

## Connecting to Design System

After building:

1. **Update component-inventory.md**
   ```markdown
   ### EditableTable
   - **Source:** custom (harvested from Linear)
   - **Location:** src/components/editable-table/
   - **Type:** Data display organism
   - **Status:** Production-ready
   ```

2. **Add Storybook story** (already done above)

3. **Run token audit**
   ```bash
   # Paste token-audit-prompt.md into Claude Code
   # Verify no hardcoded colors
   ```

4. **Update CHECKLIST**
   ```markdown
   ## New Component: EditableTable
   - [x] Built
   - [x] Storybook story
   - [x] Token audit passed
   - [x] Dark mode tested
   - [x] Accessibility tested
   - [x] TypeScript strict mode
   ```

---

## Best Practices for Harvesting

✅ **Do:**
- Take clear screenshots (before and after, light and dark)
- Document user interaction (what happens when I click?)
- Identify all components used
- Note accessibility features (focus states, keyboard support)
- Test on mobile (responsive behavior?)
- Document the "why" (when should we use this?)

❌ **Don't:**
- Copy code directly (understand the pattern first)
- Skip accessibility (must meet WCAG AA)
- Forget dark mode (test in both themes)
- Build without Storybook story (document it)
- Ignore performance (animated inline edits should be smooth)

---

## Harvesting Workflow Summary

| Step | Task | Output |
|------|------|--------|
| 1 | Screenshot + document | Pattern description |
| 2 | Identify components | Component map |
| 3 | Report gaps | Gap analysis |
| 4 | Build component | Custom component code |
| 5 | Add Storybook | Documented with stories |
| 6 | Update inventory | Listed in component-inventory.md |
| 7 | Verify compliance | Token audit ✓, TypeScript ✓, A11y ✓ |

---

## Examples of Patterns to Harvest

| Pattern | Source | Component | Effort |
|---------|--------|-----------|--------|
| Inline editable table | Linear | EditableTable | 2-3h |
| Kanban board | Asana | KanbanBoard | 4-6h |
| Timeline view | Linear | TimelineView | 3-4h |
| Inline comments | Figma | InlineComments | 2-3h |
| Collaborative cursor | Figma | CollaborativePointer | 3-4h |
| Rich text editor | Notion | RichTextEditor | 6-8h |
| Command palette | Linear | CommandPalette | 2-3h |
| Status indicators | Asana | StatusBadge | 1-2h |

---

## Further Reading

- **Competitive Analysis:** `competitive-analysis-workflow.md`
- **Component Conventions:** `design-system-shadcn-tailwind/docs/component-conventions.md`
- **Component Decision Tree:** `component-decision-tree.md`
- **Component Inventory:** `design-system-shadcn-tailwind/docs/component-inventory.md`
