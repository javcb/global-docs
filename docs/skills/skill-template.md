<!-- type: [skill-template] -->

# Skill Template

Copy this template when creating a new skill. Modify sections as needed based on skill type (execution vs. advisory).

---

## Metadata

| Attribute | Value |
|---|---|
| **Skill ID** | `skill-[kebab-case-name]` |
| **Type** | [execution \| advisory \| orchestration] |
| **Version** | [X.Y.Z] |
| **Status** | [ACTIVE \| IN DEVELOPMENT \| DEPRECATED \| ARCHIVED] |
| **Created** | [YYYY-MM-DD] |
| **Last Reviewed** | [YYYY-MM-DD] |
| **Dependencies** | [List any skills this depends on, or "None"] |
| **Domains** | [List applicable domains, or "All"] |

---

## Summary

**One sentence describing what this skill does.**

One paragraph explaining the problem it solves and why it exists.

---

## When to Use This Skill

- **Use this skill when:** [Specific scenario 1, scenario 2, etc.]
- **Do NOT use this skill when:** [Cases where this skill is inappropriate]
- **Prerequisite state:** [What must be true before this skill can run? E.g., "A project repo exists" or "None"]

---

## Input Requirements

List what the AI needs before executing this skill.

### Required Inputs
- **[Input Name]:** Description. Example: `[example value]`
- **[Input Name]:** Description. Example: `[example value]`

### Optional Inputs
- **[Input Name]:** Description. Default: `[value]`

### Assumptions
- [What does this skill assume about the user's environment, tools, permissions, etc.?]
- [List any other assumed state.]

---

## Execution Flow

### [Phase 1 Name]
**Goal:** [What should be true at the end of this phase?]

1. [Action]
2. [Action]
3. [Action]

**Output:** [Describe what the AI produces after this phase]

**Approval Gate:** [Does the AI pause and wait for user confirmation before proceeding? If yes, what decision is the user making?]

---

### [Phase 2 Name]
[Repeat the pattern above for each phase]

---

## Output Format

**Always deliver output in this format:**

```
[PHASE NAME]

[What you found / what you did]
[Structured findings, e.g., table, list, or prose]

[Next step or recommendation]
```

---

## Error Handling

| Error Condition | Resolution |
|---|---|
| [Describe condition] | [How the skill responds] |
| [Describe condition] | [How the skill responds] |

---

## Examples

### Example 1: [Scenario]

**Input:**
```
[Sample input data]
```

**Output:**
```
[Sample output]
```

---

## Reference

- **Related skills:** [List any skills that complement or depend on this one]
- **External references:** [Links to docs, standards, tools referenced by this skill]
- **Domain context:** [Link to relevant domain context file, if applicable]

---

## Maintenance

- **How often to review:** [quarterly / annually / when X changes]
- **What triggers an update:** [Breaking change conditions, e.g., when library X updates, when new standard is adopted, etc.]
- **Who owns this skill:** [If applicable: specific domain owner]

---

## Version History

See [SKILL-CHANGELOG.md](./SKILL-CHANGELOG.md) for all versions, breaking changes, and migration paths.

---

## Notes for Skill Developers

### Execution Skills
- Execution skills are **procedural** — they perform step-by-step workflows.
- All execution skills depend on `skill-prompting-core` (unless specified otherwise).
- Use **approval gates** between phases to wait for user confirmation.
- Output per-file status at each phase (e.g., "Inventory: File X can fully convert? Yes").
- Output format must be structured, not prose, for easy parsing by automation.

### Advisory Skills
- Advisory skills are **judgment-based assessments** — they evaluate something against criteria and recommend next steps.
- Advisory skills do NOT execute changes; they report findings.
- Use **severity levels** (CRITICAL, HIGH, MEDIUM, LOW) for violations or issues.
- Recommend, but do not execute, remediation.
- Output format should include findings, impact, and recommendations.

### Orchestration Skills
- Orchestration skills **chain multiple skills together** for end-to-end workflows.
- Each phase runs a different skill and passes outputs as inputs to the next.
- Always wait for user approval at phase boundaries.
- Document the skill sequence and decision points clearly.

---

## Changelog Entry Template

When creating a new skill or updating an existing one, add an entry to SKILL-CHANGELOG.md:

```
### v[X.Y.Z] — YYYY-MM-DD

**Status:** [ACTIVE | DEPRECATED | ARCHIVED]

**Changes:**
- [What changed]
- [What changed]

**Breaking Changes:** [If any; describe impact and migration path]

**Migration:** [If upgrading from v[X-1], do this]
```
