<!-- type: explanation -->

# Operational model

## Purpose

This document defines constraints and decision points that affect how systems
are built, changed, and maintained. It is not a technical implementation guide.
It exists so that AI tools and team members understand the boundaries of what
is safe to automate, change, or deploy without additional oversight.

---

## What is safe to automate vs. what requires caution

### Safe to automate
- Reading and transforming data (non-destructive)
- Creating new files, modules, or repos from templates
- Running queries against non-production data
- Generating documentation drafts
- Scaffolding new project structures

### Requires human review before proceeding
- Any change to a production database schema
- Any change that modifies existing data (updates, deletes)
- Any new external API integration or credential
- Any change to authentication or access control logic
- Promoting code from staging to prod
- Deleting or archiving a repo

### Do not automate without explicit instruction
- Running migrations against production databases
- Modifying .env files or secrets
- Changing GitHub org settings or access tokens
- Any action that is difficult or impossible to reverse

---

## Database schema changes

### Principle
Schema changes are among the highest-risk changes in any data system.
What breaks quietly is worse than what breaks loudly.

### Rules for AI tools
- Never apply a schema migration without explicit instruction
- Always propose the change first and explain what is reversible vs. destructive
- Additive changes (add column, add table) are lower risk
- Destructive changes (drop column, drop table, rename) require explicit approval
- Always check whether existing data will be affected

### Rollback expectation
- For Supabase: schema changes can be rolled back via migration history if managed properly
- For Snowflake: some changes are reversible, some are not — always flag which category

---

## Dependency management

### Rules
- Do not add a new package without noting it in requirements.txt or package.json
- Check for known vulnerabilities before adding a new dependency (ask AI to flag any)
- Prefer well-maintained, widely-used packages over niche ones
- Avoid packages with no recent updates or low adoption

### For AI tools
- Always update requirements.txt or package.json when adding a dependency
- Flag any package that is not widely used or has known security issues
- Do not install packages globally; use project-level virtual environments

---

## Testing expectations by repo type

### Production repos (javcb-prod)
- At minimum: one test per critical function that verifies expected behavior
- Tests must pass before promotion from staging

### Staging repos
- Tests encouraged but not blocking
- At minimum: a manual test script or README section describing how to verify it works

### AI sandbox repos (javcb-ai)
- Tests optional
- README must describe how to manually verify the output

### Design system
- Visual review is the primary "test"
- Each component should have a usage example in its documentation

---

## Rollback procedures

### Code rollback
- Every repo works on feature branches
- Rolling back means reverting the merge commit or checking out the previous commit
- AI tools should always work on branches, never directly on main

### Data rollback
- Snowflake: Time Travel allows querying/restoring data within a configurable window
- Supabase: point-in-time recovery available depending on plan
- Excel files: always save a copy before running any transformation script

### What AI tools should do when something breaks
1. Stop and do not attempt further changes
2. Report exactly what was changed and what the error is
3. Suggest a rollback or fix but wait for approval before executing

---

## Architecture Decision Records (ADRs)

### What they are
Short documents that capture why a significant decision was made.
Not implementation details — just context, options considered, and the reason for the choice.

### When to write one
- When choosing between two meaningfully different technical approaches
- When deciding to deviate from a standard in global-docs
- When a decision will be hard to reverse

### Format (keep it short)

```markdown
## ADR-[number]: [Short title]

Date: YYYY-MM-DD
Status: decided / superseded / revisited

### Context
What situation forced this decision?

### Options considered
- Option A: ...
- Option B: ...

### Decision
What was chosen and why.

### Consequences
What this makes easier or harder going forward.
```

### Where to store ADRs
`processes/adrs/` folder in global-docs.
Create one file per decision, e.g. `adr-001-python-only-for-prod` (add `.md` when you create the file).

---

## Placeholders for future operational docs

The following topics are not yet relevant but should be documented when they become real:

- CI/CD pipelines: when automated deployment is introduced
- Monitoring and alerting: when production systems need observability
- Infrastructure as Code: when cloud provisioning becomes part of the workflow
- Cost management: when cloud spend requires tracking
- Incident response: when systems are live enough that outages have real consequences