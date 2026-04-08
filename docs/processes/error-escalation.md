<!-- type: process -->

# Error Escalation Protocol

What constitutes an error vs. ambiguity vs. blocker. When to retry, when to escalate. Max retries before escalating. Never loop indefinitely.

---

## Overview

Three categories that trigger different responses:

| Category | Definition | Response | Max Retries |
|---|---|---|---|
| **Error** | Skill executed but produced incorrect result or failed gracefully | Try to recover; retry with adjusted inputs | 3 attempts |
| **Ambiguity** | Result is unclear; unclear what happened; unclear next step | Flag assumption; ask for clarification; do not retry | 0 retries |
| **Blocker** | Skill cannot proceed due to missing data, constraint violation, or unforeseen barrier | Escalate; stop; request guidance | 0 retries |

---

## Distinguishing Error vs. Ambiguity vs. Blocker

### Error

**Characteristics:**
- Skill executed completely
- Output exists but is wrong, incomplete, or unhelpful
- Cause is identifiable (bad input, execution flaw, logic issue)
- Recoverable (fixable input, different approach)

**Examples:**
- skill-research-synthesis found sources but they were off-topic
- skill-business-assessment ran but recommendation was unclear due to missing data
- skill-study-guide-creation created materials but difficulty level was wrong

**Response:** Retry (up to 3 times) with adjusted inputs

### Ambiguity

**Characteristics:**
- Output exists but meaning is unclear
- Unclear what happened or why
- Unclear next step
- Cannot reliably retry because cause is unknown

**Examples:**
- Skill output is contradictory (recommends GO and PASS simultaneously)
- Skill ran but didn't explain what it did or what findings mean
- Output raises new questions that need human interpretation

**Response:** Flag assumption; do not retry; ask for clarification

### Blocker

**Characteristics:**
- Skill cannot execute or gets stuck
- Missing required input or context
- Constraint violation prevents proceeding
- Unforeseen barrier (access denied, format incompatible, system unavailable)

**Examples:**
- skill-research-synthesis cannot access sources (paywall, blocked)
- skill-academic-writing cannot proceed without assignment details
- skill-ms365-automation cannot authenticate with Power Automate
- Orchestration skill cannot chain: output format incompatible with next skill

**Response:** Stop immediately; escalate; do not retry

---

## Error: Retry Protocol

**Trigger:** Skill executed, output exists, result is wrong/incomplete

**Retry Process:**

```
Error Detected: [What went wrong]

Execution attempt 1 failed: [Specific failure]
Adjusting input: [What I changed]

Retrying with adjusted input...
```

**After each retry:**
- Did it succeed? → Proceed with result
- Did it fail again? → Go to Retry #2
- Did it fail 3 times? → Escalate as blocker

**Retry Attempts:**

| Attempt | Action | If Fails |
|---|---|---|
| 1 | Execute with original inputs | Check what failed; adjust input |
| 2 | Execute with adjusted inputs | Check what failed; try different approach |
| 3 | Execute with different approach/skill | If fails again → Escalate |

**Example:**

```
Execution 1: skill-research-synthesis
Input: "market for AI tools"
Result: Too broad; found 500+ sources; no synthesis

Adjustment: Narrowed scope to "AI project management tools"

Execution 2: skill-research-synthesis
Input: "AI project management tools, market size and competitive positioning"
Result: Better; 50 relevant sources; good synthesis

Outcome: ✓ SUCCESS after 1 retry
```

**If all 3 retries fail:**

```
ERROR: Unrecoverable

Skill: [Name]
Attempts: 3 (all failed)
Last error: [What failed on attempt 3]

This error cannot be recovered by retrying. Escalating for guidance.

Context needed:
[What would help me succeed]
```

---

## Ambiguity: Clarification Protocol

**Trigger:** Output is unclear; meaning uncertain; next step undefined

**Clarification Process:**

```
Ambiguity Detected: [What's unclear]

Output: [The confusing result]

What I'm uncertain about:
1. [Specific question 1]
2. [Specific question 2]
3. [Specific question 3]

Assumption I'm making: [What I'm assuming to proceed]

Should I:
A) Proceed with this assumption
B) Wait for clarification from you
C) Try a different approach
```

**Do NOT retry the same skill.** Retrying will produce the same ambiguous output.

**Example:**

```
Ambiguity: Unclear Recommendation

Skill: skill-business-assessment
Output: "GO if market timing is right; CAUTION if you lack market experience"

What I'm uncertain about:
1. Is market timing right or not?
2. Do you have market experience or not?
3. What does "GO if..." actually mean for your decision?

Assumption: You want a clear GO/CAUTION/PASS. This output isn't clear enough.

Should I:
A) Re-run assessment with more specific market data
B) Ask you clarifying questions first
C) Provide detailed breakdown of GO conditions vs. CAUTION conditions
```

**When clarified:**
- Adjust approach based on clarification
- May re-run skill with better inputs if clarification revealed missing data
- Or proceed with output + interpretation if clarification was just interpretation

---

## Blocker: Escalation Protocol

**Trigger:** Skill cannot execute; constraint violation; unforeseen barrier

**Escalation Process:**

```
⚠ BLOCKER: Cannot Proceed

Skill: [Name]
Action attempted: [What I tried to do]

Blocking reason: [Why I can't proceed]

Details:
[Technical details of why blocked]

What I need:
[How human can unblock this]

Options to resolve:
1. [Option A to unblock]
2. [Option B to unblock]
3. [Option C to unblock]

Which should I try, or do you have a different approach?
```

**Do NOT retry a blocker.** Retrying will fail the same way.

**Do NOT attempt workarounds without asking.** Blockers are hard stops.

**Example:**

```
⚠ BLOCKER: Cannot Authenticate

Skill: skill-ms365-automation
Action attempted: Connect to Power Automate and list flows

Blocking reason: Power Automate authentication required; I don't have credentials

Details:
Power Automate connector needs:
- OAuth login
- Tenant ID
- Service principal or user account

What I need:
Your Power Automate authentication. I cannot proceed without credentials.

Options to resolve:
1. You authenticate me with Power Automate (OAuth flow)
2. You provide a service principal credential
3. You provide the specific flow details I need directly
4. We use a different approach that doesn't require Power Automate

What should I do?
```

---

## Max Retry Limits

**Hard Limits:**

| Scenario | Max Retries | Then |
|---|---|---|
| Single skill, recoverable error | 3 | Escalate |
| Orchestration chain error | 1 per skill | Escalate if all fail |
| Data validation error | 2 | Escalate or reject invalid data |
| Blocker (first attempt) | 0 | Escalate immediately |

**Never loop indefinitely.**

**Rule:** If the same failure happens 3 times in a row, the approach is wrong. Stop retrying and escalate.

**Example of infinite loop prevention:**

```
Retry 1: skill-block-intake fails with "component not found"
Retry 2: skill-block-intake fails with "component not found" 
Retry 3: skill-block-intake fails with "component not found"

Pattern detected: Same error 3x. Not a transient issue.

⚠ ESCALATION: Unrecoverable Error

Skill: skill-block-intake
Error: Component not found (consistent across 3 attempts)
Root cause unknown.

This is not a recoverable error. Escalating for investigation.

Context:
[What was being attempted]
[Why it's failing consistently]
[What block/component is missing]
```

---

## Escalation Message Format

When escalating (error, ambiguity, or blocker), include:

```
⚠ ESCALATION: [Error Type]

Context:
└─ Domain: [Which domain]
└─ Skill: [Which skill]
└─ Action: [What I was trying to do]

Problem:
└─ Type: [Error / Ambiguity / Blocker]
└─ Description: [What happened]
└─ Trigger: [Why I'm escalating]

Details:
├─ Error type: [Specific error]
├─ Attempts: [How many tries]
├─ Last output: [What happened on last attempt]
└─ Additional context: [Anything relevant]

What I need:
[Specific human decision or action needed]

Options:
A) [Option 1 if human can help]
B) [Option 2]
C) [Option 3 - defer this work]
```

**Keep escalations scannable.** Use structure, not paragraphs.

---

## Common Scenarios

### Error: Retry and Recover

```
Error detected: skill-research-synthesis found wrong type of sources

Attempt 1: Query "startup funding opportunities"
Result: Found job boards, not funding sources

Adjustment: Narrowed to "venture capital funding for startups"

Attempt 2: Query "venture capital funding for technology startups"
Result: ✓ Relevant sources found; good synthesis

Status: RECOVERED ✓
```

### Ambiguity: Need Clarification

```
Ambiguity: skill-financial-assessment result is contradictory

Output: "Strong potential returns but also significant risks"

Unclear:
- Does strong potential mean 10% ROI or 100% ROI?
- Are risks market risk, operational risk, or something else?
- What's the recommendation: GO or CAUTION?

Assumption: You want a clear recommendation.

Escalating for clarification:
"What level of risk are you comfortable with? That will clarify 
whether the strong returns justify the risks."
```

### Blocker: Cannot Proceed

```
Blocker: skill-academic-writing cannot start

Attempted: Begin Phase 1 (understand assignment)

Blocking reason: Assignment details not provided

Details needed:
- What is the assignment? (essay, paper, report)
- What are requirements? (length, format, topic)
- When is it due?

Escalation:
"I need assignment details before I can help with academic writing. 
Please provide: assignment instructions and any rubric/requirements."
```

### Infinite Loop Prevention

```
skill-block-intake retrying same failure

Attempt 1: Component "header" not found
Attempt 2: Component "header" not found
Attempt 3: Component "header" not found

Pattern: Same error 3x. Stopping retries.

⚠ ESCALATION

Root cause: Component "header" does not exist in component library

Options:
A) Create the missing component
B) Use alternative component
C) Stop this task until component available

What should I do?
```

---

## Related Docs

- **docs/processes/enforcement-layer.md** — Pre-flight checks before execution
- **docs/processes/approval-gate-protocol.md** — Approval gates during execution
- **skills/SKILL-REGISTRY.md** — Skill error handling sections

---

## Last Updated

- **Created:** 2026-04-08
- **Last reviewed:** 2026-04-08
- **Next review:** 2026-07-08 (quarterly)
