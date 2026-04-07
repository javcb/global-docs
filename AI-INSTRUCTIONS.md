# AI instructions for global-docs

## Purpose of this repo

This is a personal documentation hub governing GitHub organizations,
AI tool behavior, coding standards, architecture decisions, and operational
boundaries for one owner working across multiple roles.

This repo is read by AI tools before starting any project.
It is also used for human onboarding and team reference.

## Read before doing anything else

1. [README.md](README.md) — master index and rule precedence
2. [orgs/overview.md](orgs/overview.md) — GitHub org map
3. [ai/base-rules.md](ai/base-rules.md) — how AI tools must behave
4. [ai/languages.md](ai/languages.md) — allowed languages per context
5. [ai/security.md](ai/security.md) — secrets and credential rules
6. [ai/workflow.md](ai/workflow.md) — how to approach changes
7. [architecture/registry.md](architecture/registry.md) — canonical cross-repo asset locations
8. [processes/operational-model.md](processes/operational-model.md) — operational boundaries (automation, schema change rules, etc.)

## Rule precedence

When rules conflict:
1. Security and credential handling
2. Repo-specific instructions
3. Org-specific rules
4. Global AI rules
5. Language and style standards

For operational boundaries (what is safe to automate, schema change rules, etc.),
see [processes/operational-model.md](processes/operational-model.md).

## Key rules summary

- Prefer Python and SQL for production systems
- TypeScript/JavaScript/CSS for UI prototypes only
- Never hardcode credentials or secrets
- Always work on a feature branch, never directly on main
- Follow [standards/modularity.md](standards/modularity.md) before adding any new file or component
- When referencing a cross-repo asset, check [architecture/registry.md](architecture/registry.md) first
- Update [README.md](README.md) master index when adding a new file to this repo

## This repo structure

orgs/          GitHub organization rules and purposes
ai/            AI tool behavior rules, personas, security
architecture/  System design, platform strategy, registry
processes/     How to do recurring tasks
standards/     Coding and documentation conventions
context/       Who the owner is and how they think (in progress)
site/          Static HTML documentation site
