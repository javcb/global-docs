# Autonomous build process

## How to trigger

Begin any new autonomous project with this prompt pattern:

"Read AI-INSTRUCTIONS.md and the linked global-docs files. Then [describe the project in plain English]. Work in the javcb-ai org. Use the standard repo structure from global-docs. When complete, update the README with what to test, what is incomplete, and what credentials are needed."

## What the agent should do

1. Read global-docs context
2. Create repo in javcb-ai with standard structure
3. Set up required infrastructure (Supabase, env vars, etc.)
4. Build core logic in Python/SQL
5. Use templates from javcb-templates for UI scaffolding
6. Apply atomic design system components by name where applicable
7. Update README with review instructions
8. Signal completion

## Review checklist before promoting

- Does it run?
- Does the README explain setup clearly?
- Are credentials handled via env vars?
- Does it follow the standard repo structure?
- Has the checker review been run?