<!-- type: reference -->

# Universal AI Rules

These rules apply to every repo in this system.
Do not redefine them in local CLAUDE.md files —
reference this file instead.

## Repo Registry
| Repo | Purpose | Local CLAUDE.md | Supplement |
|---|---|---|---|
| global-docs | Canonical documentation hub | CLAUDE.md | per-repo/global-docs.md |
| design-system | UI component library | CLAUDE.md | per-repo/design-system.md |

(Add rows as new repos are created)

## Universal Rules

### Documentation
1. global-docs is the single source of truth for all
   standards, conventions, and cross-repo knowledge.
2. Never duplicate content that exists in global-docs.
   Reference it instead.
3. Every session ends with CHECKLIST.md updated.

### Code Quality
4. TypeScript strict mode in all repos.
5. No hardcoded values that belong in config or tokens.
6. Every file that can be tested should have a test file.

### AI Session Behavior
7. Read the required reading list in CLAUDE.md before
   touching any file in the repo.
8. Read-only audit before any bulk implementation session.
9. Never modify files outside the scope of the current task.
10. Report completion of each task before moving to the next.
11. If a task requires clarification, ask — do not guess.

### Version Control
12. .gitignore must exclude: node_modules/, .next/,
    storybook-static/, coverage/, .env*, *.local
13. Never commit secrets, API keys, or credentials.

## Stack Defaults (unless repo overrides)
- TypeScript strict mode
- Path alias: @/* → ./*
- Testing: Vitest + React Testing Library + jsdom
- Linting: ESLint + Prettier
