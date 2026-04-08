<!-- type: skill-orchestration -->

# Skill: Project Kickoff

End-to-end project initialization workflow. Chains context establishment → opportunity assessment → decision → specification → execution readiness → launch.

---

## Metadata

| Attribute | Value |
|---|---|
| **Skill ID** | `skill-project-kickoff` |
| **Type** | orchestration (workflow sequencing) |
| **Version** | 1.0 |
| **Status** | ACTIVE |
| **Created** | 2026-04-08 |
| **Last Reviewed** | 2026-04-08 |
| **Dependencies** | skill-prompting-core, skill-audit-trigger, [future: skill-solution-assessment, skill-doc-classifier] |
| **Domains** | All |

---

## Summary

**Initialize any new project from idea to execution readiness.**

This orchestration skill sequences multiple skills to move a project from conception to execution-ready state. It ensures you don't build the wrong thing, understand the landscape, make deliberate decisions, and have clear specifications before starting.

---

## When to Use This Skill

- **Use this skill when:** Starting a new project, initiative, or major feature across any domain
- **Do NOT use this skill when:** Continuing work on an existing project (use domain-specific execution skills instead)
- **Prerequisite state:** You have an idea or direction you want to explore

---

## Input Requirements

### Required Inputs
- **Project or idea:** Description of what you're thinking about starting
- **Domain:** Which domain(s) this applies to (inferred if unclear, confirmed before proceeding)

### Optional Inputs
- **Success criteria:** What would make this project successful? (if you have them)
- **Constraints:** Timeline, budget, resource limits (if relevant)

### Assumptions
- You're ready to commit time to the project (at least exploration phase)
- Relevant domain context is current and available
- You'll make final decisions at each gate, not delegate them

---

## Execution Flow

### Phase 1: Establish Context (skill-prompting-core)

**Goal:** Load operating principles for this project.

1. Run skill-prompting-core
   - Read GLOBAL-CONTEXT.md
   - Read domain-context.md (infer domain from project description)
   - Read repo/tool CLAUDE.md files if applicable
2. Return complete context to project-kickoff

**Output:** Complete operating context (global + domain + repo)

**Approval Gate:** None (foundational setup)

---

### Phase 2: Assess Opportunity (skill-audit-trigger or solution-assessment)

**Goal:** Evaluate if this is worth doing before investing time.

**Currently available:** Use skill-audit-trigger for assessment  
**Future:** Upgrade to skill-solution-assessment when available

1. Run assessment:
   - Does this already exist as free/available solution?
   - Is this aligned with your goals and priorities?
   - Are there blockers or dependencies?
   - What's the effort estimate?

2. Report findings:
   - CRITICAL issues that block the project
   - Major risks or concerns
   - Opportunities or advantages
   - Recommendation: proceed / reconsider / redesign

**Output:** Assessment report with recommendation

**Approval Gate:** YES — "Should I proceed with this project?"
- If NO: Project paused or abandoned. Done.
- If YES: Continue to Phase 3
- If REDESIGN: Go back to Phase 1 with revised idea

---

### Phase 3: Understand Landscape (skill-audit-trigger or doc-classifier)

**Goal:** Research existing solutions, patterns, and examples.

**Currently available:** Use skill-audit-trigger for relevant docs/patterns  
**Future:** Upgrade to skill-doc-classifier when available

1. Run landscape research:
   - Find similar projects or patterns
   - Identify existing solutions or approaches
   - Gather relevant documentation
   - Identify key patterns or best practices

2. Synthesize findings:
   - Here's what similar projects look like
   - Common approaches and their trade-offs
   - Relevant documentation and resources
   - Recommended approach based on landscape

**Output:** Landscape analysis with recommended approach

**Approval Gate:** SOFT (informational)
- Review landscape analysis
- Decide: "Does this approach feel right? Any adjustments?"
- You can iterate here without hard approval needed

---

### Phase 4: Make Decision & Define Specification

**Goal:** Create clear specification before starting work.

1. Decision point:
   - You confirm: "Yes, I want to build this using [approach]"
   - Document decision: what are you building, why, success criteria

2. Create specification:
   - Project name and purpose
   - Success criteria (what done looks like)
   - Scope (what's in, what's out, what's phase 2)
   - Approach and key decisions
   - Timeline and resource estimate
   - Dependencies or blockers
   - Next steps

**Output:** Specification document (SPEC.md or similar)

**Approval Gate:** YES — "Is this SPEC clear and correct?"
- If NO: Revise specification
- If YES: Continue to Phase 5

---

### Phase 5: Execution Readiness

**Goal:** Ensure you're ready to start.

1. Checklist:
   - ✅ Context understood (domain, rules, autonomy levels)
   - ✅ Decision made (proceed with confidence)
   - ✅ Specification clear (what/why/success defined)
   - ✅ Approach chosen (how you'll build)
   - ✅ Resources available (time, tools, access)
   - ✅ Blockers identified (and plan to address them)

2. Identify starting skill:
   - "Which skill should run first?"
   - Examples: skill-block-intake (design system), skill-audit-trigger (audit), [domain-specific skill]

**Output:** Readiness checklist + identified starting skill

**Approval Gate:** SOFT (confirm readiness, not decision)
- "Ready to execute?" → proceed

---

### Phase 6: Launch

**Goal:** Begin execution with clarity.

1. Confirm starting skill and parameters
2. Hand off to execution skill
3. Track and report on execution

**Output:** Project launched into execution phase

**Approval Gate:** None (execution begins)

---

## Output Format

**Project Kickoff Report:**

```
PROJECT KICKOFF — [PROJECT NAME]

═══════════════════════════════════════════════════════════════

CONTEXT

Domain: [Domain]
Autonomy level: [For this domain]
Related docs: [Key docs to reference]

═══════════════════════════════════════════════════════════════

OPPORTUNITY ASSESSMENT

Recommendation: [Proceed / Reconsider / Redesign]
Key findings:
├─ [Finding 1]
├─ [Finding 2]
└─ [Finding 3]

Critical issues: [If any, list them]
Effort estimate: [High / Medium / Low]

═══════════════════════════════════════════════════════════════

LANDSCAPE ANALYSIS

Similar projects / patterns:
├─ [Pattern A] — [how it works]
├─ [Pattern B] — [how it works]
└─ [Recommended approach] — [why this approach]

Key resources:
├─ [Resource 1]
├─ [Resource 2]
└─ [Resource 3]

═══════════════════════════════════════════════════════════════

PROJECT SPECIFICATION

Name: [Project name]
Purpose: [1-2 sentence purpose]

Success Criteria:
├─ [Criterion 1 — how you'll measure success]
├─ [Criterion 2 — how you'll measure success]
└─ [Criterion 3 — how you'll measure success]

Scope:
├─ In: [What's included in this project]
├─ Out: [What's explicitly not included]
└─ Phase 2: [Future work, if applicable]

Approach:
├─ Overall approach: [Describe the approach]
├─ Key decisions: [Decision 1, decision 2]
└─ Technology / tools: [What you'll use]

Timeline: [Estimate: days / weeks / months]
Resources needed: [People, tools, budget, access]
Blockers / Dependencies: [List any blockers and mitigation]

═══════════════════════════════════════════════════════════════

EXECUTION READINESS

Checklist:
├─ ✅ Context understood (domain, rules, autonomy)
├─ ✅ Decision made (proceed with confidence)
├─ ✅ Specification clear (what/why/success defined)
├─ ✅ Approach chosen (how you'll build)
├─ ✅ Resources available (time, tools, access)
└─ ✅ Blockers identified (and plan to address)

Starting skill: [skill-name]
First steps: [What executes first]

Status: READY TO LAUNCH

═══════════════════════════════════════════════════════════════
```

---

## Style Rules

- **Clear decisions at each gate:** Don't skip approval gates; each one informs the next
- **Specification is the contract:** Once SPEC is approved, it drives execution
- **Blockers surface early:** Identify constraints before starting
- **Domain autonomy respected:** Decisions stay in appropriate autonomy level per domain
- **Connected to starting skill:** Project kickoff hands off to a specific skill with clear parameters

---

## Error Handling

| Error Condition | Resolution |
|---|---|
| Domain is ambiguous | Pause Phase 1. Ask user to confirm which domain applies. |
| Assessment recommends against proceeding | Stop. Discuss redesign or abandonment. Don't force ahead. |
| Specification is unclear | Return to Phase 4. Iterate until SPEC is clear. |
| Blockers appear blocking | Address blockers before launching. Create separate project for blocker if needed. |
| No clear starting skill | Identify first skill together. Some projects need custom sequencing. |

---

## Example

### Project: Design System Component

**Phase 1:** Context loaded (professional-work domain, design-system repo context)

**Phase 2:** Assessment → "Does similar component exist? Can we use shadcn/ui variant instead of building custom? Effort: Easy if shadcn, Moderate if custom."

**Decision:** Use shadcn variant + small custom extensions.

**Phase 3:** Landscape → "shadcn Alert component with custom styling. Similar patterns in [existing components]. Recommended approach: extend shadcn Alert with custom variant."

**Phase 4:** Specification → 
- Component: Alert with custom warning variant
- Success: Storybook stories, TypeScript types, design-system integration
- Approach: Extend shadcn + Tailwind tokens
- Timeline: 2 hours
- Starting skill: skill-block-intake (if importing from template) OR direct component implementation

**Phase 5:** Ready → All checks pass

**Phase 6:** Launch → skill-block-intake runs, or direct implementation begins

---

## Related Skills

| Skill | How Used |
|---|---|
| `skill-prompting-core` | Phase 1: Establish context |
| `skill-audit-trigger` | Phase 2: Opportunity assessment |
| `skill-audit-trigger` | Phase 3: Landscape analysis |
| [future: skill-solution-assessment] | Phase 2: Upgrade to dedicated assessment |
| [future: skill-doc-classifier] | Phase 3: Upgrade to dedicated doc research |
| [domain-specific execution skills] | Phase 6: Starting skill for execution |

---

## Related Docs

- **GLOBAL-CONTEXT.md** — Operating principles, hard rules, decision framework
- **autonomy-matrix.md** — Domain autonomy levels (guides Phase 1 decisions)
- **Domain context files** — Domain-specific standards and autonomy
- **SPEC template** — Structure for Phase 4 specification (if you have one)

---

## Notes for Skill Developers

**Why orchestration?**
- Project kickoff sequences multiple skills in a specific order
- Each phase depends on previous phases
- Gates (approval points) ensure deliberate decision-making
- This is the highest-level skill; most other skills are called by this one

**Customization by domain:**
- Each domain has different autonomy levels and constraints
- Phase 1 pulls domain context, which then shapes all subsequent phases
- Examples: business-ventures requires "never financial commitment without approval," professional-work requires "execute-with-approval for approach"

**When to upgrade:**
- When skill-solution-assessment is built, upgrade Phase 2 to use it
- When skill-doc-classifier is built, upgrade Phase 3 to use it
- These upgrades happen in SKILL-CHANGELOG as v1.1 (minor version bump, backward compatible)

---

## Version

- **Created:** 2026-04-08
- **Last reviewed:** 2026-04-08
- **Next review:** 2026-07-08 (quarterly)
- **Status:** ACTIVE
- **Future upgrades:** v1.1 will integrate skill-solution-assessment and skill-doc-classifier when ready
