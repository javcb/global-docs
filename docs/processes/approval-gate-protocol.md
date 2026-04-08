<!-- type: process -->

# Approval Gate Protocol

How approval gates work in practice. Soft gates (request confirmation) vs. hard gates (demand confirmation). When to proceed, when to stop.

---

## Overview

Two types of approval gates:

| Gate Type | When | Behavior | Timeout |
|---|---|---|---|
| **Soft Gate** | Autonomy level = "Pause & Ask" | AI proposes → presents rationale → waits for yes/no | Default proceed if no response after 5 min |
| **Hard Gate** | Irreversible action, prohibited boundary, autonomy = "Never" | AI stops completely → states what it needs → does NOT proceed without explicit yes | Wait indefinitely; do not proceed without explicit confirmation |

---

## Soft Gate Protocol

**Used when:** Domain autonomy level says "Pause & Ask" or "Execute with Approval"

**AI Behavior:**

1. **PAUSE** — Stop before executing
2. **PROPOSE** — State exactly what I plan to do
3. **PRESENT RATIONALE** — Explain why this is the right approach
4. **WAIT** — Present options and wait for response

**Format:**

```
⏸ APPROVAL GATE — [Action Type]

What I want to do:
[Clear 1-2 sentence description of action]

Why this approach:
[Rationale: Why this is the right choice vs. alternatives]

Risks/Side Effects:
[Anything that could go wrong or be impacted]

Proceed? 
A) Yes, proceed with this approach
B) No, don't proceed
C) Alternative: [brief description of different approach I should take]
```

**Example:**

```
⏸ APPROVAL GATE — Research Scope

What I want to do:
Research the market for B2B SaaS project management tools, focusing on 
pricing models and feature comparisons vs. Asana.

Why this approach:
Your project is early stage. Understanding competitive positioning and 
pricing will inform whether the opportunity is viable.

Risks/Side Effects:
None — this is advisory research only. No actions will be taken.

Proceed?
A) Yes, proceed with this research
B) No, don't proceed
C) Alternative: Focus on different aspect (feature X, market segment Y, etc.)
```

### Human Response Examples

**Soft Gate: YES Response** — Any of these triggers proceed:
- "Yes"
- "Proceed"
- "OK"
- "Go ahead"
- "That sounds good"
- "👍" (emoji)
- "Yes, do that"

**Soft Gate: NO Response** — Any of these blocks execution:
- "No"
- "Don't proceed"
- "Skip this"
- "Stop"
- "👎" (emoji)
- "No, try something else"

**Soft Gate: ALTERNATIVE Response** — Any response that suggests a different approach:
- "Instead, research X"
- "Focus on Y instead"
- "Let me think about this and get back to you"
- "Do A instead of B"
- Any text that describes what to do differently

### Timeout Behavior (Soft Gate)

**After 5 minutes with no response:**
- Assume inattention, not explicit approval
- Do NOT automatically proceed
- Re-present the approval request with "(No response — still waiting for confirmation)"
- Wait another 5 minutes
- If still no response, escalate or move forward with safest option

**Default Action:**
- For advisory skills: Proceed (safest = provide output, human decides)
- For execution skills: Do NOT proceed (safest = ask again)
- For irreversible actions: Do NOT proceed (safest = never auto-execute)

---

## Hard Gate Protocol

**Used when:** Irreversible action, autonomy = "Never Autonomous", or security boundary

**AI Behavior:**

1. **STOP** — Do not proceed under any circumstances
2. **STATE** — Explain what I want to do and why
3. **REQUEST** — Ask for explicit confirmation
4. **DO NOT PROCEED** — Even if context suggests I should

**Format:**

```
⏹ HARD GATE — [Action Type]

This is an irreversible action. I must stop and get explicit confirmation.

What I want to do:
[Exactly what action]

Why:
[Rationale]

Potential Impact:
[What changes, what breaks, what can't be undone]

This requires explicit human confirmation.

Confirm? Yes, proceed / No, cancel / Alternative: [describe]
```

**Example:**

```
⏹ HARD GATE — Publish to Public Branch

This is an irreversible action. I must stop and get explicit confirmation.

What I want to do:
Merge the feature branch to main and push to origin.

Why:
The project is complete and ready for production.

Potential Impact:
- All code changes become live
- Other projects may depend on these changes
- If there are bugs, they affect production
- This cannot be undone without a revert commit

This requires explicit human confirmation.

Confirm? Yes, proceed / No, cancel / Alternative: deploy to staging first
```

### Human Response Examples

**Hard Gate: YES Response** — Only explicit yes triggers proceed:
- "Yes"
- "Yes, proceed"
- "Confirmed"
- "Go ahead"
- "Yes, I'm sure"
- "Yes, deploy"

**Hard Gate: NO Response** — Blocks execution:
- "No"
- "Cancel"
- "Don't proceed"
- "Wait"
- "Not yet"

**Hard Gate: No Response** — Do NOT proceed:
- Silence = no confirmation
- If 10+ minutes pass with no response, escalate: "I'm waiting for explicit confirmation. Should I proceed or not?"
- Never auto-proceed on hard gates

### Timeout Behavior (Hard Gate)

**Hard gates have no timeout. Do NOT proceed until explicitly confirmed.**

**After 10 minutes of waiting:**
- Re-present the gate
- Add: "I'm still waiting for confirmation on this action."
- Do NOT set a timeout-proceed default
- If user is unavailable, escalate or defer work

---

## Hard vs. Soft: Decision Tree

Use this tree to decide which gate type:

```
Is this an irreversible action?
├─ YES → HARD GATE (require explicit confirmation)
└─ NO → Check autonomy level
    ├─ Never Autonomous → HARD GATE
    ├─ Pause & Ask → SOFT GATE
    ├─ Execute with Approval → SOFT GATE (can timeout to proceed)
    ├─ Execute (Reporting) → No gate needed (execute and report)
    └─ Full Autonomy → No gate needed (execute)
```

---

## Common Gate Scenarios

### Soft Gate: Business Assessment Recommendation

```
⏸ APPROVAL GATE — Business Assessment Recommendation

What I want to do:
Present the assessment findings and recommend GO/CONDITIONAL GO/CAUTION/PASS 
on this opportunity.

Why this approach:
Assessment is complete. You need the recommendation to make a decision.

Risks/Side Effects:
None — this is advisory. You decide whether to act on the recommendation.

Proceed? Yes / No
```

### Soft Gate: Financial Analysis with Risk Flags

```
⏸ APPROVAL GATE — Financial Analysis Execution

What I want to do:
Analyze the financial proposal and provide GO/CAUTION/PASS recommendation 
based on returns, risks, and alignment with goals.

Why this approach:
You provided the investment details. Analysis will inform your decision.

Risks/Side Effects:
None — advisory. The recommendation does not commit you to anything.

Proceed? Yes / No
```

### Hard Gate: Production Code Deployment

```
⏹ HARD GATE — Deploy to Production

This is an irreversible action. I must stop and get explicit confirmation.

What I want to do:
Push the release commit to main and deploy to production servers.

Why:
The code is tested and ready. Production deployment will make changes live.

Potential Impact:
- All code changes become live for all users
- Users immediately see new features or fixes
- If critical bugs exist, they affect all users
- Rollback requires a new deploy

This requires explicit human confirmation.

Confirm? Yes / No / Deploy to staging first?
```

### Hard Gate: Delete Sensitive Data

```
⏹ HARD GATE — Permanent Deletion

This is an irreversible action. I must stop and get explicit confirmation.

What I want to do:
Delete all files in the temp-archive folder and remove from git history.

Why:
Cleanup to remove old test data.

Potential Impact:
- Files are permanently deleted
- Cannot be recovered unless backed up elsewhere
- If needed later, they must be recreated

This requires explicit human confirmation.

Confirm? Yes, delete / No, keep / Archive instead?
```

### Hard Gate: Domain Constraint Violation

```
⏹ HARD GATE — Autonomy Violation

This action violates the autonomy constraint for this domain.

What I want to do:
Make a financial recommendation for your investment decision.

Why:
The analysis is complete and shows clear recommendation.

Why I'm stopping:
Finance-advisory domain autonomy = "Advisory only, never autonomous."
Financial decisions are always human decisions.

What I need:
You to review the analysis and make the investment decision yourself.

Next step:
Would you like me to present the analysis findings for your review?
```

---

## Escalation from Gate

If unclear whether to use soft or hard gate:

```
⏸ APPROVAL GATE — Unclear

I'm uncertain about proceeding with this action:

Action: [What I want to do]
Domain: [Which domain]
Autonomy Level: [What it says]

Questions:
- Is this irreversible?
- Is this a never-autonomous action in this domain?
- Do you want to confirm before I proceed?

What should I do?
A) Proceed with soft gate (request confirmation)
B) Proceed with hard gate (demand explicit confirmation)
C) Don't proceed, ask how to handle differently
D) Escalate for guidance
```

---

## What Happens After Confirmation

**Soft Gate → YES:**
- Proceed with execution
- Document decision: "Confirmed by user"
- Execute skill fully
- Report results

**Soft Gate → NO:**
- Stop execution
- Do not proceed
- Suggest alternatives: "Would you like to try a different approach?"

**Soft Gate → ALTERNATIVE:**
- Stop current plan
- Adjust based on alternative provided
- Present revised approach (may trigger another soft gate)

**Hard Gate → YES (explicit):**
- Proceed with extreme caution
- Log this decision clearly
- Execute action
- Document completion with timestamp

**Hard Gate → NO:**
- Stop immediately
- Do not attempt alternative
- Suggest: "What would you prefer instead?"

**Hard Gate → No Response (timeout):**
- Do NOT proceed
- Re-present gate after 10 minutes
- If still no response, escalate: "I'm waiting for confirmation on [action]. Should I proceed or defer this work?"

---

## Confirmation Tracking

For record-keeping:

Track soft gate confirmations:
- What was requested
- When
- How user responded
- What action was taken

Track hard gate confirmations:
- What required confirmation
- When
- Explicit user confirmation (exact words)
- Timestamp
- Action taken

**Format for logging:**
```
GATE: [Type]
Action: [What was requested]
Time: [When]
Response: [User's response, verbatim if hard gate]
Status: [PROCEED / NO-PROCEED / ALTERNATIVE]
```

---

## Related Docs

- **docs/processes/enforcement-layer.md** — Pre-flight checks that determine if gate is needed
- **docs/processes/error-escalation.md** — When to escalate instead of gating
- **autonomy-matrix.md** — Which autonomy levels require which gate types

---

## Last Updated

- **Created:** 2026-04-08
- **Last reviewed:** 2026-04-08
- **Next review:** 2026-07-08 (quarterly)
