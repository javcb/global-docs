<!-- type: skill-orchestration -->

# Skill: Standards-Wide Audit

Orchestrate comprehensive audit across all standards repositories. Chains audit-trigger across multiple repos, consolidates findings, produces single priority list for systemic compliance and standards alignment.

---

## Metadata

| Attribute | Value |
|---|---|
| **Skill ID** | `skill-standards-wide-audit` |
| **Type** | orchestration (skill chaining) |
| **Version** | 1.0 |
| **Status** | ACTIVE |
| **Created** | 2026-04-08 |
| **Last Reviewed** | 2026-04-08 |
| **Dependencies** | skill-audit-trigger |
| **Domains** | All (cross-repo compliance) |

---

## Summary

**Conduct comprehensive standards compliance audit across all repos.**

Orchestrates audit-trigger across global standards repositories (global-docs, design-system, component-library, brand-standards, etc.), consolidates all findings into single unified report, and produces prioritized action list for systemic fixes.

---

## When to Use This Skill

- **Use this skill when:** Need organization-wide standards compliance assessment
- **Do NOT use this skill when:** Auditing a single repository (use skill-audit-trigger directly)
- **Prerequisite state:** Multiple standard repositories exist and have documented standards

---

## Input Requirements

### Required Inputs
- **Repos to audit:** List of all standards repositories to include (global-docs, design-system, component-library, brand-standards, etc.)
- **Audit scope:** What should be audited? (documentation, code quality, design systems, branding, all)

### Optional Inputs
- **Priority focus:** Which standards matter most? (documentation compliance, design system alignment, brand consistency, code quality)
- **Baseline:** Previous audit results to compare against (for trend tracking)
- **Severity filter:** Only show CRITICAL and HIGH? Or include MEDIUM/LOW?

### Assumptions
- All audit targets exist and are accessible
- Standards are documented in GLOBAL-CONTEXT.md and domain contexts
- Repositories follow hub-and-spoke model (reference global-docs)
- audit-trigger can assess each repo independently

---

## Execution Flow

### Phase 1: Load Standards Context

**Goal:** Establish baseline standards that will be audited against.

1. Load standards from global-docs:
   - Read GLOBAL-CONTEXT.md (hard rules, decision framework)
   - Read SKILL-REGISTRY.md (skill standards, versions)
   - Read autonomy-matrix.md (domain autonomy standards)
   - Read design-system-architecture.md (if auditing design)

2. Load domain standards:
   - Read all active domain context files
   - Identify domain-specific standards
   - Note domain-specific constraints

3. Establish audit criteria:
   - What standards will be checked in each repo?
   - What's a CRITICAL violation vs. HIGH vs. MEDIUM?
   - What's expected vs. TBD-acceptable?

**Output:** Consolidated standards baseline

**Approval Gate:** None (context loading)

---

### Phase 2: Prepare Audit Targets

**Goal:** Identify and validate all repositories to audit.

1. Identify audit targets:
   - Global standards repos: global-docs, design-system, component-library, brand-standards
   - Working repos (optional): any professional-work or business repos to check alignment
   - Upstream repos (optional): any third-party frameworks being tracked

2. Validate targets:
   - Does each repo exist and contain standards/deliverables?
   - What's the current status of each repo?
   - Any known issues or special considerations?

3. Plan audit sequence:
   - Which repos have dependencies? (design-system depends on global-docs)
   - What order minimizes cascading errors?
   - How long will each audit take?

**Output:** Validated audit plan with repo sequence

**Approval Gate:** SOFT (review: "Audit targets look complete?")

---

### Phase 3: Execute Repo Audits

**Goal:** Run audit-trigger on each repository independently.

1. Execute audits sequentially:
   - Call skill-audit-trigger for first repo
   - Capture output (violations, status, recommendations)
   - Move to next repo
   - Continue through all repos

2. Handle repo-specific audits:
   - global-docs: documentation compliance, standards consistency, TBD tracking
   - design-system: token compliance, block compliance, design integrity
   - component-library: component standards, Storybook conformance, TypeScript
   - brand-standards: brand consistency, visual language, messaging coherence

3. Track findings:
   - Repo name
   - Violations found (CRITICAL, HIGH, MEDIUM, LOW)
   - Key recommendations
   - Anything blocking other repos

**Output:** Per-repo audit reports

**Approval Gate:** None (informational)

---

### Phase 4: Cross-Repo Dependency Analysis

**Goal:** Identify systemic issues and dependencies across repos.

1. Analyze inter-repo dependencies:
   - Which violations in one repo block others? (global-docs issues cascade)
   - Which recommendations are blocked by other repos?
   - What's the dependency chain?

2. Identify systemic patterns:
   - Is the same violation appearing in multiple repos?
   - Do violations cluster in certain areas? (documentation, code quality, design)
   - What suggests shared root causes?

3. Consolidate findings:
   - Group violations by type (documentation, code, design, process)
   - Identify which violations are systemic vs. repo-specific
   - Note which findings are related or cascading

**Output:** Cross-repo dependency and pattern analysis

**Approval Gate:** None (analysis)

---

### Phase 5: Consolidate & Prioritize

**Goal:** Produce single unified priority list from all repos.

1. Consolidate all findings:
   - Collect all violations from all repos
   - De-duplicate (same issue appearing in multiple repos counts once)
   - Group by root cause

2. Assign priority:
   - **P0 (CRITICAL):** Blocks other work, security/integrity issue, breaking change
   - **P1 (HIGH):** Breaks workflows, causes errors, strong recommendation
   - **P2 (MEDIUM):** Impacts usability, inconsistency, nice-to-have improvement
   - **P3 (LOW):** Polish, documentation, future consideration

3. Create priority list:
   - Rank by: severity level first, then impact (how many repos affected), then effort estimate
   - Group related items (fix together or sequence logically)
   - Estimate effort (quick fix / medium / major work)

4. Identify dependencies:
   - What must be fixed first? (blocking others)
   - What should be fixed together? (related issues)
   - What can be parallelized? (independent fixes)

**Output:** Prioritized action list with sequencing recommendations

**Approval Gate:** SOFT (review: "Priority and sequence look right?")

---

### Phase 6: Generate Recommendations

**Goal:** Provide clear next steps for addressing violations.

1. Recommend quick wins:
   - What can be fixed quickly? (< 1 hour)
   - What should be fixed first? (unblocks other work)
   - What's high-impact?

2. Recommend major initiatives:
   - What requires significant work? (> 4 hours)
   - What are the biggest strategic issues?
   - What would most improve standards compliance?

3. Recommend monitoring:
   - What should be reviewed quarterly?
   - What's trending (improving or degrading)?
   - What needs continuous attention?

4. Estimate impact:
   - If all P0s fixed: impact on system stability
   - If all P0+P1 fixed: impact on dev velocity
   - If all fixed: system health score

**Output:** Recommendation summary and impact analysis

**Approval Gate:** None (advisory)

---

### Phase 7: Publish Results & Track

**Goal:** Document findings and enable action.

1. Publish consolidated report:
   - Overall standards health score
   - Violations by severity and repo
   - Prioritized action list
   - Recommendations and timeline
   - Dependency map for fixes

2. Create action tracking:
   - GitHub issues for high-priority items
   - Assign ownership where clear
   - Link related issues
   - Set target dates

3. Establish review cadence:
   - Weekly: progress on P0s
   - Quarterly: full audit repeat
   - Monthly: trend analysis

**Output:** Published audit report and action tracking

**Approval Gate:** None (complete)

---

## Orchestration Pattern

```
Phase 1: Load Standards Context
  ↓
Phase 2: Prepare Audit Targets
  ↓
Phase 3: Execute Repo Audits ← Main Audit Loop
  ├─→ [Repo 1: skill-audit-trigger → findings]
  ├─→ [Repo 2: skill-audit-trigger → findings]
  ├─→ [Repo N: skill-audit-trigger → findings]
  └─→ [Collect all findings]
  ↓
Phase 4: Cross-Repo Dependency Analysis
  ├─→ [Identify inter-repo dependencies]
  ├─→ [Find systemic patterns]
  └─→ [Consolidate findings]
  ↓
Phase 5: Consolidate & Prioritize
  ├─→ [Create unified violation list]
  ├─→ [Assign priority levels]
  └─→ [Sequence fixes]
  ↓
Phase 6: Generate Recommendations
  ├─→ [Quick wins first]
  ├─→ [Major initiatives]
  └─→ [Monitoring plan]
  ↓
Phase 7: Publish & Track
  ├─→ [Create report]
  ├─→ [Track actions]
  └─→ [Establish cadence]
```

---

## Audit Target Examples

### Standard Repositories
```
global-docs:
  - Documentation compliance (Diátaxis structure)
  - Standards consistency (hard rules applied everywhere)
  - TBD tracking (all placeholders documented)
  - Version consistency (all skills versioned)

design-system:
  - Token compliance (semantic tokens used throughout)
  - Block structure (all blocks follow architecture)
  - TypeScript/Storybook (code quality standards)
  - Documentation (design decisions documented)

component-library:
  - Component standards (shadcn/ui + custom components)
  - TypeScript strict mode (no @ts-ignore)
  - Storybook stories (every component has story)
  - Accessibility (WCAG standards)

brand-standards:
  - Brand consistency (logos, colors, typography)
  - Voice & tone (messaging standards)
  - Visual language (imagery, iconography)
  - Usage guidelines (clear application rules)
```

### Working Repositories (Optional)
```
professional-work repos:
  - Reference global-docs standards?
  - Follow component-library?
  - Use design-system tokens?
  - Follow hard rules from GLOBAL-CONTEXT?

business-ventures repos:
  - Documentation standards?
  - Code quality standards?
  - Consistency with related repos?
```

---

## Output Format

**Standards-Wide Audit Report:**

```
STANDARDS-WIDE AUDIT — [Date]

═══════════════════════════════════════════════════════════════

EXECUTIVE SUMMARY

Overall Standards Health: [Score: A/B/C/D]
Repositories Audited: [Number]
Total Violations: [Count by severity]
  ├─ CRITICAL (P0): [N]
  ├─ HIGH (P1): [N]
  ├─ MEDIUM (P2): [N]
  └─ LOW (P3): [N]

═══════════════════════════════════════════════════════════════

VIOLATIONS BY REPOSITORY

[Repository Name]
├─ Status: [Compliant / Issues Found]
├─ Violations: [Summary of findings]
│  ├─ CRITICAL: [List]
│  ├─ HIGH: [List]
│  ├─ MEDIUM: [List]
│  └─ LOW: [List]
└─ Blocker Issues: [Any blocking other repos?]

[Repeat for each repository...]

═══════════════════════════════════════════════════════════════

VIOLATIONS BY CATEGORY

Documentation:
├─ [Violation A]
├─ [Violation B]
└─ [Impact & Fix]

Code Quality:
├─ [Violation A]
├─ [Violation B]
└─ [Impact & Fix]

Design System:
├─ [Violation A]
├─ [Violation B]
└─ [Impact & Fix]

Process & Standards:
├─ [Violation A]
├─ [Violation B]
└─ [Impact & Fix]

═══════════════════════════════════════════════════════════════

PRIORITY ACTION LIST

P0 (Fix First - Blocking):
├─ [Action 1: Brief description, affected repos, effort estimate]
├─ [Action 2: ...]
└─ [Estimated time: # hours]

P1 (Fix Soon - High Impact):
├─ [Action 1: ...]
├─ [Action 2: ...]
└─ [Estimated time: # hours]

P2 (Fix This Quarter - Medium Impact):
├─ [Action 1: ...]
└─ [Estimated time: # hours]

P3 (Backlog - Low Impact):
├─ [Action 1: ...]
└─ [Estimated time: # hours]

═══════════════════════════════════════════════════════════════

DEPENDENCIES & SEQUENCING

Fix Sequence (what depends on what):
├─ [P0-1] Must complete before [P0-2]
├─ [P1-3] Can be parallelized with [P1-4]
└─ [P0-2] Unblocks [P1-5, P1-6]

Critical Path:
├─ Start with: [P0-1]
├─ Then: [P0-2, P0-3] (parallel)
├─ Then: [P1-group]
└─ Estimated total: [# hours or days]

═══════════════════════════════════════════════════════════════

SYSTEMIC PATTERNS

Recurring Issues (same violation in multiple repos):
├─ [Pattern: Issue description]
│  └─ Affects: [Repo A, Repo B, Repo C]
├─ [Pattern: ...]
└─ [Recommendation: Fix once, cascade fix]

Root Causes:
├─ Unclear standard: [Which standard needs clarification?]
├─ Tool limitation: [Which tool should be updated?]
├─ Process gap: [Which process should be added?]
└─ Documentation gap: [What's not documented?]

═══════════════════════════════════════════════════════════════

TRENDS

Compared to Last Audit ([date]):
├─ Total violations: [↑ increased / ↓ decreased / → stable]
├─ Critical violations: [↑ ↓ →]
├─ Repos fully compliant: [Number]
└─ Overall trajectory: [Improving / Stable / Degrading]

═══════════════════════════════════════════════════════════════

RECOMMENDATIONS

Quick Wins (< 1 hour each):
├─ [Recommendation 1: What, why, estimate]
└─ [High-impact quick fixes that unblock other work]

Medium Effort (1-4 hours):
├─ [Recommendation 1: ...]
└─ [Meaningful improvements with manageable effort]

Major Initiatives (> 4 hours):
├─ [Recommendation 1: ...]
└─ [Strategic improvements for long-term health]

Monitoring Plan:
├─ Weekly: [Review P0 progress]
├─ Monthly: [Trend analysis]
├─ Quarterly: [Full audit repeat]
└─ Annually: [Standards review and updates]

═══════════════════════════════════════════════════════════════

NEXT STEPS

Immediate (This Week):
├─ Action 1: [What, owner, target date]
└─ Action 2: [...]

This Sprint:
├─ Action 1: [...]
└─ Action 2: [...]

This Quarter:
├─ Action 1: [...]
└─ Action 2: [...]

═══════════════════════════════════════════════════════════════
```

---

## Error Handling

| Error Condition | Resolution |
|---|---|
| Repo not accessible | Skip that repo in audit, note in report as unable to audit |
| Standards unclear | Note which standards need clarification, flag as TBD |
| Conflicting standards | Document conflict, recommend standards consolidation |
| Too many violations to act on | Prioritize ruthlessly; focus on P0s and systemic issues |
| Audit takes too long | Run in phases; start with critical repos, add others later |
| Violation appears in multiple repos | De-duplicate; treat as single issue affecting N repos |
| Unclear who should fix | Assign to repo owner or escalate for decision |

---

## Style Rules

- **Organization-wide:** Consolidate across repos, not repo-by-repo views
- **Priority-driven:** P0s first, then P1s, everything else is backlog
- **Dependency-aware:** Sequence fixes by what blocks what
- **Pattern-focused:** Find systemic issues and fix root causes
- **Actionable:** Every recommendation should have clear next steps
- **Transparent:** Show all findings, even if long list

---

## Related Skills

| Skill | How Used |
|---|---|
| `skill-audit-trigger` | Executes individual repo audits that are consolidated here |
| `skill-prompting-core` | Load standards context at start |
| `skill-autonomous-project-build` | Can execute P0 fixes autonomously based on audit |

---

## Related Docs

- **GLOBAL-CONTEXT.md** — Master standards source
- **autonomy-matrix.md** — Domain-specific standards
- **domains/[domain]-context.md** — Domain-specific standards
- **design-system-architecture.md** — Design system standards
- **SKILL-REGISTRY.md** — Skill standards and versioning

---

## Version

- **Created:** 2026-04-08
- **Last reviewed:** 2026-04-08
- **Next review:** 2026-07-08 (quarterly)
- **Status:** ACTIVE
