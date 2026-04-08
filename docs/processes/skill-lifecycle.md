<!-- type: process -->

# Skill Lifecycle Management

Manage skill state transitions, track changes, and maintain SKILL-REGISTRY.md as single source of truth.

---

## Overview

Skills move through clearly defined lifecycle states from concept to archival. This process ensures skills remain reliable, version information stays current, breaking changes are documented, and the registry reflects reality.

---

## Skill Lifecycle States

```
IN DEVELOPMENT
    ↓
ACTIVE ← (continuous use)
    ├→ DEPRECATED
    │   ↓
    │ ARCHIVED
    │
    └→ [Stays ACTIVE indefinitely if maintained]
```

---

## State Definitions

| State | Meaning | Action Required | Duration |
|---|---|---|---|
| **IN DEVELOPMENT** | Pre-release; expect breaking changes; test before use | Ongoing development; not in production workflows | Until review approval |
| **ACTIVE** | Production-ready; use in workflows; maintained | Quarterly review; update on use; report bugs | Indefinite (with maintenance) |
| **DEPRECATED** | Superseded by newer version; do not use for new work | Migration path documented; old version usable for 1 year | 1 year (then ARCHIVED) |
| **ARCHIVED** | No longer maintained; historical reference only | Do not use; reference only for historical context | Indefinite (no maintenance) |
| **PLANNED** | Future; not yet created; scheduled for development | Track in SKILL-REGISTRY.md; update status when development begins | Until development starts |

---

## State Transitions

### IN DEVELOPMENT → ACTIVE

**Trigger:** Skill review approval

**Requirements:**
- Skill file complete and tested
- All sections filled (no skeleton sections)
- Examples included and viable
- Error handling documented
- Version set to 1.0
- SKILL-CHANGELOG.md entry created

**Process:**
1. Skill author requests review (create GitHub issue, link skill file)
2. Reviewer runs skill through test scenarios (real or hypothetical)
3. Reviewer checks completeness (all sections, examples viable, clarity)
4. Reviewer approves or requests changes
5. On approval:
   - Update SKILL-REGISTRY.md: Status = ACTIVE
   - Create/update SKILL-CHANGELOG.md entry
   - Merge to main
   - Add to domain workflows in domains/[domain]-context.md

**Update SKILL-REGISTRY.md:**
```
| **Skill Name** | `path/skill-name/v1.0/` | 1.0 | ACTIVE | dependencies | domains | description |
```

---

### ACTIVE → DEPRECATED (Superseded)

**Trigger:** New version with breaking changes, or skill being retired

**Requirements:**
- Replacement skill identified (if applicable)
- Migration path documented
- Current users identified and notified

**Process:**
1. New major version (2.0) released with breaking changes, OR decision made to retire skill
2. Update SKILL-CHANGELOG.md:
   - Mark old version DEPRECATED
   - Document migration path
   - Link to replacement skill (if any)
3. Update SKILL-REGISTRY.md:
   - Status = DEPRECATED
   - Keep file path but note deprecation in description
   - Reference SKILL-CHANGELOG.md for migration details
4. Notify users (GitHub issues in projects using the skill)
5. Remove from active workflow documentation
6. Keep skill file and v1.0/ folder intact for reference

**Update SKILL-REGISTRY.md:**
```
| **Old Skill Name** [DEPRECATED] | `path/skill-name/v1.0/` | 1.0 | DEPRECATED | dependencies | domains | DEPRECATED: Use skill-new-name instead. Migration path in SKILL-CHANGELOG.md |
```

**Mark in Skill Changelog:**
```
### skill-name v1.0 — DEPRECATED

Reason: Superseded by skill-new-name v2.0
Migration Path: See skill-new-name v2.0 input/output requirements
Retire Date: [1 year from deprecation date]
```

---

### DEPRECATED → ARCHIVED

**Trigger:** 1-year deprecation period expired

**Requirements:**
- Users have migrated to replacement skill
- Last active use confirmed
- Historical archival location decided

**Process:**
1. 1-year mark from deprecation date approaches
2. Verify no active uses of deprecated skill
3. Update SKILL-REGISTRY.md:
   - Status = ARCHIVED
   - Move to separate "Archived Skills" section (at bottom)
   - Note archive date and migration details
4. Update SKILL-CHANGELOG.md:
   - Mark as ARCHIVED [date]
5. Optionally move skill file to `skills/archived/` folder for organization
6. Skill is historical reference only; not used in workflows

**Update SKILL-REGISTRY.md:**
```
### Archived Skills (Historical Reference Only)

| **Old Skill Name** | `skills/archived/skill-name/v1.0/` | 1.0 | ARCHIVED | — | — | ARCHIVED 2026-04-08. Use skill-new-name instead. |
```

---

### ACTIVE → ACTIVE (Maintenance & Updates)

**Trigger:** Quarterly review, bug fix, feature addition, minor version bump

**Requirements:**
- Bug is confirmed or feature is clearly defined
- Update doesn't break backward compatibility (or is bug fix)
- Testing completed
- SKILL-CHANGELOG.md updated

**Process:**

#### Bug Fix (Patch Version: 1.0 → 1.0.1)
1. Identify bug in current skill
2. Fix bug in skill file
3. Test fix
4. Update SKILL-CHANGELOG.md:
   ```
   ### v1.0.1 (Bug Fix)
   - [Bug description]: [Fix]
   - Backward compatible: Yes
   ```
5. Update SKILL-REGISTRY.md:
   - Current Version = 1.0.1
   - No status change
6. Merge to main
7. Notify users if critical bug

#### Feature Addition (Minor Version: 1.0 → 1.1)
1. Identify feature to add
2. Add to skill file (Phase section, new capability)
3. Test new feature
4. Update SKILL-CHANGELOG.md:
   ```
   ### v1.1 (Feature Addition)
   - [New feature description]
   - Backward compatible: Yes
   - New section/phase: [description]
   ```
5. Update SKILL-REGISTRY.md:
   - Current Version = 1.1
   - Dependencies (if new skill dependency added)
   - Description (if capability changed)
6. Merge to main
7. Notify users of new capability

#### Breaking Change (Major Version: 1.0 → 2.0)
1. Identify breaking change needed
2. Create v2.0/ subfolder alongside v1.0/
3. Write new skill file with changes
4. Update SKILL-CHANGELOG.md:
   ```
   ### v2.0 (Breaking Change)
   - [What changed and why]
   - Migration path from v1.0: [steps to migrate]
   - v1.0 deprecated effective: [date]
   - v1.0 retired: [date 1 year later]
   ```
5. Update SKILL-REGISTRY.md:
   - File Path = `/v2.0/`
   - Current Version = 2.0
   - Status = ACTIVE (new version)
   - Consider deprecating v1.0 entry
6. Merge to main
7. Notify users of breaking change and migration path

---

## Quarterly Review

**Trigger:** End of quarter (quarterly schedule)

**Process:**

Every skill marked ACTIVE should have a lightweight quarterly review:

1. **Is the skill still being used?**
   - Check project logs for usage
   - If not used in 2 quarters, consider deprecating

2. **Are there outstanding issues or bugs?**
   - Check GitHub issues tagged with skill name
   - Prioritize bug fixes or clarifications needed

3. **Does the skill need updating?**
   - Check if domain standards have changed
   - Check if dependencies have changed
   - Check if examples are still valid

4. **Update metadata:**
   - Last Reviewed: [today's date]
   - Next Review: [3 months from now]

5. **Create minor update if needed:**
   - Clarifications, examples, error handling improvements
   - Bump to v1.1 if substantial improvements
   - Bump to v2.0 if breaking changes needed

6. **Mark status:**
   - ACTIVE (continue using)
   - DEPRECATED (superseded)
   - IN DEVELOPMENT (major revisions needed)

**Update in Skill File:**
```
- **Last Reviewed:** YYYY-MM-DD
- **Next Review:** YYYY-MM-DD
```

---

## TBD Placeholder Tracking

**Process:** Track all [TBD] placeholders and move them to resolution or accepted list

For each skill:
1. Search for `[TBD` in skill file
2. For each TBD:
   - Has decision been made? → Replace with decision
   - Will decision be made? → Keep TBD, note target date in comment
   - Is this acceptable as TBD? → Document why in domain/GLOBAL-CONTEXT
3. Update SKILL-CHANGELOG.md:
   ```
   ### TBD Resolution
   - [TBD item]: [Resolved to X / Deferred to Y / Accepted as TBD]
   ```

---

## SKILL-REGISTRY.md Maintenance

**Single Source of Truth:** SKILL-REGISTRY.md is the authoritative list of all skills and their status.

### Update SKILL-REGISTRY.md When:
1. Skill transitions state (IN DEV → ACTIVE, ACTIVE → DEPRECATED, etc.)
2. Skill version changes (1.0 → 1.1 → 2.0)
3. Skill dependencies change
4. Skill name changes
5. Skill file path changes
6. Skill status becomes ARCHIVED

### Do NOT Update SKILL-REGISTRY.md For:
- Typo fixes in skill file (fix in file, no registry update)
- Example clarifications (fix in file, no registry update)
- Minor phrasing changes (fix in file, no registry update)

### Update Process:
1. Make change in skill file
2. Create/update SKILL-CHANGELOG.md entry
3. Update SKILL-REGISTRY.md (table and/or dependency map)
4. Commit together with message: "Update [skill-name] to v[version], status [STATUS]"
5. If state transition, add comment in SKILL-CHANGELOG.md explaining why

---

## Checklist for New Skills (IN DEVELOPMENT → ACTIVE)

When promoting a skill from IN DEVELOPMENT to ACTIVE:

- [ ] All required sections completed (Metadata, Summary, When to Use, Inputs, Execution Flow, Output Format, Error Handling, Examples/Related)
- [ ] No [TBD] placeholders (or all TBDs are documented with reason)
- [ ] Examples are viable and tested (or clearly hypothetical)
- [ ] Error handling covers likely failure modes
- [ ] Dependencies listed in Metadata and SKILL-REGISTRY.md
- [ ] Skill follows template structure (skills/skill-template.md)
- [ ] Version set to 1.0 in Metadata
- [ ] Created in versioned folder: `skills/[type]/skill-[name]/v1.0/`
- [ ] Added to SKILL-REGISTRY.md with complete row
- [ ] Changelog entry created in SKILL-CHANGELOG.md
- [ ] Domain coverage updated (if applicable)
- [ ] Related skills documented

---

## Checklist for Deprecating Skills

When deprecating a skill (ACTIVE → DEPRECATED):

- [ ] Replacement skill identified and documented
- [ ] Migration path documented in SKILL-CHANGELOG.md
- [ ] Users identified and notified
- [ ] 1-year deprecation period defined
- [ ] Skill status updated to DEPRECATED in SKILL-REGISTRY.md
- [ ] Removed from active workflow documentation
- [ ] Skill file kept for reference (not deleted)
- [ ] Retirement date set in SKILL-CHANGELOG.md

---

## Checklist for Archiving Skills

When archiving a skill (DEPRECATED → ARCHIVED):

- [ ] 1-year deprecation period has passed
- [ ] No active uses confirmed
- [ ] Status updated to ARCHIVED in SKILL-REGISTRY.md
- [ ] Moved to "Archived Skills" section of registry
- [ ] Optionally moved to `skills/archived/` folder
- [ ] SKILL-CHANGELOG.md marked with archive date
- [ ] Skill is reference-only (no active workflows)

---

## Version Numbering Rules

**Format:** `major.minor.patch` (e.g., 1.0.0, 1.2, 2.0)

| Change Type | Examples | Version Bump |
|---|---|---|
| **Patch** | Bug fix, error correction, minor clarity | 1.0 → 1.0.1 |
| **Minor** | Feature addition, new phase/capability, backward-compatible improvements | 1.0 → 1.1 |
| **Major** | Breaking change, input/output format change, workflow restructure | 1.0 → 2.0 |

**Breaking Changes Require:**
- New major version (2.0, not 1.x)
- New v2.0/ folder alongside v1.0/
- Explicit migration path documented
- DEPRECATED status for v1.0
- User notification

---

## Related Docs

- **SKILL-REGISTRY.md** — Master skill list (authority for skill status, version, dependencies)
- **SKILL-CHANGELOG.md** — Change history for all skills (what changed, why, migration paths)
- **skills/skill-template.md** — Template for creating new skills
- **GLOBAL-CONTEXT.md** — Hard rules that affect skill creation/updates

---

## Last Updated

- **Created:** 2026-04-08
- **Last reviewed:** 2026-04-08
- **Next review:** 2026-07-08 (quarterly)
