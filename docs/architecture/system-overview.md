<!-- type: reference -->

# System overview

## The big picture

This system is designed so that one person can work across multiple roles
(work, personal projects, UI/UX prototyping, data engineering) using shared,
reusable components without duplicating effort or creating role-specific silos.

## Core design principles

- Build once, reuse across roles
- Core libraries are role-agnostic
- Credentials and environment config belong in adapters, not libraries
- Python and SQL for durable production systems
- TypeScript/JavaScript/CSS for UI prototypes only
- AI tools operate within documented boundaries, not freestyle

## How the pieces connect

global-docs (this repo)
↓ governs
GitHub orgs (javcb-prod, javcb-staging, javcb-templates, javcb-archive, javcb-ai)
↓ contain
Repos (core libraries, apps, templates, experiments)
↓ mirror
Local machine folders (~/code/github/[org-or-username]/[repo-name])

## Repo categories

| Category | Org | Purpose |
|---|---|---|
| Core libraries | javcb-prod | Reusable Python/SQL building blocks |
| Active projects | javcb-staging | Work in progress |
| Templates/kits | javcb-templates | Purchased kits, read-only starters |
| AI builds | javcb-ai | Autonomous agent output, prototypes |
| Retired work | javcb-archive | Historical reference only |

## Data platform strategy

- Snowflake: work role only (credentials not shared)
- Supabase: personal projects (credentials not shared)
- Excel/SharePoint: work role
- Core libraries handle all platforms generically via env vars

See `architecture/data-platforms.md` and `architecture/core-vs-adapters.md` for detail.

## AI tool strategy

- All AI tools read global-docs before working
- Access is scoped per token (read-only for docs/templates, write for sandbox)
- Maker builds in staging/ai sandbox, checker reviews, owner promotes to prod

See `processes/maker-checker.md` and `processes/access-tokens.md` for detail.

