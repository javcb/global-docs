<!-- type: skill-execution -->

# Skill: Study Guide Creation

Create effective study materials from course content. Distills complex material into clear, organized study guides that enable active learning and retention.

---

## Metadata

| Attribute | Value |
|---|---|
| **Skill ID** | `skill-study-guide-creation` |
| **Type** | execution (procedural workflow) |
| **Version** | 1.0 |
| **Status** | ACTIVE |
| **Created** | 2026-04-08 |
| **Last Reviewed** | 2026-04-08 |
| **Dependencies** | skill-prompting-core |
| **Domains** | parenting, academic |

---

## Summary

**Create study guides for active learning.**

Analyzes course material, identifies key concepts, creates study guides with definitions, examples, practice problems, and self-testing elements. Designed for understanding and retention, not just memorization.

---

## When to Use This Skill

- **Use this skill when:** Need to create study materials for a test or unit of learning
- **Do NOT use this skill when:** Student should create their own study materials (part of learning)
- **Prerequisite state:** Course material or textbook available; learning objectives clear

---

## Input Requirements

### Required Inputs
- **Course or topic:** What's being studied?
- **Learning scope:** Which chapters, units, or concepts?

### Optional Inputs
- **Test format:** Multiple choice, essays, problem-solving? [TBD — specify if important]
- **Learning level:** Grade or age
- **Learning style preferences:** Visual, hands-on, reading, discussion?
- **Test date:** When is the test? (to plan study timeline)

### Assumptions
- Study guide supplements learning, doesn't replace it
- Learner will actively use materials (not passively read them)
- Goal is understanding, not just test performance

---

## Execution Flow

### Phase 1: Analyze Course Material

**Goal:** Identify key concepts and learning objectives.

1. Review course materials:
   - Textbook chapters or readings
   - Lecture notes or recordings
   - Assignment requirements
   - Test expectations or rubric (if available)

2. Identify key concepts:
   - Core ideas that everything else builds on
   - Supporting concepts that explain core ideas
   - Details and examples
   - Applications or connections

3. Assess scope:
   - What's most important?
   - What's secondary?
   - What's nice-to-know?
   - What's likely to be tested?

**Output:** Concept map and priority analysis

**Approval Gate:** None (analysis)

---

### Phase 2: Organize Concepts

**Goal:** Structure material for understanding.

1. Create hierarchy:
   - Main concept
   - Supporting concepts
   - Details and examples
   - Connections to other topics

2. Identify relationships:
   - How do concepts relate?
   - What causes what?
   - What's similar or different?
   - How do they apply together?

3. Plan organization:
   - Sequential: build from simple to complex
   - Thematic: organize by topic
   - Comparative: show how concepts compare
   - Practical: organize by application

**Output:** Organized concept structure

**Approval Gate:** None (organization planning)

---

### Phase 3: Create Study Materials

**Goal:** Build materials for active learning.

1. Create concept definitions:
   - Clear, concise definitions
   - Everyday language explanation
   - Related concepts
   - Common misconceptions

2. Add examples:
   - Real-world examples
   - Textbook examples
   - Edge cases
   - Non-examples (what this isn't)

3. Create practice problems:
   - Simple (basic understanding)
   - Medium (application)
   - Complex (deep application)
   - Worked solutions for each

4. Add self-testing:
   - Fill-in-the-blank sections
   - Flashcard format
   - Practice quizzes
   - Self-check questions

**Output:** Complete study guide materials

**Approval Gate:** SOFT (review: "Does this cover the test material?")

---

### Phase 4: Organize for Use

**Goal:** Format study guide for easy access and active learning.

1. Create clear structure:
   - Table of contents
   - Clear section headings
   - Easy to navigate
   - Visual hierarchy

2. Design for active engagement:
   - Space for student notes
   - Self-test questions
   - Fill-in sections
   - Reflection prompts

3. Add reference sections:
   - Key formula sheet
   - Timeline or chronology
   - Comparison table
   - Quick reference guide

**Output:** Formatted, organized study guide ready to use

**Approval Gate:** None (final product)

---

## Output Format

**Study Guide Template:**

```
STUDY GUIDE — [Topic/Chapter]

═══════════════════════════════════════════════════════════════

KEY CONCEPTS

[Concept 1: Definition]
├─ Why it matters: [Connection to learning goals]
├─ Examples: [Real examples]
└─ Common misconceptions: [What students often get wrong]

[Concept 2: Definition]
├─ Why it matters: [Connection]
├─ How it connects to [other concept]: [Relationship]
└─ Examples: [Examples]

[Continue for each key concept...]

═══════════════════════════════════════════════════════════════

HOW IT ALL FITS TOGETHER

[Concept map or narrative description of how concepts relate]

═══════════════════════════════════════════════════════════════

PRACTICE PROBLEMS

Easy (Just checking understanding):
├─ Problem 1: [Simple application]
└─ Problem 2: [Simple application]

Medium (Applying the concept):
├─ Problem 1: [Real application]
└─ Problem 2: [Real application]

Hard (Deep understanding):
├─ Problem 1: [Complex application]
└─ Problem 2: [Complex application]

[WORKED SOLUTIONS SECTION]

═══════════════════════════════════════════════════════════════

SELF-CHECK

Can you explain:
├─ ☐ [Concept 1] and why it matters
├─ ☐ [Concept 2] and how it connects
└─ ☐ [How to apply it] in a new situation

Can you solve:
├─ ☐ [Type of problem] without notes
└─ ☐ [Harder type] with partial help

═══════════════════════════════════════════════════════════════

QUICK REFERENCE

[Key formulas, dates, definitions on one page]

═══════════════════════════════════════════════════════════════
```

---

## Study Material Types

- **Concept summaries:** Clear definitions + examples
- **Comparison tables:** How concepts differ
- **Timelines:** Chronological overview
- **Process maps:** Step-by-step processes
- **Diagram/visuals:** Visual representation of concepts
- **Flashcards:** For memorization
- **Practice quizzes:** Self-testing
- **Worked examples:** Model solutions

---

## Style Rules

- **Clear and concise:** Easy to understand, not wordy
- **Active learning:** Questions and blanks, not passive reading
- **Examples first:** Concept → example → definition (not definition → example)
- **Organized:** Clear hierarchy and flow
- **Visual:** Use formatting, structure, whitespace
- **Testable:** Materials prepare for actual test format

---

## Error Handling

| Error Condition | Resolution |
|---|---|
| Too much material | Prioritize. Include must-know vs. nice-to-know. Create two levels. |
| Learner still confused | Add more examples. Simplify definitions. Use diagrams. Break into smaller concepts. |
| Practice problems too hard | Create easier versions first. Add worked examples. Build up difficulty. |
| Not aligned to test | Review test format/expectations. Adjust materials to match. Add test-style practice. |

---

## Related Skills

| Skill | How Used |
|---|---|
| `skill-prompting-core` | Load educational context |
| `skill-tutoring-framework` | Provides concept explanations used in study guides |
| `skill-research-synthesis` | Compiles research into study materials |

---

## Related Docs

- **domains/parenting-context.md** — Educational support standards
- **domains/academic-context.md** — Academic learning standards

---

## Version

- **Created:** 2026-04-08
- **Last reviewed:** 2026-04-08
- **Next review:** 2026-07-08 (quarterly)
- **Status:** ACTIVE
