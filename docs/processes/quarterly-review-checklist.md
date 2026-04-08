<!-- type: process -->

# Quarterly Review Checklist

Lightweight quarterly review of system health, standards alignment, and skill status. Designed for 2-4 hour review cycle.

---

## Overview

Every quarter (on 4/8, 7/8, 10/8, 1/8), conduct a lightweight review of:
1. GLOBAL-CONTEXT.md (hard rules, decision framework)
2. Domain context files (9 domains)
3. Active skills (SKILL-REGISTRY.md)
4. Upstream framework tracking
5. System health indicators

This ensures the system stays aligned with actual practice, TBDs get resolved, skills stay current, and drift is caught early.

---

## Quarterly Review Timeline

| Quarter | Review Date | Focus Areas |
|---|---|---|
| Q1 (Jan-Mar) | January 8 | System reset: Hard rules, domain alignment |
| Q2 (Apr-Jun) | April 8 | Skill health: Active skills, deprecations |
| Q3 (Jul-Sep) | July 8 | Domain update: Context freshness, TBD resolution |
| Q4 (Oct-Dec) | October 8 | Year-end: Upstream tracking, annual plan |

**Time Budget:** 2-4 hours per quarter

---

## Part 1: GLOBAL-CONTEXT.md Review (30 min)

**Purpose:** Ensure hard rules, decision framework, and communication preferences still reflect reality.

### Hard Rules (5 min)
- [ ] Review all 5 hard rules
- [ ] Have any been violated? → Document incident, assess if rule needs clarification
- [ ] Do all rules still apply? → Propose updates if context changed
- [ ] Are rules being followed? → Any near-misses? → Document learning

**Hard Rules Check:**
1. Never expose credentials in docs
2. Never store sensitive data in docs
3. Never execute production changes without approval
4. Never commit to main without feature branch
5. Never take irreversible actions without confirmation

**Update if:** Rule violated, rule ineffective, context changed

### Decision Framework (5 min)
- [ ] Review decision-making approach (judgment + note assumptions)
- [ ] Are decisions being made this way? → Any issues with approach?
- [ ] Has decision-making changed in practice? → Document and propose update
- [ ] Are assumptions being documented? → Improve if not

**Update if:** Approach no longer works, assumptions not being documented, new pattern emerged

### Risk Tolerance (5 min)
- [ ] Review stated risk tolerance (avoid production surprises)
- [ ] Have production surprises occurred? → Tighten safeguards
- [ ] Has risk tolerance changed? → Document and update
- [ ] Are safeguards adequate? → Suggest improvements

**Update if:** Surprise incident occurred, tolerance shifted, safeguards inadequate

### Communication Preferences (5 min)
- [ ] Review communication style (direct, blunt, concise)
- [ ] Is communication matching style? → Address if not
- [ ] Has preference changed? → Document and update
- [ ] Are judgments being made well? → Continue or adjust?

**Update if:** Preference shifted, quality of judgment changed

### Living Document Policy (5 min)
- [ ] Review living doc concept (system is flexible, no versioning hell)
- [ ] Has system stayed flexible? → Address if becoming rigid
- [ ] Have changes been documented? → Ensure clarity maintained
- [ ] Is flexibility being abused? → Tighten if necessary

**Update if:** System becoming rigid, changes not documented, flexibility misused

---

## Part 2: Domain Context Review (45 min)

**Purpose:** Ensure domain autonomy levels, constraints, and focus areas still match reality.

### For Each of 9 Domains (5 min each):

1. **Business Ventures**
   - [ ] Autonomy levels still accurate? (advisory-only financial decisions)
   - [ ] Tools list still current? (Spreadsheets, Google Sheets, GitHub)
   - [ ] Pause points still relevant? (financial decisions, legal docs, external comms)
   - [ ] Any new ventures or changed constraints? → Update domain file

2. **Professional Work**
   - [ ] Autonomy levels still accurate? (execute-with-approval for structural)
   - [ ] Tools list still current? (GitHub, Next.js, React, TypeScript, shadcn/ui, Tailwind CSS v4, Storybook, Asana, VS Code/Cursor, Power Automate, Power BI, SharePoint, Excel)
   - [ ] Hard rules still enforced? (no hardcoded colors, TypeScript strict, all components have stories)
   - [ ] Any new tools or changed requirements? → Update domain file

3. **Business Advisory**
   - [ ] Autonomy levels still accurate? (advisory-only)
   - [ ] Contrasts with business-ventures still clear?
   - [ ] Red flags still relevant? (unclear market need, unsustainable economics, unproven model)
   - [ ] Any new patterns or blindspots? → Update domain file

4. **Marketing Advisory**
   - [ ] Autonomy levels still accurate? (advisory, low for client recommendations)
   - [ ] Messaging/positioning focus still primary?
   - [ ] Any new domains (campaign performance, media buying)? → Document or plan skills
   - [ ] Client patterns emerging? → Update domain file

5. **Finance Advisory**
   - [ ] Autonomy levels still accurate? (advisory-only)
   - [ ] [TBD — regulatory/compliance] status? → Document progress toward professional practice
   - [ ] Practice Readiness Notes still accurate? → Update as practice evolves
   - [ ] Any new financial areas covered? → Update domain file

6. **Parenting** 
   - [ ] Autonomy levels still accurate? (execute for tutoring, low autonomy for major decisions)
   - [ ] Educational focus still scope? → No behavioral management advice, no comms with schools
   - [ ] Tools/constraints accurate?
   - [ ] Any new grades or learning needs? → Update scope

7. **Volunteer**
   - [ ] Autonomy levels still accurate? (medium — propose, human approves major)
   - [ ] Operations focus still primary? (not just participation)
   - [ ] Never autonomous items still accurate? (committing time, external promises)
   - [ ] Any new volunteer roles? → Update domain file

8. **Academic**
   - [ ] Autonomy levels still accurate? (50/50 execution/advisory)
   - [ ] EMBA program context accurate? (courses, time balance, rigor)
   - [ ] Citation standards [TBD] → Document decision when made
   - [ ] Integrity paramount still enforced? → Note any close calls
   - [ ] Any new program requirements? → Update domain file

9. **Personal Processes**
   - [ ] Autonomy levels still accurate? (70% execution, 30% advisory)
   - [ ] Sensitive data defaults still right? (family, finances, health, credentials → low autonomy)
   - [ ] Any new processes added? → Document in domain file
   - [ ] Privacy constraints still accurate? → Update if changed

---

## Part 3: Active Skills Review (45 min)

**Purpose:** Ensure skills are being used, are current, and haven't stalled in development.

### Execution Skills (20 min)

For each ACTIVE execution skill:

| Skill | Status | Last Used | Issues | Action |
|---|---|---|---|---|
| skill-prompting-core | ACTIVE | — | — | [Check] |
| skill-block-intake | ACTIVE | [date] | [notes] | [Update/Deprecate/Continue] |
| skill-tutoring-framework | ACTIVE | [date] | [notes] | [Update/Deprecate/Continue] |
| skill-ms365-automation | ACTIVE | [date] | [notes] | [Update/Deprecate/Continue] |
| skill-research-synthesis | ACTIVE | [date] | [notes] | [Update/Deprecate/Continue] |
| skill-volunteer-operations | ACTIVE | [date] | [notes] | [Update/Deprecate/Continue] |
| skill-study-guide-creation | ACTIVE | [date] | [notes] | [Update/Deprecate/Continue] |
| skill-academic-writing | ACTIVE | [date] | [notes] | [Update/Deprecate/Continue] |

**Checklist for Each:**
- [ ] Was skill used in past quarter? (If not in 2 quarters → consider deprecating)
- [ ] Are there open issues or bugs? (GitHub issues tagged with skill)
- [ ] Does skill documentation match actual use? (Run skill mentally against last use case)
- [ ] Are examples still valid? (Update if context changed)
- [ ] Do dependencies still exist? (Check skill-prompting-core still referenced correctly)
- [ ] Last Reviewed date current? (Update to today)

**Action:** Continue as-is, Deprecate, or Update to v1.1 (minor)/v2.0 (breaking)

### Advisory Skills (10 min)

| Skill | Status | Last Used | Issues | Action |
|---|---|---|---|---|
| skill-audit-trigger | ACTIVE | [date] | [notes] | [Update/Deprecate/Continue] |
| skill-business-assessment | ACTIVE | [date] | [notes] | [Update/Deprecate/Continue] |
| skill-financial-assessment | ACTIVE | [date] | [notes] | [Update/Deprecate/Continue] |
| skill-marketing-audit | ACTIVE | [date] | [notes] | [Update/Deprecate/Continue] |

**Checklist for Each:**
- [ ] Was skill used in past quarter?
- [ ] Do recommendations still hold? (Test against recent decisions)
- [ ] Are red flag patterns still accurate? (Add new ones if discovered)
- [ ] Does output format match actual use? (Adjust if mismatch)
- [ ] Last Reviewed date current?

**Action:** Continue as-is, Deprecate, or Update

### Orchestration Skills (5 min)

| Skill | Status | Last Used | Issues | Action |
|---|---|---|---|---|
| skill-project-kickoff | ACTIVE | [date] | [notes] | [Update/Deprecate/Continue] |
| skill-autonomous-project-build | ACTIVE | [date] | [notes] | [Update/Deprecate/Continue] |
| skill-standards-wide-audit | ACTIVE | [date] | [notes] | [Update/Deprecate/Continue] |

**Checklist for Each:**
- [ ] Was orchestration used in past quarter?
- [ ] Did skill chaining work as expected? (Any issues with sequencing?)
- [ ] Are skill dependencies still accurate? (Check SKILL-REGISTRY.md)
- [ ] Does orchestration pattern still make sense? (Simplify or expand if needed)

**Action:** Continue as-is, Deprecate, or Update

### Skills Marked [TBD] in PLANNED (5 min)

- [ ] Are there skills marked PLANNED that should be developed? (business-ventures, parenting, others)
- [ ] Should any PLANNED skills be created this quarter? → Prioritize
- [ ] Are PLANNED skills blocking anything? → Elevate priority if so

---

## Part 4: TBD Placeholder Tracking (15 min)

**Purpose:** Resolve [TBD] placeholders; track decisions as they're made.

### TBD Resolution Status

Search codebase for `[TBD` across all files. For each:

| TBD Item | File | Status | Target Date | Owner |
|---|---|---|---|---|
| Citation standard | academic-context.md | Pending | When EMBA clarifies | Program |
| Regulatory compliance | finance-advisory-context.md | Pending | Before professional launch | JB |
| Test format | study-guide-creation.md | Pending | When used | N/A |
| Specific if important | [skill] | [status] | [date] | [owner] |

**Status Options:**
- **Pending:** No decision yet; timeline TBD
- **In Progress:** Being worked on; target date set
- **Resolved:** Decision made → replace [TBD] with decision in file
- **Deferred:** Deliberately postponed; document why and target date
- **Accepted:** Fine leaving as [TBD]; document why it's acceptable

**Update Action:**
- [ ] For each Resolved TBD: Update file with decision, remove [TBD] marker
- [ ] For each In Progress TBD: Confirm target date still valid
- [ ] For each Pending TBD: Estimate target date or move to Accepted
- [ ] Update SKILL-CHANGELOG.md with TBD resolutions made this quarter

---

## Part 5: Upstream Framework Tracking (15 min)

**Purpose:** Monitor third-party frameworks and plan adoption/updates.

### Active Upstream Sources (Check Each)

| Framework | Current Use | Last Reviewed | Next Review | Status |
|---|---|---|---|---|
| shadcn/ui | component-library depends | [date] | [date] | Active |
| Tailwind CSS | design-system token standard | [date] | [date] | Active |
| Next.js | professional-work stack | [date] | [date] | Active |
| [Other frameworks] | [How used] | [date] | [date] | [status] |

**For Each Framework:**
- [ ] Were there updates since last review? (Check releases, breaking changes)
- [ ] Should we upgrade? (Benefits vs. migration cost)
- [ ] Do our docs reference current version? (Update version numbers if outdated)
- [ ] Are there adoption opportunities? (New features we should use)
- [ ] Is this framework still right for our use? (Reconsider if not)

**Update Action:**
- [ ] Note in upstream/README.md if new versions available
- [ ] Plan any major upgrades for next quarter
- [ ] Update version references in domain files if needed
- [ ] Document breaking changes and migration paths

---

## Part 6: System Health Indicators (15 min)

**Purpose:** Get high-level health signals about system usage and effectiveness.

### Usage Metrics (Check)

- [ ] How many skills were used this quarter? [N out of M]
- [ ] Which skills were used most frequently? [List top 3]
- [ ] Which skills haven't been used in 2+ quarters? [List candidates for deprecation]
- [ ] Were new workflows/automations created? [Describe]

### Issue Tracking (Check)

- [ ] How many bugs/issues were reported? [N]
- [ ] How many were fixed? [N]
- [ ] What's outstanding? [List by priority]
- [ ] Are issues being resolved in a timely manner? [Yes/No/Mostly]

### Change Velocity (Check)

- [ ] How many skills were updated? [N]
- [ ] How many broke backward compatibility? [N breaking changes]
- [ ] How many minor improvements? [N feature additions]
- [ ] Is change velocity healthy? [Too fast/Good pace/Stagnant]

### Domain Coverage (Check)

- [ ] Which domains have full skill coverage? [List]
- [ ] Which domains still have [TBD] skills in PLANNED? [List]
- [ ] Should any PLANNED skills be prioritized? [List recommendations]

### Constraint Adherence (Check)

- [ ] Were hard rules violated? [Incidents documented?]
- [ ] Did autonomy violations occur? [Escalations executed properly?]
- [ ] Are prohibited actions being respected? [Yes/No]
- [ ] Are explicit permission gates being followed? [Yes/No]

---

## Part 7: Lessons Learned & Planning (20 min)

### What Went Well This Quarter

- [ ] 3+ things that worked well? 
  - [Success 1]
  - [Success 2]
  - [Success 3]

### What Needs Improvement

- [ ] 3+ things that could be better?
  - [Problem 1]: What would fix it?
  - [Problem 2]: What would fix it?
  - [Problem 3]: What would fix it?

### Proposals for Next Quarter

Based on learnings, propose:

- [ ] Any skills to create? [List with brief scope]
- [ ] Any skills to deprecate? [List with replacement]
- [ ] Any domain contexts to update? [List changes]
- [ ] Any hard rules to adjust? [List proposals]
- [ ] Any process improvements? [List ideas]

### Next Quarter Priorities

- [ ] Priority 1: [Item with rationale]
- [ ] Priority 2: [Item with rationale]
- [ ] Priority 3: [Item with rationale]

---

## Quarterly Review Checklist (To-Do)

- [ ] Part 1: GLOBAL-CONTEXT.md (30 min)
- [ ] Part 2: Domain Context files — all 9 domains (45 min)
- [ ] Part 3: Active Skills — Execution, Advisory, Orchestration (45 min)
- [ ] Part 4: TBD Placeholder tracking (15 min)
- [ ] Part 5: Upstream Framework tracking (15 min)
- [ ] Part 6: System Health Indicators (15 min)
- [ ] Part 7: Lessons Learned & Next Quarter Planning (20 min)

**Total Time: 2.5–3.5 hours**

---

## After Review: Documentation

Once review is complete:

1. **Update GLOBAL-CONTEXT.md:**
   - Last Reviewed: [today's date]
   - Next Review: [3 months from now]

2. **Update each domain file reviewed:**
   - Last Reviewed: [today's date]
   - Next Review: [3 months from now]

3. **Update SKILL-REGISTRY.md:**
   - Any status changes recorded
   - Dependencies updated if needed

4. **Update SKILL-CHANGELOG.md:**
   - Document any skills updated this quarter
   - Record any deprecations

5. **Update upstream/README.md:**
   - Note any new frameworks to track
   - Record version status of frameworks

6. **Create retrospective note:**
   - File: `docs/quarterly-reviews/review-YYYY-Q#.md`
   - Content: Lessons learned, priorities for next quarter, any policy changes

---

## Schedule

Set quarterly calendar reminders for review dates:
- January 8
- April 8
- July 8
- October 8

---

## Related Docs

- **GLOBAL-CONTEXT.md** — Master context being reviewed
- **autonomy-matrix.md** — Autonomy levels by domain
- **domains/[domain]-context.md** — 9 domain files being reviewed
- **SKILL-REGISTRY.md** — Skill status authority
- **SKILL-CHANGELOG.md** — Skill change history
- **docs/processes/skill-lifecycle.md** — Skill state management

---

## Last Updated

- **Created:** 2026-04-08
- **Last reviewed:** 2026-04-08
- **Next review:** 2026-07-08 (quarterly)
