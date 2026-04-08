<!-- type: reference -->

# Skill Registry

Master index of all skills. Execution skills (procedural workflows) and advisory skills (assessments) are listed separately.

## How to Use This File

- **Looking for a skill?** Search by name or domain.
- **Need to check dependencies?** See "Dependencies" column.
- **Want to know the current version?** See "Current Version" column.
- **Need to understand a breaking change?** See SKILL-CHANGELOG.md.

---

## Execution Skills (Procedural Workflows)

Execution skills perform step-by-step procedures. All other execution skills depend on `skill-prompting-core`.

| Skill Name | File Path | Current Version | Status | Dependencies | Domains | Description |
|---|---|---|---|---|---|---|
| **Prompting Core** | `skills/execution/skill-prompting-core/v1.0/prompting-core.md` | 1.0 | ACTIVE | None | All | Foundational skill. Reads AI-INSTRUCTIONS.md, loads domain context, validates rule overrides, returns to context. All other execution skills depend on this. |
| **Block Intake** | `skills/execution/skill-block-intake/v2.0/block-intake.md` | 2.0 | ACTIVE | prompting-core | professional-work (design) | Five-phase block ingestion: inventory, token swap, shadcn substitution, story file, verify. Maps hardcoded Tailwind colors to semantic tokens. |
| **Tutoring Framework** | `skills/execution/skill-tutoring-framework/v1.0/tutoring-framework.md` | 1.0 | ACTIVE | prompting-core | parenting | Educational support and scaffolding. Explains concepts, creates study guides, guides assignments. Builds understanding, not just answers. |
| **MS365 Automation** | `skills/execution/skill-ms365-automation/v1.0/ms365-automation.md` | 1.0 | ACTIVE | prompting-core | professional-work | Power Automate workflows and MS365 automation. Automates repetitive tasks using Outlook, SharePoint, Excel, Teams, Power BI. |
| **Research Synthesis** | `skills/execution/skill-research-synthesis/v1.0/research-synthesis.md` | 1.0 | ACTIVE | prompting-core | academic, business-advisory, finance-advisory | Compile and synthesize research findings. Locate sources, extract key information, organize by theme, synthesize insights. Outputs research synthesis document with bibliography. |
| **Volunteer Operations** | `skills/execution/skill-volunteer-operations/v1.0/volunteer-operations.md` | 1.0 | ACTIVE | prompting-core | volunteer | Build and maintain volunteer organization operations. Create scheduling systems, documentation, training materials, volunteer tracking, coordination processes. |
| **Study Guide Creation** | `skills/execution/skill-study-guide-creation/v1.0/study-guide-creation.md` | 1.0 | ACTIVE | prompting-core | parenting, academic | Create effective study materials for learning. Analyze course material, organize concepts, build active learning materials with definitions, examples, practice problems. |
| **Academic Writing** | `skills/execution/skill-academic-writing/v1.0/academic-writing.md` | 1.0 | ACTIVE | prompting-core | academic | Support academic writing from outline to polish. Help structure arguments, organize ideas, provide structural feedback, verify citations. Maintains academic integrity throughout. |

---

## Advisory Skills (Judgment-Based Assessments)

Advisory skills evaluate something against criteria and recommend next steps. They do not execute changes; they report findings.

| Skill Name | File Path | Current Version | Status | Dependencies | Domains | Description |
|---|---|---|---|---|---|---|
| **Audit Trigger** | `skills/advisory/skill-audit-trigger/v2.0/audit-trigger.md` | 2.0 | ACTIVE | None | All | Multi-template audit framework. Standard repo audit, design system audits (token compliance, block compliance), full system audits. |
| **Business Assessment** | `skills/advisory/skill-business-assessment/v1.0/business-assessment.md` | 1.0 | ACTIVE | prompting-core | business-ventures, business-advisory | Evaluate business opportunity, strategy, and viability. Assess market fit, competitive position, financial viability, risks, strategic alignment. Recommends GO/CAUTION/PASS. |
| **Financial Assessment** | `skills/advisory/skill-financial-assessment/v1.0/financial-assessment.md` | 1.0 | ACTIVE | prompting-core | business-ventures, finance-advisory | Evaluate financial opportunity, investment, and strategy. Assess returns, risks, costs, goal alignment, scenarios. Recommends GO/CAUTION/PASS. |
| **Marketing Audit** | `skills/advisory/skill-marketing-audit/v1.0/marketing-audit.md` | 1.0 | ACTIVE | prompting-core | marketing-advisory | Evaluate marketing strategies, campaigns, and messaging effectiveness. Assess positioning, audience fit, channel appropriateness, content quality, strategic alignment. Recommends PROCEED/CONDITIONAL/REFINE/RECONSIDER. |

---

## Orchestration Skills

Orchestration skills chain multiple skills together for end-to-end workflows.

| Skill Name | File Path | Current Version | Status | Dependencies | Domains | Description |
|---|---|---|---|---|---|---|
| **Project Kickoff** | `skills/orchestration/skill-project-kickoff/v1.0/project-kickoff.md` | 1.0 | ACTIVE | prompting-core, audit-trigger, [future: solution-assessment, doc-classifier] | All | End-to-end: idea → context → assessment → decision → specification → execution readiness → launch. |
| **Autonomous Project Build** | `skills/orchestration/skill-autonomous-project-build/v1.0/autonomous-project-build.md` | 1.0 | ACTIVE | prompting-core, project-kickoff, audit-trigger, domain-specific skills | All | Execute complete project from specification through autonomous operation. Orchestrates context, selects skills, monitors, refines, handles errors, closes out. |
| **Standards-Wide Audit** | `skills/orchestration/skill-standards-wide-audit/v1.0/standards-wide-audit.md` | 1.0 | ACTIVE | audit-trigger | All | Cross-repo orchestration: audit all standards repos, consolidate findings, produce single priority list. Dependency analysis and systemic issue identification. |

---

## Skill Versioning

**Current versioning scheme:**

- **Major version bump** (1.0 → 2.0): Breaking change. Backward-incompatible. Previous major version deprecated.
- **Minor version bump** (1.0 → 1.1): New feature. Backward-compatible.
- **Patch version bump** (1.0 → 1.0.1): Bug fix. No feature change.

**Example:**
- `skill-block-intake/v1.0/` — First version, now deprecated
- `skill-block-intake/v2.0/` — Current version, breaking changes from v1.0

See SKILL-CHANGELOG.md for all breaking changes and deprecations.

---

## Skill Status Legend

| Status | Meaning |
|---|---|
| **ACTIVE** | Production-ready. Use in workflows. |
| **IN DEVELOPMENT** | Pre-release. Expect breaking changes. |
| **DEPRECATED** | Superseded by newer version. Do not use for new work. |
| **ARCHIVED** | No longer maintained. Historical reference only. |
| **PLANNED** | Not yet created. Scheduled for future phase. |

---

## Domain Coverage

| Domain | Execution Skills | Advisory Skills | Status |
|---|---|---|---|
| business-ventures | — | business-assessment, financial-assessment | PARTIAL |
| professional-work | block-intake, ms365-automation | audit-trigger | PARTIAL |
| business-advisory | research-synthesis | business-assessment | PARTIAL |
| marketing-advisory | — | marketing-audit | PARTIAL |
| finance-advisory | research-synthesis | financial-assessment | PARTIAL |
| parenting | tutoring-framework, study-guide-creation | — | PARTIAL |
| volunteer | volunteer-operations | — | PARTIAL |
| academic | research-synthesis, study-guide-creation, academic-writing | — | PARTIAL |
| personal-processes | — | — | PLANNED |

---

## Adding a New Skill

1. Choose type: execution or advisory.
2. Follow `skills/skill-template.md` format.
3. Create folder: `skills/[execution or advisory]/skill-[name]/v1.0/`
4. Add skill file: `skill-[name].md`
5. Add to SKILL-REGISTRY.md.
6. Document in SKILL-CHANGELOG.md.
7. Set status to IN DEVELOPMENT until reviewed.
8. Promote to ACTIVE after review.

See `skills/skill-template.md` for required sections.

---

## Dependency Map

```
skill-prompting-core (no dependencies)
├── Execution Skills:
│   ├── skill-block-intake
│   ├── skill-tutoring-framework
│   ├── skill-ms365-automation
│   ├── skill-research-synthesis
│   ├── skill-volunteer-operations
│   ├── skill-study-guide-creation
│   └── skill-academic-writing
├── Advisory Skills:
│   ├── skill-audit-trigger
│   ├── skill-business-assessment
│   ├── skill-financial-assessment
│   └── skill-marketing-audit
└── Orchestration Skills:
    ├── skill-project-kickoff
    │   ├── skill-audit-trigger
    │   └── [future: skill-solution-assessment, skill-doc-classifier]
    ├── skill-autonomous-project-build
    │   ├── skill-project-kickoff
    │   ├── skill-audit-trigger
    │   └── [Domain-specific execution skills]
    └── skill-standards-wide-audit
        └── skill-audit-trigger
```

---

## Last Updated

- **Created:** 2026-04-08
- **Last reviewed:** 2026-04-08
- **Next review:** 2026-07-08 (quarterly)
