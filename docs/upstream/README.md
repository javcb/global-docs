<!-- type: reference -->

# Upstream Framework Tracking

Monitor and evaluate third-party frameworks for adoption, integration, and breaking changes.

---

## Overview

This folder tracks third-party frameworks and libraries that are either:
1. **Currently adopted** — Used in active repos and documented in domain context files
2. **Under evaluation** — Being tested or considered for adoption
3. **Deprecated** — Previously used but replaced or no longer maintained

Upstream tracking ensures we stay aware of:
- Breaking changes that require migration
- New features worth adopting
- Security updates and vulnerabilities
- Performance improvements
- Alternative frameworks to evaluate

---

## Currently Adopted Frameworks

Frameworks actively used and documented in domain context files:

### Component Library & Design
- **shadcn/ui** — Component system for professional-work
  - Current version: [Check latest]
  - Usage: Professional-work domain, component-library repo
  - Domain file: `domains/professional-work-context.md`
  - Hard rule: "all interactive elements use shadcn"
  - Last reviewed: [See quarterly-reviews/]
  - Next review: [Target date]

- **Tailwind CSS v4** — Styling engine
  - Current version: v4.x
  - Usage: design-system token standard, all repos
  - Domain file: `domains/professional-work-context.md`
  - Hard rule: "never hardcoded colors in design system"
  - Last reviewed: [See quarterly-reviews/]
  - Next review: [Target date]

### Development Stack
- **Next.js** — React meta-framework
  - Current version: [Check latest]
  - Usage: professional-work domain web applications
  - Domain file: `domains/professional-work-context.md`
  - Last reviewed: [See quarterly-reviews/]
  - Next review: [Target date]

- **React** — UI library
  - Current version: [Check latest]
  - Usage: professional-work domain
  - Domain file: `domains/professional-work-context.md`
  - Last reviewed: [See quarterly-reviews/]
  - Next review: [Target date]

- **TypeScript** — Language
  - Current version: strict mode required
  - Usage: all code repos
  - Domain file: `domains/professional-work-context.md`
  - Hard rule: "TypeScript strict mode"
  - Last reviewed: [See quarterly-reviews/]
  - Next review: [Target date]

### Documentation & Testing
- **Storybook** — Component documentation and testing
  - Current version: [Check latest]
  - Usage: professional-work domain, component-library
  - Domain file: `domains/professional-work-context.md`
  - Hard rule: "all components must have Storybook stories"
  - Last reviewed: [See quarterly-reviews/]
  - Next review: [Target date]

### Automation & Integration
- **Power Automate** — Workflow automation
  - Current version: Cloud-based (always latest)
  - Usage: professional-work domain automation
  - Domain file: `domains/professional-work-context.md`
  - Last reviewed: [See quarterly-reviews/]
  - Next review: [Target date]

---

## Framework Evaluation Status

Frameworks being tested or considered:

| Framework | Purpose | Status | Last Evaluated | Decision | Notes |
|---|---|---|---|---|---|
| [Framework name] | [What for?] | TESTING/CONSIDERING | YYYY-MM-DD | [ADOPT/REJECT/DEFER] | [Context] |

---

## Deprecation Policy

When a framework is no longer used:

1. **Mark as deprecated** in this README
2. **Update domain files** to remove references
3. **Create migration guide** if other repos still use it
4. **Set sunset date** (1-year grace period for migration)
5. **Archive framework** in this folder after sunset

### Deprecated Frameworks

| Framework | Reason | Replacement | Sunset Date | Status |
|---|---|---|---|---|
| [Name] | [Why deprecated?] | [Replacement if any] | YYYY-MM-DD | DEPRECATED |

---

## How to Add a Framework

When evaluating a new framework:

1. **Create framework folder** in `upstream/[framework-name]/`
2. **Add tracking file** `upstream/[framework-name]/README.md` with:
   - Framework description and URL
   - Current version
   - Why evaluating (use case, problem solved)
   - Evaluation criteria (feature requirements, compatibility, ecosystem)
   - Pros and cons
   - Comparison to alternatives
   - Recommendation (ADOPT / REJECT / DEFER)
   - Review date and next review target

3. **Update this README:**
   - Add to "Framework Evaluation Status" table
   - Set status to TESTING or CONSIDERING
   - Link to framework folder

4. **Document decision:**
   - If ADOPT: Update domain context file, add to "Currently Adopted"
   - If REJECT: Add notes to recommendation, leave in evaluation table marked REJECTED
   - If DEFER: Set next review date, leave in evaluation table

5. **Quarterly review:**
   - Check for new versions monthly
   - Assess breaking changes quarterly
   - Track adoption progress if TESTING

---

## Breaking Change Tracking

### Template for Breaking Changes

When a framework releases a breaking change:

1. **Create breaking-change file** in framework folder:
   ```
   upstream/[framework-name]/breaking-change-[version].md
   ```

2. **Document the change:**
   ```
   # [Framework] v[X].0 Breaking Changes

   ## What Changed
   [Description of what changed]

   ## Why This Matters
   [What breaks, what needs updating]

   ## Migration Path
   [Steps to migrate]

   ## Repos Affected
   [List repos currently using old version]

   ## Timeline
   - Old version EOL: [Date]
   - Migration deadline: [Target date]
   - Status: [Not started / In progress / Complete]
   ```

3. **Update domain context:**
   - Note version change
   - Link to migration guide
   - Update any hard rules that affected

4. **Plan migration:**
   - Prioritize by impact and urgency
   - Create tasks in project repos
   - Track completion

---

## Version Pinning Strategy

### Professional-Work Domain

**Development Dependencies:**
- Allow minor updates (e.g., 4.0.x → 4.1.0)
- Pin major versions (requires decision to upgrade)
- Document version in domain context file

**Production Dependencies:**
- Patch updates automated (e.g., 4.0.0 → 4.0.1)
- Minor updates reviewed before applying
- Major updates require explicit decision and migration guide

**Policy:**
- Check for updates quarterly in quarterly-review-checklist.md
- Evaluate breaking changes before upgrading
- Plan major version upgrades, don't apply automatically
- Document version numbers in domain context files

---

## Evaluation Criteria

When evaluating frameworks, assess:

### Functional Requirements
- [ ] Does it solve the problem?
- [ ] Does it have required features?
- [ ] Is the feature set stable or changing rapidly?
- [ ] How mature is the project?

### Integration & Compatibility
- [ ] Compatible with current stack?
- [ ] Works with other frameworks we use?
- [ ] Easy to integrate?
- [ ] Conflicts with existing choices?

### Community & Maintenance
- [ ] Active community?
- [ ] Regular maintenance?
- [ ] Good documentation?
- [ ] Stack Overflow, GitHub discussions?
- [ ] Company backing or sustained by volunteers?

### Performance & Bundle Size
- [ ] Runtime performance acceptable?
- [ ] Bundle size reasonable?
- [ ] Tree-shakeable?
- [ ] Any performance impact on other parts?

### Alternatives & Comparison
- [ ] What are alternatives?
- [ ] How does this compare?
- [ ] Why choose this over alternatives?
- [ ] Why not stick with current approach?

### Effort & Cost
- [ ] How hard is adoption?
- [ ] Migration effort if switching?
- [ ] Learning curve?
- [ ] Maintenance burden?

### Long-Term Viability
- [ ] Will it be maintained in 5 years?
- [ ] Any risk of abandonment?
- [ ] Backup options if needed?
- [ ] Can we fork/maintain ourselves if needed?

---

## Quarterly Review Process

Every quarter (dates: Jan 8, Apr 8, Jul 8, Oct 8):

1. **Check for new versions** of adopted frameworks
   - Visit framework home page / releases page
   - Note new versions available
   - Check release notes for breaking changes

2. **Evaluate if upgrade is needed**
   - Is it a patch update? (safe, can apply)
   - Is it a minor update? (review, likely safe)
   - Is it a major update? (plan migration)

3. **Document findings**
   - Update this README with new version info
   - Create breaking-change file if major version
   - Note in quarterly review document

4. **Schedule upgrades**
   - Patch updates: apply when tested
   - Minor updates: schedule if features useful
   - Major updates: plan migration, set timeline

5. **Track progress**
   - Note version currently deployed
   - Track migration progress if upgrading
   - Update domain context files with new versions

---

## Related Docs

- **GLOBAL-CONTEXT.md** — Overall system context and rules
- **domains/professional-work-context.md** — Current development stack
- **docs/processes/quarterly-review-checklist.md** — When to review frameworks
- **skills/SKILL-REGISTRY.md** — Skills might depend on frameworks
- **design-system-architecture.md** — Design system standards

---

## Last Updated

- **Created:** 2026-04-08
- **Last reviewed:** 2026-04-08
- **Next review:** 2026-07-08 (quarterly)
