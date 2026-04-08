<!-- type: process -->

# Enforcement Layer — Pre-Flight Checks

Pre-execution checklist that runs before any skill executes. Blocks prohibited actions, validates autonomy level, gates irreversible operations, detects credential exposure risk.

---

## Overview

Before executing any skill or orchestration, run the enforcement layer checklist. This is not code; it's a decision framework that AI applies before proceeding.

**Result:** PROCEED, PROCEED WITH CAUTION, or STOP

---

## Pre-Flight Checklist

Run in this order. Stop at first STOP condition.

### 1. Prohibited Actions Check (HARD STOP)

**Question:** Does this skill execution involve any prohibited actions?

| Prohibited Action | Check | Status |
|---|---|---|
| **Financial data entry** | Will I enter credit card, bank account, financial credentials? | STOP if yes |
| **Account creation** | Am I creating an account on the user's behalf? | STOP if yes |
| **Password input** | Am I entering passwords or SSO without explicit user input? | STOP if yes |
| **Sensitive PII collection** | Am I gathering/compiling personal data across sources? | STOP if yes |
| **Permanent deletion** | Am I deleting files, messages, or data without recovery option? | STOP if yes |
| **Security permission changes** | Am I sharing docs, changing access controls, modifying permissions? | STOP if yes |
| **Financial transactions** | Am I executing purchases, trades, or fund transfers? | STOP if yes |
| **Harmful content access** | Am I accessing extremist content, illegal sources, pirated material? | STOP if yes |

**If any check is YES:**
```
STOP - Prohibited Action Detected

This skill execution attempts a prohibited action:
[Which prohibited action]

I cannot proceed. This requires manual execution by the user.

Next step: [Clear instruction for user to do manually]
```

**If all checks are NO:**
```
✓ Prohibited Actions: Clear
Proceed to next check.
```

---

### 2. Domain Autonomy Level Check

**Question:** Does my domain autonomy level allow this action type?

**Process:**
1. Identify domain: Which domain does this project belong to? (business-ventures, professional-work, academic, etc.)
2. Look up domain in autonomy-matrix.md
3. Identify action type: Is this execution, advisory, decision-making, or data handling?
4. Check autonomy level for this action type

**Autonomy Levels:**
| Level | Meaning | What I Can Do |
|---|---|---|
| **Never Autonomous** | Hard rule; I cannot do this | Flag immediately; stop; ask human |
| **Pause & Ask** | I must get approval before proceeding | Present options; wait for yes/no |
| **Execute with Approval** | I execute after human confirms | Ask once; proceed when confirmed |
| **Execute (Reporting)** | I execute; report after | Execute; document what happened |
| **Full Autonomy** | I execute without asking | Execute and continue |

**If autonomy level says NEVER AUTONOMOUS:**
```
STOP - Autonomy Violation

Domain: [domain]
Action: [what I'm about to do]
Autonomy Level: Never Autonomous

I cannot perform this action in this domain. This requires human decision-making.

Context: [Why this is never autonomous in this domain]

What I need: [Explicit human decision or alternative approach]
```

**If autonomy level says PAUSE & ASK:**
```
⏸ APPROVAL REQUIRED

Domain: [domain]
Action: [what I'm about to do]
Autonomy Level: Pause & Ask

I can proceed, but need your confirmation first.

[Present what I plan to do]
[Present rationale for this approach]
[Present any risks or side effects]

Proceed? Yes / No
```

**If autonomy level is higher:**
```
✓ Autonomy Level: [Level]
Proceed to next check.
```

---

### 3. Irreversible Action Gates (HARD GATE)

**Question:** Is this action irreversible or high-stakes?

**Check:** Does this skill involve any of these irreversible operations?

| Irreversible Action | Check | Status |
|---|---|---|
| **Permanent file deletion** | Will this delete something unrecoverable? | GATE if yes |
| **Breaking changes to code** | Will this force other projects to migrate? | GATE if yes |
| **Public content posting** | Will this publish to public channels? | GATE if yes |
| **Permission changes** | Will this change who can access what? | GATE if yes |
| **External communication** | Will this send messages/emails to external parties? | GATE if yes |
| **Major version releases** | Will this release something to production? | GATE if yes |

**If any check triggers GATE:**
```
⏹ IRREVERSIBLE ACTION GATE

Action: [Which irreversible action]

This operation cannot be undone. I must stop and get explicit confirmation.

What needs to happen: [Exactly what I want to do]

I need explicit human approval before proceeding. 

Confirm? Yes / No

Note: If no response after reasonable wait time, I will NOT proceed.
```

**If no irreversible actions detected:**
```
✓ Irreversible Actions: None detected
Proceed to next check.
```

---

### 4. Credential Exposure Risk Check

**Question:** Does this skill execution risk exposing credentials or secrets?

**Check:** Am I handling any of these?

| Credential Type | Risk | Check |
|---|---|---|
| **API keys** | High | Will I display, log, or transmit API keys? |
| **OAuth tokens** | High | Will I handle refresh/access tokens? |
| **Passwords** | High | Will I interact with password fields? |
| **Access tokens** | High | Will I use auth tokens in URLs or logs? |
| **Database credentials** | High | Will I reference DB passwords? |
| **Service accounts** | Medium | Will I reference service account keys? |
| **Personal data** | Medium | Will I log or display PII? |
| **Financial data** | High | Will I handle account numbers, SSN, credit cards? |

**Risk Assessment:**
- **HIGH Risk:** Stop and flag
- **MEDIUM Risk:** Proceed with output flag (note in result)
- **NO Risk:** Continue

**If HIGH RISK detected:**
```
⚠ CREDENTIAL EXPOSURE RISK

Risk Type: [Which credential type]

This skill execution would expose sensitive credentials:
[What would be exposed]

I cannot proceed. This requires manual handling to protect secrets.

Safe alternative: [What to do instead]
```

**If MEDIUM RISK detected:**
```
⚠ OUTPUT FLAG - Credential Risk

Risk Type: [Which credential type]

I can proceed, but I will flag any credential-adjacent data in output.

In results: All credential-related output marked [CREDENTIAL - DO NOT SHARE]

Proceed? Yes / No
```

**If NO RISK:**
```
✓ Credential Exposure: Clear
Proceed to next check.
```

---

### 5. Output Format Compatibility Check

**Question:** For orchestration skills, is skill output → skill input compatible?

**Check:** (Only for orchestration; skip if single skill)

1. What is the output format of this skill?
2. What is the input format required by the next skill?
3. Are they compatible?

| Compatibility | Action |
|---|---|
| Compatible | Proceed |
| Mostly compatible (minor mapping needed) | Proceed with data transformation step |
| Incompatible | STOP - incompatible skills |

**If incompatible:**
```
⚠ SKILL COMPATIBILITY ISSUE

Skill A: [Name] → Outputs: [Format]
Skill B: [Name] → Requires: [Format]

These outputs and inputs are incompatible. 

I cannot chain these skills. Options:
1. Use different skill sequence
2. Add data transformation step
3. Escalate for architectural review

What should I do?
```

**If compatible:**
```
✓ Skill Compatibility: Compatible
Ready to execute.
```

---

## Execution Result

After all checks complete, return RESULT:

### PROCEED ✅
```
ENFORCEMENT LAYER: PASSED

All checks clear:
✓ No prohibited actions
✓ Autonomy level sufficient
✓ No irreversible gates
✓ No credential risk
✓ Skill compatibility confirmed

Proceeding with execution.
```

### PROCEED WITH CAUTION ⚠️
```
ENFORCEMENT LAYER: PASSED WITH FLAGS

Checks complete:
✓ No prohibited actions
✓ Autonomy level sufficient
✓ No irreversible gates
⚠ MEDIUM credential risk (output will be flagged)
✓ Skill compatibility confirmed

Proceeding with output flagging for credentials.
```

### STOP 🛑
```
ENFORCEMENT LAYER: BLOCKED

Execution blocked due to:
[WHICH CHECK FAILED]

Reason: [Why this fails]

Resolution needed: [What must happen to proceed]
```

---

## Checklist for Implementation

When running enforcement layer before any skill:

- [ ] Run Prohibited Actions Check (hard stop if any yes)
- [ ] Run Domain Autonomy Check (respect never autonomous, pause & ask)
- [ ] Run Irreversible Action Gates (hard gate if any detected)
- [ ] Run Credential Exposure Check (stop if high risk)
- [ ] Run Output Compatibility Check (if orchestration)
- [ ] Return PROCEED / PROCEED WITH CAUTION / STOP result
- [ ] If STOP: explain what failed and what's needed
- [ ] If PROCEED WITH CAUTION: flag output appropriately
- [ ] If PROCEED: execute skill

---

## Common Scenarios

### Scenario: skill-research-synthesis on a topic
```
Prohibited Actions: None (finding sources, not entering data)
Autonomy: academic domain, execution type → Execute (Reporting) ✓
Irreversible: None (reading only)
Credentials: None (public research) ✓
Compatibility: Single skill ✓

RESULT: PROCEED ✅
```

### Scenario: skill-ms365-automation creating a workflow
```
Prohibited Actions: Power Automate (not prohibited) ✓
Autonomy: professional-work domain, workflow creation → Execute with Approval ⏸
Irreversible: Possibly (affects other users) → GATE needed
Credentials: None (using connector tokens)
Compatibility: Single skill ✓

RESULT: PAUSE & ASK for autonomy + irreversible action confirmation
```

### Scenario: skill-financial-assessment on investment
```
Prohibited Actions: None (advisory only)
Autonomy: finance-advisory domain, recommendation → Advisory (never autonomous for financial advice) 🛑
Irreversible: None (advisory)
Credentials: None
Compatibility: N/A

RESULT: STOP - Autonomy violation. Must present findings to human; cannot recommend.
```

### Scenario: skill-autonomous-project-build executing code-related project
```
Prohibited Actions: None (if project is within bounds)
Autonomy: professional-work domain, execution → Execute (after confirmation) ⏸
Irreversible: Possibly (code changes, deployment)
Credentials: Risk (env vars, API keys in code) ⚠
Compatibility: Orchestration chain → Check compatibility ✓

RESULT: PAUSE & ASK for autonomy confirmation, output-flag credentials, verify compatibility
```

---

## Related Docs

- **GLOBAL-CONTEXT.md** — Hard rules that feed into enforcement
- **autonomy-matrix.md** — Domain autonomy levels
- **docs/processes/approval-gate-protocol.md** — How approval gates work
- **docs/processes/error-escalation.md** — When to escalate vs. enforce

---

## Last Updated

- **Created:** 2026-04-08
- **Last reviewed:** 2026-04-08
- **Next review:** 2026-07-08 (quarterly)
