# Command Registry — One-Line Claude Instructions

**Version:** 2026-04-10  
**Status:** Operational  

---

## How Commands Work

Javier issues one line. Claude reads CLAUDE.md, finds the command, loads all referenced workflows and modes from global-docs, and executes completely. No further prompt engineering needed.

### Full execution stack for any command:

```
Javier's one line
  → CLAUDE.md (command lookup + quick reference)
  → global-docs/docs/commands.md (full spec)
  → global-docs/docs/prompt-execution-modes.md (autonomous vs gated)
  → global-docs/workflows/[relevant workflow] (execution blueprint)
  → design system docs (tokens, components, inventory)
  → Claude executes + delivers report
```

---

## Command Syntax

```
[command keyword] [parameters]
```

Mode override (optional): append "under gated mode" or "under autonomous mode" to override command default.

**Examples:**
```
recreate template appy-next
recreate template appy-next under gated mode
audit design system
create website acme-landing in repo acme-web
```

---

## Registered Commands

---

### `recreate template [name]`

**Default Mode:** Autonomous  
**Org:** javcb-ai  
**Repo Naming:** `phase[N]-[template-name]`  

**Workflows Loaded:**
- `global-docs/docs/fidelity-mode.md` (REQUIRED — read before any code)
- `src/docs/reproduction-prompt.md`
- `global-docs/workflows/project-lifecycle.md`

**Pre-checks before executing:**
1. Confirm template exists in templates repo or at a known URL
2. Check `MASTER-GAP-REPORT.md` — template should be ≥90% ready
3. Confirm design system repo is on latest main branch

**Execution Steps:**
1. Create repo in javcb-ai org: `phase[N]-[template-name]`
2. Clone locally
3. Initialize project (Next.js + design system setup per lifecycle.md)
4. Complete all `fidelity-mode.md` extraction steps
5. Create `FIDELITY-BRIEF.md` — do not build without it
6. Build section by section per `reproduction-prompt.md`
7. Visual QA: screenshot at 375px, 768px, 1280px
8. Score all 7 fidelity dimensions — must hit ≥8/10 to complete
9. Deliver `RECREATION-REPORT.md` + `FIDELITY-BRIEF.md` + GitHub URL

**Completion Signal:** 
```
Recreation complete — [GitHub URL] — avg fidelity [X]/10
```

**Example Usage:**
```
recreate template magic-ui-saas
```

---

### `create website [name] in repo [repo]`

**Default Mode:** Autonomous (sandbox) / Gated (production)  
**Org:** javcb-ai if sandbox, javcb if production  
**Auto-detects:** if repo org is javcb (not javcb-ai), switches to Gated

**Workflows Loaded:**
- `global-docs/workflows/project-lifecycle.md`
- `global-docs/docs/prompt-execution-modes.md`

**Execution Steps:**
1. Determine org from repo name context (ask if ambiguous)
2. Create repo in correct org
3. Initialize project per `project-lifecycle.md`
4. Build to spec provided in the instruction
5. Run token audit + build check
6. Deliver GitHub URL + `PROJECT-REPORT.md`

**Example Usage:**
```
create website acme-landing in repo acme-web
```

---

### `audit design system`

**Default Mode:** Autonomous  
**Scope:** Report only — NO changes made under any circumstances

**Workflows Loaded:**
- `src/docs/DESIGN-SYSTEM-CHECKLIST.md`
- `src/docs/reproduction-prompt.md` (for component inventory)

**Execution Steps:**
1. Read all tokens in `src/tokens/tokens.css`
2. Read `src/components/ui/` — inventory all primitives
3. Read `src/components/magic/` — inventory all custom components
4. Read `src/blocks/INDEX.md` — inventory all blocks
5. Run token audit (check for hardcoded values)
6. Check all components for missing stories
7. Check for `shadcn-bridge.css` token coverage gaps
8. Produce `DESIGN-SYSTEM-AUDIT-[date].md`:
   - **Complete:** list of passing items
   - **Missing:** list of gaps with severity
   - **Broken:** list of violations with file + line
   - **Recommended:** prioritized next actions

**Completion Signal:** 
```
Audit complete — DESIGN-SYSTEM-AUDIT-[date].md
```

**Reminder:** This command NEVER makes changes. Audit only.

**Example Usage:**
```
audit design system
```

---

### `audit repo [repo-name]`

**Default Mode:** Autonomous  
**Scope:** Report only — NO changes made

**Workflows Loaded:**
- `src/docs/DESIGN-SYSTEM-CHECKLIST.md`

**Execution Steps:**
1. Clone or access the specified repo
2. Run full token audit
3. Run TypeScript typecheck
4. Run build check
5. Identify design system compliance violations
6. Identify accessibility issues (missing alt, aria labels)
7. Identify any Frankenstein patterns (per `frankenstein-guardrails.md`)
8. Deliver `REPO-AUDIT-[repo]-[date].md` with findings

**Example Usage:**
```
audit repo phase5-magic-ui-saas
```

---

### `analyze competitors for [industry] in [location]`

**Default Mode:** Autonomous

**Workflows Loaded:**
- `global-docs/workflows/competitive-analysis.md`

**Execution Steps:**
1. Load full `competitive-analysis.md` workflow
2. Execute phases A through D per that workflow
3. Deliver:
   - Competitor landscape table
   - SWOT per top 3–5 competitors
   - Design pattern gap map
   - Recommended design system mappings for identified opportunities

**Example Usage:**
```
analyze competitors for saas-finance in us-west
```

---

### `harvest pattern [pattern] from [url or app name]`

**Default Mode:** Autonomous

**Workflows Loaded:**
- `global-docs/workflows/pattern-harvest.md`

**Execution Steps:**
1. Load full `pattern-harvest.md` workflow
2. Analyze source pattern at URL or in named app
3. Produce pattern spec (behavior, states, props, accessibility)
4. Build component in `src/components/magic/` or appropriate location
5. Write Storybook story
6. Update `src/blocks/INDEX.md` and `component-inventory.md`
7. Deliver: component path + story path + spec summary

**Example Usage:**
```
harvest pattern hero-with-gradient from https://vercel.com
harvest pattern pricing-table from stripe
```

---

### `add template source [source-name]`

**Default Mode:** GATED (modifies design system)

**Workflows Loaded:**
- `global-docs/workflows/template-intake-process.md`

**Execution Steps (each requires "proceed" confirmation):**
1. Pre-intake assessment — what does this template contain?
   - Delivers: template inventory, token overlap analysis, gap estimate
   - → Checkpoint: "STEP 1 ✅ — proceed?"

2. Token swap analysis — which tokens need to be added/modified?
   - → Checkpoint: "STEP 2 ✅ — proceed?"

3. Block extraction — extract and catalog reusable blocks
   - → Checkpoint: "STEP 3 ✅ — proceed?"

4. Story creation — Storybook stories for all new components
   - → Checkpoint: "STEP 4 ✅ — proceed?"

5. INDEX.md update — add all new blocks to master index
6. MASTER-GAP-REPORT.md update — add new template assessment
   - → Checkpoint: "STEP 6 ✅ — proceed?"

7. Deliver: intake report, new block count, updated gap report

**Example Usage:**
```
add template source nextjs-commerce
```

---

### `update tokens [description]`

**Default Mode:** GATED (high-risk — cascades to all components)

**Workflows Loaded:**
- `src/docs/DESIGN-SYSTEM-CHECKLIST.md`

**Execution Steps (each requires "proceed" confirmation):**
1. List all components that reference affected tokens (full list)
   - → Checkpoint with impact count: "STEP 1 ✅ — [N] components affected — proceed?"

2. Make token changes in `tokens.css`
   - → Checkpoint: "STEP 2 ✅ — tokens updated — proceed?"

3. Update `shadcn-bridge.css` if affected
   - → Checkpoint: "STEP 3 ✅ — bridge updated — proceed?"

4. Run TypeScript typecheck
   - → Checkpoint (or ❌ stop on failure)

5. Run build check
   - → Checkpoint (or ❌ stop on failure)

6. Run token audit — confirm no regressions
   - → Checkpoint: "STEP 6 ✅ — audit clean — proceed?"

7. Deliver: `TOKEN-UPDATE-REPORT.md` with before/after values, components affected, and visual check recommendation

**Example Usage:**
```
update tokens add mobile spacing breakpoints
```

---

### `old ds migrate`

**Default Mode:** Autonomous (audit only — no changes to either repo)

**Purpose:** Final audit of old design system before archiving.

**Workflows Loaded:**
- Internal audit procedures (no external workflow)

**Execution Steps:**
1. Read old design system repo completely
2. Read current design system repo completely  
3. For every pattern, component, token, and utility in old DS:
   - Categorize as: Migrated / Superseded / Missing / Not applicable
4. For "Missing" items only: assess if worth migrating
5. Deliver `OLD-DS-MIGRATION-REPORT.md`:
   - **Safe to archive:** list of what's covered in new DS
   - **Migrate first:** list of anything worth salvaging (with rationale)
   - **Discard:** list of outdated/superseded patterns
   - **Recommendation:** "safe to archive" or "migrate X items first"

**Completion Signal:** Report delivered — Javier reviews and decides.

**Reminder:** This command NEVER modifies either repo.

**Example Usage:**
```
old ds migrate
```

---

## Adding New Commands

To add a new command:

1. Add entry to this file (commands.md) with full spec
2. Add one-line entry to `CLAUDE.md` quick reference section
3. Add entry to `.cursorrules` (mirror CLAUDE.md)
4. Create or reference the workflow file the command invokes
5. Test the command in a low-stakes context before relying on it

---

## Command Failure Handling

**If Claude receives a command but cannot find `commands.md`:**
- Do not guess — ask Javier to confirm global-docs path

**If a required workflow file is missing:**
- Report which file is missing, do not improvise

**If parameters are ambiguous** (e.g. "recreate template magic"):
- Ask one clarifying question: "Which Magic UI template? Options from gap report: [list]"
- Don't ask anything else

---

## Quick Reference

| Command | Default Mode | Primary Workflow |
|---------|-------------|-----------------|
| `recreate template [name]` | Autonomous | fidelity-mode.md + reproduction-prompt.md |
| `create website [name] in repo [repo]` | Auto/Gated | project-lifecycle.md |
| `audit design system` | Autonomous | DESIGN-SYSTEM-CHECKLIST.md |
| `audit repo [name]` | Autonomous | DESIGN-SYSTEM-CHECKLIST.md |
| `analyze competitors for [x] in [y]` | Autonomous | competitive-analysis.md |
| `harvest pattern [x] from [y]` | Autonomous | pattern-harvest.md |
| `add template source [name]` | GATED | template-intake-process.md |
| `update tokens [description]` | GATED | token update workflow |
| `old ds migrate` | Autonomous | report only, no changes |

---

## Further Reading

- **`prompt-execution-modes.md`** — Full details on AUTONOMOUS vs GATED behavior
- **`CLAUDE.md`** — Quick reference commands section (this file is the full spec)
- **`.cursorrules`** — Same as CLAUDE.md
