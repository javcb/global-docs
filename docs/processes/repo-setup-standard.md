# Repo setup standard

## Starter template

All new repos (AI-created or manual) should start from the ai-repo-starter template. See architecture/registry.md for canonical location.

To use:
1. Clone ai-repo-starter into the appropriate org
2. Rename to the new project name
3. AI agent reads AI-INSTRUCTIONS.md before starting any work
4. Agent fills in README, .env.example, and src/ before writing business logic

## For refactoring existing repos

Use the same standard:
1. Clone ai-repo-starter as a reference (see architecture/registry.md for canonical location)
2. Instruct the AI: "Refactor this repo to match the structure in ai-repo-starter.
   Preserve all working behavior. Extract reusable modules into src/.
   Update README and .env.example. Create a feature branch first."

## Required files in every repo

| File | Required | Purpose |
|---|---|---|
| README.md | Yes | Setup, purpose, how to run |
| AI-INSTRUCTIONS.md | Yes | Links to global-docs + repo rules |
| .env.example | Yes (if credentials needed) | Document required env vars |
| .gitignore | Yes | Exclude secrets and build artifacts |
| src/ | Yes | All logic lives here |
| sql/ | If SQL used | SQL scripts |
| tests/ | Yes (even if minimal) | Sanity checks |
| docs/ | Optional | Extended documentation |