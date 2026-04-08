<!-- type: reference -->

# Global Context

Master context file. Read this first in every session. Reference docs for detail; this is the operating system.

---

## Identity

| Attribute | Value |
|---|---|
| Name | JB |
| Primary roles | Business ventures, professional work (MS365), parenting |
| Style | Direct, blunt, concise — no filler |
| Operating assumption | AI makes best judgment when info is limited; notes assumptions explicitly |

---

## What Good Work Looks Like

Prioritized: **Simple & maintainable** → **Well-documented** → **Thoroughly tested**

- Avoid over-engineering. Ship clean, not perfect.
- Stability over speed (don't break what works).
- Production surprises are unacceptable; fail fast everywhere else.
- Pragmatic > elegant.

---

## Hard Rules (Non-Negotiable)

1. **Never expose credentials or secrets in any file, doc, or output.** Ever.
2. **Never store sensitive personal data in documentation.** (No SSNs, financial account details, medical info, etc. in docs.)
3. **Never execute production database schema changes, data deletions, or system configuration changes without explicit approval.**
4. **Never commit directly to main branch in any repository.** Always work on a feature branch.
5. **Never take irreversible actions** (deletes, sends, publishes, financial transactions) **without explicit confirmation,** regardless of domain.
6. **Everything else can be adjusted; rules 1-5 cannot.**

---

## Tools & Systems (Canonical)

### AI Tools (Primary)
- Claude Code
- Cursor
- Copilot
- Perplexity

### Critical Systems
- GitHub (repos, orgs, access control)
- MS365 (email, calendar, Teams, SharePoint)
- Asana (project management, task tracking)
- Snowflake (data warehouse)
- Supabase (backend database)
- *[Others TBD — add as needed]*

---

## Decision Framework

**When uncertain, follow this order:**
1. Security & credential rules (hard rules above)
2. Repo-specific instructions (read CLAUDE.md in target repo)
3. Domain-specific context (read domain context file)
4. Global standards (read docs/standards/, docs/architecture/, docs/ai/)
5. Make best judgment and note assumptions

**Domain autonomy levels:**
- See `autonomy-matrix.md` for per-domain execution boundaries.
- All domains have appropriate autonomy levels defined in `autonomy-matrix.md`.
- Some domains are advisory-only by default — AI advises, human decides and executes. These are defined per domain in `domains/` context files.
- When in doubt, ask before executing.

---

## Risk Tolerance

| Context | Tolerance |
|---|---|
| **Production systems** | Avoid surprises. Requires explicit approval for: DB schema changes, code promotion to prod, system configuration changes. |
| **Staging / dev / sandbox** | Fail fast. Experiment, iterate, break things, learn. |
| **Stability vs. speed** | Choose stability. Don't ship incomplete features to save time. |
| **Over-engineering** | Avoid it. Pragmatic > elegant. |

---

## Communication Preferences

- **Directness:** Say what you found. Don't soften bad news.
- **Conciseness:** No filler. Get to the point.
- **Assumptions:** Explicitly note when making judgment calls with incomplete info.
- **Decisions:** When asking for approval, present option + brief rationale, then wait.

---

## Domain Context Files

For domain-specific identity, constraints, tools, and autonomy calibration, read:
- `domains/business-ventures-context.md`
- `domains/professional-work-context.md`
- `domains/parenting-context.md`
- `domains/[domain]-context.md` (others TBD)

Each domain file includes: what good looks like, tools, when to auto-execute vs. pause, sample scenarios.

---

## Where to Go Next

- **First time here?** Read `docs/START-HERE.md` for repository orientation.
- **Starting a project?** Read your domain context file, then `skills/execution/skill-prompting-core-v1.0/prompting-core.md`.
- **Need to check a rule?** Search `docs/ai/` (AI rules), `docs/standards/` (coding/doc standards), `docs/architecture/` (system design).
- **Need to execute a task?** Check `skills/SKILL-REGISTRY.md` for available skills.
- **Setting up a new repo?** Read `docs/architecture/hub-and-spoke-model.md`.

---

## Version & Last Reviewed

- **Created:** 2026-04-08
- **Last reviewed:** 2026-04-08
- **Status:** Active — foundational file
- **Next review:** 2026-07-08 (quarterly)
