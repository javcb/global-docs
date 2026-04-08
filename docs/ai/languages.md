<!-- type: reference -->

# Language and technology boundaries

## Global default

Preferred durable production stack:
- Python
- SQL

Allowed secondary/prototyping stack:
- TypeScript
- JavaScript
- CSS

## Production-oriented repos

Use:
- Python for automation, data workflows, APIs, utilities
- SQL for database logic, transformations, views, procedures

Do not introduce:
- TypeScript/JavaScript/CSS into backend or data repos unless explicitly required

## UI/UX prototype repos

Use:
- TypeScript
- JavaScript
- CSS
- supporting frontend libraries when justified

## AI sandbox repos

Any language may be used for experimentation.
However:
- prefer Python/SQL if the work may later be promoted to production
- clearly label prototype vs production-ready output

## Constraint handling

If the best solution falls outside the allowed stack:
1. explain why
2. describe the recommended outside-boundary solution at a high level
3. provide the best within-boundary solution
4. do not implement outside-boundary code unless explicitly instructed