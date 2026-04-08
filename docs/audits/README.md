<!-- type: reference -->

# Audit Process — Hub

## Purpose
This directory is the canonical source for audit standards
across all repos. Each repo has a thin audit-process.md
that references here for universal checklists.

## When to Audit
- Before each layer or phase transition
- After any bulk implementation session (3+ components
  or 3+ documents)
- Before any production deployment
- When onboarding a new AI tool
- At session close-out (see workflows/close-out-protocol.md)

## How to Run
1. Open the repo's local docs/audit-process.md
2. It contains the runnable prompt for that repo
3. Run in both Claude Code AND Cursor independently
4. Compare — any finding from either tool is real
   until disproved
5. Log all findings in audit-log.md (this directory)

## Pass Criteria
| Symbol | Meaning | Action |
|---|---|---|
| ✅ | Clean | Proceed |
| ⚠️ | Warning | Document and decide |
| ❌ | Failure | Fix before proceeding |

## Structure
README.md                   ← this file
audit-log.md                ← master log, all repos
universal-checklists/
  code-quality.md           ← TypeScript, tokens, exports
  accessibility.md          ← WCAG, ARIA, keyboard, focus
  documentation.md          ← completeness, accuracy, AI files
  configuration.md          ← gitignore, tsconfig, CI/CD

## Expanding Over Time
When a new check applies to 2+ repos, promote it from
the repo's local audit-process.md into a universal checklist.
When it only applies to one repo, keep it local.
