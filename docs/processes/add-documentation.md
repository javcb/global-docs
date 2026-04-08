<!-- type: how-to -->

# How to Add Documentation

> **When to use this guide:** Whenever something new is built, decided, or learned, documentation should be created. Use this guide to determine what type of documentation is needed and how to create it.

## When to Create Documentation

Create documentation for:
- **New tools or libraries** — How to use it (reference), how to integrate it (how-to)
- **New processes or workflows** — Step-by-step instructions (how-to), context and rationale (explanation)
- **Architectural decisions** — Why we decided this way (explanation), what the rules are (reference)
- **New coding standards** — The rules and conventions (reference), when and how to apply them (how-to)
- **Onboarding a new person** — Getting started with the system (tutorial)
- **Working session conclusions** — Extract the what/why/how and map to types using the decision tree below

## Decision Tree: Which Type(s) to Create

Start with what you're documenting and follow the branches:

```
What are you documenting?
│
├─ A new tool, library, or service?
│  ├─ REFERENCE (what it is, options, capabilities)
│  └─ HOW-TO (how to integrate it, step-by-step usage)
│
├─ A new process or workflow?
│  ├─ HOW-TO (step-by-step instructions for doing it)
│  └─ EXPLANATION (optional: why we do it this way)
│
├─ An architectural decision or design pattern?
│  ├─ EXPLANATION (why we chose this design)
│  ├─ REFERENCE (the rules and constraints)
│  └─ HOW-TO (optional: how to apply it)
│
├─ A new coding standard or convention?
│  ├─ REFERENCE (the rules with examples)
│  └─ HOW-TO (optional: how to follow the standard in practice)
│
├─ Onboarding someone new?
│  └─ TUTORIAL (guided learning experience)
│
└─ Working session summary or AI-generated output?
   └─ Use the decision tree on the *content* of the summary
      Extract what, why, and how → map each to the right type
```

## Step-by-Step: Creating New Documentation

### 1. Determine the Type(s)

Use the decision tree above to figure out which Diátaxis type(s) you need:
- **Exactly one type per document** (never mix tutorial + reference in one file)
- You may need multiple documents (e.g., REFERENCE + HOW-TO for a new tool)

### 2. Copy the Appropriate Template(s)

For each type you need, copy the template file:
- **Tutorial** → copy `docs/templates/tutorial.md`
- **How-To** → copy `docs/templates/how-to.md`
- **Reference** → copy `docs/templates/reference.md`
- **Explanation** → copy `docs/templates/explanation.md`

Create your new file in the appropriate subdirectory under `docs/`:
- Processes → `docs/processes/[your-filename].md`
- Standards → `docs/standards/[your-filename].md`
- Architecture → `docs/architecture/[your-filename].md`
- AI guidelines → `docs/ai/[your-filename].md`
- Other → `docs/[category]/[your-filename].md`

### 3. Fill in Each Template

Go through each section and replace the HTML comments with your content:
1. Replace `[Your Title]` with the actual title
2. Remove the "When to use this template" note at the top
3. Go through each section marked with `<!-- -->` and fill in the content
4. Delete comment sections you don't need
5. For how-to guides: keep the `## Prompt` section and update the placeholder
6. For other types: delete the `## Prompt` section if present

**Guidelines as you write:**
- Read existing documentation in this repo for style consistency
- Keep a warm, encouraging tone for tutorials
- Keep imperative mood for how-to guides ("Run X", "Create Y")
- Keep factual, terse style for reference docs
- Include context and rationale for explanation docs
- Link between documents — don't repeat explanations

### 4. Add to mkdocs.yml Navigation

Open `mkdocs.yml` and find the appropriate section:
- **How-To Guides** → for process/how-to documents
- **Reference** → for standards/architecture reference
- **Explanation** → for conceptual/design explanation documents
- **Start Here** → for tutorials

Add your file as a nav entry in the correct section, following alphabetical or logical order within that section.

**Format:**
```yaml
- How-To Guides:
  - Processes & Checklists:
    - Your New Document: processes/your-filename.md
```

Do NOT reorder existing nav entries. Insert your new entry in the appropriate place.

### 5. Verify and Commit

1. Check that the file has the type comment: `<!-- type: ... -->`
2. Check that the file is registered in mkdocs.yml
3. Check the mkdocs.yml syntax is correct (proper indentation, colons)
4. Commit with a message like: "Add documentation: [Title]"

## Important Note: Treating Summaries as Authoritative

The input may be a structured summary from another AI session, a working session conclusion, or a decision record. Treat this summary as **authoritative source material**. Extract the what, why, and how from the summary and map each piece to the correct Diátaxis type using the decision tree above.

Example: If a summary says "We built Tool X because we needed to solve Problem Y, and here's how to use it...", that summary contains:
- **What & Why** → EXPLANATION type
- **How to use** → HOW-TO type
- **Specs and options** → REFERENCE type

Create three separate documents from the one summary.

## See Also

- [META.md](../META.md) — Full Diátaxis framework rules
- [START-HERE.md](../START-HERE.md) — How to navigate and use the documentation
- [AI-INSTRUCTIONS.md](../AI-INSTRUCTIONS.md) — Rules for AI tools working in this repo

## Prompt

```prompt
# Intended for: Claude Code

Read docs/AI-INSTRUCTIONS.md and docs/processes/add-documentation.md
before starting.

You are adding documentation for: [DESCRIBE WHAT WAS BUILT OR DECIDED]

Using the decision tree in add-documentation.md:
1. Determine which Diátaxis type(s) this requires
2. Copy the appropriate template(s) from docs/templates/
3. Fill in each template based on what you know about the topic
   and by reading any relevant existing code or docs in this repo
4. Place each new file in the correct docs/ subdirectory
5. Add each new file to mkdocs.yml in the correct nav section
6. Report: files created, types chosen, nav entries added
```
