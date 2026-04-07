# Maker/checker process

## Goal

Produce reviewed, durable code before anything moves to production.

## Roles

- Maker: Cursor (interactive builds) or Claude Code (autonomous tasks)
- Checker: Claude reviewing diffs for quality, security, and rule compliance
- Owner: final human review and promotion decision

## Process

1. Build in javcb-staging or javcb-ai
2. When feature is complete, run checker review
3. Ask checker: "Review this diff. Find bugs, missing cases, security issues, violations of global-docs rules. Do not rewrite. Flag only."
4. Address flagged issues
5. Owner sanity check
6. Promote to prod

## Rules

- Never promote directly from ai org to prod without checker review
- Checker reviews diffs, not full files, for precision
- README must be updated before promotion