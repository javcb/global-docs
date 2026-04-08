<!-- type: skill-execution -->

# Skill: MS365 Automation

Create Power Automate workflows and automate repetitive tasks in MS365 ecosystem. Reduces manual work through automation in Outlook, SharePoint, Excel, Teams, etc.

---

## Metadata

| Attribute | Value |
|---|---|
| **Skill ID** | `skill-ms365-automation` |
| **Type** | execution (procedural workflow) |
| **Version** | 1.0 |
| **Status** | ACTIVE |
| **Created** | 2026-04-08 |
| **Last Reviewed** | 2026-04-08 |
| **Dependencies** | skill-prompting-core |
| **Domains** | professional-work |

---

## Summary

**Automate repetitive MS365 tasks.**

Designs and creates Power Automate flows to eliminate manual, repetitive work. Uses Outlook, SharePoint, Excel, Teams, Power BI, and other MS365 tools to build automated workflows, reduce errors, and improve efficiency.

---

## When to Use This Skill

- **Use this skill when:** You have a repetitive MS365 task that could be automated
- **Do NOT use this skill when:** The task is one-time or manual judgment is better than automation
- **Prerequisite state:** Clear description of the task to automate; you have access to required MS365 tools

---

## Input Requirements

### Required Inputs
- **Task to automate:** Clear description of what you want automated
- **Current process:** How is this done manually now?
- **Trigger:** What starts the workflow?

### Optional Inputs
- **Frequency:** How often does this happen?
- **Data sources:** What systems/data are involved?
- **Success criteria:** How do you know it worked?
- **Error handling:** What should happen if something goes wrong?

### Assumptions
- Automation is possible in MS365 (not everything can be automated)
- You have access to required tools and data sources
- The process is stable enough to automate
- You'll test and refine the automation before fully deploying

---

## Execution Flow

### Phase 1: Assess Automation Feasibility

**Goal:** Determine if this task can be automated and is worth automating.

1. Analyze current process:
   - What steps happen? (in order)
   - How much time does it take?
   - How often does it happen?
   - What data is involved?

2. Assess automation potential:
   - Is this repetitive and consistent?
   - Can it be triggered automatically?
   - Are the data sources accessible in MS365?
   - Would automation save meaningful time?

3. Identify blockers:
   - Are there steps that require human judgment?
   - Are there external systems not accessible to Power Automate?
   - Would partial automation be useful?

**Output:** Feasibility assessment

**Approval Gate:** SOFT ("Is automation worth it for this?")
- If YES: Continue to design
- If NO/PARTIAL: Discuss alternatives or simplified version

---

### Phase 2: Design the Workflow

**Goal:** Plan the automation flow before building.

1. Map the workflow:
   - Trigger: "When [event] happens..."
   - Steps: "Then [action], then [action]..."
   - Decision points: "If [condition], then [path A], else [path B]"
   - Outputs: "Result: [what happens]"

2. Identify data flows:
   - What data comes in?
   - What transformations happen?
   - What data goes where?
   - Error handling: what if data is missing/wrong?

3. Plan error scenarios:
   - What if the trigger fails?
   - What if a step fails?
   - How will errors be handled/reported?
   - Should there be a fallback/manual review?

**Output:** Detailed workflow design

**Approval Gate:** YES ("Does this workflow look right?")
- If NO: Refine design
- If YES: Proceed to building

---

### Phase 3: Build the Power Automate Flow

**Goal:** Implement the automation.

1. Create Power Automate flow:
   - Set trigger: "When [event] happens"
   - Add actions: use Power Automate connectors
   - Add conditions: if/then logic
   - Add error handling: error notification or alternative path

2. Configure connectors:
   - Outlook (email, calendar)
   - SharePoint (lists, documents)
   - Excel (workbooks, tables)
   - Power BI (data)
   - Teams (messages, channels)
   - Custom connectors if needed

3. Test flow:
   - Run manually with test data
   - Check each step executes correctly
   - Verify outputs are correct
   - Test error scenarios

**Output:** Working Power Automate flow

**Approval Gate:** SOFT (testing complete, ready to deploy)

---

### Phase 4: Refine and Optimize

**Goal:** Make the workflow efficient and robust.

1. Performance optimization:
   - Are there unnecessary steps?
   - Can parallel processes speed it up?
   - Can filtering reduce data processed?

2. Error handling:
   - What errors are logged?
   - How are errors communicated?
   - Is manual review needed for errors?

3. Monitoring:
   - How will you know if the flow is working?
   - What metrics matter? (speed, success rate, errors)
   - How often should you review?

4. Documentation:
   - What does this flow do?
   - When was it created/last modified?
   - Who maintains it?
   - What could break it?

**Output:** Optimized, documented flow

**Approval Gate:** SOFT (ready for production)

---

### Phase 5: Deploy and Monitor

**Goal:** Put the automation into production and track it.

1. Enable the flow:
   - Turn on automated trigger
   - Begin running on schedule
   - Monitor first runs

2. Track performance:
   - Success rate (how often does it complete successfully?)
   - Failure rate (when does it fail and why?)
   - Execution time (how long does it take?)
   - Manual interventions (how often does it need help?)

3. Alert on problems:
   - Set up notifications for failures
   - Review failed runs
   - Fix issues quickly

4. Refine based on real usage:
   - Did it save the expected time?
   - Are there edge cases not handled?
   - Can it be further optimized?

**Output:** Live, monitored automation

**Approval Gate:** None (monitoring is ongoing)

---

## Output Format

**Workflow Documentation:**

```
POWER AUTOMATE WORKFLOW: [Name]

═══════════════════════════════════════════════════════════════

PURPOSE
[What this automation does and why]

TRIGGER
When: [Event that starts the flow]
Frequency: [How often it runs]

═══════════════════════════════════════════════════════════════

WORKFLOW STEPS

Step 1: [Action name]
├─ What it does: [Description]
└─ Configuration: [Relevant settings]

Step 2: [Action name]
├─ Condition: [If/Then logic, if applicable]
├─ What it does: [Description]
└─ Configuration: [Settings]

[Continue for all steps...]

═══════════════════════════════════════════════════════════════

ERROR HANDLING

If [error type]:
├─ Action: [What happens]
└─ Notification: [Who gets notified, how]

If [error type]:
├─ Action: [What happens]
└─ Retry: [Yes/No + approach]

═══════════════════════════════════════════════════════════════

OUTPUTS & RESULTS

The flow produces:
├─ [Output 1]: [Where it goes, who sees it]
├─ [Output 2]: [Where it goes, who sees it]
└─ [Output 3]: [Where it goes, who sees it]

Success criteria:
├─ Criterion 1: [What indicates success]
└─ Criterion 2: [What indicates success]

═══════════════════════════════════════════════════════════════

MONITORING & MAINTENANCE

What to watch:
├─ Success rate: [Target %, current %]
├─ Execution time: [Target, current]
└─ Failures: [When/why to expect them]

Review frequency: [How often to check]
Owners: [Who maintains this flow]

═══════════════════════════════════════════════════════════════
```

---

## Style Rules

- **Clear trigger:** Workflow should activate on a specific, consistent event
- **Linear when possible:** Prefer simple step-by-step over complex branching
- **Error first:** Think about what could go wrong and handle it
- **Idempotent:** Workflow should be safe to run multiple times (shouldn't duplicate)
- **Logged and monitored:** Failures should be visible
- **Documented:** Future you will need to understand this

---

## Common Automation Patterns

### Pattern 1: Email Categorization & Filing
```
When: Email arrives with [specific conditions]
Then: Append to Excel table, create SharePoint item, move to folder
```

### Pattern 2: Approval Workflow
```
When: SharePoint item created
Then: Send email approval request to [person]
If: Approved, update item and notify creator
If: Rejected, return item and request changes
```

### Pattern 3: Data Sync
```
When: Excel table updated
Then: Update corresponding SharePoint list / Power BI
If: Error, notify owner and log
```

### Pattern 4: Scheduled Report
```
When: [Schedule, e.g., Monday 9am]
Then: Gather data from sources
Format as report
Email to distribution list
```

### Pattern 5: Task Creation
```
When: Email from specific sender OR email with [keywords]
Then: Create task in Outlook / To-Do
Assign to [person]
Set due date based on email
```

---

## Error Handling

| Error Condition | Resolution |
|---|---|
| Flow fails to trigger | Check trigger conditions. Verify event is actually happening. Review permissions. |
| Step fails (connector error) | Check permissions on target system (SharePoint, Excel, etc.). Verify data format. Test manually. |
| Flow creates duplicates | Add deduplication logic. Check for multiple triggers of same event. Use idempotency keys. |
| Flow runs but produces wrong output | Verify data transformations. Check formulas/expressions. Test with sample data. |
| Flow is too slow | Identify bottleneck step. Consider parallelization. Remove unnecessary steps. Optimize data filters. |

---

## Related Skills

| Skill | How Used |
|---|---|
| `skill-prompting-core` | Establish professional-work context |
| [future: data-transformation] | Complex data formatting and manipulation |
| [future: integration-patterns] | Deep integrations across systems |

---

## Related Docs

- **GLOBAL-CONTEXT.md** — Professional-work constraints and standards
- **domains/professional-work-context.md** — MS365 tools and automation autonomy
- **Power Automate documentation** (Microsoft) — Connector reference and examples

---

## Version

- **Created:** 2026-04-08
- **Last reviewed:** 2026-04-08
- **Next review:** 2026-07-08 (quarterly)
- **Status:** ACTIVE
- **Scope:** Power Automate workflows and MS365 automation
