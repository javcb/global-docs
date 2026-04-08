<!-- type: reference -->

# AI instructions for global-docs

## Purpose of this repo

This is a personal documentation hub governing GitHub organizations,
AI tool behavior, coding standards, architecture decisions, and operational
boundaries for one owner working across multiple roles.

This repo is read by AI tools before starting any project.
It is also used for human onboarding and team reference.

## Read before doing anything else

1. [index.md](index.md) — master index and rule precedence
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
- Update [index.md](index.md) master index when adding a new file to this repo

### Adding new documentation pages

When creating a new .md file anywhere in this repo:
1. Create the file in the correct folder within docs/
2. Open mkdocs.yml and add one nav entry under the correct section
3. Position it alphabetically or logically within that section
4. Do not reorder existing nav entries
5. Push to main — the site rebuilds automatically

Never create a .md file without a corresponding mkdocs.yml nav entry.
The file will exist but will be invisible to the site and search if omitted.

**Critical rule:** All markdown files live exclusively in `docs/` and its subdirectories.
Never create documentation .md files at the repo root or in root-level subdirectories.
The only permitted root-level .md file is `README.md`, which serves as a GitHub landing
page pointing to the docs site at https://javcb.github.io/global-docs/.

## Documentation structure: Diátaxis framework

This repo follows the **Diátaxis documentation framework** (see [docs/META.md](META.md) for full rules).

**Every document must declare its type at the top:**
```html
<!-- type: tutorial | how-to | reference | explanation -->
```

**The four types (never mix in one document):**

| Type | Purpose | Reader State | Format | Contains | Does NOT contain |
|------|---------|--------------|--------|----------|------------------|
| **Tutorial** | Orientation, learning | Getting started or re-orienting | Guided experience, narrative, warm | Context, narrative, "read this next" links | Reference specs, decision rationale |
| **How-To** | Accomplish a specific task | Knows what to do, needs steps | Numbered steps, imperative ("Run X") | Prerequisites, steps, outcome, AI prompt | Conceptual explanation, background |
| **Reference** | Factual lookup | Working, needs a specific fact | Terse, consistent structure | Specs, rules, definitions, examples | Instructions, "why" explanations, guides |
| **Explanation** | Build understanding of why | Wants context, not doing a task now | Narrative, analytical | Rationale, context, history, alternatives | Step-by-step instructions, reference specs |

**Rules for contributors (AI and human):**

1. Every new document must declare its type in a comment: `<!-- type: ... -->`
2. Never add instructions to a reference doc
3. Never add conceptual background to a how-to guide — link to the explanation doc instead
4. Every how-to guide that has an executable AI prompt must include it at the bottom under a `## Prompt` heading
5. Documents are organized by **type**, not by directory structure (see mkdocs.yml nav)
6. Cross-reference between documents: tutorials link to how-tos, how-tos link to references and explanations, etc.

**Organization in mkdocs.yml:**
- **Meta** — Documentation standards (META.md)
- **Start Here** — Tutorial entry point (START-HERE.md)
- **How-To Guides** — Organized by task category
- **Reference** — Organized by topic (standards, architecture, org docs, etc.)
- **Explanation** — Deep dives and conceptual materials

**When creating a new document:**
1. Choose your type: tutorial, how-to, reference, or explanation
2. Add the type comment at the very top: `<!-- type: your-type -->`
3. Place the file in the appropriate subdirectory under `docs/` (directory doesn't enforce type)
4. Update mkdocs.yml nav entry under the correct section (organized by type, not directory)
5. For how-to guides: include a `## Prompt` section if it describes an AI-executable task
6. For reference docs: use consistent structure and avoid narrative
7. For explanations: include rationale and alternatives considered
8. For tutorials: include "what's next" guidance and warm, encouraging tone

## This repo structure

orgs/          GitHub organization rules and purposes
ai/            AI tool behavior rules, personas, security
architecture/  System design, platform strategy, registry
processes/     How to do recurring tasks
standards/     Coding and documentation conventions
context/       Who the owner is and how they think (in progress)
docs/          MkDocs configuration and theme assets
