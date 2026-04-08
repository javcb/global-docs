<!-- type: reference -->

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

## Repo dependency map

Track which repos depend on which core libraries.
Update this table when a new project is started or a dependency is added.

| Repo | Org | Depends on |
| --- | --- | --- |
| (add first project here when started) | | |

- When adding a dependency to a project, add it to this table
- When updating a core library, check this table to identify potentially affected repos
- Do not update a core library without reviewing all dependent repos first

## Rules

- When a new canonical repo is created, add it here first
- All docs that reference a cross-repo asset should link to this registry
- Do not hardcode org/repo locations in multiple docs
- **Design system:** hosted on the main GitHub user account as repo `design-system`.
  Local clone: `~/code/github/[your-github-username]/design-system/` (see [local-machine-layout.md](local-machine-layout.md)).
  Remote: `https://github.com/[your-github-username]/design-system`

## Documentation site

Approach: MkDocs Material with GitHub Pages auto-deploy

- Auto-generates HTML from markdown on every push to main via GitHub Actions
- No manual site/ maintenance required
- To add a new page: create the .md file and add it to mkdocs.yml nav
- To preview locally: `mkdocs serve`
- Live site: deployed automatically by `.github/workflows/deploy-docs.yml` to GitHub Pages