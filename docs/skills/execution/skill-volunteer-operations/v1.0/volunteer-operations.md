<!-- type: skill-execution -->

# Skill: Volunteer Operations

Manage volunteer organization operations. Handles scheduling, documentation, training, coordination, and operational systems for volunteer-led organizations.

---

## Metadata

| Attribute | Value |
|---|---|
| **Skill ID** | `skill-volunteer-operations` |
| **Type** | execution (procedural workflow) |
| **Version** | 1.0 |
| **Status** | ACTIVE |
| **Created** | 2026-04-08 |
| **Last Reviewed** | 2026-04-08 |
| **Dependencies** | skill-prompting-core |
| **Domains** | volunteer |

---

## Summary

**Build and maintain volunteer organization operations.**

Creates scheduling systems, operational documentation, training materials, volunteer tracking, and coordination processes. Enables smooth operation of volunteer-led initiatives.

---

## When to Use This Skill

- **Use this skill when:** Setting up or improving volunteer organization operations
- **Do NOT use this skill when:** Making decisions about organization strategy or time commitments
- **Prerequisite state:** You've decided to run a volunteer organization; need operational systems

---

## Input Requirements

### Required Inputs
- **Organization or program name:** What are you organizing?
- **Operational area:** Scheduling, documentation, training, tracking, coordination?

### Optional Inputs
- **Current process:** How is this being done now (if at all)?
- **Constraints:** Budget, tools available, volunteer availability?
- **Scale:** How many volunteers, how often do they meet?

### Assumptions
- Operational decisions are yours; I'm building systems
- You have basic tools available (spreadsheets, docs, calendar)
- Volunteers are reliable enough for automated systems

---

## Execution Flow

### Phase 1: Assess Operational Need

**Goal:** Understand what operational system is needed.

1. You provide: organization + operational need
2. I assess:
   - What currently exists?
   - What's breaking or missing?
   - What's the scale/complexity?
3. Confirm scope: "I'll build [system] for [purpose]. Correct?"

**Output:** Clear operational scope

**Approval Gate:** None (clarification)

---

### Phase 2: Design System

**Goal:** Plan the operational system before building.

1. Assess requirements:
   - Who uses it? (volunteers, coordinators, you)
   - What data/information is needed?
   - What decisions does it inform?
   - How frequently is it used?

2. Design structure:
   - Data model: what information is tracked?
   - Workflow: how does it work step-by-step?
   - Roles: who does what?
   - Tools: spreadsheet, doc, calendar, other?

3. Plan for maintenance:
   - How will you keep it updated?
   - Who's responsible for maintenance?
   - How often does it need review?

**Output:** System design

**Approval Gate:** SOFT (review design: "Does this work for you?")

---

### Phase 3: Build System Components

**Goal:** Create the actual operational systems.

1. Build components:
   - Scheduling: volunteer availability and assignments
   - Tracking: volunteer hours, tasks, attendance
   - Documentation: procedures, checklists, guidelines
   - Training: materials for new volunteers
   - Communication: templates, coordination tools

2. Create templates:
   - Forms and checklists
   - Communication templates
   - Tracking sheets
   - Documentation guides

3. Set up structure:
   - Folder organization
   - File naming conventions
   - Access and permissions
   - Update processes

**Output:** Operational systems ready to use

**Approval Gate:** SOFT (test systems: "Are they usable?")

---

### Phase 4: Create Operations Guide

**Goal:** Document how the systems work.

1. Write operations guide:
   - How to use each system
   - Who's responsible for what
   - How to handle common scenarios
   - Troubleshooting guide

2. Create checklists:
   - New volunteer onboarding
   - Weekly/monthly routine
   - Emergency procedures
   - Review and maintenance

3. Document processes:
   - Volunteer communication
   - Schedule management
   - Conflict resolution
   - Problem escalation

**Output:** Operations guide and checklists

**Approval Gate:** None (documentation)

---

### Phase 5: Train and Launch

**Goal:** Get systems into active use.

1. Test with volunteers:
   - Do volunteers understand the systems?
   - What's confusing or broken?
   - What needs adjustment?

2. Refine based on feedback:
   - Simplify confusing parts
   - Add missing elements
   - Adjust based on reality

3. Launch operationally:
   - Move to live use
   - Monitor for issues
   - Be ready to support

**Output:** Live operational systems

**Approval Gate:** None (systems operational)

---

## Common Operational Systems

### Scheduling System
- Volunteer availability tracking
- Task/shift assignments
- Calendar view of who's doing what
- Conflict detection

### Volunteer Tracking
- Volunteer hours logged
- Tasks completed tracked
- Attendance records
- Performance/reliability notes

### Communication System
- Volunteer notification templates
- Escalation procedures
- Announcement distribution
- Feedback collection

### Documentation System
- Organization procedures
- Role descriptions
- Checklists for tasks
- Emergency contacts and protocols

### Training System
- New volunteer orientation
- Role-specific training
- Skills certification (if applicable)
- Ongoing education

---

## Output Format

**Operational Systems Package:**

```
VOLUNTEER OPERATIONS SYSTEM — [Organization]

═══════════════════════════════════════════════════════════════

OVERVIEW
Organization: [Name]
Purpose: [What you do]
Volunteers: [Approximate number]
Frequency: [How often they meet/work]

═══════════════════════════════════════════════════════════════

SCHEDULING SYSTEM

Tool: [Spreadsheet/Calendar/Other]
Location: [Where to access]

Volunteer availability:
├─ How tracked: [Method]
└─ Who updates: [Responsible person]

Task assignments:
├─ How assigned: [Process]
├─ Communication: [How volunteers are told]
└─ Confirmation: [How you confirm they'll be there]

═══════════════════════════════════════════════════════════════

TRACKING SYSTEM

Volunteer hours:
├─ Tracked in: [Location]
├─ How logged: [Process]
└─ Who logs: [Volunteer or coordinator]

Tasks/attendance:
├─ Tracked in: [Location]
└─ Updated: [When/how]

═══════════════════════════════════════════════════════════════

COMMUNICATION SYSTEM

Regular updates:
├─ Frequency: [How often]
├─ Method: [Email/Text/Other]
└─ Template: [What's included]

Emergency communication:
├─ Contact method: [How to reach]
└─ Escalation: [If immediate response needed]

═══════════════════════════════════════════════════════════════

NEW VOLUNTEER ONBOARDING

Checklist:
├─ Step 1: [What happens first]
├─ Step 2: [What's next]
└─ Step N: [Final step]

Training materials: [Location]

═══════════════════════════════════════════════════════════════

ROLES & RESPONSIBILITIES

Coordinator role: [What they do]
Volunteer role: [What they do]
Your role: [What you handle]

═══════════════════════════════════════════════════════════════
```

---

## Style Rules

- **Keep it simple:** Systems should be easy to understand and use
- **Document everything:** Procedures should be clear
- **Automate where possible:** Reduce manual work
- **Plan for handoff:** Systems should work even if you're not there
- **Regular review:** Build in quarterly check-ins

---

## Error Handling

| Error Condition | Resolution |
|---|---|
| Volunteer doesn't show up | Have backup plan. Log absence. Follow up to understand. |
| System isn't being used | Make it simpler or more essential. Get buy-in from volunteers. |
| Volunteer misunderstands role | Improve documentation. Add training. Be explicit about expectations. |
| Communication breaking down | Use multiple channels. Confirm receipt. Send reminders. |
| Scaling issues | Add more volunteers to coordination. Split responsibilities. Create deputy roles. |

---

## Related Skills

| Skill | How Used |
|---|---|
| `skill-prompting-core` | Load volunteer context |
| [future: volunteer-recruitment] | Recruiting volunteers to organization |
| [future: fundraising-strategy] | Fundraising for volunteer operations |

---

## Related Docs

- **domains/volunteer-context.md** — Volunteer operations standards and autonomy

---

## Version

- **Created:** 2026-04-08
- **Last reviewed:** 2026-04-08
- **Next review:** 2026-07-08 (quarterly)
- **Status:** ACTIVE
