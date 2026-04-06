# Core libraries vs adapters

## Goal

Shared logic should be reusable across roles, projects, and environments without carrying role-specific credentials or assumptions.

## Core libraries

Core libraries are role-agnostic reusable components.

Examples:
- Excel file operations
- Power Query refresh helpers
- Snowflake connection and query helpers
- Supabase connection and query helpers
- logging/configuration utilities
- reusable SQL patterns

Core libraries must:
- avoid hardcoded credentials
- avoid role-specific paths
- avoid project-specific business logic
- accept configuration externally

## Adapters

Adapters are thin project- or role-specific layers that connect core libraries to a real environment.

Examples:
- work-specific Snowflake jobs
- personal Supabase workflows
- project-specific ETL scripts
- UI-specific API adapters

Adapters may include:
- environment-specific configuration
- project-specific file locations
- workflow orchestration
- limited business logic

## Rule of thumb

If logic is useful across multiple roles or projects, it belongs in a core library.
If logic exists mainly to wire a specific role/project/environment together, it belongs in an adapter or workflow repo.