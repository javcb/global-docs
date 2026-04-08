<!-- type: reference -->

# AI security rules

## Secrets and credentials

- Never hardcode secrets, API keys, passwords, private keys, tokens, or connection strings.
- Never place credentials in source control.
- Use environment variables or non-committed local configuration files.
- Treat .env files and similar files as sensitive.

## Least privilege

- Prefer the minimum access required.
- Limit AI tools to the smallest repo/org/path scope possible.
- Do not assume write access where read access is enough.

## Sensitive systems

- Ask before changing anything that touches production credentials, authentication, CI/CD, deployment, or external integrations.
- Flag security-sensitive changes for review.

## Safer defaults

- Prefer parameterized queries.
- Prefer secure transport and authentication defaults.
- Avoid broad file operations or destructive actions without confirmation.