<!-- type: skill-execution -->

# Skill: Research Synthesis

Compile, organize, and synthesize research findings. Gathers sources, extracts key information, organizes by theme, synthesizes insights for academic work and analysis.

---

## Metadata

| Attribute | Value |
|---|---|
| **Skill ID** | `skill-research-synthesis` |
| **Type** | execution (procedural workflow) |
| **Version** | 1.0 |
| **Status** | ACTIVE |
| **Created** | 2026-04-08 |
| **Last Reviewed** | 2026-04-08 |
| **Dependencies** | skill-prompting-core |
| **Domains** | academic, business-advisory, finance-advisory |

---

## Summary

**Compile and synthesize research findings.**

Researches a topic, locates relevant sources, extracts key information, organizes findings by theme, and synthesizes insights into coherent summaries. Supports academic work, business analysis, and decision-making research.

---

## When to Use This Skill

- **Use this skill when:** You need to research a topic and compile findings
- **Do NOT use this skill when:** You need primary research (interviews, surveys) or original analysis
- **Prerequisite state:** Clear research question or topic to investigate

---

## Input Requirements

### Required Inputs
- **Research question or topic:** What do you need to research?
- **Purpose:** What will you use this research for? (assignment, decision-making, background, etc.)

### Optional Inputs
- **Source preferences:** Academic journals, news, books, websites? [TBD — specify if important]
- **Time frame:** How recent should sources be?
- **Scope:** Broad overview or deep dive on specific aspect?
- **Format preference:** How do you want findings organized?

### Assumptions
- You'll review and synthesize findings with your own judgment
- I'm finding existing sources, not conducting original research
- Citations and attribution will be proper throughout

---

## Execution Flow

### Phase 1: Define Research Scope

**Goal:** Clarify what you're researching and why.

1. You provide: research question + context
2. I clarify:
   - "What specifically are you trying to understand?"
   - "What will you do with these findings?"
   - "Any constraints on sources or timeframe?"
3. Confirm scope: "I'll research [topic] focusing on [angle]. Correct?"

**Output:** Clear research scope

**Approval Gate:** None (clarification only)

---

### Phase 2: Locate & Gather Sources

**Goal:** Find relevant sources.

1. Search for sources:
   - Academic databases (if available: JSTOR, Google Scholar, etc.)
   - News and publications
   - Books and reference materials
   - Primary sources if applicable

2. Evaluate sources:
   - Relevance: Does it address your research question?
   - Credibility: Is the source authoritative?
   - Recency: How current is the information?
   - Bias: Any apparent bias to note?

3. Compile bibliography:
   - Full citations with proper formatting
   - Summary of each source's relevance
   - Access information (online, library, etc.)

**Output:** Annotated bibliography

**Approval Gate:** None (informational)

---

### Phase 3: Extract Key Information

**Goal:** Identify and organize key findings.

1. Read and extract:
   - Main arguments or findings
   - Supporting evidence and data
   - Relevant quotes or examples
   - Author's conclusions

2. Organize by theme:
   - Group findings around central themes
   - Identify patterns and disagreements
   - Note which sources support which arguments
   - Track evidence strength (data, research, expert opinion, assertion)

3. Create extraction summary:
   - Key findings organized by theme
   - Supporting sources for each finding
   - Notable disagreements or debates
   - Gaps in the research

**Output:** Thematic organization of findings

**Approval Gate:** None (foundational work)

---

### Phase 4: Synthesize Insights

**Goal:** Create coherent summary of what research shows.

1. Identify patterns:
   - What do sources agree on?
   - Where do they disagree?
   - What's the dominant view vs. minority views?
   - What areas lack good research?

2. Synthesize narrative:
   - What does the research collectively show?
   - How do different findings relate to each other?
   - What are the key takeaways?
   - What questions remain unanswered?

3. Create synthesis document:
   - Overview of research landscape
   - Key findings organized thematically
   - Areas of agreement and debate
   - Gaps and questions for further research
   - Full bibliography with citations

**Output:** Research synthesis document

**Approval Gate:** SOFT (review: "Does this capture what you needed?")

---

### Phase 5: Format for Your Use

**Goal:** Present findings in format you'll use.

1. Format options:
   - Study guide format (themes with supporting evidence)
   - Literature review format (sources organized by argument)
   - Briefing document format (executive summary + detail)
   - Outline format (structured outline with citations)

2. Tailor to purpose:
   - For academic work: proper citations, formal structure
   - For decision-making: findings with implications for decisions
   - For background: clear overview of landscape

**Output:** Formatted research synthesis ready to use

**Approval Gate:** None (delivery complete)

---

## Output Format

**Research Synthesis Document:**

```
RESEARCH SYNTHESIS — [Topic]

═══════════════════════════════════════════════════════════════

RESEARCH QUESTION
[What you researched and why]

OVERVIEW
[Big-picture summary of what research shows]

═══════════════════════════════════════════════════════════════

KEY FINDINGS BY THEME

Theme 1: [Main theme]
├─ Finding A: [What research shows]
│  └─ Sources: [Citation 1, Citation 2]
├─ Finding B: [What research shows]
│  └─ Sources: [Citation]
└─ Consensus: [Agreement or debate on this theme]

Theme 2: [Main theme]
├─ Finding A: [What research shows]
│  └─ Sources: [Citations]
└─ Consensus: [Agreement or debate]

[Continue for all major themes]

═══════════════════════════════════════════════════════════════

AREAS OF AGREEMENT
[What sources agree on]

AREAS OF DEBATE
├─ Position A: [What some argue]
│  └─ Support: [Which sources, why]
├─ Position B: [Alternative argument]
│  └─ Support: [Which sources, why]
└─ Status: [Which view is dominant / still debated]

═══════════════════════════════════════════════════════════════

RESEARCH GAPS
[What's not well-researched or unclear]

IMPLICATIONS
[What this research means for your purpose]

═══════════════════════════════════════════════════════════════

FULL BIBLIOGRAPHY

[Alphabetical list with full citations]

═══════════════════════════════════════════════════════════════
```

---

## Style Rules

- **Proper attribution:** Every claim sourced back to literature
- **Balanced representation:** Present multiple viewpoints fairly
- **Evidence hierarchy:** Distinguish data/research from opinion
- **Clarity:** Make complex concepts accessible
- **Completeness:** Include citations for all key findings
- **Proper formatting:** Citations consistent throughout [TBD — confirm with program]

---

## Error Handling

| Error Condition | Resolution |
|---|---|
| Limited sources available | Note the limitation. Include what's available. Flag research gaps. |
| Sources disagree significantly | Present all positions. Note which is dominant. Explain disagreement. |
| Very recent topic with little research | Gather what exists. Note that field is new. Include expert commentary if available. |
| Technical or specialized topic | Explain jargon clearly. Ensure synthesis is accessible. |
| Too much information found | Prioritize: most relevant, most recent, most authoritative. Organize into main findings + supplementary. |

---

## Related Skills

| Skill | How Used |
|---|---|
| `skill-prompting-core` | Load context before research |
| `skill-academic-writing` | Takes synthesis and structures into papers |
| `skill-business-assessment` | Uses research in business analysis |

---

## Related Docs

- **domains/academic-context.md** — Academic research and citation standards
- **domains/business-advisory-context.md** — Research for business analysis

---

## Version

- **Created:** 2026-04-08
- **Last reviewed:** 2026-04-08
- **Next review:** 2026-07-08 (quarterly)
- **Status:** ACTIVE
