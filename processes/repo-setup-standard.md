# Standard repo structure

Every repo created by AI or by hand should follow this layout:

project-name/
  .env.example         # Required env variables with dummy values
  .gitignore           # Standard ignore rules
  README.md            # Setup, purpose, env vars, how to run
  AI-INSTRUCTIONS.md   # Links to global-docs + repo-specific rules
  src/
    main entry point
    core logic modules
  sql/                 # SQL scripts if applicable
  tests/               # Basic tests or sanity checks
  docs/                # Extended documentation if needed
  assets/              # Static assets if applicable

## Rules

- Always create README before considering work complete
- Always create .env.example listing every required env var
- Always create .gitignore
- Never commit .env, secrets, or credentials
- Always put reusable logic in src/ modules, not inline in scripts
- AI tools must follow this structure without being reminded