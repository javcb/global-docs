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

The documentation site auto-generates from markdown files on every push to main.
No manual HTML updates are required.
To update the site: update the .md file and push. The GitHub Action handles the rest.

To preview locally before pushing:
```
pip install -r requirements-docs.txt
mkdocs serve
```
Then open http://127.0.0.1:8000

## The staleness rule

If you finish a session and something important was decided, discovered, or changed:
- Update the relevant global-docs file before closing the session
- If a new pattern emerged, add it to the right standards file
- If a decision was made, add it to processes/setup-history.md
- If a link broke, fix it

Do not rely on AI tool memory or conversation history.
global-docs is the only persistent context that survives tool changes.

