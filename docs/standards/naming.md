<!-- type: reference -->

# Naming conventions

## Repos

- Use lowercase, hyphen-separated names
- Be descriptive, not clever
- Include the tech or purpose where helpful

Good: `py-snowflake-core`, `sql-supabase-core`, `excel-automation-tools`
Bad: `utils`, `stuff`, `my-project`

## Python files and modules

- Lowercase, underscore-separated (snake_case)
- Module names describe what they do

Good: `snowflake_connect.py`, `excel_file_ops.py`
Bad: `snowflakeStuff.py`, `helper.py`

## Python functions and variables

- snake_case
- Verb-first for functions, noun-first for variables

Good: `get_sheet_data()`, `load_to_snowflake()`, `source_file_path`
Bad: `getData()`, `doThing()`, `x`

## SQL files

- Lowercase, underscore-separated
- Name by object type and purpose

Good: `vw_sales_by_day.sql`, `sp_load_daily_summary.sql`, `tbl_customers.sql`
Bad: `query1.sql`, `new.sql`

## SQL objects

- Tables: `tbl_` prefix or no prefix, consistent throughout
- Views: `vw_` prefix
- Stored procedures: `sp_` prefix
- Staging tables: `stg_` prefix

## Environment variables

- SCREAMING_SNAKE_CASE
- Platform prefix where applicable

Good: `SNOWFLAKE_ACCOUNT`, `SUPABASE_URL`, `EXCEL_SOURCE_DIR`
Bad: `account`, `myKey`, `path1`

## Branches

- feature/short-description
- fix/short-description
- refactor/short-description
- experiment/short-description

## Commit messages

See `standards/commit-messages.md`