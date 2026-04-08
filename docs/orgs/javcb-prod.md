<!-- type: reference -->

# Org: javcb-prod

## Purpose

Production-ready repos. Code here is vetted, stable, and safe to depend on.

## What belongs here

- Core reusable Python libraries (excel, snowflake, supabase, logging, config)
- SQL core repo
- Stable, reviewed apps and tools
- Repos promoted from staging after maker/checker review

## What does not belong here

- Experiments or untested code
- AI-generated code that has not been reviewed
- Anything in active development

## Allowed languages

- Python (primary)
- SQL (primary)
- TypeScript/JavaScript/CSS only in designated frontend repos

## AI posture

- AI tools should propose changes, not apply them autonomously
- All changes require human review before merge
- AI tools should default to read-only analysis and suggestions here

## Promotion rules

- Code enters from javcb-staging after maker/checker review
- Minimum: code works, is readable, follows global standards, has a README