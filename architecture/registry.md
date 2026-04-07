# Cross-repo registry

This is the single canonical reference for where key assets live across orgs and repos.
All other docs should reference this file instead of hardcoding locations.

Last updated: April 2026

## Core assets

| Asset | Org | Repo | Status |
|---|---|---|---|
| Global documentation | main user account | global-docs | Active |
| AI repo starter template | javcb-templates | templates_repo-starter | Active |
| Design system | main user account | design-system | Active — in main GitHub user account |
| Python Excel core library | javcb-prod | py-excel-core | Not yet built |
| Python Snowflake core library | javcb-prod | py-snowflake-core | Not yet built |
| Python Supabase core library | javcb-prod | py-supabase-core | Not yet built |
| SQL core repo | javcb-prod | sql-core | Not yet built |

## Rules

- When a new canonical repo is created, add it here first
- All docs that reference a cross-repo asset should link to this registry
- Do not hardcode org/repo locations in multiple docs
- **Design system:** hosted on the main GitHub user account as repo `design-system`.
  Local clone: `~/code/github/[your-github-username]/design-system/` (see [architecture/local-machine-layout.md](local-machine-layout.md)).
  Remote: `https://github.com/[your-github-username]/design-system`