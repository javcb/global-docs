<!-- type: reference -->

# Commit message standards

## Format

Use present tense, imperative mood, short subject line.

Good:
- Add Snowflake connection helper
- Fix Power Query refresh on protected sheets
- Refactor excel_ops into separate modules
- Update README with setup instructions

Bad:
- fixed stuff
- update
- wip
- changes

## Rules

- Subject line: 50 characters or less
- Capitalize first word
- No period at end
- If more detail is needed, add a blank line then a body paragraph
- AI tools must write meaningful commit messages, not "update files" or "changes"

## When AI tools commit

Commit messages should reflect what actually changed, for example:
- "Extract snowflake_io module from monorepo"
- "Add .env.example with Supabase variables"
- "Scaffold project structure per repo-setup-standard"