# Ecosystem Overview

## Purpose
This document describes the full architecture of Javier's
development ecosystem — how repos are categorized, where
they live, how they relate to each other, and how new
repos get added correctly.

---

## The Two Repo Types

Every repo in this ecosystem belongs to exactly one of two
categories. Understanding the difference is critical before
creating or onboarding any new repo.

### Type 1 — Standards Repos (The Bibles)

Standards repos define HOW things are built. They contain
conventions, patterns, templates, and reusable architecture
decisions. They change slowly. Downstream projects READ
them and CONFORM to them — but do not import code from them
at runtime.

Characteristics:
- No semantic versioning (no v1.2.3)
- No CHANGELOG.md required
- Change triggers documentation updates, not dependency bumps
- Consumers reference them; they don't depend on them
- All live in main-github (the standards monorepo)

Current standards repos:
| Repo | Governs |
|---|---|
| global-docs | Conventions, audits, architecture, cross-repo standards |
| design-system | UI tokens, primitive components, visual language |
| starter-kit | New repo scaffolding, boilerplate, initial structure |

### Type 2 — Library Repos (Versioned Code)

Library repos contain ACTUAL REUSABLE CODE that gets
imported or copied into downstream projects. They change
with project needs. When a library changes, every consumer
is potentially affected — this requires versioning.

Characteristics:
- Semantic versioning required (v1.2.3)
- CHANGELOG.md required
- Breaking changes require a major version bump
- Consumers pin to a version
- Live separately from the standards monorepo
- Each library has its own audit-process.md that references
  global-docs universal checklists

Planned library repos (not yet created):
| Repo | Will contain | Notes |
|---|---|---|
| python-library | Importable Python utilities, scripts | Add when 3+ reusable modules exist |
| sql-library | Reusable query patterns, templates | Add when 3+ reusable queries exist |
| excel-library | Workbook templates, formula patterns | Add when templates stabilize |
| financial-models | Canonical calculation logic, projections | Add when models are validated |
| automation-library | n8n/Make/Power Automate workflow templates | Closer to a standard than a library — reconsider placement when ready |

NOTE: No library repos exist yet. This document captures
the intended architecture so that when libraries are created,
they are set up correctly from day one. Do not create library
repos until the relevant domain has enough reusable, stable
artifacts to justify centralization (guideline: 3+ reusable
items that have been used in at least 2 projects).

---

## The Full Ecosystem Map

  ┌─────────────────────────────────────────────────────┐
  │          STANDARDS MONOREPO (main-github)           │
  │                                                     │
  │  global-docs      design-system     starter-kit     │
  │  (the hub)        (UI standard)     (new repo       │
  │                                      template)      │
  └─────────────────────────────────────────────────────┘
                          │
                          │ defines HOW things are built
                          ▼
  ┌─────────────────────────────────────────────────────┐
  │         LIBRARY REPOS (separate, versioned)         │
  │                                                     │
  │  python-library   sql-library   financial-models    │
  │  (planned)        (planned)     (planned)           │
  └─────────────────────────────────────────────────────┘
                          │
                          │ provides code to build with
                          ▼
  ┌─────────────────────────────────────────────────────┐
  │          DOWNSTREAM ORGS (prod, staging)            │
  │                                                     │
  │  All projects reference standards + import libs     │
  │  Every repo traceable back to a standard or library │
  └─────────────────────────────────────────────────────┘

The key rule:
  Standards repos  → tell you HOW to build things
  Library repos    → give you things to BUILD WITH
  Downstream repos → actually BUILD the things

---

## What Never Happens

- Standards repos do not import from library repos
- Standards repos do not import from downstream repos
- Library repos do not reference each other unless
  explicitly designed as a dependency
- Downstream repos do not define conventions — they
  conform to them from global-docs
- A repo is never both a standard and a library

---

## The Cross-Repo Audit

Individual repo audits verify a single repo's health.
The standards-wide audit (see audits/workflows/
standards-wide-audit.md) verifies consistency ACROSS
all standards repos simultaneously. Run it:
- Quarterly
- After any major change to a standards repo
- When onboarding a new standards repo

---

## Adding a New Repo

### Adding a new standards repo
1. Determine it governs something no existing standard covers
2. Move or create it in main-github
3. Follow the onboarding checklist in
   architecture/hub-and-spoke-model.md
4. Add it to the standards table in this document
5. Add it to universal-rules.md repo registry
6. Create per-repo supplement in ai-instructions/per-repo/
7. Run a full audit before first use

### Adding a new library repo
1. Confirm 3+ reusable artifacts exist across 2+ projects
2. Create repo with semantic versioning from day one
3. Create CHANGELOG.md
4. Create CLAUDE.md referencing global-docs
5. Create docs/audit-process.md referencing universal
   checklists in global-docs
6. Add it to the planned libraries table in this document
   (move from "planned" to "active" with version noted)
7. Run a full audit before first use in any project
