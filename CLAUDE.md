<!-- type: reference -->

# Claude AI Session Instructions — global-docs

## What This Repo Is
The documentation hub for this entire system. All canonical standards, conventions, and cross-repo knowledge live here. Other repos reference this repo — this repo references nothing outside itself.

## Required Reading (in order)
1. ai-instructions/universal-rules.md
   — universal rules that apply to every repo
2. ai-instructions/per-repo/global-docs.md
   — global-docs specific rules
3. CHECKLIST.md — current documentation status
4. README.md — repo overview and directory structure

## Non-Negotiable Rules

### global-docs Specific Rules
1. This repo is the source — never a consumer.
   Do not add references to other repos' local files.
2. All content must be repo-agnostic unless in ai-instructions/per-repo/.
3. When adding a new universal standard, check if an
   existing document covers it before creating a new file.
4. Keep directory structure flat — maximum 2 levels deep.
5. Every document must have a clear purpose statement
   in its first paragraph.

## Stack & Structure
- Markdown documentation (no code)
- Hub-and-spoke model: universal standards in root, per-repo supplements in per-repo/
- Architecture reference: ai-instructions/README.md and architecture/hub-and-spoke-model.md
- Close-out protocol: workflows/close-out-protocol.md

## Session Resume Checklist
1. Read ai-instructions/universal-rules.md
2. Read ai-instructions/per-repo/global-docs.md
3. Check CHECKLIST.md for current phase
4. Identify next task from checklist
5. Run audit-process.md if starting a new phase

## Pre-Authorized Operations (no confirmation needed)
The following operations are pre-approved and should be executed without asking for permission:
- Read any file in the current repository
- Write, create, or edit any file in the repository
- Run: `npm install`, `npm run [any script in package.json]`
- Run: `npx shadcn@latest add [component] --yes`
- Run: `grep`, `ls`, `find`, `cat`, `wc` (read-only shell operations)
- Create or rename directories within the repository
- Install packages already listed in package.json

## Always Confirm Before
- `git commit` or `git push` (developer commits manually in GitHub Desktop)
- Permanently deleting files (use rename/archive instead)
- Installing net-new npm packages not in package.json
- Any operation touching files outside the current repo
- Sending any external request (email, webhook, API)

## Assess Before Building
Before writing code for any new feature or system, follow [workflows/assess-before-building.md](docs/workflows/assess-before-building.md).
This is mandatory, not optional.

## Release Notes
When upgrading any dependency or starting a new project, follow [workflows/release-notes-monitoring.md](docs/workflows/release-notes-monitoring.md)
to check for breaking changes first.

---

## Commands

Javier issues one-line commands. When you see a command below, load `docs/commands.md` for the full spec, load `docs/prompt-execution-modes.md` for mode rules, then execute completely.

### Quick Reference

| Command | Default Mode | Primary Workflow |
|---------|-------------|-----------------|
| `recreate template [name]` | Autonomous | fidelity-mode.md + reproduction-prompt.md |
| `create website [name] in repo [repo]` | Auto/Gated | workflows/project-lifecycle.md |
| `audit design system` | Autonomous | DESIGN-SYSTEM-CHECKLIST.md |
| `audit repo [name]` | Autonomous | DESIGN-SYSTEM-CHECKLIST.md |
| `analyze competitors for [x] in [y]` | Autonomous | workflows/competitive-analysis.md |
| `harvest pattern [x] from [y]` | Autonomous | workflows/pattern-harvest.md |
| `add template source [name]` | GATED | workflows/template-intake-process.md |
| `update tokens [description]` | GATED | token update workflow |
| `old ds migrate` | Autonomous | report only, no changes |

### Execution Rules
- Always read `docs/commands.md` before executing any command
- Always read `docs/prompt-execution-modes.md` to confirm mode behavior
- Mode can be overridden by appending "under [mode] mode" to command
- If command is ambiguous, ask ONE clarifying question — nothing else
- If a workflow file referenced in commands.md is missing, report it — do not improvise

**Full Specs:**
- Commands: `docs/commands.md`
- Modes: `docs/prompt-execution-modes.md`

---

## Execution Mode

Every task runs in either **AUTONOMOUS** or **GATED** mode.

**Full Specs:** `docs/prompt-execution-modes.md`

**When in doubt:**
- Sandbox / docs / analysis / components = **AUTONOMOUS**
- Tokens / ui/ primitives / CLAUDE.md / production = **GATED**
