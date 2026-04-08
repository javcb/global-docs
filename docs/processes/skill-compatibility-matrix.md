<!-- type: reference -->

# Skill Compatibility Matrix

Which skill outputs feed which skill inputs. Maps data flow through orchestration chains. Shows where compatibility issues may arise.

---

## Overview

When orchestrating skills (chaining them together), outputs from one skill must be compatible with inputs of the next skill.

This matrix shows:
- **Skill A Output:** What data Skill A produces
- **Skill B Input:** What data Skill B requires
- **Compatible?** Yes / No / Partial (needs transformation)
- **Notes:** Any special handling needed

---

## Orchestration Chain: Project Kickoff → Autonomous Project Build → Audit Trigger

### Chain Overview

```
skill-project-kickoff
  ↓ outputs: PROJECT KICKOFF REPORT
  ↓
skill-autonomous-project-build
  ↓ outputs: AUTONOMOUS PROJECT BUILD REPORT
  ↓
skill-audit-trigger (optional)
  ↓ outputs: AUDIT REPORT
```

---

## skill-project-kickoff → skill-autonomous-project-build

### Compatibility Check

| Field | Kickoff Output | Build Input | Compatible | Notes |
|---|---|---|---|---|
| **Project Name** | Included in SPEC | Required: `project_name` | ✅ Yes | Direct mapping |
| **Specification** | Complete SPEC section | Required: `specification` (SPEC) | ✅ Yes | Build requires validated SPEC |
| **Objectives** | Listed in SPEC | Required for execution | ✅ Yes | Build uses to verify success |
| **Constraints** | Listed in SPEC | Required for enforcement | ✅ Yes | Build enforces during execution |
| **Success Criteria** | Defined in SPEC | Required for monitoring | ✅ Yes | Build uses to check progress |
| **Readiness Assessment** | Included in report | Required: readiness confirmed | ✅ Yes | Build requires readiness = true |
| **Domain** | Identified in context | Required for autonomy checking | ✅ Yes | Build loads domain constraints |
| **TBDs** | Listed (resolved or accepted) | Required: TBDs resolved or accepted | ✅ Yes | Build cannot proceed with unresolved TBDs |
| **Risk Assessment** | Included in report | Informs monitoring strategy | ✅ Yes | Build adjusts monitoring based on risks |
| **Assumptions** | Documented in Assumptions section | Used for execution decisions | ✅ Yes | Build validates assumptions still hold |

### Transformation Needed

✅ **No transformation needed.** Kickoff output format matches Build input requirements directly.

**Build Input Processing:**
```
Kickoff Report
├─ SPEC → Project specification
├─ Readiness → Confirm execution allowed
├─ Domain → Load autonomy constraints
├─ TBDs → Verify all resolved/accepted
├─ Assumptions → Validate still current
└─ → PROCEED with execution
```

---

## skill-autonomous-project-build → skill-audit-trigger (Optional)

### Compatibility Check

| Field | Build Output | Audit Input | Compatible | Notes |
|---|---|---|---|---|
| **Project Name** | Included in report | Optional context | ✅ Yes | Helps scope audit |
| **Execution Summary** | What skills ran | Optional: background | ✅ Yes | Context for audit |
| **Phase Results** | What was completed | Optional: what to audit | ⚠️ Partial | Audit needs specific repo/files to audit |
| **Deliverables Package** | Built artifacts | Audit target (optional) | ⚠️ Partial | Audit-trigger expects repo path, not artifact list |
| **Issues/Escalations** | Documented problems | Can be audit scope | ✅ Yes | Audit can check these areas |
| **Success Criteria Status** | What was met/not met | Audit can verify | ✅ Yes | Audit can validate success criteria |

### Transformation Needed

⚠️ **PARTIAL:** If audit-trigger needs to verify project outputs, need to map artifacts to audit targets.

**Mapping Required:**
```
Build Output (artifacts/deliverables)
  ↓
Map to audit targets: "which repo/files contain these artifacts?"
  ↓
Audit-trigger input: "audit these files for compliance"
```

**Example:**
```
Build Output: Deployed code to main branch
Needed by Audit: Repository path to audit
Mapping: main branch files in [repo-name]
  ↓
Audit-trigger: "Audit [repo-name]/main for code quality"
```

---

## skill-prompting-core → All Other Skills

### Compatibility Check

| Skill | Accepts prompting-core output? | Input Type | Compatible |
|---|---|---|---|
| **All Execution Skills** | Yes (required dependency) | Global context, domain context, repo context, assumptions | ✅ Yes |
| **All Advisory Skills** | Yes (required dependency) | Global context, domain context, repo context, assumptions | ✅ Yes |
| **All Orchestration Skills** | Yes (required dependency) | Global context, domain context, repo context, assumptions | ✅ Yes |

**Output Format:**
```
GLOBAL CONTEXT
├─ Identity
├─ Hard Rules
├─ Tools & Systems
├─ Decision Framework
├─ Risk Tolerance
└─ Communication Preferences

DOMAIN
├─ Domain name
├─ Autonomy levels
├─ Constraints
└─ Context-specific rules

REPO CONTEXT
├─ Local Claude.md if present
├─ Repository-specific rules
└─ Local constraints

ASSUMPTIONS
└─ Any uncertainties noted

STATUS
└─ Ready to proceed / Blocking issues
```

**All skills accept this format as foundation input.** ✅ Compatible across all skills.

---

## Research & Academic Execution Chain

### skill-research-synthesis → skill-academic-writing

| Field | Synthesis Output | Writing Input | Compatible | Notes |
|---|---|---|---|---|
| **Research Question** | Included | Used to verify alignment | ✅ Yes | Writing should answer research question |
| **Sources/Bibliography** | Complete bibliography | Required for citations | ✅ Yes | Writing uses for proper attribution |
| **Key Findings** | Organized by theme | Input for paper structure | ✅ Yes | Findings become supporting evidence |
| **Areas of Agreement** | Documented consensus | Can shape thesis | ✅ Yes | Helps develop defendable thesis |
| **Areas of Debate** | Alternative positions | Can inform counterargument section | ✅ Yes | Debate section → counterargument in paper |
| **Research Gaps** | Identified unknowns | Can be addressed in writing | ✅ Yes | Gaps can be explicitly acknowledged |

### Transformation Needed

✅ **No transformation.** Output maps directly to paper components.

**Mapping:**
```
Synthesis Output → Academic Writing Input
├─ Findings by Theme → Supporting evidence for thesis
├─ Bibliography → Citation source list
├─ Areas of Agreement → Consensus section in paper
├─ Areas of Debate → Counterargument section
└─ Research Gaps → Limitations/future work section
```

---

## Advisory Chain: Assessment → Audit

### skill-business-assessment → skill-audit-trigger

| Field | Assessment Output | Audit Input | Compatible | Notes |
|---|---|---|---|---|
| **Business Overview** | Context provided | Optional background | ✅ Yes | Helps understand business |
| **Recommendation** | GO/CAUTION/PASS | Can trigger specific audit | ⚠️ Partial | Audit-trigger needs repo/files to audit, not just recommendation |
| **Strengths** | Identified | Can inform audit focus | ✅ Yes | Audit can verify strengths are real |
| **Gaps/Concerns** | Identified risks | Can be audit checklist | ✅ Yes | Audit can validate gaps documented |
| **Red Flags** | Problem areas | Can be audit scope | ✅ Yes | Audit can investigate red flags |

### Transformation Needed

⚠️ **PARTIAL:** Assessment gives business recommendations; Audit needs technical/standards targets.

**If chaining:**
```
Assessment: "Business opportunity viable, but execution gaps identified"
  ↓
Translate to audit targets: "Audit repo for execution readiness"
  ↓
Audit-trigger: "Check repo for [gap 1], [gap 2], [gap 3]"
```

---

## Study Guide & Tutoring Support

### skill-research-synthesis → skill-study-guide-creation

| Field | Synthesis Output | Guide Input | Compatible | Notes |
|---|---|---|---|---|
| **Research Question** | Topic defined | Used to scope guide | ✅ Yes | Guide focus = research topic |
| **Key Findings** | Organized concepts | Core content for guide | ✅ Yes | Findings → Key Concepts section |
| **Sources** | Full bibliography | Optional: reference sources | ⚠️ Partial | Guide may want to simplify or shorten bibliography |
| **Consensus & Debate** | Documented | Can teach comparison thinking | ✅ Yes | Debate → multiple perspectives section |

### Compatibility

✅ **Compatible.** Synthesis findings become study guide concepts.

---

## Orchestration Chain: Project Kickoff → Project Build → Standards Audit

### Full 3-Step Chain

```
PROJECT KICKOFF REPORT
  ├─ Project Name ✓
  ├─ SPEC ✓
  ├─ Domain ✓
  ├─ Readiness ✓
  └─ Assumptions ✓
    ↓
AUTONOMOUS PROJECT BUILD REPORT
  ├─ Executed successfully ✓
  ├─ Deliverables ⚠
  ├─ Issues/Escalations ✓
  └─ Success Criteria Status ✓
    ↓
STANDARDS AUDIT REPORT (optional)
  ├─ Audit findings ✓
  ├─ Violations ✓
  ├─ Recommendations ✓
  └─ Priority list ✓
```

**Overall Compatibility:** ✅ COMPATIBLE with minor transformation for audit targets

---

## Incompatibility Examples (What NOT to chain)

### ❌ Cannot Chain: Advisory → Execution Directly

**Why:** Advisory skills produce recommendations; execution needs instructions

```
skill-business-assessment (output: GO/CAUTION/PASS)
  ↓ ❌ NOT COMPATIBLE
skill-ms365-automation (input: specific automation task)
```

**Issue:** Assessment doesn't specify what automation to build. Needs human decision first.

### ❌ Cannot Chain: No Domain Context

**Why:** Skills need domain context to validate autonomy

```
skill-academic-writing
  ✗ Missing: GLOBAL-CONTEXT + domain context
```

**Issue:** Writing support has domain constraints (academic integrity). Cannot proceed without context.

### ❌ Cannot Chain: Format Mismatch

**Why:** Some skills produce narrative; some need structured data

```
skill-research-synthesis (output: narrative synthesis report)
  ↓ ❌ NOT COMPATIBLE (format mismatch)
Power Automate connector (input: structured data object)
```

**Issue:** Narrative prose doesn't work as structured input. Would need parsing.

---

## Compatibility Assessment Checklist

Before chaining two skills, verify:

- [ ] **Output format:** Does Skill A output format match Skill B input format?
- [ ] **Data types:** Are data types compatible (string, object, array, boolean)?
- [ ] **Required fields:** Does output include all required input fields?
- [ ] **Optional fields:** Which output fields are Skill B optional/required?
- [ ] **Transformation needed:** Can output be transformed to match input?
- [ ] **Dependency chain:** Does Skill B depend on Skill A (or does it need other skills first)?
- [ ] **Domain autonomy:** Can both skills execute in the same domain with same autonomy level?
- [ ] **Context preservation:** Is domain context preserved through the chain?

---

## Related Docs

- **SKILL-REGISTRY.md** — Skill dependencies and relationships
- **docs/processes/enforcement-layer.md** — Compatibility checked in Phase 5
- **skills/skill-template.md** — Input/output specification format

---

## Last Updated

- **Created:** 2026-04-08
- **Last reviewed:** 2026-04-08
- **Next review:** 2026-07-08 (quarterly)
