# Access token strategy

Tokens are always created from your personal GitHub account settings.
To access org repos: change "Resource owner" to the org when creating the token.
First enable fine-grained PATs in each org under: Org Settings → Personal access tokens → Settings.

## Active tokens

### read-only-docs-templates
- Resource owner: your user account + javcb-templates
- Repos: global-docs, all javcb-templates repos
- Permissions: Contents read, Metadata read
- Use for: giving AI tools read-only context from docs and templates

### staging-write
- Resource owner: javcb-staging
- Repos: all javcb-staging repos
- Permissions: Contents read+write, Pull requests read+write
- Use for: active development work

### ai-sandbox-full
- Resource owner: javcb-ai
- Repos: all javcb-ai repos
- Permissions: Contents read+write, Pull requests read+write, Issues read+write
- Use for: autonomous agent builds with full write access

## Rules

- Never give AI tools a token that covers prod, docs, or templates with write access
- Regenerate tokens on a schedule or when a tool is removed
- Store tokens in your password manager, never in a repo