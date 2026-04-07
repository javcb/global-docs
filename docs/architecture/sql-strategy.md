# SQL strategy

## Principle

SQL is a first-class asset and should be versioned, organized, and reusable.

## Preferred structure

Use dedicated SQL repositories or clearly separated SQL folders, organized by platform and purpose.

Examples:
- sql-core/snowflake/views/
- sql-core/snowflake/procedures/
- sql-core/supabase/functions/
- sql-core/common/patterns/

## Rules

- Prefer saving important SQL as .sql files.
- Name files clearly by function and target object.
- Keep reusable SQL in shared repos or shared folders.
- Keep project-specific SQL close to the project only when reuse is unlikely.