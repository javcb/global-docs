# Hub-and-Spoke Architecture

## What It Is
Every repo in this system follows a hub-and-spoke model.
global-docs is the hub — it holds all canonical standards,
detailed documentation, and cross-repo knowledge.
Every other repo is a spoke — it holds thin local entry
points that reference global-docs for detail.

## Visual Model

  global-docs/                      ← THE HUB
  ├── ai-instructions/              ← canonical AI rules
  │   ├── universal-rules.md        ← applies to every repo
  │   └── per-repo/                 ← repo-specific supplements
  │       ├── design-system.md
  │       └── global-docs.md
  │
  └── audits/                       ← canonical audit standards
      ├── audit-log.md              ← master log, all repos
      └── universal-checklists/     ← applies to every repo
          ├── code-quality.md
          ├── accessibility.md
          ├── documentation.md
          └── configuration.md

  design-system/                    ← A SPOKE
  ├── CLAUDE.md                     ← "Read me, then go to hub"
  └── docs/
      └── audit-process.md          ← "Run this, standards in hub"

  [future-repo]/                    ← ANOTHER SPOKE
  ├── CLAUDE.md                     ← same thin pattern
  └── docs/
      └── audit-process.md          ← same thin pattern

## The Rule
  global-docs answers: HOW do we work? What are the standards?
  Each repo answers:   WHAT is this repo specifically?

## What Lives Where

  IN global-docs (the hub):
  - Universal rules that apply to 2+ repos
  - Canonical standards (token rules, a11y, code quality)
  - Master audit log
  - Per-repo AI instruction supplements
  - This architecture document

  IN each repo (a spoke):
  - CLAUDE.md — thin entry point, points to hub
  - docs/audit-process.md — repo-specific checks + hub refs
  - docs/[repo-specific content] — implementation details
  - CHECKLIST.md — current status of this repo only

## What Never Happens
  - Spokes do not reference other spokes
  - The hub does not reference spoke implementation details
  - Universal rules are never redefined locally — only extended
  - Content is never duplicated between hub and spoke

## Onboarding a New Repo (Checklist)
  1. Create global-docs/ai-instructions/per-repo/[name].md
  2. Add repo row to global-docs/ai-instructions/universal-rules.md
  3. Create [repo]/CLAUDE.md referencing hub files
  4. Create [repo]/docs/audit-process.md referencing
     universal checklists + adding repo-specific checks
  5. Run first audit and log to global-docs/audits/audit-log.md
