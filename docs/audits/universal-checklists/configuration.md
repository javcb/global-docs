<!-- type: reference -->

# Universal Checklist — Configuration

Reference from repo-local audit-process.md files.
Checklist ID prefix: CFG

## CFG-1: Version Control
- .gitignore exists
- .gitignore includes: node_modules/, .env*, *.local
- .gitignore includes build output: .next/, dist/,
  storybook-static/, coverage/
- No secrets or credentials in any tracked file
PASS = all present

## CFG-2: Test Infrastructure
- vitest.config.ts exists (or jest.config.ts)
- Test environment set to jsdom for UI repos
- Setup file imports @testing-library/jest-dom
- Test script present in package.json
PASS = all present

## CFG-3: Package Scripts
package.json must include:
- dev: local development server
- build: production build
- typecheck: tsc --noEmit
- test: vitest (or jest)
- lint: eslint
PASS = all five present

## CFG-4: Environment
- .env.example exists if repo uses environment variables
- All required env vars documented in .env.example
- No .env files tracked in git
PASS = example exists, no .env tracked
