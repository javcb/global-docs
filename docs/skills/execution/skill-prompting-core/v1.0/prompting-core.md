<!-- type: skill-execution -->

# Skill: Prompting Core

Foundational workflow. Every execution skill depends on this. Establishes the operating context before any downstream skill runs.

---

## Metadata

| Attribute | Value |
|---|---|
| **Skill ID** | `skill-prompting-core` |
| **Type** | execution (foundational) |
| **Version** | 1.0 |
| **Status** | ACTIVE |
| **Created** | 2026-04-08 |
| **Last Reviewed** | 2026-04-08 |
| **Dependencies** | None (foundational) |
| **Domains** | All |

---

## Summary

**Establish operating context before any downstream skill executes.**

This skill reads three inputs (global context, domain context, repo context) and assembles them into a complete operating picture. All other execution skills call this first. No other skill should run until this skill has returned.

---

## When to Use This Skill

- **Use this skill when:** Starting any downstream skill, beginning a new task, context appears unclear or outdated
- **Do NOT use this skill when:** You already have confirmed context and have explicitly read all three input files in *this session*
- **Prerequisite state:** The user has provided a task description or identified a specific work stream

---

## Input Requirements

This skill does not take direct inputs. Instead, it reads three context sources in a fixed order.

### Required Inputs
- **User task or question:** What does the user want to accomplish?

### Files Read (in order)
1. **GLOBAL-CONTEXT.md** (repo root) — Universal operating principles
2. **Domain context file** — Domain-specific rules and autonomy (inferred from task; if ambiguous, ask user)
3. **Repo context file (CLAUDE.md)** — Repo-specific rules and pre-authorized operations

### Assumptions
- All three context files exist and are current.
- The user has read GLOBAL-CONTEXT.md at least once.
- Repo-level rules in CLAUDE.md do not contradict global hard rules.

---

## Execution Flow

### Phase 1: Read Global Context

**Goal:** Load universal operating principles.

1. Read `GLOBAL-CONTEXT.md` from repo root
2. Extract key sections:
   - Identity (name, roles, communication style)
   - Hard Rules (five non-negotiable rules)
   - Tools & Systems (approved tools and critical systems)
   - Decision Framework (precedence hierarchy)
   - Risk Tolerance (production vs. fail-fast contexts)
   - Communication Preferences (directness, conciseness, assumptions)

**Output:** Global context summary

**Approval Gate:** None (foundational read, no decisions)

---

### Phase 2: Infer and Confirm Domain

**Goal:** Identify the domain for this task.

1. Infer domain from user's task description (business-ventures, professional-work, parenting, etc.)
   - If domain is obvious from context, proceed
   - If domain is ambiguous, ask user: "This sounds like it could be [domain-a] or [domain-b]. Which applies?"
2. Confirm domain before proceeding

**Output:** Domain confirmed

**Approval Gate:** Yes, if domain is ambiguous or unclear. User confirms which domain applies.

---

### Phase 3: Read Domain Context

**Goal:** Load domain-specific rules and autonomy calibration.

1. Read `domains/[domain]-context.md`
2. Extract key sections:
   - Domain definition (what constitutes work in this domain)
   - What good looks like (domain-specific quality standards)
   - Tools (domain-specific systems and integrations)
   - Autonomy calibration (when to auto-execute vs. pause and ask)
   - Sample scenarios (reference situations for this domain)

**Output:** Domain context summary

**Approval Gate:** None (informational read)

---

### Phase 4: Read Repo Context

**Goal:** Load repo-specific rules and pre-authorized operations.

1. Read `CLAUDE.md` in the target repo (the repo where work will occur)
2. Extract key sections:
   - Required reading (what documentation applies)
   - Non-negotiable rules (repo-specific constraints)
   - Stack & Structure (tech choices, folder layout)
   - Pre-authorized operations (what AI can do without asking)
   - Always confirm before (what requires user approval)

**Output:** Repo context summary

**Approval Gate:** None (informational read)

---

### Phase 5: Validate and Assemble Context

**Goal:** Check for conflicts; assemble complete operating picture.

1. Check for conflicts between context sources using this precedence:
   - Hard Rules (GLOBAL-CONTEXT.md) override everything
   - Repo rules (CLAUDE.md) can supplement but not contradict global rules
   - Domain rules (domain context) are guidelines, not overrides
2. If conflict detected, stop and report to user before proceeding
3. Assemble summary: global + domain + repo context into single coherent picture

**Output:** Complete context summary with any flagged conflicts

**Approval Gate:** None (validation only)

---

### Phase 6: Return to Calling Skill

**Goal:** Pass context to downstream skill and resume execution.

1. Present complete context summary to user (or proceed silently if already in-session and context is confirmed)
2. State what assumptions have been made (if any)
3. Return control to downstream skill with context established

**Output:** "Context established. [Domain]. [Assumptions, if any]. Ready to proceed with [downstream skill]."

**Approval Gate:** None (foundational setup complete)

---

## Output Format

**Always deliver output in this structured format:**

```
GLOBAL CONTEXT
- User: [Name]
- Primary roles: [roles]
- Communication style: [style traits]
- Hard Rules: [summary of 5 rules]

DOMAIN
- Domain: [domain name]
- Autonomy level: [advisory-only / execute-with-approval / auto-execute]
- Key tools: [tools specific to this domain]

REPO CONTEXT
- Repo: [repo name]
- Pre-authorized operations: [summary]
- Requires confirmation: [summary]

ASSUMPTIONS
- [Any judgment calls made with incomplete info]
- [Any ambiguous context clarifications]

STATUS: Context established. Ready to proceed.
```

---

## Error Handling

| Error Condition | Resolution |
|---|---|
| Context file missing or unreadable | Stop. Report which file is missing. Ask user to verify file exists in repo root or domains/ folder. |
| Domain is ambiguous or not stated | Stop. Ask user to confirm which domain applies to this task. Do not guess. |
| Conflict detected (repo rule contradicts global hard rule) | Stop. Report specific conflict to user. Ask which rule takes precedence. Do not proceed until resolved. |
| Repo-specific CLAUDE.md missing | Proceed with global + domain context only. Note that repo-level rules are unavailable. |

---

## Examples

### Example 1: Professional Work in a Design System Repo

**User Task:** "Help me audit the design system tokens for compliance."

**Execution:**

1. Read GLOBAL-CONTEXT.md → Identify: JB, direct/blunt communication, stable-over-speed preference
2. Infer domain → "professional-work (design)" → confirmed
3. Read `domains/professional-work-context.md` → Autonomy: "execute-with-approval for structural changes"
4. Read `design-system-repo/CLAUDE.md` → Pre-auth: npm install, read-only operations
5. Assemble context → Ready to run skill-audit-trigger (design system variant)

**Output:**

```
GLOBAL CONTEXT
- User: JB
- Roles: business ventures, professional work, parenting
- Style: Direct, blunt, concise
- Hard Rules: Credential protection, no direct main commits, no irreversible actions without confirmation

DOMAIN
- Domain: professional-work (design)
- Autonomy: Execute design audits; pause before structural changes
- Tools: GitHub, design-system repo, Tailwind, shadcn/ui

REPO CONTEXT
- Repo: design-system-shadcn-tailwind (GitHub)
- Pre-auth: Read files, grep, npm install, npx shadcn add
- Confirm before: git commit/push, deleting files, new npm packages

ASSUMPTIONS
- None

STATUS: Context established. Professional-work domain. Ready to proceed with skill-audit-trigger.
```

---

### Example 2: Business Venture with Ambiguous Domain

**User Task:** "I need to set up a financial tracking system for a side project."

**Execution:**

1. Read GLOBAL-CONTEXT.md
2. Infer domain → Could be "business-ventures" or "personal-processes" → **Ambiguous, ask user**

**Output:**

```
GLOBAL CONTEXT LOADED
- User: JB
- Communication: Direct, blunt, concise

DOMAIN AMBIGUOUS
This task could apply to:
a) business-ventures — if this is a business or revenue project
b) personal-processes — if this is a personal org system

Which domain applies to this project?
```

**User confirms:** "It's a business venture side project."

**Execution continues:** Read business-ventures domain context, read CLAUDE.md for target repo, assemble complete context.

---

## Reference

- **Related skills:** All downstream execution skills depend on this skill
- **External references:**
  - GLOBAL-CONTEXT.md (global operating principles)
  - domains/[domain]-context.md (domain-specific rules)
  - CLAUDE.md (repo-level rules)
- **Decision Framework:** See GLOBAL-CONTEXT.md section "Decision Framework"

---

## Maintenance

- **How often to review:** Quarterly, or when GLOBAL-CONTEXT.md changes
- **What triggers an update:** Changes to hard rules, additions of new domains, changes to context file structure
- **Owner:** Global systems (applies to all domains)

---

## Notes for Skill Developers

**Why this skill is foundational:**
- Context precedes execution. Without confirmed context, downstream skills will make wrong assumptions.
- This skill is not optional. Every downstream skill calls this first, either explicitly or implicitly.
- If a downstream skill encounters ambiguous context, it should pause and invoke this skill again.

**How downstream skills use this:**
- Downstream skills inherit the context established here.
- If context changes (e.g., user switches repos or domains), downstream skills should invoke this skill again.
- Downstream skills trust the context returned by this skill; they do not re-read context files.

**Extending this skill:**
- If new context sources are added (e.g., project-specific context), add a new phase here.
- If context file locations change, update Phase 1–4 file paths.
- Do not remove or reorder phases; downstream skills depend on this exact sequence.
