# AI Instructions Supplement — global-docs

Read universal-rules.md before this file.
This file adds global-docs-specific rules only.

## What This Repo Is
The documentation hub for this entire system.
All canonical standards, conventions, and cross-repo
knowledge live here. Other repos reference this repo —
this repo references nothing outside itself.

## Required Reading (in order after universal-rules.md)
1. README.md — repo overview and directory structure
2. CHECKLIST.md — current documentation status

## global-docs Specific Rules
1. This repo is the source — never a consumer.
   Do not add references to other repos' local files.
2. All content must be repo-agnostic unless in per-repo/.
3. When adding a new universal standard, check if an
   existing document covers it before creating a new file.
4. Keep directory structure flat — maximum 2 levels deep.
5. Every document must have a clear purpose statement
   in its first paragraph.
6. All new .md files must be created inside the docs/
   directory — never at repo root. MkDocs only serves
   files inside docs_dir. Files at repo root are invisible
   to the site builder.
   Correct:   docs/architecture/new-doc.md
   Incorrect: architecture/new-doc.md
