# AI tool roles and when to use each

## Core principle

Different AI tools have different strengths. Using the wrong tool for a task
creates unnecessary back-and-forth and produces worse results.
Match the task type to the right tool before starting work.

---

## Tool roles

### Cursor
**Best for:** targeted, file-scoped, tactical changes
**Strength:** precise edits to specific files, interactive feedback, inline suggestions
**Weakness:** cross-file reasoning, holistic judgment, content consolidation across files

Use Cursor when:
- Making a specific change to one or two files with a clear target location
- Refactoring code within a single module
- Fixing a bug with a known location
- Generating boilerplate for a well-defined structure
- Making UI/style adjustments to a specific component

Do not use Cursor when:
- Consolidating duplicate content across multiple files
- Making a decision that requires understanding the whole repo
- Auditing for patterns across many files
- Designing architecture or making structural decisions

Example prompt style for Cursor:
```prompt
In [filename], at [location], make this specific change: [exact change].
Do not modify anything else in this file.
```

---

### Claude Code
**Best for:** holistic, cross-file, reasoning-heavy tasks
**Strength:** understands whole-repo context, finds patterns, consolidates and restructures
**Weakness:** slower for small targeted edits, less interactive than Cursor

Use Claude Code when:
- Auditing a repo for consistency, duplicates, or rule violations
- Consolidating content that appears in multiple files into one canonical location
- Designing or restructuring a repo layout
- Making changes that require understanding how multiple files relate
- Running the global-docs audit prompt
- Any task where the instruction is "find all instances of X across the repo"

Do not use Claude Code when:
- You need a fast, targeted one-line fix
- You are iterating interactively on UI or code output

Example prompt style for Claude Code:
```prompt
Read AI-INSTRUCTIONS.md and README.md first.
Across this entire repo, find every instance of [X].
Consolidate all instances into [canonical location].
Remove duplicates from all other locations.
Report every file changed.
```

---

### GitHub Copilot
**Best for:** inline code completion and suggestion while typing
**Strength:** fast, context-aware suggestions within the current file
**Weakness:** no whole-repo awareness, not suitable for planning or architecture

Use Copilot when:
- Writing new code and wanting intelligent autocomplete
- Generating repetitive boilerplate inline
- Quick function or test generation while in flow

---

### Perplexity / general LLM chat
**Best for:** planning, architecture decisions, documentation drafting, research
**Strength:** broad knowledge, strategic thinking, drafting structured content
**Weakness:** no direct file access, cannot make changes to your repo

Use for:
- Thinking through architecture before building
- Drafting global-docs content
- Getting honest feedback on approach and gaps
- Research on best practices

---

## Maker/checker tool assignment

| Role | Preferred tool |
|---|---|
| Maker (building) | Cursor for interactive, Claude Code for autonomous |
| Checker (reviewing) | Claude Code |
| Auditing global-docs | Claude Code (primary), Cursor (site/link verification) |
| Tactical site fixes | Cursor |
| Architecture decisions | Perplexity + Claude Code |
