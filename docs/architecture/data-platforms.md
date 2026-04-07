# Data platform strategy

## Supported platforms

Current important platforms:
- Excel
- Snowflake
- Supabase
- SharePoint file sources
- local files / OneDrive-backed storage

## Design principle

The system should support multiple platforms through reusable interfaces and thin environment-specific wiring.

## Platform handling rules

- Shared platform logic belongs in central reusable libraries.
- Credentials must never be embedded in shared code.
- Role-specific projects provide the environment variables or local config required to connect.
- SQL should be stored as first-class assets, not buried inside Python strings unless small and justified.