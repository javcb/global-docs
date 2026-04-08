<!-- type: explanation -->

# Skill Architecture

How skills are organized, how they depend on each other, and how they fit into the personal AI operating system.

---

## Skill Layers

```
                      ORCHESTRATION LAYER
                (chains multiple skills together)
                     project-kickoff
                standards-wide-audit
                            
                      EXECUTION LAYER
             (procedural workflows that *do* things)
       prompting-core (foundational, all others depend on this)
         ├── block-intake (design system block ingestion)
         ├── [future execution skills]
         └── [future execution skills]

                      ADVISORY LAYER
              (judgment-based assessments, *reports* only)
                   audit-trigger (evaluates repos)
                    [future advisory skills]
```

---

## Skill Types

### 1. Execution Skills (Procedural Workflows)

**What they do:** Perform step-by-step procedures. Make changes. Execute actions.

**Key trait:** Execution skills change state. They modify files, create components, reorganize structures.

**Example:** `skill-block-intake` reads Tailwind UI blocks and converts them into design-system blocks (5 phases, multiple file changes).

**Characteristics:**
- Multi-phase (typically 3-5 phases)
- Approval gates between phases
- Per-file output reporting at each phase
- Clear state changes (files before/after)
- Require user confirmation before executing changes

**Pattern:**
1. Read input
2. Report status (Phase 1)
3. Wait for approval
4. Execute change (Phase 2)
5. Verify (Phase 3)

---

### 2. Advisory Skills (Judgment-Based Assessments)

**What they do:** Evaluate something against criteria. Report findings. Recommend actions. Do NOT execute changes.

**Key trait:** Advisory skills inform decisions. They never execute the fixes they recommend.

**Example:** `skill-audit-trigger` reads a repo, checks against standards, reports violations by severity, recommends next steps (but never fixes anything).

**Characteristics:**
- Single assessment phase (no approval gates between steps)
- Severity levels: CRITICAL, HIGH, MEDIUM, LOW
- Clear recommendations but no execution
- Output: findings + recommended next steps
- Used before deciding whether to execute an execution skill

**Pattern:**
1. Read files and standards
2. Assess each item
3. Categorize violations
4. Report findings with recommendations
5. Stop (do not execute)

---

### 3. Orchestration Skills (Chaining Patterns)

**What they do:** Chain multiple skills together for end-to-end workflows.

**Key trait:** Orchestration skills sequence execution and advisory skills. They're workflow coordinators.

**Example:** `skill-project-kickoff` chains:
1. skill-prompting-core (load context)
2. skill-solution-assessment (advisory: is this a good idea?)
3. skill-doc-classifier (find relevant docs)
4. [execution skill: create SPEC]
5. [execution skill: run tests]

**Characteristics:**
- Sequence multiple skills in order
- Wait for user approval between major steps
- Each skill output → next skill input
- May include advisory (audit) + execution (change) pairs
- Example: audit first, then fix

**Pattern:**
```
Orchestration skill "project-kickoff" runs:
  1. skill-prompting-core (get context)
  2. skill-audit-trigger (assess current state)
  3. Decision: proceed or adjust?
  4. [execution skill X]
  5. [execution skill Y]
  6. skill-audit-trigger again (verify)
```

---

## Dependency Map

```
skill-prompting-core (no dependencies)
├── skill-block-intake
├── skill-audit-trigger
├── skill-project-kickoff (PLANNED)
│   ├── skill-solution-assessment (PLANNED)
│   └── skill-doc-classifier (PLANNED)
└── [future execution skills]
```

**Rules:**
- All execution skills depend on `skill-prompting-core`
- Advisory skills typically have no dependencies (can run standalone)
- Orchestration skills depend on multiple other skills
- Do not create circular dependencies (Skill A depends on Skill B depends on Skill A)

---

## How Skills Execute

### Execution Flow for a Single Skill

```
User request
    ↓
skill-prompting-core
  ├─ Read GLOBAL-CONTEXT.md
  ├─ Read domain-context.md
  ├─ Read CLAUDE.md (repo context)
  └─ Return complete context
    ↓
[Target skill executes]
  ├─ Phase 1: Read inputs
  ├─ Report status → wait for approval
  ├─ Phase 2: Execute change
  ├─ Report status → wait for approval
  └─ Phase 3: Verify → Report complete
    ↓
User reviews findings and approves next steps
```

---

## How Skills Depend on Each Other

### Example 1: Block Intake Depends on Prompting Core

1. **User starts block-intake skill:**
   ```
   "Help me ingest 5 Tailwind UI blocks into the design system."
   ```

2. **Block-intake immediately calls prompting-core:**
   - Prompting-core reads GLOBAL-CONTEXT.md
   - Reads `domains/professional-work-context.md` (inferred from "design system")
   - Reads `design-system-shadcn-tailwind/CLAUDE.md`
   - Returns complete context to block-intake

3. **Block-intake then executes:**
   - Now has confirmed context (domain, repo rules, autonomy level)
   - Proceeds with Phase 1 inventory

**Why this pattern:**
- Context must be established before any procedural execution
- Prevents wrong assumptions or wrong autonomy levels
- Ensures all three context sources (global, domain, repo) are loaded

---

### Example 2: Project Kickoff Chains Multiple Skills

User: "Help me start a new component feature."

```
project-kickoff (ORCHESTRATION)
  ├─ Step 1: skill-prompting-core
  │   └─ Load context, identify domain/repo
  │
  ├─ Step 2: skill-solution-assessment (ADVISORY)
  │   └─ Is this a good feature? Do we already have it?
  │   └─ Wait for approval: "Proceed with build?"
  │
  ├─ Step 3: skill-doc-classifier (ADVISORY)
  │   └─ Find relevant docs, patterns, examples
  │   └─ Report: "Here's what similar components look like"
  │
  ├─ Step 4: [execution skill] create SPEC
  │   └─ Write specification.md based on findings
  │
  ├─ Step 5: [execution skill] implement component
  │   └─ Create component files following patterns
  │
  ├─ Step 6: skill-audit-trigger (ADVISORY)
  │   └─ Verify implementation matches patterns
  │   └─ Report violations if any
  │
  └─ Final: "Ready for code review"
```

**Why this orchestration:**
- Assessment before implementation (don't build wrong thing)
- Research before specification (use existing patterns)
- Implementation after specification (clear requirements)
- Verification after implementation (catch issues early)

---

## Skill Versioning & Breaking Changes

### Version Format

**Major.Minor.Patch** (semantic versioning)

| Change | Version | Example | Backward Compatible? |
|---|---|---|---|
| New feature | Minor | 1.0 → 1.1 | Yes |
| Breaking change | Major | 1.0 → 2.0 | No |
| Bug fix | Patch | 1.0 → 1.0.1 | Yes |

---

### When a Skill Gets a Major Version Bump

Major bumps occur when **the skill's output format changes** in a way that breaks downstream consumers.

**Example:** skill-audit-trigger v1.0 → v2.0
- v1.0 output: Prose report (unstructured)
- v2.0 output: Violations organized by severity with line numbers (structured)
- Why it's breaking: Any automation parsing v1.0 output will fail with v2.0

**Migration path:**
- Old version stays available (v1.0 folder kept for 1 year)
- Mark v1.0 as DEPRECATED in SKILL-REGISTRY.md
- Document migration steps in SKILL-CHANGELOG.md
- Users have 1 sprint to update before v1.0 is removed

---

### When a Skill Gets a Minor Version Bump

Minor bumps occur when **new functionality is added without breaking existing output**.

**Example:** skill-block-intake v1.0 → v2.0 could have been v1.1
- If only adding decorative color handling (new feature)
- Without changing core output format
- Old automation still works with new version

---

## Skill Domain Mapping

| Domain | Execution Skills | Advisory Skills | Status |
|---|---|---|---|
| **professional-work** | block-intake | audit-trigger | PARTIAL |
| **business-ventures** | [TBD] | [TBD] | PLANNED |
| **parenting** | [TBD] | [TBD] | PLANNED |
| **volunteer** | [TBD] | [TBD] | PLANNED |
| **academic** | [TBD] | [TBD] | PLANNED |
| **personal-processes** | [TBD] | [TBD] | PLANNED |
| **advisory** | [TBD] | [TBD] | PLANNED |

**Current state:** Only professional-work (design) has execution + advisory skills. Other domains are planned.

---

## When to Use Each Skill Type

### Use an Execution Skill When:
- You want to **execute a procedure** (multi-step workflow)
- You understand the goal and want changes made
- You're ready to commit to state changes
- The procedure has clear phases with approval gates

### Use an Advisory Skill When:
- You want to **assess current state** without changing anything
- You're not sure what the next step should be
- You want recommendations before deciding
- You want a report on violations or issues

### Use an Orchestration Skill When:
- You want a **complete workflow** from start to finish
- You need assessment → decision → execution sequence
- You want multiple skills chained together
- You want the AI to manage the workflow steps

---

## Creating a New Skill

**Step 1:** Identify skill type (execution / advisory / orchestration)

**Step 2:** Check if similar skill exists
- Search SKILL-REGISTRY.md
- Check SKILL-CHANGELOG.md for deprecated versions

**Step 3:** Copy `skills/skill-template.md`

**Step 4:** Create directory structure:
```
skills/[execution|advisory|orchestration]/skill-[name]/v1.0/skill-[name].md
```

**Step 5:** Fill in template sections:
- Metadata (type, version, dependencies)
- Summary (one-sentence + one paragraph)
- Input requirements
- Execution flow (phases for execution; single assessment for advisory)
- Output format
- Error handling
- Examples
- Reference + maintenance info

**Step 6:** Add to SKILL-REGISTRY.md with:
- Skill name, file path, version, status, dependencies, domains
- One-sentence description

**Step 7:** Add to SKILL-CHANGELOG.md with:
- Version number, date, status
- What changed
- Any breaking changes

**Step 8:** Set status to IN DEVELOPMENT until reviewed

**Step 9:** Promote to ACTIVE after review

---

## Skill vs. Prompt vs. Document

**Skill (executable workflow):**
- Has phases or assessment sections
- Produces structured output
- Produces state changes (execution) or assessments (advisory)
- Tracked in SKILL-REGISTRY.md with versioning
- Has dependencies and domain mapping
- Example: skill-block-intake, skill-audit-trigger

**Prompt (one-off instruction):**
- Single request to Claude
- No phases or structured flow
- One-time use or situational
- Not versioned or indexed
- Lives in PROMPTS/ folder (pre-skill)
- Example: "Audit this repo quickly" (no phases, just report)

**Document (reference/explanation):**
- Static information
- Descriptive, not procedural
- No output format or phases
- For reading/reference, not execution
- Example: GLOBAL-CONTEXT.md, architecture docs

---

## Future Skill Roadmap

### Phase 4A (Next):
- `skill-solution-assessment` (advisory) — Is this a good idea? Do we already have it?
- `skill-doc-classifier` (advisory) — Find relevant documentation
- `skill-project-kickoff` (orchestration) — End-to-end: idea → spec → build → test

### Phase 4B:
- Domain-specific execution skills for business-ventures
- Domain-specific advisory skills for parenting
- Cross-domain audit aggregation

### Phase 4C:
- Skills for personal-processes domain
- Skills for academic domain
- Skill orchestration for complex multi-domain workflows

---

## Skill Best Practices

1. **One skill, one job:** Don't combine multiple workflows into one skill
2. **Explicit approval gates:** Pause between phases for user decision
3. **Structured output:** Use tables, lists, severity levels — not prose
4. **Clear dependencies:** Document what each phase requires
5. **Per-file reporting:** Report status for each file at each phase
6. **External references:** Link to standards, don't embed full rules
7. **Error handling:** Define recovery steps for common failures
8. **Examples:** Include 2-3 realistic examples
9. **Versioning:** Semantic versioning + deprecation policy
10. **Maintenance:** Define review cadence and update triggers

---

## Reference

- **SKILL-REGISTRY.md** — Master index of all skills
- **SKILL-CHANGELOG.md** — Version history and breaking changes
- **skill-template.md** — Template for creating new skills
- **GLOBAL-CONTEXT.md** — Operating principles and decision framework
- **autonomy-matrix.md** — Per-domain autonomy levels and pause points
