<!-- type: how-to -->

# Audit Trigger Prompt

Use this prompt at any point in any repo to get a full status report from Claude without triggering any changes.

## Standard Repo Audit Prompt

Paste this into Claude Code (replacing bracketed values with the actual names):

---

Review the entire [REPO NAME] repo. Read [CHECKLIST FILE — e.g. DESIGN-SYSTEM-CHECKLIST.md] first, then audit the actual files against each checklist item. Report:

1. **What is complete and verified** (with file evidence)
2. **What is missing or broken**
3. **Any token violations, naming convention violations, or component misuse**
4. **Your recommended next action**

Do not make any changes — report only.

---

## Common Repo Audit Setups

### Design System Audit
```
Review the entire design-system-shadcn-tailwind repo. Read DESIGN-SYSTEM-CHECKLIST.md first, then audit the actual files against each checklist item. Report:

1. What is complete and verified (with file evidence)
2. What is missing or broken
3. Any token violations, naming convention violations, or component misuse (check: no hardcoded colors, cva() for variants, cn() for composition, forwardRef+displayName on components, full file sets per component)
4. Your recommended next action

Do not make any changes — report only.
```

### Global-Docs Audit
See `docs/audit-prompt.md` for the comprehensive global-docs specific audit.

---

## Design System Specific Audits

Use these audit templates when working with the design system.

### Token Compliance Audit

**Purpose:** Verify that a file uses proper semantic tokens (no hardcoded colors, no concrete Tailwind color classes).

**Template:** See `design-system-shadcn-tailwind/docs/token-audit-prompt.md` for the complete checklist.

**Quick version to paste:**
```
Read [FILE PATH]. Check for:

1. Hardcoded colors (text-blue-600, bg-slate-900, etc.) — should be text-primary, bg-foreground
2. Hex values in code (style={{ color: '#2563eb' }}) — should use token classes
3. Hardcoded spacing (padding: '16px') — should use p-4 (Tailwind tokens)
4. Missing forwardRef or displayName on components
5. Missing cva() for variant styling
6. Concrete Tailwind imports instead of semantic tokens

Report violations by severity. Do not fix — report only.
```

**Full template with all rules, examples, and automated grep commands:** `design-system-shadcn-tailwind/docs/token-audit-prompt.md`

---

### Block Compliance Audit

**Purpose:** Verify that an ingested Tailwind UI block was properly token-swapped and shadcn-wired.

**Template:**
```
Read [BLOCK FILE PATH]. Check for:

1. Any remaining hardcoded Tailwind color classes:
   - text-blue-*, bg-gray-*, border-slate-*, etc. (should all be swapped to semantic tokens)
   - Report: "Found [COUNT] hardcoded color classes at lines [X, Y, Z]"

2. Any raw HTML interactive elements (should be shadcn):
   - <button> (should be Button component)
   - <input> (should be Input component)  
   - <textarea> (should be Textarea component)
   - <select> (should be Select component)
   - <a role="button"> (should be Button asChild)
   - Report: "Found [COUNT] raw interactive elements at lines [X, Y, Z]"

3. Any inline style={{ color: '...' }} values:
   - Should all be migrated to className with token values
   - Report: "Found [COUNT] inline style color values at lines [X, Y, Z]"

4. Story file presence:
   - Should have [BlockName].stories.tsx in same directory
   - Story should have: title: "Blocks/[Category]/[BlockName]", Default story, layout: "fullscreen"

Report all violations with line numbers and severity:
- CRITICAL: Hardcoded colors or raw HTML elements
- MEDIUM: Inline styles that should be classes
- MINOR: Missing story file

Do not fix — report only.
```

---

### Full Design System Audit

**Purpose:** Complete audit of the design system repo status and compliance.

**Template:** See the audit trigger at the top of `design-system-shadcn-tailwind/DESIGN-SYSTEM-CHECKLIST.md`

**Quick version to paste:**
```
Review the entire design-system-shadcn-tailwind repo. Read DESIGN-SYSTEM-CHECKLIST.md first, 
then audit the actual files against each checklist item. Report:

1. What is complete and verified (with file evidence)
   - Phase 1: Foundation (Next.js 15, Tailwind v4, shadcn/ui, tokens, Storybook)
   - Phase 2: Storybook stories (46/46 shadcn components covered)
   - Phase 3A: Custom component shells (5 scaffolded)
   - Phase 3B: Custom component implementation (5 fully implemented)
   - Phase 4: AI instruction layer (documentation and audit prompts)

2. What is missing or broken
   - Any components without stories
   - Any breaking TypeScript errors
   - Any Storybook build failures

3. Any violations:
   - Token violations: hardcoded colors, concrete Tailwind classes
   - Pattern violations: missing forwardRef/displayName, missing cva()
   - Component violations: missing index.ts export, missing stories

4. Your recommended next action

Do not make any changes — report only.
```

**Full audit prompt:** See top section of `design-system-shadcn-tailwind/DESIGN-SYSTEM-CHECKLIST.md`

---

### AI Building Audit

**Purpose:** Audit code generated by AI to ensure it follows design system patterns.

**Template:**
```
The following code was generated for the design system. Audit it against:

1. Token usage — no hardcoded colors, all semantic tokens
2. Component patterns — forwardRef, displayName, cva for variants
3. shadcn integration — uses shadcn components, not raw HTML
4. Storybook — has three story types (Default, AllVariants, EdgeCases)
5. TypeScript — fully typed, no any unless justified

Report:
- ✅ What complies with the design system
- ❌ What violates patterns (with specific lines)
- 🔧 How to fix violations (if any)

Do not modify the code — report only.
```
