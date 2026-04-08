<!-- type: reference -->

# Audit Trigger Reference

Quick-reference guide for running audits on any repository in the system.

---

## Standard Repo Audit

Use this template when reviewing any repository for completeness and correctness.

**Paste into Claude Code:**

> Review the entire [REPO NAME] repo. Read [CHECKLIST FILE] first, then audit the actual files against each checklist item. Report:
> 1. **What is complete and verified** — with file evidence (e.g., "✅ Button component: src/components/ui/button/Button.tsx exists, has forwardRef, displayName, cva styling")
> 2. **What is missing or broken** — specific file paths and gaps (e.g., "❌ Missing story for Textarea: src/components/ui/textarea/Textarea.stories.tsx")
> 3. **Any token violations, naming convention violations, or component misuse** — by severity (e.g., "⚠️ HIGH: src/components/navbar/Navbar.tsx uses hardcoded bg-blue-600 on line 24")
> 4. **Your recommended next action** — prioritized list (e.g., "1. Fix token violations in Navbar. 2. Create missing TextArea story. 3. Update typecheck.")
> 
> Do not make any changes — report only.

### Before Running

1. Identify the checklist file for the repo (usually CHECKLIST.md or similar)
2. Ensure the repo context is loaded in Claude Code
3. Confirm you have read/search access to the entire codebase

### After Report

Review the findings and prioritize fixes before committing changes.

---

## When to Use Standard Audits

- ✅ After any large Claude run before committing
- ✅ When returning to a repo after time away (days/weeks)
- ✅ Before starting a new phase or major feature
- ✅ When something feels off or builds are failing
- ✅ Quarterly reviews or team sync points

---

## Design System Specific Audits

The design-system-shadcn-tailwind repo has specialized audit templates for different verification needs.

### Token Compliance Audit

**Use when:** Checking if a file uses proper semantic tokens instead of hardcoded colors.

**Template location:** `design-system-shadcn-tailwind/docs/token-audit-prompt.md`

**Example:**
> "Read src/components/navbar/Navbar.tsx. Check for:
> 1. Any remaining hardcoded Tailwind color classes (text-blue-*, bg-gray-*, border-red-*, etc.)
> 2. Any inline style={{ color: '...' }} values with hex codes
> 3. Any CSS variables not from tokens.css
> 
> Report violations by severity (HIGH = hardcoded colors, MEDIUM = inline styles, LOW = non-semantic variable usage).
> Do not fix — report only."

### Block Compliance Audit

**Use when:** Reviewing UI blocks from Tailwind UI Plus after conversion.

**Template:**
> "Read [BLOCK FILE PATH]. Check for:
> 1. Any remaining hardcoded Tailwind color classes (text-blue-*, bg-gray-*, etc.)
> 2. Any raw <button> or <input> elements that should be shadcn components (Button, Input, etc.)
> 3. Any inline style={{ color: '...' }} values with hex codes or RGB
> 4. Missing shadcn imports (should start with import { ... } from '@/components/ui/[component]')
> 
> Report each violation with line number, severity, and what needs fixing.
> Do not fix — report only."

### Full Design System Audit

**Use when:** Comprehensive check of the entire design system for consistency.

**Template location:** `design-system-shadcn-tailwind/DESIGN-SYSTEM-CHECKLIST.md`

The checklist file includes an audit trigger prompt at the top that walks you through:
- Phase 1: Foundation setup verification
- Phase 2: Story coverage (all components have stories)
- Phase 3: Custom components (full implementation)
- Phase 4: AI instruction layer (documentation completeness)

---

## Audit Checklist Pattern

Each repo provides a dedicated checklist file with audit instructions. Structure:

```
## How to Audit This Repo at Any Time

Paste into Claude Code:
> "Review the entire [REPO] repo. Read [CHECKLIST FILE] first, 
> then audit the actual files against each checklist item. Report:
> (1) what is complete and verified,
> (2) what is missing or broken,
> (3) any violations or misuse,
> (4) your recommended next action.
> Do not make any changes — report only."
```

### Checklist Files

| Repo | Checklist File |
|------|---|
| global-docs | CHECKLIST.md |
| design-system-shadcn-tailwind | DESIGN-SYSTEM-CHECKLIST.md |
| javcb-[org] repos | README.md or SETUP.md (if any) |

---

## Common Audit Violations

### Token Violations (Design System)

| Violation | Bad | Good | Severity |
|---|---|---|---|
| Hardcoded color class | `bg-blue-600` | `bg-primary` | HIGH |
| Hardcoded neutral | `text-gray-900` | `text-foreground` | HIGH |
| Inline hex value | `style={{ color: '#2563eb' }}` | Use token class or CSS variable | HIGH |
| Decorative without comment | Image with `bg-purple-500` | `// DECORATIVE: purple-500` + class | MEDIUM |

### Component Violations (Design System)

| Violation | Bad | Good | Severity |
|---|---|---|---|
| Missing forwardRef | `const Button = ({ ... }) => <button />` | `const Button = forwardRef<HTMLButtonElement, ...>((props, ref) => ...)` | HIGH |
| No displayName | Button component without `.displayName` | `Button.displayName = "Button"` | MEDIUM |
| Missing cva styling | Inline className strings | `cva([...], { variants: { ... } })` | MEDIUM |
| Raw HTML element | `<button>Click</button>` in component | `<Button>Click</Button>` | HIGH |
| Barrel import | `import { Button } from "@/components/ui"` | `import { Button } from "@/components/ui/button"` | MEDIUM |

### Story Violations (Design System)

| Violation | Bad | Good | Severity |
|---|---|---|---|
| No stories | Component exists, no .stories.tsx | Create Default, AllVariants, EdgeCases stories | HIGH |
| Missing variants | Only Default story | Include AllVariants showing size/variant combinations | MEDIUM |
| No dark story | No theme variant coverage | Add Dark story with theme parameter | LOW |

---

## Audit Output Format

When reporting audit findings, use this structure:

```
## Audit Report: [REPO NAME]

### Complete & Verified ✅
- [Item] ([file path]) — brief evidence
- [Item] ([file path]) — brief evidence

### Missing or Broken ❌
- [Item] — path where it should be
- [Item] — detailed description of issue

### Violations ⚠️
- [Violation Type] severity=[HIGH/MEDIUM/LOW] — file:line — description
- [Violation Type] severity=[HIGH/MEDIUM/LOW] — file:line — description

### Recommended Next Actions
1. [Fix HIGH violations] (estimated effort)
2. [Add missing items] (estimated effort)
3. [Clean up MEDIUM violations] (estimated effort)
```

---

## When to Escalate

If audit finds:
- **Type errors that block build** → Fix immediately
- **More than 5 HIGH violations** → Consider refactor before proceeding
- **Missing checklist items** → Document blockers before continuing
- **Inconsistent patterns** → Update conventions before next phase

---

## See Also

- `../global-docs/docs/component-inventory.md` — Design system component reference
- `../design-system-shadcn-tailwind/docs/component-conventions.md` — How to structure new components
- `../design-system-shadcn-tailwind/docs/token-audit-prompt.md` — Detailed token audit template
