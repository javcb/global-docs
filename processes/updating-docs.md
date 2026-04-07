# Updating docs

When a recurring rule, preference, or architecture pattern emerges:
1. add it to the right file in global-docs
2. keep the wording concise and actionable
3. update any repo-level stubs only if they need a repo-specific override
4. note the date of meaningful changes in commit messages

Rule of thumb:
- global principle -> global-docs
- repo-specific exception -> repo stub

## Site sync rule

When a .md file is updated, the corresponding site/ HTML page must be updated
in the same commit. They are not automatically synced.
Run the FAQ site-sync audit prompt if unsure which pages are out of date.

## The staleness rule

If you finish a session and something important was decided, discovered, or changed:
- Update the relevant global-docs file before closing the session
- If a new pattern emerged, add it to the right standards file
- If a decision was made, add it to processes/setup-history.md
- If a link broke, fix it

Do not rely on AI tool memory or conversation history.
global-docs is the only persistent context that survives tool changes.

