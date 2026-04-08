<!-- type: reference -->

# Standards-Wide Audit

## Purpose
This audit checks consistency ACROSS all standards repos
simultaneously. It catches things no single-repo audit can
catch — drift between the bibles themselves.

Run individual repo audits first. Run this after.

## When to Run
- Quarterly (first week of each quarter)
- After any major change to a standards repo
- When onboarding a new standards repo to the monorepo
- When a downstream project reports unexpected inconsistency

## How to Run
Open this file and paste the audit prompt (Section: Prompt)
into Claude Code with access to all standards repos.
This is a read-only audit — do not modify files.
Log results in global-docs/audits/audit-log.md.

## Checks

### SW-1: Registry Completeness
universal-rules.md repo registry must match reality:
- Every repo in main-github standards monorepo is listed
- Every listed repo has a per-repo/ supplement in
  global-docs/ai-instructions/per-repo/
- Every listed repo has a local CLAUDE.md
- Every listed repo has a local docs/audit-process.md
PASS = 100% match, no orphans, no missing files

### SW-2: CLAUDE.md Pattern Consistency
Every standards repo CLAUDE.md must follow the same pattern:
- Section 1: What this repo is (1 paragraph)
- Section 2: Required reading (ordered list)
  - First item: global-docs/ai-instructions/universal-rules.md
  - Second item: global-docs/ai-instructions/per-repo/[name].md
- Section 3: Repo-specific rules (no universal rule redefined)
- Section 4: Stack and structure
PASS = all CLAUDE.md files follow this structure

### SW-3: Starter-Kit Currency
starter-kit boilerplate must reflect current standards:
- starter-kit CLAUDE.md template matches current hub pattern
- starter-kit's sample audit-process.md references
  current universal checklists
- starter-kit's sample CHECKLIST.md structure matches
  format used in design-system and global-docs
PASS = starter-kit is current with other standards repos

### SW-4: Design System ↔ Global-Docs Consistency
- global-docs/ai-instructions/per-repo/design-system.md
  accurately describes the current state of design-system
- Token rules documented in global-docs match rules
  enforced in design-system/tokens/README.md
- Layer status in per-repo supplement matches
  DESIGN-SYSTEM-CHECKLIST.md
PASS = no contradictions between repos

### SW-5: Audit Infrastructure Consistency
- All standards repos reference universal checklists
  using current file paths in global-docs
- All standards repos log to the same audit-log.md
- No repo has a conflicting local definition of a check
  that exists in universal-checklists/
PASS = unified audit infrastructure, no conflicts

### SW-6: Ecosystem Overview Currency
- architecture/ecosystem-overview.md standards table
  matches actual repos in main-github
- Planned libraries table reflects current intentions
- No repo exists that is not documented in this file
PASS = overview reflects reality

## Audit Prompt

Paste into Claude Code with access to all standards repos:

---
Read global-docs/architecture/ecosystem-overview.md and
global-docs/audits/workflows/standards-wide-audit.md
before starting. This is a read-only cross-repo audit.
Do not modify any files.

Run all 6 standards-wide checks (SW-1 through SW-6).
Report every finding explicitly.

For SW-1: List every file checked and its status.
For SW-2: Show the structure of each CLAUDE.md and
          flag any deviation from the required pattern.
For SW-3: List each starter-kit template file checked
          and whether it matches current standards.
For SW-4: List each cross-reference checked between
          design-system and global-docs.
For SW-5: List every audit-process.md checked and
          confirm it references current checklist paths.
For SW-6: List every repo in ecosystem-overview.md
          and confirm it exists; list any repo that
          exists but is not in the overview.

Report format:
## Standards-Wide Audit — [DATE]
| Check | Status | Issues |
|---|---|---|
| SW-1 Registry | ✅/⚠️/❌ | n |
| SW-2 CLAUDE.md pattern | ✅/⚠️/❌ | n |
| SW-3 Starter-kit currency | ✅/⚠️/❌ | n |
| SW-4 Design system consistency | ✅/⚠️/❌ | n |
| SW-5 Audit infrastructure | ✅/⚠️/❌ | n |
| SW-6 Ecosystem overview | ✅/⚠️/❌ | n |

## Issues Found
[file, description, severity]

## Overall Health
[one sentence]
---
