# .env.example standard

Every repo that requires credentials or environment-specific config must include a `.env.example` file.

## Rules

- .env.example is committed to the repo
- .env is never committed (covered by .gitignore)
- Every required variable must appear in .env.example with a dummy or descriptive value
- Add a comment above each variable explaining what it is

## Template
Snowflake connection
SNOWFLAKE_ACCOUNT=your_account.region
SNOWFLAKE_USER=your_username
SNOWFLAKE_PASSWORD=your_password
SNOWFLAKE_DATABASE=your_database
SNOWFLAKE_SCHEMA=your_schema
SNOWFLAKE_WAREHOUSE=your_warehouse
SNOWFLAKE_ROLE=your_role

Supabase connection
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_anon_or_service_key

SharePoint (if applicable)
SHAREPOINT_SITE_URL=https://yourorg.sharepoint.com/sites/your-site
SHAREPOINT_CLIENT_ID=your_client_id
SHAREPOINT_CLIENT_SECRET=your_client_secret

Excel paths (adjust per machine)
EXCEL_SOURCE_DIR=/path/to/source/files
EXCEL_OUTPUT_DIR=/path/to/output/files


AI tools must create this file when scaffolding any repo that connects to external systems.