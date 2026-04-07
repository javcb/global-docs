# Setup history and decisions

## Changelog

This section tracks meaningful changes to global-docs in reverse chronological order.
Add an entry whenever a significant rule, process, or structure changes.

Format: `YYYY-MM-DD: [what changed and why]`

Entries:
- 2026-04-07: Added OPEN-ITEMS.md backlog, workflow-scenarios, post-mortem process,
  ui-behavior standards, documentation hierarchy rule, operational model,
  context folder, registry, modularity standards, site/ HTML documentation
- 2026-04-06: Initial global-docs setup — orgs, AI rules, architecture,
  processes, standards established

---

This file documents major decisions made during the initial global-docs setup
so context is not lost when returning to this work later.

---

## April 2026: Initial GitHub reorganization

### Problem

Repos were scattered across a single GitHub account with no structure.
Old experiments, active work, purchased templates, and AI-generated code all lived together.
No documentation, no standards, no AI guardrails.

### What was done

1. Created four GitHub organizations:
   - javcb-prod: production-ready repos
   - javcb-staging: active work and WIP
   - javcb-templates: purchased kits and read-only templates
   - javcb-archive: retired projects
   - javcb-ai: AI coding sandbox

2. Moved repos into appropriate orgs:
   - Old and retired repos → javcb-archive (archived on GitHub)
   - Purchased UI kits and Excel templates → javcb-templates (archived)
   - Active work repos → javcb-staging
   - Core libraries when ready → javcb-prod

3. Created global-docs repo under main GitHub user account (not inside any org)
   - Single source of truth for all rules, architecture, processes, and standards
   - AI tools read this before working on any repo

4. Created ai-repo-starter in javcb-ai
   - Scaffold template for all new repos created by AI or manually

### Why the main GitHub user account holds global-docs

global-docs is cross-org. Putting it inside one org would require AI tools
to have access to that specific org just to read documentation.
Under the main user account it is accessible with a single read-only token.

---

## Access token design

### Problem

AI tools were being given broad access. Risk of accidentally modifying
production code, documentation, or template masters.

### Decision

Use GitHub fine-grained personal access tokens, scoped per org and per purpose.

Three tokens:
- read-only-docs-templates: read access to global-docs and javcb-templates only
- staging-write: read+write to javcb-staging only
- ai-sandbox-full: read+write to javcb-ai only

See processes/access-tokens.md for full setup instructions.

---

## Tech stack decisions

### Production: Python + SQL only

Rationale: owner can maintain, debug, and understand these languages without external help.
Complexity from other languages in production systems is not worth the maintenance risk.

### TypeScript/JavaScript/CSS: prototyping and UI only

Rationale: owner uses these for design exploration and UI mockups.
Not used in backend, data, or automation systems.

### AI sandbox: any language

Rationale: experimentation should not be constrained.
Anything worth promoting must be reviewed and translated to the production stack.

---

## Design system decision

### Problem

Previous AI-assisted UI work produced inconsistent, fragile front-ends because
AI tools invented components instead of using a consistent system.

### Decision

Build an atomic design system from purchased UI kits (Tailwind, component libraries).
Document all atoms, molecules, organisms, templates, and foundations.
Instruct AI tools to use components by name, never invent new ones.

Status: design system repo to be built from purchased kits in javcb-templates.

---

## Maker/checker process

### Problem

AI-generated code went directly into use without review.
Hard to maintain. Hard to debug. No quality bar.

### Decision

Formalize a two-stage process:
- Maker: Cursor or Claude Code builds in staging or ai sandbox
- Checker: Claude reviews diff for bugs, security issues, rule violations
- Owner: final review before promotion to prod

See processes/maker-checker.md.

---

## Notes for future self

- global-docs should be updated before starting any new project
- When a recurring rule or pattern emerges, add it here immediately
- ai/future-ideas.md is the parking lot for rough ideas not yet formalized
- processes/setup-history.md (this file) should be updated when major decisions are made