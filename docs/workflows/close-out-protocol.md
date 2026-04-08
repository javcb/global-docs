# Session Close-Out Protocol

## Purpose
When a significant body of work is complete — a layer
transition, a documentation update, a repo setup — follow
this protocol before moving on. The goal is to never leave
a mess behind that becomes technical or documentation debt.

## When to Run Close-Out
- Completing a layer transition (e.g. Layer 1 → Layer 2)
- Finishing a documentation update session in global-docs
- Setting up a new repo
- Any session where 3+ files were created or modified
- Before switching focus to a different repo

## Close-Out Steps

### Step 1 — Update the checklist
In the repo where work was done:
- Mark all completed items ✅ with today's date
- Update "current phase" or "next steps" section
- Remove any items that are no longer relevant

### Step 2 — Update global-docs audit log
In global-docs/audits/audit-log.md:
- Add a row for any audit run during this session
- Note issues found and whether they were resolved

### Step 3 — Run the repo audit
Paste the repo's audit-process.md prompt into Claude Code.
This does not need to be a full dual-tool audit for minor
sessions — a single-tool read-only audit is sufficient
for close-out.
Pass criteria: no ❌ failures. ⚠️ warnings must be logged.

### Step 4 — Check cross-repo consistency
Ask: did this session's changes affect any other repo?
Common examples:
- Added a universal rule → update global-docs/
    ai-instructions/universal-rules.md
- Finished a design-system layer → update global-docs/
    audits/audit-log.md
- Changed a token → verify design-system docs still accurate

### Step 5 — Commit
Ensure all changes are committed with a clear message.
Commit message format:
  [repo] [action]: [what was done]
  Examples:
    design-system pre-L2: fix tsconfig, tokens, a11y issues
    global-docs setup: add hub-and-spoke architecture docs
    design-system L1: complete all 25 primitives

## Note on MkDocs and GitHub Pages

global-docs uses mkdocs-awesome-pages-plugin for
auto-navigation. This means:

✅ Adding a new .md file to docs/ makes it appear
   on the site automatically after the next deploy.
   No changes to mkdocs.yml are ever needed for new files.

✅ To control section ORDER within a directory,
   edit the .pages file in that directory.
   These are the only manual maintenance files.

✅ GitHub Actions deploys automatically on every push
   to main. After pushing, allow 1-2 minutes for the
   live site to update at https://javcb.github.io/global-docs/

❌ Never add a nav: section back to mkdocs.yml.
   That reintroduces the manual registration problem.

## What Good Close-Out Looks Like
- CHECKLIST.md reflects current reality
- audit-log.md has an entry for any audit run
- No TODO comments in committed files
- The next session can start cleanly by reading CLAUDE.md
  and CHECKLIST.md alone

## What Bad Close-Out Looks Like
- Checklist still shows items as in-progress that are done
- Fixes were applied but not logged in audit-log.md
- Files created during session not yet reflected in README
- Another developer (or AI) would be confused about
  current state from docs alone
