<!-- type: skill-advisory -->

# Skill: Audit Trigger

Comprehensive repo assessment framework. Multi-template audit that evaluates repos against standards and reports violations with severity levels. Reports only; does not execute changes.

---

## Metadata

| Attribute | Value |
|---|---|
| **Skill ID** | `skill-audit-trigger` |
| **Type** | advisory (judgment-based assessment) |
| **Version** | 2.0 |
| **Status** | ACTIVE |
| **Created** | 2026-04-08 (migrated from prompts/) |
| **Last Reviewed** | 2026-04-08 |
| **Dependencies** | None |
| **Domains** | All |

---

## Summary

**Evaluate repo status against standards. Report violations and recommend next steps.**

This skill audits any repository (standard projects, design systems, documentation) against applicable standards and checklists. It reads source files, detects violations, categorizes by severity, and recommends actions. Advisory only: reports findings, does not execute changes.

---

## When to Use This Skill

- **Use this skill when:** You need a status report on repo health, compliance, or completeness without making changes
- **Do NOT use this skill when:** You want to execute fixes (use execution skills instead) or check simple questions (grep/read files directly)
- **Prerequisite state:** Target repo exists and is readable. Applicable checklist or standard exists.

---

## Input Requirements

### Required Inputs
- **Repo path:** Location of the repository to audit
- **Audit type:** Which audit template to apply (see templates below)

### Optional Inputs
- **Focus area:** Specific component, folder, or rule set to audit (if not auditing entire repo)
- **Severity filter:** Only report [CRITICAL / HIGH] violations (default: all)

### Assumptions
- Checklist files (e.g., DESIGN-SYSTEM-CHECKLIST.md) exist in target repo
- Standard files are up to date
- User understands why audit is being run (context inferred from audit type)

---

## Execution Flow

### Phase 1: Select Audit Template

**Goal:** Determine which audit template applies to this repo.

1. Identify repo type: design system, standard documentation, general project, other
2. Select audit template:
   - **Standard Repo Audit:** Any project repo (general status check)
   - **Design System Audit:** design-system-shadcn-tailwind repo
   - **Token Compliance Audit:** Single file token-checking
   - **Block Compliance Audit:** Ingested Tailwind UI block verification
   - **Full Design System Audit:** Complete design system status
3. Confirm which template before proceeding

**Approval Gate:** None (informational)

---

### Phase 2: Read Standards & Checklist

**Goal:** Load the applicable checklist or standard rules.

1. Read repo's checklist file (e.g., DESIGN-SYSTEM-CHECKLIST.md, CHECKLIST.md)
2. Identify all items in checklist
3. Note external reference docs (design-system-shadcn-tailwind/docs/, etc.)

**Approval Gate:** None (informational read)

---

### Phase 3: Read and Assess Files

**Goal:** Examine actual repo files against checklist items.

1. For each checklist item, read relevant source files
2. Check for compliance or violations
3. Categorize findings:
   - ✅ Complete and verified (with evidence: filenames, lines, proof)
   - ❌ Missing or broken (with evidence)
   - 🚨 Violation (with specific location and severity)

**Approval Gate:** None (assessment only)

---

### Phase 4: Categorize Violations by Severity

**Goal:** Assign severity levels to all violations found.

1. For each violation, assign severity:
   - **CRITICAL:** Breaks functionality or violates hard rules (hardcoded colors in design system, credentials exposed, etc.)
   - **HIGH:** Violates important conventions or blocks progress (missing required exports, broken TypeScript, etc.)
   - **MEDIUM:** Violates optional conventions or causes maintainability issues (missing documentation, inconsistent naming)
   - **LOW:** Minor quality or style issues (formatting, comments, etc.)

2. Collect all violations organized by severity

**Approval Gate:** None (assessment only)

---

### Phase 5: Produce Assessment Report

**Goal:** Deliver structured audit report with findings and recommendations.

1. Generate report using standard format (see below)
2. Include evidence for each finding
3. Recommend next actions (in priority order)
4. Note any external dependencies or blockers

**Approval Gate:** None (report only)

---

## Output Format (All Audit Types)

Always deliver structured report:

```
AUDIT REPORT — [REPO NAME]

Audit type: [Template name]
Audit date: [YYYY-MM-DD]
Auditor: Claude (AI)

═══════════════════════════════════════════════════════════════

STATUS SUMMARY

✅ Complete and Verified:
├─ [Item 1] (Evidence: [File], line [X])
├─ [Item 2] (Evidence: [File], line [X-Y])
└─ Total: [N] items

❌ Missing or Broken:
├─ [Item 1] (Impact: [what breaks])
├─ [Item 2] (Impact: [what breaks])
└─ Total: [N] items

═══════════════════════════════════════════════════════════════

VIOLATIONS BY SEVERITY

🔴 CRITICAL ([N] violations):
├─ [Violation]: [File:Line] → [Fix required]
├─ [Violation]: [File:Line] → [Fix required]
└─ Impact: [Blocks building / breaks functionality / exposes secrets / etc.]

🟠 HIGH ([N] violations):
├─ [Violation]: [File:Line] → [Fix required]
└─ Impact: [Blocks progress / violates convention]

🟡 MEDIUM ([N] violations):
├─ [Violation]: [File:Line] → [Recommended fix]
└─ Impact: [Maintainability concern]

🟢 LOW ([N] violations):
├─ [Violation]: [File:Line] → [Nice to fix]
└─ Impact: [Quality/style improvement]

═══════════════════════════════════════════════════════════════

RECOMMENDATIONS (in priority order)

1. [Fix CRITICAL violations — blocks all other work]
2. [Fix HIGH violations — unblock progress]
3. [Address MEDIUM violations — improve maintainability]
4. [Consider LOW violations — optional quality improvements]

Next action: [What should happen next? Create issue, start refactor, run specific skill, etc.]

═══════════════════════════════════════════════════════════════
```

---

## Audit Templates

### Template 1: Standard Repo Audit

**Purpose:** General repo status check on any project.

**Use when:** Checking overall project status, before starting new work, periodic review

**Template:**

```
Review the entire [REPO NAME] repo. 

Read [CHECKLIST FILE] first, then audit actual files against each item.

Report:
1. What is complete and verified (with file evidence)
2. What is missing or broken
3. Any violations of standards or conventions
4. Your recommended next action

Do not make any changes — report only.
```

**Output:** Standard report format with full checklist coverage

---

### Template 2: Design System Audit (Full)

**Purpose:** Complete design system repo status check.

**Use when:** Full design system review, starting new phase, compliance check

**Files to read first:**
- DESIGN-SYSTEM-CHECKLIST.md (phase definitions)
- design-system-shadcn-tailwind/src/components/ (current implementations)
- design-system-shadcn-tailwind/src/styles/tokens.css (token definitions)

**Template:**

```
Review the entire design-system-shadcn-tailwind repo.

Read DESIGN-SYSTEM-CHECKLIST.md first, then audit files against each phase:

Phase 1: Foundation (Next.js 15, Tailwind v4, shadcn/ui, tokens, Storybook)
Phase 2: Storybook stories (46 shadcn components covered)
Phase 3A: Custom component shells (scaffolded)
Phase 3B: Custom component implementation (fully implemented)
Phase 4: AI instruction layer (documentation and audit prompts)

Report:
1. What is complete and verified per-phase (with file evidence)
2. What is missing or broken per-phase
3. Violations:
   - Token violations (hardcoded colors, concrete Tailwind classes)
   - Pattern violations (missing forwardRef, displayName, cva)
   - Component violations (missing index.ts, missing stories, TypeScript errors)
4. Your recommended next action

Do not make any changes — report only.
```

**Output:** Report organized by phase, with violation severity levels

---

### Template 3: Token Compliance Audit

**Purpose:** Check single file for design system token compliance.

**Use when:** Verifying a component uses semantic tokens, post-migration check, spot-checking

**Files to read:**
- Target file (source code to audit)
- design-system-shadcn-tailwind/src/styles/tokens.css (token definitions)
- design-system-shadcn-tailwind/docs/token-usage-guide.md (if exists)

**Template:**

```
Read [FILE PATH]. Check for token violations:

1. Hardcoded colors (text-blue-600, bg-slate-900, etc.) — should be text-primary, bg-foreground, etc.
   Report: Lines with concrete colors that should be semantic tokens

2. Hex values in code (style={{ color: '#2563eb' }}) — should use token classes
   Report: Lines with inline hex values

3. Hardcoded spacing (padding: '16px') — should use p-4 (Tailwind tokens)
   Report: Lines with concrete spacing values

4. Hardcoded font sizes, line heights, etc. — should use Tailwind token classes
   Report: Lines with concrete size values

5. Logical violations:
   - Colors that don't match context (e.g., using text-destructive for info)
   - Deprecated token usage
   - Non-semantic color choices

Report violations by severity with line numbers.

Do not fix — report only.
```

**Output:** Violations organized by type and severity, with line numbers

**Severity mapping for token audit:**
- CRITICAL: Hardcoded colors instead of semantic tokens
- HIGH: Inline hex/RGB values instead of classes
- MEDIUM: Hardcoded spacing/sizes instead of Tailwind tokens
- LOW: Stylistic or organizational improvements

---

### Template 4: Block Compliance Audit

**Purpose:** Verify ingested Tailwind UI block was properly migrated.

**Use when:** After block-intake skill completes, spot-checking blocks, migration validation

**Files to read:**
- Target block file (the migrated block to check)
- Design system token system for comparison

**Template:**

```
Read [BLOCK FILE PATH]. Check for block migration compliance:

1. Hardcoded Tailwind color classes:
   - text-blue-*, bg-gray-*, border-slate-*, etc.
   - These should all be swapped to semantic tokens (text-primary, bg-background, border-border)
   - Report: "Found [COUNT] hardcoded color classes at lines [X, Y, Z]"
   - Severity: CRITICAL

2. Raw HTML interactive elements:
   - <button> (should be Button component)
   - <input> (should be Input component)
   - <textarea> (should be Textarea component)
   - <select> (should be Select component)
   - <a role="button"> (should be Button asChild)
   - Report: "Found [COUNT] raw interactive elements at lines [X, Y, Z]"
   - Severity: CRITICAL

3. Inline style={{ color: '...' }} values:
   - Should all be migrated to className with token values
   - Report: "Found [COUNT] inline style color values at lines [X, Y, Z]"
   - Severity: HIGH

4. Story file:
   - Should have [BlockName].stories.tsx in same directory
   - Story should have: title: "Blocks/[Category]/[BlockName]", Default story, layout: "fullscreen"
   - Report: Present/absent, structure correct/incorrect
   - Severity: MEDIUM

Report all findings organized by severity.

Do not fix — report only.
```

**Output:** Violations by type and severity, with line references

---

## Error Handling

| Error Condition | Resolution |
|---|---|
| Checklist file not found | Stop. Report which checklist file is missing. Ask user to verify file exists or specify custom standards. |
| Source files unreadable or missing | Stop. Report which files could not be read. Ask user to verify repo path and permissions. |
| Audit type is ambiguous | Stop. Ask user to specify which template to use (standard, design system, token, block, etc.). Do not guess. |
| No violations found | Report cleanly: "All items verified. No violations found. Status: ✅ COMPLIANT." |
| Too many violations to list | Summarize by severity, show top 10 per severity, note total count, offer to expand on specific category. |

---

## Examples

### Example 1: Design System Full Audit

**Input:** design-system-shadcn-tailwind repo

**Output:**

```
AUDIT REPORT — design-system-shadcn-tailwind

Audit type: Design System (Full)
Audit date: 2026-04-08

STATUS SUMMARY

✅ Complete and Verified:
├─ Phase 1: Foundation (Next.js 15, Tailwind v4, shadcn/ui installed, Storybook v8)
├─ Phase 2: Stories for 46/46 base shadcn components verified
├─ Token system defined in src/styles/tokens.css
└─ Total: 15 items

❌ Missing or Broken:
├─ Phase 3A: Custom component shells (5/5 scaffolded, but 2 missing implementations)
├─ Phase 4: AI instruction docs (60% complete, missing edge case examples)
└─ Total: 2 items

VIOLATIONS BY SEVERITY

🔴 CRITICAL (3 violations):
├─ src/components/custom/Alert.tsx:12 — Hardcoded color "bg-blue-600" should be "bg-primary"
├─ src/blocks/marketing/hero.tsx:45 — Raw <button> element should be <Button>
└─ Impact: Token system compliance broken

🟠 HIGH (5 violations):
├─ src/components/custom/Dialog.tsx — Missing forwardRef wrapper
├─ src/components/custom/Tooltip.tsx — Missing displayName
├─ src/stories/Alert.stories.tsx — Missing "Interactive" variant story
└─ Impact: Pattern violations, incomplete documentation

═══════════════════════════════════════════════════════════════

RECOMMENDATIONS

1. Fix CRITICAL violations:
   - Swap hardcoded colors in Alert.tsx and hero.tsx
   - Replace raw <button> with <Button> component

2. Fix HIGH violations:
   - Add forwardRef+displayName to Dialog and Tooltip
   - Add Interactive story variants

3. Complete Phase 4:
   - Add edge case examples to AI docs

Next action: Run skill-block-intake on Alert to auto-migrate, then manually fix Dialog/Tooltip.
```

---

### Example 2: Token Compliance Audit (Single File)

**Input:** src/components/custom/Card.tsx

**Output:**

```
AUDIT REPORT — Card.tsx (Token Compliance)

Audit type: Token Compliance
Audit date: 2026-04-08

VIOLATIONS BY SEVERITY

🔴 CRITICAL (2 violations):
├─ Line 8: bg-white should be bg-background
├─ Line 12: border-gray-200 should be border-border
Impact: Token system not applied

🟡 MEDIUM (1 violation):
├─ Line 15: padding: '16px' should use p-4 (Tailwind class)
Impact: Manual spacing instead of token system

═══════════════════════════════════════════════════════════════

RECOMMENDATIONS

1. Swap line 8: bg-white → bg-background
2. Swap line 12: border-gray-200 → border-border
3. Replace line 15: padding: '16px' → className="p-4"

Next action: Apply fixes, run npm run typecheck to verify.
```

---

### Example 3: Block Compliance Audit

**Input:** src/blocks/marketing/hero.tsx (after block-intake migration)

**Output:**

```
AUDIT REPORT — hero.tsx (Block Compliance)

Audit type: Block Compliance
Audit date: 2026-04-08

VIOLATIONS BY SEVERITY

🔴 CRITICAL (1 violation):
├─ Line 8: <button> raw HTML element — should be <Button> component
Impact: Not using shadcn components

🟠 HIGH (1 violation):
├─ Line 22: focus:ring-blue-500 should be focus:ring-ring
Impact: Hardcoded color instead of token

🟡 MEDIUM (1 violation):
├─ Missing: hero.stories.tsx file not found
Impact: No Storybook documentation

═══════════════════════════════════════════════════════════════

RECOMMENDATIONS

1. Replace <button> on line 8 with <Button> and add import
2. Swap color class on line 22
3. Create hero.stories.tsx with Default + Interactive stories

Next action: Run skill-block-intake Phase 3 (shadcn substitution) to fix remaining issues.
```

---

## Reference

- **Related skills:** skill-block-intake (execution for design system), skill-prompting-core (foundational context)
- **External references:**
  - Design system checklist: design-system-shadcn-tailwind/DESIGN-SYSTEM-CHECKLIST.md
  - Token guide: design-system-shadcn-tailwind/docs/token-usage-guide.md
  - Global-docs audit: global-docs/docs/audit-prompt.md
- **Domains:** All (audit templates available for all domains)

---

## Maintenance

- **How often to review:** Quarterly, or when new standards are adopted
- **What triggers an update:** New checklist items added, new audit templates needed, changes to standard definitions
- **Owner:** Global systems (applies to all domains)

---

## Notes for Skill Developers

**Why this skill is advisory:**
- Advisory skills report findings; they do not execute changes.
- This skill's role is to inform decisions, not to make them.
- Users decide what to do with audit findings; the skill recommends but does not execute.

**Severity levels matter:**
- CRITICAL blocks all downstream work and must be fixed immediately.
- HIGH blocks some work and should be fixed before new features.
- MEDIUM is important for maintainability but doesn't block work.
- LOW is nice-to-have quality improvement.

**Audit templates are templates, not rigidly fixed:**
- Adapt templates to new repo types as they're added.
- Add new templates when new domains or standards emerge.
- Keep templates in this skill file; reference external standards, don't embed them.

---

## Migration Notes (v2.0)

**Changes from v1.0:**
- Separated into distinct templates (standard, design system, token, block, full design system)
- Explicit severity levels: CRITICAL, HIGH, MEDIUM, LOW (previously informal)
- Output format now standardized with severity-based organization
- Advisory classification clarified: reports only, does not execute changes
- Design system audits now reference external docs rather than embedding full rules

**If upgrading existing audit prompts:**
- Adapt any custom audit prompts to use severity levels
- Route design system audits to appropriate template (token, block, or full)
- Update automation that parses audit output to expect severity-based format
