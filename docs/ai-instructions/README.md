# AI Instructions — Hub

## Purpose
This directory is the canonical source for how AI tools
(Claude, Cursor, Copilot) should behave across all repos
in this system.

Each repo has a thin CLAUDE.md that points here.
This directory holds the detail.

## Structure
universal-rules.md       ← rules that apply to every repo
per-repo/                ← supplements specific to each repo
  design-system.md       ← design system additions
  global-docs.md         ← global-docs repo additions

## How CLAUDE.md Works in Each Repo
Every repo root has a CLAUDE.md structured as:

  1. What this repo is (1 paragraph)
  2. Required reading list (ordered)
     - Points to files in THIS directory
     - Points to local docs/ files
  3. Non-negotiable rules (repo-specific additions only —
     universal rules live in universal-rules.md)
  4. Stack and repo structure

## Onboarding a New Repo
1. Create per-repo/[repo-name].md here
2. Create CLAUDE.md in the new repo root
3. CLAUDE.md points to universal-rules.md + per-repo/[name].md
4. Add repo to the registry in universal-rules.md
