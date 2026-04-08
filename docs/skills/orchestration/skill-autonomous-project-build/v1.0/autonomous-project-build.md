<!-- type: skill-orchestration -->

# Skill: Autonomous Project Build

Execute a complete project from specification through autonomous operation. Chains kickoff assessment, domain context loading, skill orchestration, execution, monitoring, and feedback loops into a single end-to-end workflow.

---

## Metadata

| Attribute | Value |
|---|---|
| **Skill ID** | `skill-autonomous-project-build` |
| **Type** | orchestration (skill chaining) |
| **Version** | 1.0 |
| **Status** | ACTIVE |
| **Created** | 2026-04-08 |
| **Last Reviewed** | 2026-04-08 |
| **Dependencies** | skill-prompting-core, skill-project-kickoff, skill-audit-trigger, domain-specific execution skills |
| **Domains** | All (domain-agnostic chaining) |

---

## Summary

**Build and execute a complete project autonomously.**

Takes a validated project from kickoff specification through full execution, monitoring, and autonomous refinement. Orchestrates domain context, selects appropriate execution skills, handles execution phases, monitors for issues, and enables autonomous feedback loops.

---

## When to Use This Skill

- **Use this skill when:** You have a project specification ready for execution and want autonomous operation
- **Do NOT use this skill when:** Project still needs clarification (use skill-project-kickoff first)
- **Prerequisite state:** Validated project specification with approved SPEC and execution readiness confirmed

---

## Input Requirements

### Required Inputs
- **Project Specification:** Complete SPEC from skill-project-kickoff output (context, assessment, landscape, decision, specifications, readiness)
- **Approval:** Human confirmation to proceed with autonomous execution
- **Success Criteria:** What indicates the project is complete or successful?

### Optional Inputs
- **Monitoring Dashboard:** Metrics/checkpoints to track during execution
- **Feedback Frequency:** How often should autonomous system check for feedback?
- **Escalation Rules:** Conditions that trigger human intervention

### Assumptions
- Project specification is complete and validated
- Necessary skills exist and are documented in SKILL-REGISTRY.md
- Domain context is available in domains/ folder
- Execution is possible within AI operating constraints (not prohibited actions)

---

## Execution Flow

### Phase 1: Validate Specification & Load Context

**Goal:** Ensure project is ready for autonomous execution.

1. Validate specification:
   - SPEC is complete (objectives, constraints, success criteria)
   - Readiness assessment passed
   - All TBDs resolved or explicitly accepted
   - No prohibited actions in project plan

2. Load context (skill-prompting-core):
   - Read GLOBAL-CONTEXT.md
   - Infer domain
   - Read domain context file
   - Validate autonomy level allows execution

3. Confirm execution readiness:
   - "This project [name] is ready for autonomous execution. Proceed?"
   - Human approval required before continuing

**Output:** Validated project context and autonomy confirmation

**Approval Gate:** HARD (human confirms execution)

---

### Phase 2: Select & Configure Execution Skills

**Goal:** Map project to appropriate execution skills.

1. Analyze project requirements:
   - What type of work? (execution vs. advisory)
   - Which domain? (maps to domain skills)
   - Which phase(s)? (identify skill sequence)

2. Select skills:
   - Primary skill: which execution skill handles main work?
   - Supporting skills: which skills support/complement?
   - Data flow: what's output of one, input to next?
   - Error handling: what if primary skill encounters issues?

3. Configure execution:
   - Skill order (sequence and dependencies)
   - Input mapping (what goes into each skill)
   - Output capture (what to store from each skill)
   - Integration points (where humans review/decide)

**Output:** Execution plan with skill sequence and configuration

**Approval Gate:** SOFT (review: "Skill sequence looks right?")

---

### Phase 3: Execute Primary Workflow

**Goal:** Run the main project execution.

1. Execute skill sequence:
   - Run first skill with spec-derived inputs
   - Capture outputs
   - Feed to next skill
   - Continue through sequence
   - Monitor for errors/escalations

2. Handle execution phases:
   - Major phase complete: pause for review if configured
   - Skill outputs expected data: continue
   - Skill outputs unexpected results: escalate
   - Error encountered: handle via error resolution (Phase 6)

3. Track progress:
   - What's been completed?
   - What's in progress?
   - What's pending?
   - Are we tracking against success criteria?

**Output:** Execution complete with all skill outputs captured

**Approval Gate:** SOFT (major phase reviews if configured)

---

### Phase 4: Autonomous Monitoring & Feedback

**Goal:** Monitor execution and gather feedback without waiting for human intervention.

1. Establish monitoring:
   - Are success criteria being met?
   - Are there early warnings of problems?
   - Is execution tracking to plan?
   - Do any results suggest refinement needed?

2. Autonomous feedback loop:
   - Document monitoring observations
   - Identify patterns (working well, needs adjustment, blocked)
   - Note successes and failures
   - Capture what would help next iteration

3. Escalation flags:
   - Issues that require human decision
   - Constraint violations discovered during execution
   - Unclear results needing human judgment
   - Opportunities for scope change

**Output:** Monitoring report with observations, patterns, escalations

**Approval Gate:** None (informational)

---

### Phase 5: Refinement & Iteration

**Goal:** Improve execution based on monitoring.

1. Analyze monitoring data:
   - What worked? What didn't?
   - Why did things work/not work?
   - What would improve next iteration?
   - Are success criteria tracking correctly?

2. Propose refinements:
   - Skill parameter adjustments
   - Input data modifications
   - Workflow sequence changes
   - Success criteria clarification

3. Implement refinements:
   - Apply adjustments autonomously where autonomy allows
   - Flag decisions requiring human input
   - Re-execute affected phases
   - Compare results to pre-refinement

**Output:** Refined execution with improvements documented

**Approval Gate:** SOFT (review refinements if major changes)

---

### Phase 6: Error & Escalation Handling

**Goal:** Handle problems that arise during execution.

**Triggers:** Skill errors, constraint violations, unclear results, scope questions

1. Error assessment:
   - Is this a retry-able error? (bad input, transient issue)
   - Is this a skill limitation? (skill can't handle this)
   - Is this an autonomy issue? (hits constraint)
   - Is this a human decision needed? (unclear next step)

2. Resolution paths:
   - **Retry:** Fix input, re-run skill
   - **Adapt:** Choose different skill for this phase
   - **Escalate:** Flag for human decision
   - **Refine:** Adjust spec and re-start affected phase

3. Document escalation:
   - What triggered it?
   - What was attempted?
   - Why did it fail?
   - What human decision needed?

**Output:** Error resolution or escalation report

**Approval Gate:** HARD (human decides resolution for escalations)

---

### Phase 7: Completion & Close-Out

**Goal:** Complete project, document results, enable autonomous continuation.

1. Verify completion:
   - Are all success criteria met?
   - Are all deliverables complete?
   - Are all outputs documented?
   - Are there any remaining open issues?

2. Document results:
   - What was built?
   - What was learned?
   - What changed from original spec?
   - What would improve next iteration?

3. Enable continuation:
   - Is this a one-time project or ongoing?
   - If ongoing: what's the maintenance workflow?
   - If one-time: what's the handoff/archive process?
   - What monitoring should continue?

4. Close-out:
   - Final output package (all deliverables)
   - Completion report (what was done)
   - Lessons learned (what worked, what to improve)
   - Next steps (if any)

**Output:** Project completion report and artifact package

**Approval Gate:** None (project complete)

---

## Orchestration Pattern

```
Phase 1: Validate & Load Context
  ↓
Phase 2: Select Skills
  ↓
Phase 3: Execute Primary Workflow ← Main Execution Loop
  ├─→ [Skill Sequence: Primary → Supporting Skills]
  ├─→ [Output Capture & Monitoring]
  └─→ [Error Handling ← Phase 6]
  ↓
Phase 4: Monitoring & Feedback
  ↓
Phase 5: Refinement & Iteration
  ├─→ [May loop back to Phase 3 for re-execution]
  └─→ [May loop to Phase 2 for skill re-selection]
  ↓
Phase 6: Error & Escalation Handling
  ├─→ [Retry: Phase 3]
  ├─→ [Adapt: Phase 2]
  └─→ [Escalate: Human decision required]
  ↓
Phase 7: Completion & Close-Out
```

---

## Skill Orchestration Examples

### Example 1: Business Opportunity Assessment
```
Project: Evaluate new business opportunity
Spec: Market research needed, financial viability assessment, decision required

Skill Sequence:
1. skill-research-synthesis (gather market/competitive data)
   ↓
2. skill-business-assessment (evaluate opportunity)
   ↓
3. skill-financial-assessment (financial viability)
   ↓
Output: Assessment report with GO/CAUTION/PASS recommendation
```

### Example 2: Academic Project Execution
```
Project: Research paper from topic to draft
Spec: Topic defined, deadline clear, requirements understood

Skill Sequence:
1. skill-research-synthesis (gather sources)
   ↓
2. skill-academic-writing → Phase 1-2 (understand assignment, develop thesis)
   ↓
3. skill-study-guide-creation (optional: create reference materials)
   ↓
4. skill-academic-writing → Phase 3-5 (outline, write, polish)
   ↓
Output: Polished paper ready to submit
```

### Example 3: Volunteer Operation Setup
```
Project: Launch volunteer scheduling system
Spec: Number of volunteers, frequency, tasks defined

Skill Sequence:
1. skill-volunteer-operations → Phase 1-2 (assess, design)
   ↓
2. skill-volunteer-operations → Phase 3-4 (build, document)
   ↓
3. skill-volunteer-operations → Phase 5 (train, launch)
   ↓
Output: Live volunteer system with documentation
```

---

## Output Format

**Autonomous Project Build Report:**

```
AUTONOMOUS PROJECT BUILD — [Project Name]

═══════════════════════════════════════════════════════════════

PROJECT OVERVIEW
Specification: [What was built]
Timeline: [Start → End dates]
Success Criteria: [What indicates success]

═══════════════════════════════════════════════════════════════

EXECUTION SUMMARY

Skills Orchestrated:
├─ [Skill 1: What it did]
├─ [Skill 2: What it did]
└─ [Skill N: What it did]

Execution Status: [Complete / In Progress / Escalated]

═══════════════════════════════════════════════════════════════

PHASE RESULTS

Phase 3 - Execution:
├─ [Skill A outputs]
├─ [Skill B outputs]
└─ [Status: Complete/Issues/Escalations]

Phase 4 - Monitoring:
├─ Success criteria tracking: [% met]
├─ Patterns observed: [Working well, needs adjustment, blocked]
└─ Escalations flagged: [Yes/No - list if any]

Phase 5 - Refinement:
├─ Adjustments made: [List changes]
├─ Results after refinement: [Improvement noted]
└─ Iterations completed: [#]

═══════════════════════════════════════════════════════════════

COMPLETION STATUS

Success Criteria Met: [Yes/Partial/No]
Deliverables Complete: [All / Partial / List incomplete]
Remaining Issues: [None / List any open items]

═══════════════════════════════════════════════════════════════

LESSONS LEARNED

What Worked Well:
├─ [Success 1]
├─ [Success 2]
└─ [Success 3]

What Needs Improvement:
├─ [Issue 1]
├─ [Issue 2]
└─ [Issue 3]

Next Iteration Recommendations:
├─ [Improvement A]
├─ [Improvement B]
└─ [Improvement C]

═══════════════════════════════════════════════════════════════

DELIVERABLES PACKAGE

[Complete set of all project outputs with organization]

═══════════════════════════════════════════════════════════════
```

---

## Error Handling

| Error Condition | Resolution |
|---|---|
| Specification incomplete | Phase 1 rejects execution; return to skill-project-kickoff |
| Autonomy level too low | Phase 1 identifies; escalate for human decision on how to proceed |
| Skill not found | Phase 2 identifies missing skill; propose alternative skill or escalate |
| Skill execution fails | Phase 6 handles; retry with adjusted inputs or switch to alternative skill |
| Success criteria unclear | Phase 4 monitoring flags; refine criteria and re-check |
| Unexpected results | Phase 5 analyzes; propose refinement or escalate if unclear |
| Skill conflict (outputs incompatible) | Phase 3 during execution; Phase 6 escalates or adapts workflow |
| Execution blocked (constraint) | Phase 6 identifies; escalate or refine approach |
| Infinite loop (skill keeps failing) | Phase 6 detects after N retries; escalate for human decision |

---

## Style Rules

- **Project-centric:** Everything in service of completing the project specification
- **Autonomous mindset:** Make decisions within autonomy constraints; escalate when unsure
- **Monitoring aware:** Track against success criteria, not just task completion
- **Feedback responsive:** Use monitoring data to refine execution, not just report
- **Learning oriented:** Document lessons for next iteration
- **Error transparent:** Explain error resolution steps clearly
- **Constraint respect:** Never exceed autonomy boundaries; escalate instead

---

## Related Skills

| Skill | How Used |
|---|---|
| `skill-prompting-core` | Load context before execution |
| `skill-project-kickoff` | Create specifications that autonomous-project-build executes |
| `skill-audit-trigger` | Monitoring phase can use audits for quality checks |
| Domain-specific skills | Execute primary work based on project type |

---

## Related Docs

- **GLOBAL-CONTEXT.md** — Autonomy matrix for domain constraints
- **autonomy-matrix.md** — Per-domain autonomy levels
- **domains/[domain]-context.md** — Domain-specific constraints

---

## Version

- **Created:** 2026-04-08
- **Last reviewed:** 2026-04-08
- **Next review:** 2026-07-08 (quarterly)
- **Status:** ACTIVE
