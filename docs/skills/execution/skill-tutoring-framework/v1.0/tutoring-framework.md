<!-- type: skill-execution -->

# Skill: Tutoring Framework

Educational support and learning scaffolding. Explains concepts, creates study materials, guides assignments, builds learning supports.

---

## Metadata

| Attribute | Value |
|---|---|
| **Skill ID** | `skill-tutoring-framework` |
| **Type** | execution (procedural workflow) |
| **Version** | 1.0 |
| **Status** | ACTIVE |
| **Created** | 2026-04-08 |
| **Last Reviewed** | 2026-04-08 |
| **Dependencies** | skill-prompting-core |
| **Domains** | parenting |

---

## Summary

**Provide educational support and structured tutoring.**

Explains concepts at appropriate learning levels, creates study guides and practice materials, guides assignment work without doing it, scaffolds complex topics into manageable steps.

---

## When to Use This Skill

- **Use this skill when:** Child needs help understanding a concept, preparing for a test, or completing homework
- **Do NOT use this skill when:** Child is supposed to work independently (encourage that instead)
- **Prerequisite state:** You know what topic needs help; child is ready to engage

---

## Input Requirements

### Required Inputs
- **Topic or concept:** What needs to be explained or learned
- **Learning context:** Is this homework help, test prep, or building understanding?

### Optional Inputs
- **Learning level:** Grade or age (to calibrate explanation complexity)
- **Learning style:** Visual, hands-on, reading/writing, discussion, etc.
- **Current understanding:** What does the learner already know?

### Assumptions
- Goal is understanding, not grades
- Learner is engaged and ready to work
- You'll review materials and provide guidance, not just accept them as done
- Academic integrity matters (teaching skill, not providing answers)

---

## Execution Flow

### Phase 1: Assess Current Understanding

**Goal:** Know where the learner is starting from.

1. Ask clarifying questions:
   - "What do you already know about [topic]?"
   - "What part is confusing?"
   - "What have you tried so far?"

2. Identify gaps:
   - What foundations are solid?
   - What's missing or misunderstood?
   - What's the key concept that's stuck?

3. Assess learning preferences:
   - Does the learner prefer examples, visuals, hands-on, discussion?
   - How does this learner best absorb new information?

**Output:** Understanding of learner's current state and needs

**Approval Gate:** None (assessment)

---

### Phase 2: Explain Core Concept

**Goal:** Make the concept clear and understandable.

1. Start simple:
   - One-sentence summary
   - Use everyday language
   - Avoid jargon initially

2. Build in layers:
   - Core idea first
   - Supporting concepts
   - Details and nuances
   - Advanced extensions

3. Use multiple modalities:
   - Examples (real-world or relatable)
   - Analogies ("It's like...")
   - Visuals (if helpful)
   - Hands-on if applicable

4. Check understanding:
   - Ask: "Does that make sense?"
   - Ask them to explain back: "How would you describe this?"
   - Identify confusion and re-explain

**Output:** Clear explanation of concept

**Approval Gate:** SOFT (check: "Understand so far?")

---

### Phase 3: Practice & Reinforcement

**Goal:** Build fluency and confidence with the concept.

1. Create practice opportunities:
   - Simple examples first
   - Gradually increase difficulty
   - Varied problem types

2. Guide practice (don't do it for them):
   - "Try this one. What would you do first?"
   - "You're stuck on [step]. Why do you think that's hard?"
   - Guide to solution, don't provide answer

3. Provide feedback:
   - "You got [this part] right. Here's why [other part] needs adjustment."
   - Reinforce correct thinking
   - Correct misunderstandings

4. Track progress:
   - Is confidence building?
   - Are mistakes decreasing?
   - Is understanding deepening?

**Output:** Practice materials and guided work

**Approval Gate:** None (ongoing practice)

---

### Phase 4: Create Study Materials (If Needed)

**Goal:** Build reusable learning resources.

1. Assess if materials are needed:
   - Will learner need to review later?
   - Is this a complex topic worth documenting?
   - Does learner benefit from having reference materials?

2. Create appropriate materials:
   - Study guide: key concepts, definitions, examples
   - Practice problems: with worked solutions
   - Summary sheet: core ideas on one page
   - Comparison chart: how different ideas relate
   - Flashcards: for memorization if needed

3. Design for active recall:
   - Materials should prompt thinking, not just reading
   - Include practice questions
   - Leave blanks for learner to fill in
   - Self-testing elements

**Output:** Study materials tailored to topic and learner

**Approval Gate:** None (materials are tools, not commitment)

---

### Phase 5: Assignment Support (Homework Help)

**Goal:** Guide homework without doing it.

1. Clarify the assignment:
   - "What's the assignment asking you to do?"
   - "What do you already understand?"
   - "Where are you stuck?"

2. Guide without answering:
   - Break into steps: "First you'd... Then you'd..."
   - Ask leading questions: "What would happen if...?"
   - Help find resources: "You could look here for..."
   - Model the thinking: "I would approach this by..."

3. Check work (not grade):
   - "Is your answer reasonable given [constraint]?"
   - "Did you address all parts of the question?"
   - "Is your reasoning clear?"

4. Never just provide answers:
   - Assignment teaches something
   - Struggle is part of learning
   - Your job is scaffolding, not completion

**Output:** Guided homework completion

**Approval Gate:** None (ongoing process)

---

### Phase 6: Test Prep (If Applicable)

**Goal:** Prepare for assessment.

1. Review key concepts:
   - "What topics are on the test?"
   - Create review materials covering those topics
   - Revisit difficult concepts

2. Practice test conditions:
   - Create practice test or problems
   - Timed practice (if test is timed)
   - Similar format to real test

3. Identify weak spots:
   - Track which topics are still unclear
   - Focus practice on those areas
   - Re-explain if needed

4. Build confidence:
   - Show improvement over time
   - Positive framing: "You know this now"
   - Set realistic expectations

**Output:** Test-prep materials and practice

**Approval Gate:** None (prep continues until test)

---

## Output Format

**Tutoring materials vary by type, but always include:**

### For Concept Explanation:
```
CONCEPT: [Name]

Simple explanation:
[One clear sentence explanation]

Deeper explanation:
[Expanded explanation with structure]

Examples:
├─ Example 1: [Real or relatable example]
├─ Example 2: [Another angle]
└─ Non-example: [What this is NOT]

How it works:
[Step-by-step process or mechanism]

Common misconceptions:
├─ Misconception 1: [What students often think]
│  └─ Correction: [Why that's wrong]
└─ Misconception 2: [...]
```

### For Study Guides:
```
STUDY GUIDE: [Topic]

Key concepts:
├─ Concept 1: [Definition]
├─ Concept 2: [Definition]
└─ Concept 3: [Definition]

How they relate:
[Diagram or description of relationships]

Practice problems:
├─ Easy: [Problem 1, Problem 2]
├─ Medium: [Problem 3, Problem 4]
└─ Hard: [Problem 5, Problem 6]

[Worked solutions for each]

Common errors to avoid:
├─ Error 1: [Description]
│  └─ Avoid by: [What to do instead]
└─ Error 2: [...]
```

### For Homework Guidance:
```
ASSIGNMENT: [What it is]

What the assignment is asking:
[Clarification of assignment]

How to approach it:
Step 1: [What you'd do first]
Step 2: [What next]
Step 3: [Then]
[...]

Resources you need:
├─ Resource A: [Where to find it]
└─ Resource B: [Where to find it]

Common mistakes to watch for:
├─ Mistake 1: [What students often get wrong]
└─ Mistake 2: [...]

Checking your work:
├─ Question 1: [Self-check]
├─ Question 2: [Self-check]
└─ Question 3: [Self-check]
```

---

## Style Rules

- **Age-appropriate language:** Explain at the learner's level, not adult level
- **Active over passive:** Teach the skill, not just the answer
- **Encourage struggle:** Some confusion is healthy learning
- **Celebrate growth:** Notice improvement and effort
- **Academic integrity:** Never write assignments for learner
- **Clear standards:** Explain what "good" looks like
- **Progress tracking:** Help learner see improvement over time

---

## Error Handling

| Error Condition | Resolution |
|---|---|
| Learner doesn't understand explanation | Try a different approach: visuals, analogies, real-world examples, hands-on |
| Learner doesn't want to engage | Pause. Find out what's blocking (frustration, tired, doesn't see value). Address root cause. |
| Assignment is too hard | Break into smaller pieces. Simplify first step. Build confidence before tackling complexity. |
| Learner wants you to do the work | Clarify: you teach, they do. Explain why that matters. Keep assignments their responsibility. |
| Concept still not making sense | Go back to basics. Check if foundational skill is missing. Don't move forward until foundation is solid. |

---

## Examples

### Example 1: Explaining Fractions to Elementary Learner

**Simple explanation:** "A fraction is a part of a whole. Like if you cut a pizza into 4 pieces and eat 1, you ate 1/4 of the pizza."

**Build layers:**
- Numerator (top) = how many parts
- Denominator (bottom) = how many parts the whole is divided into
- 3/4 means 3 pieces when the pizza is cut into 4 pieces

**Examples:**
- 1/2 = half (cut in 2 pieces, take 1)
- 2/3 = two-thirds (cut in 3 pieces, take 2)
- 5/5 = the whole thing (all the pieces)

**Check:** "If I cut a pie into 3 pieces and you take 2, what fraction did you take?" (Answer: 2/3)

---

### Example 2: Study Guide for History Topic

```
STUDY GUIDE: The American Revolution

Key dates:
├─ 1775: First battles (Lexington, Concord)
├─ 1776: Declaration of Independence
└─ 1783: Treaty of Paris (war ends)

Key people:
├─ George Washington: Led the Continental Army
├─ Benjamin Franklin: Diplomat, got French support
└─ Thomas Jefferson: Wrote Declaration

Why it happened:
1. Britain taxed colonies heavily (without representation)
2. Colonists felt unfair treatment
3. Wanted self-government and independence

What changed:
- Before: Colonies ruled by British government
- After: Independent United States

Practice:
- Q: What did colonists mean by "no taxation without representation"?
  A: They wanted to vote on taxes, not have them decided by Britain
  
- Q: How did France help the colonists?
  A: Provided military support, weapons, loans, and French soldiers

What to remember for test:
- Year of Declaration: 1776
- Main cause: taxation and lack of representation
- Result: Independent United States
```

---

### Example 3: Homework Guidance

**Assignment:** Write a paragraph explaining photosynthesis

**What it's asking:** Explain in your own words how plants make food

**How to approach:**
1. Write what happens: "Plants take sunlight, water, and carbon dioxide..."
2. Explain why: "This provides energy for the plant to grow"
3. Connect to learning: "This is why plants need sunlight and water"

**Resources:**
- Your textbook section 3.2
- Khan Academy video on photosynthesis

**Check your work:**
- Does my paragraph explain what photosynthesis is?
- Did I mention sunlight, water, and carbon dioxide?
- Did I explain what the plant gets from it?

---

## Related Skills

| Skill | How Used |
|---|---|
| `skill-prompting-core` | Establish parenting education context |
| [future: study-guide-creation] | Deep specialized study material creation |
| [future: assignment-scaffolding] | Advanced assignment guidance |

---

## Related Docs

- **GLOBAL-CONTEXT.md** — Hard rules (never compromise academic integrity)
- **domains/parenting-context.md** — Educational focus and autonomy levels
- **standards/** (if applicable) — Curriculum or learning standards

---

## Version

- **Created:** 2026-04-08
- **Last reviewed:** 2026-04-08
- **Next review:** 2026-07-08 (quarterly)
- **Status:** ACTIVE
- **Scope:** Educational tutoring and learning scaffolding only
