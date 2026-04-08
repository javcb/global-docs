<!-- type: how-to -->

# Autonomous build process

## Design principle

This process is designed to work with any capable LLM coding agent, now or in the future,
including but not limited to: Claude Code, Cursor, Copilot Workspace, OpenClaw, or similar tools.
No step should be tool-specific. All behavior is governed by global-docs rules.

## How to trigger any agent

Paste this prompt pattern at the start of any autonomous build session:

---
Before starting any work:
1. Read AI-INSTRUCTIONS.md in this repo
2. Follow all linked files in global-docs
3. Use the standard repo structure from global-docs/processes/repo-setup-standard.md
4. Work only in the javcb-ai org unless told otherwise
5. Do not touch credentials, prod repos, or global-docs

Task: [describe the project in plain English]

When complete:
- Update README with: what it does, how to set it up, what to test, what is incomplete
- Create .env.example with all required variables
- Confirm the standard repo structure is in place
- Signal completion with a summary of what was built and what needs review
---

## What any agent should do

1. Read global-docs context fully before writing a single line
2. Create repo in javcb-ai with standard structure
3. Build logic using allowed languages and personas
4. Use design system components by name if UI is involved
5. Use core libraries from javcb-prod where available
6. Update README and .env.example
7. Signal completion with a plain-English summary

## Promotion path

javcb-ai (built) → checker review → javcb-staging (refined) → prod review → javcb-prod