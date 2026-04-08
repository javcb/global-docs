<!-- type: reference -->

# global-docs

This repository is the single source of truth for how my GitHub organizations, local machine, shared libraries, data platform integrations, AI tools, and development processes are structured and governed.

<div class="maintenance-note">
This is a Level 1 orientation document. Start here, then follow links to the section you need.
</div>

---

## Why this repo exists

I work across multiple roles (work projects, personal projects, UI/UX prototyping, data engineering) and use AI-assisted coding tools (Claude Code, Cursor, Copilot, and others). Without a central operating document, every tool and every project would have conflicting rules, scattered documentation, and no consistent standards.

This repo solves that by:
- defining the full GitHub universe (orgs, purposes, rules)
- governing how AI tools behave across all repos
- establishing reusable architecture patterns
- documenting processes so nothing has to be figured out twice

## Purpose

This repo exists to:
- document how my GitHub user and organizations are structured
- define shared architecture and reusable component strategy
- define AI operating rules, personas, and security guardrails
- define language boundaries by repo/org/project type
- document repeatable processes for new repos, templates, staging, and modularization

## Core principles

- Build once, reuse across roles where possible.
- Keep core libraries role-agnostic.
- Keep credentials and environment-specific wiring out of shared libraries.
- Prefer Python and SQL for production-grade systems.
- Use TypeScript, JavaScript, and CSS mainly for UI/UX prototypes and designated frontend work.
- Keep AI tools constrained, documented, and reviewable.
- Optimize for systems I can understand, maintain, and debug myself.

## How to use this repo

- Read [orgs/overview.md](orgs/overview.md) for the GitHub map.
- Read [architecture/system-overview.md](architecture/system-overview.md) for reusable system design.
- Read [ai/base-rules.md](ai/base-rules.md) for AI operating rules and tool behavior.
- Read [processes/new-repo-checklist.md](processes/new-repo-checklist.md) and other playbooks in [processes/](processes/).
- Read [standards/](standards/) for language- and platform-specific conventions.

## Rule precedence

When rules conflict, use this order:
1. Security and credential handling always wins
2. Repo-specific AI instructions
3. Org-specific rules
4. Global AI rules
5. Language and style standards

For operational boundaries (what is safe to automate, schema change rules, etc.),
see [processes/operational-model.md](processes/operational-model.md).

## Change policy - How to update this repo
See [processes/updating-docs.md](processes/updating-docs.md) for the change policy.
Also see [UPDATING.md](UPDATING.md) for detailed update procedures.
Short version: edit the right file, keep it concise, update README.md and mkdocs.yml if you add a new file.


---

## Master index

### Start here

| Document | What it answers |
| --- | --- |
| `orgs/overview.md` | What orgs exist, what they are for, and how they relate |
| `architecture/system-overview.md` | How everything fits together as a system |
| `processes/new-repo-checklist.md` | What to do before creating any new repo |
| `FAQ.md` | Quick reference cheatsheet for all common tasks |
| `processes/link-checker-setup.md` | Automated link checking via GitHub Actions |
| `standards/modularity.md` | Modularity and centralization rules |
| `architecture/registry.md` | Canonical cross-repo asset locations |

### GitHub organization map
| Document | Covers |
|---|---|
| `orgs/overview.md` | Full org map and design logic |
| `orgs/javcb-prod.md` | Production-ready repos |
| `orgs/javcb-staging.md` | Work in progress and active builds |
| `orgs/javcb-templates.md` | Purchased kits and read-only templates |
| `orgs/javcb-archive.md` | Retired projects |
| `orgs/javcb-ai.md` | AI sandbox and autonomous builds |

### AI tool rules
| Document | Covers |
|---|---|
| `ai/base-rules.md` | Core behavior expected from all AI tools |
| `ai/personas.md` | Roles AI tools should take per context |
| `ai/languages.md` | Allowed languages per org and context |
| `ai/security.md` | Secrets, credentials, least privilege |
| `ai/workflow.md` | How AI tools should approach changes |
| `ai/quality-bar.md` | Code quality expectations |
| `ai/ui-ux-style.md` | Design inspiration and UI standards |
| `ai/design-system.md` | How to use the atomic design system |
| `ai/review-checklist.md` | What to check before accepting AI output |
| `ai/future-ideas.md` | Rough ideas not yet formalized |

### Architecture
| Document | Covers |
|---|---|
| `architecture/core-vs-adapters.md` | Reusable libraries vs role-specific wiring |
| `architecture/data-platforms.md` | Snowflake, Supabase, Excel, SharePoint strategy |
| `architecture/sql-strategy.md` | Where SQL lives and how it is organized |
| `architecture/local-machine-layout.md` | Local folder structure mirroring GitHub |
| `architecture/design-system.md` | Design system status and AI usage rules (placeholder) |

### Processes
| Document | Covers |
|---|---|
| `processes/maker-checker.md` | AI maker + checker review before promotion |
| `processes/autonomous-build.md` | How to trigger any LLM for a full project build |
| `processes/ai-tool-roles.md` | When and how to use Cursor vs Claude Code vs Copilot |
| `processes/ai-tool-setup.md` | How to set up Cursor, Claude Code, and new AI tools |
| `processes/repo-setup-standard.md` | Required structure for all repos |
| `processes/new-repo-checklist.md` | Pre-flight checklist for any new repo |
| `processes/access-tokens.md` | How to set up and manage GitHub access tokens |
| `processes/updating-docs.md` | How to maintain this repo |
| `processes/modularization-playbook.md` | How to refactor a monorepo |
| `processes/promote-staging-to-prod.md` | Steps to promote a repo to production |
| `processes/post-mortem.md` | When and how to document failures and update rules to prevent recurrence |
| `processes/template-intake.md` | How to add a purchased template to javcb-templates |
| `processes/operational-model.md` | What is safe to automate, schema rules, rollback, ADRs |
| `processes/workflow-scenarios.md` | Step-by-step paths for common project types (prototype, prod, refactor) |
| `processes/setup-history.md` | Log of major decisions and setup history |
| `processes/expansion-roadmap.md` | Future documentation domains beyond engineering |
| `processes/link-checker-setup.md` | Automated link checking via GitHub Actions |

### Standards
| Document | Covers |
|---|---|
| `standards/python.md` | Python coding conventions |
| `standards/sql.md` | SQL conventions |
| `standards/javascript-typescript.md` | JS/TS conventions |
| `standards/excel-automation.md` | Excel and Power Query standards |
| `standards/configuration.md` | Config and env variable standards |
| `standards/gitignore-template.md` | Standard .gitignore rules |
| `standards/env-example-template.md` | Standard .env.example format |
| `standards/readme-template.md` | Standard README structure |
| `standards/commit-messages.md` | Commit message conventions |
| `standards/branch-discipline.md` | Branch naming and workflow |
| `standards/naming.md` | File, folder, and variable naming rules |
| `standards/prompt-format.md` | How to format reusable prompts for copy-paste use |
| `standards/ui-behavior.md` | UI behavior standards for sites and apps (state, nav, scroll, zoom, responsive) |

### Context

| Document | Covers |
| --- | --- |
| `context/about-me.md` | Owner background and working style (draft) |
| `context/roles.md` | Roles the owner operates in (draft) |
| `context/priorities.md` | Current priorities (draft) |
| `context/constraints.md` | Time, tools, and skill constraints (draft) |

### Tools and utilities

| Document | Covers |
| --- | --- |
| `audit-prompt.md` | LLM-agnostic prompt to run a full documentation health audit |
| `UPDATING.md` | How to keep global-docs current and run audits |
| `AI-INSTRUCTIONS.md` | Entry point orientation file for AI tools |
| `OPEN-ITEMS.md` | Living backlog reviewed and updated during every audit |

---
