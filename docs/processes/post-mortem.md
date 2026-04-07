# Post-mortem process

## Purpose

When something goes wrong in a project — a bug that passed review, a bad
architectural decision, a process failure — a post-mortem captures what happened
and, more importantly, updates global-docs so it does not happen again.

A post-mortem that does not update a rule is just venting.
A post-mortem that updates ai/base-rules.md or a standards file prevents recurrence.

## When to write one

- A bug reached production that the maker/checker process should have caught
- An AI tool produced consistently bad output in a pattern
- A process step was skipped and caused a problem
- A decision was made that turned out to be wrong and was hard to reverse

## Format

Create a file in `processes/post-mortems/` named: `YYYY-MM-DD-short-description.md`

Use this structure:

~~~markdown
# Post-mortem: [short description]

Date: YYYY-MM-DD
Project: [repo name]
Severity: High / Medium / Low

## What happened
[2-3 sentences: what broke or went wrong]

## Root cause
[What actually caused it — not symptoms, the underlying reason]

## What was missed
[Which process, rule, or check failed to catch this]

## Fix applied
[What was done to resolve the immediate problem]

## Global-docs update
[Which file was updated, what rule was added or changed, link to the change]

## Prevention
[One sentence: how this cannot happen again given the global-docs update]
~~~

## Rules

- Every post-mortem must result in at least one global-docs file being updated
- Add a changelog entry to processes/setup-history.md referencing the post-mortem
- Add the global-docs update as a completed item in OPEN-ITEMS.md
