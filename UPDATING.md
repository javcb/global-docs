# How to update global-docs

## When to update

- A new recurring rule or pattern emerges from a project
- A structural change is made to orgs or repos
- A new AI tool or access token is added
- A major process decision is made
- A new file is added to global-docs

## Steps

1. Edit the relevant file directly
2. If adding a new file: add it to [README.md](README.md) master index table
3. Update the corresponding HTML page in site/ in the same commit
4. If adding a new process or standard: add a FAQ entry in [FAQ.md](FAQ.md)
5. If the change is a major decision: note it in [processes/setup-history.md](processes/setup-history.md)
6. Commit with a clear message: e.g. "Add operational-model.md rollback section"

## Site sync rule

When any .md file is updated, its corresponding site/ HTML page must be
updated in the same commit. They are not automatically synced.

To sync a specific page, prompt any AI tool:
"The content of [filename].md has been updated.
Update site/[path]/[filename].html to match.
Do not change structural HTML, nav, or shared assets. Update content only."

## Full documentation audit

Run [audit-prompt.md](audit-prompt.md) periodically and before any major project.
See [FAQ.md](FAQ.md) for the audit AI prompt to use.

## Staleness rule

If something important was decided or changed in a session:
update global-docs before closing the session.
Do not rely on AI tool memory or conversation history.
global-docs is the only persistent context that survives tool changes.
