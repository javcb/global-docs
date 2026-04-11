# Prompt Execution Modes

**Version:** 2026-04-10  
**Status:** Operational  

---

## Overview

Every Claude task in this workspace runs in one of two execution modes. The mode is either declared explicitly at the top of a prompt, or inherited from the command's default (see commands.md).

When in doubt:
- Sandbox / docs / analysis / new components = **AUTONOMOUS**
- Tokens / ui primitives / CLAUDE.md / production client = **GATED**

---

## Mode 1: AUTONOMOUS

### Boilerplate (copy-paste ready):

```
EXECUTION MODE: AUTONOMOUS
Run all steps to completion without stopping.
If any step encounters an error:
- Log it to EXECUTION-LOG.md with exact error output
- Apply the most reasonable fix and continue
- Flag it in the final report under "Issues Encountered"

Never pause for approval. Never wait for input.
Deliver complete result + full report at the end.
```

### Behavior:
- Runs to completion regardless of non-fatal errors
- Self-corrects and logs, never stops to ask
- Delivers one report at the end — no intermediate check-ins
- Javier reviews output once, at the end

### When to use:
- javcb-ai (sandbox) repos
- global-docs creation and updates
- New component creation
- Template recreations in staging
- Competitive analysis
- Pattern harvesting
- Any documentation task
- Design system audits (report only — no changes)

### Default for these commands:
- `recreate template [name]`
- `create website [name] in repo [repo]` (if javcb-ai org)
- `audit design system`
- `audit repo [name]`
- `analyze competitors for [industry] in [location]`
- `harvest pattern [pattern] from [url or app name]`
- `old ds migrate`

---

## Mode 2: GATED

### Boilerplate (copy-paste ready):

```
EXECUTION MODE: GATED
Checkpoint after every major step — output:
"STEP X: ✅ complete — [one line summary]"
or
"STEP X: ❌ failed — [exact error + full output]"

If any verification step fails, STOP immediately.
Do not fix and continue without explicit "proceed" from Javier.
Each phase requires "proceed" confirmation before next begins.
```

### Behavior:
- Stops at every checkpoint and waits for explicit approval
- On failure: stops, reports exact error, waits — never self-corrects
- Javier controls every transition between phases
- Higher interruption count by design — appropriate for high-risk changes

### When to use:
- Any change to `src/tokens/tokens.css`
- Any change to `src/styles/shadcn-bridge.css`
- Any change to `src/components/ui/` (shadcn primitives)
- Any change to `CLAUDE.md` or `.cursorrules`
- Any change to `global-docs/docs/fidelity-mode.md`
- Production client repo changes (javcb org, non-sandbox)
- Anything that affects more than 20 components simultaneously

### Default for these commands:
- `add template source [source-name]`
- `update tokens [description]`
- `create website [name] in repo [repo]` (if javcb org, production)

---

## Practical Comparison — Phase 5 Example

Same task: create phase5-magic-ui-saas repo and build recreation.

### Autonomous — what actually happened:
- Claude initialized repo, hit dependency conflict, resolved it, continued
- Token audit found 3 violations, auto-fixed, logged, continued  
- Build completed, report delivered, GitHub URL returned
- Javier reviewed report once at the end
- **Total interruptions to Javier: 0**

### Gated — how it would have differed:
- STEP 1: ✅ Repo created — "proceed?"
- STEP 2: ✅ Dependencies installed — "proceed?"
- STEP 3: ❌ Dependency conflict — stops, reports full error, waits
- Javier resolves or approves fix, says "proceed"
- STEP 4: ✅ Tokens installed — "proceed?"
- [continues step by step, ~10-14 checkpoints total]
- **Total interruptions to Javier: 10-14**

Autonomous was correct for this sandbox task.
Gated would be correct if this were a production token change.

---

## Default Mode by Context

| Context | Default Mode | Reason |
|---------|-------------|--------|
| javcb-ai repos (sandbox) | Autonomous | Disposable — speed over caution |
| global-docs updates | Autonomous | Documentation, no runtime impact |
| New components (magic/) | Autonomous | Isolated, no downstream impact |
| Template recreations | Autonomous | Sandbox, fidelity-mode provides structure |
| Competitive analysis | Autonomous | Research task, no system changes |
| Pattern harvesting | Autonomous | New additions only |
| Design system audit | Autonomous | Report only — no changes made |
| src/tokens/tokens.css | Gated | Cascades to every component |
| src/components/ui/ | Gated | Shadcn primitives — breakage is silent |
| shadcn-bridge.css | Gated | Token mapping — errors are invisible |
| CLAUDE.md / .cursorrules | Gated | Governs all future behavior |
| fidelity-mode.md | Gated | Governs all recreations |
| Production client repos | Gated | Real user impact |

---

## Overriding the Default

Javier can always override the default by declaring the mode explicitly at the top of any instruction:

```
EXECUTION MODE: GATED — recreate template appy-next
```

This overrides the autonomous default for that specific run.
When no mode is declared and a command is used, the command's registered default applies.

---

## Examples

### Example 1: Autonomous override
```
EXECUTION MODE: AUTONOMOUS
update tokens — add two new spacing sizes for mobile
```
This would normally be GATED (tokens.css change), but is overridden to AUTONOMOUS for this run.

### Example 2: Gated override
```
EXECUTION MODE: GATED
create website acme-landing in repo acme-web
```
This would normally be AUTONOMOUS (creating new site in javcb-ai), but is overridden to GATED because the repo is in production org.

### Example 3: Command with default
```
recreate template appy-next
```
Inherits AUTONOMOUS from command default — no override.

---

## Mode Detection Logic

**When receiving a task:**

1. **Is an execution mode declared explicitly?** (EXECUTION MODE: [X] at top)
   - YES → Use declared mode
   - NO → Go to step 2

2. **Is this a registered command?** (check commands.md)
   - YES → Use command's default mode
   - NO → Go to step 3

3. **Use inference based on context**
   - Changes to tokens, ui components, CLAUDE.md, production repos → GATED
   - Documentation, analysis, sandbox repos, new components → AUTONOMOUS

---

## Consistency Across Sessions

Mode assignments are **persistent**. Once a command has a default mode, that default applies across all sessions unless explicitly overridden.

To change a command's default mode, update `commands.md` and notify Javier.

---

## Further Reading

- **`commands.md`** — Full command registry with mode defaults
- **`CLAUDE.md`** — Quick reference commands section
- **`.cursorrules`** — Same as CLAUDE.md
