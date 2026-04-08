<!-- type: tutorial -->

# Start Here: Welcome to the Documentation Hub

Welcome! This documentation hub is your guide to understanding how this entire system is organized, built, and operated. Whether you're new to the organization or returning after a break, this guide will orient you.

## What This Hub Is

This is the canonical source for:
- **Universal standards** that apply across all repositories (naming, code style, architecture patterns)
- **AI rules & guidelines** that shape how Claude and other AI tools work in this system
- **GitHub organization structure** and how repositories relate to each other
- **Operational processes** for building, shipping, and maintaining software
- **Architecture principles** that guide system design
- **AI Operating System Foundation** — autonomous project execution framework with 15 production skills, 9 domain contexts, and full enforcement layer

Other repositories reference this hub — this hub references nothing outside itself. It's the single source of truth.

---

## 🆕 AI Operating System Foundation (Built April 8, 2026)

**What was replaced:** Fragmented context files and scattered prompts folder → **40-file integrated AI operating system**

**What was built (5 phases, 1 session):**
1. **Foundation** (5 files) — GLOBAL-CONTEXT.md, autonomy matrix, skill registry
2. **Domain Contexts** (9 files) — business-ventures, professional-work, parenting, volunteer, academic, finance-advisory, marketing-advisory, business-advisory, personal-processes
3. **Execution Skills** (8 files) — research synthesis, study guides, academic writing, automation, tutoring, operations, block intake, prompting
4. **Advisory Skills** (4 files) — business assessment, financial assessment, marketing audit, audit trigger
5. **Orchestration & Enforcement** (14 files) — project kickoff, autonomous builds, cross-repo audits, enforcement layer (pre-flight checks, approval gates, error escalation, skill compatibility), maintenance processes

**How to use it right now:**

Start any AI session with the system:
```
Read docs/GLOBAL-CONTEXT.md to load the operating system.
This initializes domain autonomy, hard rules, and decision framework.
```

Start a research project:
```
Use skill-research-synthesis to compile sources.
Then skill-academic-writing to structure findings into papers.
```

Start any project with full autonomy support:
```
Run skill-project-kickoff to validate the project specification.
Then skill-autonomous-project-build to execute end-to-end.
Automatically handles execution, monitoring, and refinement.
```

**What still needs to be done:**
- See [docs/processes/open-items.md](processes/open-items.md) for complete tracking
- **Critical:** Finance advisory compliance review before professional use
- **Critical:** EMBA program citation standard confirmation
- Estimated time to resolve TBDs: 1-2 hours
- All other work tracked in quarterly cadence

**Maintenance reminders:**
- **Quarterly reviews:** July 8, October 8, January 8, April 8
- **When life changes:** Update the relevant domain context file — that's it
- No versioning hell — living documents policy applies

**Building the site locally:**
```bash
# Sync root files into docs/ (required before build)
python scripts/sync-docs.py

# Build for offline use or GitHub Pages
mkdocs build           # generates site/ folder for offline use
mkdocs gh-deploy       # deploys to GitHub Pages (live at https://javcb.github.io/global-docs/)
```

The sync script copies (not symlinks) root-level files into docs/ so MkDocs can find them.
This keeps the build reliable on Windows and other systems while maintaining single source of truth at repo root.

## How This Documentation Is Organized

All documents in this hub follow the **Diátaxis framework**, which organizes documentation into four types:

### 📖 **Start Here**
You are reading it! This tutorial guides you to the right documents based on what you want to do.

### 🎯 **How-To Guides** 
Step-by-step procedures for accomplishing specific tasks:
- Setting up a new repository
- Running audits and checklist procedures  
- Promoting code from staging to production
- Building and shipping features
- Handling templates and design system blocks

Use these when you know what you want to do and need the steps.

### 📚 **Reference**
Factual lookup materials: specifications, standards, inventories, and definitions.
- Naming conventions and code style standards
- Architecture reference materials
- GitHub organization and repository inventory
- AI rules and universal guidelines
- Quick lookup guides (FAQ, open items)

Use these when you're working and need to check a fact, rule, or specification.

### 💡 **Explanation**
Deep dives that build understanding: why things are designed the way they are, history, alternatives considered.
- Ecosystem overview and high-level architecture
- Hub-and-spoke organizational model
- Setup history and evolution
- Design system philosophy and three-layer model
- Operational model rationale

Use these when you want to understand the *why* behind the *what*.

## Quick Navigation

### I'm new here and want to understand the system
1. Read: **[About Me](context/about-me.md)** — Your role and context
2. Read: **[Ecosystem Overview](architecture/ecosystem-overview.md)** — High-level system design
3. Read: **[Hub-and-Spoke Model](architecture/hub-and-spoke-model.md)** — How repos relate
4. Explore: **[GitHub Organizations](orgs/overview.md)** — The repos and their purposes

### I need to complete a specific task
1. Go to: **How-To Guides** in the left sidebar
2. Find your task category (Processes, Setup, Development, etc.)
3. Follow the numbered steps

**Common tasks:**
- [New Repo Checklist](processes/new-repo-checklist.md) — Setting up a new repository
- [Modularization Playbook](processes/modularization-playbook.md) — Refactoring or extending systems
- [Post-Mortem](processes/post-mortem.md) — Documenting incidents or lessons learned
- [Autonomous Build](processes/autonomous-build.md) — Building features with AI tools

### I need to check a standard or rule
1. Go to: **Reference** in the left sidebar
2. Find your category (Standards, AI Rules, Architecture, etc.)
3. Look up the specific rule or definition

**Common references:**
- [Naming Conventions](standards/naming.md) — How to name files, variables, commits
- [JavaScript/TypeScript Standards](standards/javascript-typescript.md) — Code style
- [Universal Rules](ai-instructions/universal-rules.md) — Rules that apply everywhere
- [FAQ](FAQ.md) — Common questions answered

### I want to understand the thinking behind a design
1. Go to: **Explanation** in the left sidebar
2. Choose the topic that interests you

**Key explanations:**
- [Design System Architecture](design-system/architecture.md) — Why the system is built in three layers
- [Operational Model](processes/operational-model.md) — How decisions are made
- [Core vs Adapters](architecture/core-vs-adapters.md) — System architecture patterns

### I want to use the AI Operating System for a project
1. Read: **[GLOBAL-CONTEXT.md](GLOBAL-CONTEXT.md)** — Load the system context
2. Read: **[autonomy-matrix.md](autonomy-matrix.md)** — Understand domain constraints
3. Use: **[skill-project-kickoff](skills/orchestration/skill-project-kickoff/v1.0/project-kickoff.md)** — Validate the project
4. Use: **[skill-autonomous-project-build](skills/orchestration/skill-autonomous-project-build/v1.0/autonomous-project-build.md)** — Execute end-to-end
5. Reference: **[docs/processes/enforcement-layer.md](processes/enforcement-layer.md)** — Understand pre-flight checks and gates

## Documentation Standards

Every document in this hub declares its type at the top:
```html
<!-- type: tutorial | how-to | reference | explanation -->
```

This tells you what kind of document you're reading and what to expect:
- **Tutorial**: Guided experience, narrative, "read this next" suggestions
- **How-To**: Numbered steps, prerequisites, expected outcomes
- **Reference**: Terse, consistent structure, facts and specifications
- **Explanation**: Narrative, context, reasoning, alternatives considered

**Golden rule:** Documents never mix types. A how-to guide won't explain *why* (that's explanation) — it links to the explanation instead.

## Key Resources

### For Configuration & Setup
- **[Repo Setup Standard](processes/repo-setup-standard.md)** — How to initialize a new repo
- **[Environment Variables](standards/configuration.md)** — Standard config patterns
- **[Access Tokens](processes/access-tokens.md)** — Managing credentials and permissions

### For Code Standards
- **[Naming Conventions](standards/naming.md)** — What to name things
- **[JavaScript/TypeScript](standards/javascript-typescript.md)** — Code style and patterns
- **[Python Standards](standards/python.md)** — Python-specific conventions
- **[SQL Strategy](architecture/sql-strategy.md)** — Database design approach
- **[Modularity Principles](standards/modularity.md)** — How to structure code

### For AI Tools
- **[Universal AI Rules](ai-instructions/universal-rules.md)** — Rules for all AI use
- **[Quality Bar](ai/quality-bar.md)** — Standards for AI-generated code
- **[Personas](ai/personas.md)** — How to work with different AI tools
- **[AI Tool Roles](processes/ai-tool-roles.md)** — When to use which AI tool

### For Architecture & Design
- **[System Overview](architecture/system-overview.md)** — What systems exist and how they connect
- **[Design System](design-system/architecture.md)** — Component system, token system, Storybook
- **[Data Platforms](architecture/data-platforms.md)** — Database and data pipeline design

### For Operations
- **[Operational Model](processes/operational-model.md)** — Decision-making structure
- **[Close-Out Protocol](workflows/close-out-protocol.md)** — Finishing projects properly
- **[Release Notes Monitoring](workflows/release-notes-monitoring.md)** — Checking for breaking changes

## How to Use This Hub Effectively

### When Reading
1. **Check the document type** (comment at the very top)
2. **Read the purpose statement** (first paragraph) — understand what this document is for
3. **Use the sidebar** — the structure follows Diátaxis, not directory layout
4. **Follow cross-references** — links between related documents guide deeper exploration

### When Searching
- **Looking for how to do something?** → Search in How-To Guides
- **Looking for a rule or fact?** → Search in Reference
- **Looking to understand why?** → Search in Explanation
- **Not sure where to start?** → Look in Start Here, then navigate from there

### When Updating
Every document must:
1. Declare its type in a comment at the top
2. Keep one type per document (no mixing tutorial with reference)
3. Have a clear purpose statement in the first paragraph
4. Link to related documents rather than explaining other concepts

[Learn more about documentation standards](META.md).

## Getting Oriented

### First Time Here?
**Step 1:** Read [About Me](context/about-me.md) to understand your role  
**Step 2:** Read [Ecosystem Overview](architecture/ecosystem-overview.md) to see the big picture  
**Step 3:** Explore [GitHub Organizations](orgs/overview.md) to see what repos exist  
**Step 4:** Come back here and dive into whatever interests you

### Returning After a Break?
**Step 1:** Read [GLOBAL-CONTEXT.md](GLOBAL-CONTEXT.md) to reload the operating system (2 min)  
**Step 2:** Check [Open Items](processes/open-items.md) for what needs attention  
**Step 3:** Check [Priorities](context/priorities.md) for what's being worked on now  
**Step 4:** If using the AI system: read [autonomy-matrix.md](autonomy-matrix.md) to confirm domain constraints  
**Step 5:** Browse the How-To Guides if you need to complete a task

### Need Help Right Now?
- **Question about naming/standards?** → [FAQ](FAQ.md)
- **Don't know what repo to use?** → [GitHub Organizations](orgs/overview.md)
- **Stuck on a process?** → Find it in [How-To Guides](index.md)
- **Need to understand a design decision?** → Look in [Explanation](index.md)

## Next Steps

Choose based on your situation:

- **New to the organization?** → Read [About Me](context/about-me.md), then [Ecosystem Overview](architecture/ecosystem-overview.md)
- **Need to set up a repo?** → Go to [New Repo Checklist](processes/new-repo-checklist.md)
- **Looking for coding standards?** → Browse [Reference > Standards & Conventions](index.md)
- **Working on a feature?** → Read [Assess Before Building](workflows/assess-before-building.md)
- **Need to promote code?** → See [Promote Staging to Prod](processes/promote-staging-to-prod.md)
- **Curious about architecture?** → Read [Hub-and-Spoke Model](architecture/hub-and-spoke-model.md)

---

**Welcome aboard!** The documentation is structured to be navigable, clear, and a true source of truth. If you can't find what you're looking for, check the [FAQ](FAQ.md) or open an issue.
