<!-- type: reference -->

# Universal Checklist — Documentation

Reference from repo-local audit-process.md files.
Checklist ID prefix: DOC

## DOC-1: AI Instruction Files
- CLAUDE.md exists at repo root
- CLAUDE.md references global-docs/ai-instructions/
  universal-rules.md
- CLAUDE.md references per-repo supplement in global-docs
- CLAUDE.md lists required reading in order
PASS = all present and cross-referenced

## DOC-2: Checklist / Status File
- CHECKLIST.md (or equivalent) exists at repo root
- All completed items marked ✅ with date
- Current phase clearly indicated
- Next steps clearly listed
PASS = exists and current

## DOC-3: Document Completeness
- README.md exists at repo root
- No TODO placeholders in published documents
- No broken internal cross-references
PASS = all present, no placeholders

## DOC-4: Freshness
- Checklist updated after last session
- Audit log updated after last audit
- No document references a phase that no longer exists
PASS = all documents reflect current state
