<!-- type: reference -->

# Skill Changelog

Version history for all skills. Tracks breaking changes, deprecations, and migration paths.

## Format

Each skill has its own section. Within each section, versions are listed newest first.

```
## skill-name

### v[X.Y.Z] — YYYY-MM-DD

**Status:** [ACTIVE | DEPRECATED | ARCHIVED]

**Changes:**
- [What changed]
- [What changed]

**Breaking Changes:** [If any; describe impact and migration path]

**Migration:** [If upgrading from v[X-1], do this]
```

---

## skill-prompting-core

### v1.0 — 2026-04-08

**Status:** ACTIVE

**Changes:**
- Initial release
- Reads AI-INSTRUCTIONS.md
- Loads domain context from domains/ files
- Validates repo-level rule overrides
- Returns execution to current context

**Breaking Changes:** None (first version)

**Maintenance:** Review quarterly or when GLOBAL-CONTEXT.md changes

---

## skill-block-intake

### v2.0 — 2026-04-08

**Status:** ACTIVE

**Changes:**
- Migrated from prompts/block-intake.md
- Added skill metadata section
- Clarified five phases (Inventory, Token Swap, shadcn Substitution, Story File, Verify)
- Added explicit output format specification
- Added version/reviewed date tracking

**Breaking Changes:** 
- Mapping table format changed (added Context column for clarity)
- Output reporting now required per-file at each phase (previously optional)

**Migration from v1.0:**
- Ensure inventory reports include "Can fully convert?" recommendation
- Ensure phase handoffs wait for approval before proceeding
- Update any automation that parsed old output format

**Maintenance:** Review when shadcn components or Tailwind token system changes

---

## skill-audit-trigger

### v2.0 — 2026-04-08

**Status:** ACTIVE

**Changes:**
- Migrated from prompts/audit-trigger.md
- Separated into: standard repo audit + design system specific audits (token compliance, block compliance)
- Added skill metadata section
- Clarified that this is an advisory skill (reports only, does not execute)
- Added explicit severity levels for violations

**Breaking Changes:**
- Audit templates now separated by skill type (execution vs advisory)
- Output format now standardized to: [CRITICAL/HIGH/MEDIUM/LOW] violations with line numbers
- Design system audits now reference external docs (design-system-shadcn-tailwind/docs/) rather than embedding rules

**Migration from v1.0:**
- Update any automation expecting old output format
- Route design system audits to design-system-specific variant
- Use updated template with severity levels

**Maintenance:** Review quarterly; update external audit doc references when design-system repo changes

---

## Deprecation Policy

When a skill reaches end-of-life:

1. **Mark DEPRECATED in SKILL-REGISTRY.md**
2. **Create final entry in this changelog** with deprecation date
3. **Provide migration path** for any dependent workflows
4. **Keep old version folder** for historical reference for 1 year
5. **Remove from active workflows** within 1 sprint of deprecation

**Example deprecation entry:**

```
### v1.0 — DEPRECATED 2026-05-01

**Status:** DEPRECATED

**Reason:** Replaced by v2.0 with improved output format

**Migration:** See v2.0 migration section above

**End of Life:** 2027-05-01 (1 year after deprecation)
```

---

## Upstream Skill Tracking

Some skills reference external systems that evolve (libraries, frameworks, design systems). Track upstream changes here.

| Skill | Upstream System | Last Checked | Status | Notes |
|---|---|---|---|---|
| skill-block-intake | design-system-shadcn-tailwind | 2026-04-08 | SYNCED | References shadcn v1.0, Tailwind v4. |
| skill-audit-trigger | design-system audit docs | 2026-04-08 | SYNCED | References external design-system repo docs. |

**Update upstream tracking quarterly.**

---

## Last Updated

- **Created:** 2026-04-08
- **Last reviewed:** 2026-04-08
- **Next review:** 2026-07-08 (quarterly)
