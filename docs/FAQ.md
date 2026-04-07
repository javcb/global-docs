# Quick reference FAQ

This is your fast-access cheatsheet. For full details, follow the "Go deeper" links.

---

## Documentation updates and audits

For documentation update instructions and the full audit prompt,
see [UPDATING.md](UPDATING.md).

---

## Where do I start if I've been away for a while?

1. Read [orgs/overview.md](orgs/overview.md) — remind yourself what each org is for
2. Read [ai/base-rules.md](ai/base-rules.md) — refresh the AI operating rules
3. Check [processes/setup-history.md](processes/setup-history.md) — review major decisions made so far
4. Check [ai/future-ideas.md](ai/future-ideas.md) — anything you parked that needs attention
5. Pick up where you left off using the master index in [index.md](index.md)

---

## How do I update the design system?

### When to update
- You add a new purchased UI kit or component library
- You define new atoms, molecules, or organisms
- You discover a missing component during a project
- An AI tool invents a component instead of using one from the system

### Steps
1. Open `javcb-templates/design-system`
2. Add or update the relevant atomic layer (atoms/molecules/organisms/templates/foundations)
3. Update `global-docs/ai/design-system.md` if the usage rules for AI change
4. If a new component category is added, update the design system README

### AI prompt to use

```prompt
# Intended for: Cursor

Read global-docs/ai/design-system.md and javcb-templates/design-system/index.md.
I want to add [describe component or kit].
Propose where it fits in the atomic design structure (atom/molecule/organism/template).
Suggest the documentation format to use, consistent with existing entries.
Do not build anything yet. Propose the plan first.
```

### If updating from a purchased kit

```prompt
# Intended for: Claude Code

Read global-docs/ai/design-system.md.
I have a new UI kit: [kit name and description].
Extract atoms, molecules, and organisms from this kit.
Document each using the format in design-system/atoms/ as reference.
Flag anything that conflicts with existing components.
```

Go deeper: [ai/design-system.md](ai/design-system.md), `javcb-templates/design-system/` (external repo path)

---

## How do I start a project?

There are several common scenarios. See [processes/workflow-scenarios.md](processes/workflow-scenarios.md)
for the full step-by-step path for each:

- New prototype (quick and dirty): Scenario 1
- New production-ready project: Scenario 2
- Promote a prototype to production: Scenario 3
- Use prod components in a prototype: Scenario 4
- Refactor an existing monorepo: Scenario 5

**Quick start for any scenario:**
1. Check [architecture/registry.md](architecture/registry.md) for template and library locations
2. Clone ai-repo-starter into the correct org
3. Read AI-INSTRUCTIONS.md in the new repo before writing any code

---

## How do I refactor an existing repo (e.g. a monorepo)?

### Steps
1. Make sure all current code is committed and pushed
2. Create a branch: `refactor/modularize` or similar
3. Clone `ai-repo-starter` as a reference for target structure
4. Hand to AI with the prompt below

### AI prompt to use

```prompt
# Intended for: Claude Code

Read AI-INSTRUCTIONS.md and all linked global-docs files before starting.
I want to refactor this repo from a monorepo into a properly modular structure.
Use javcb-ai/ai-repo-starter as the target structure reference.
Do not change any working behavior.
Step 1: propose a reorganization plan showing current structure vs target structure.
Wait for my approval before moving any files.
```

Go deeper: [processes/modularization-playbook.md](processes/modularization-playbook.md)

---

## How do I run a maker/checker review?

### When to use
- A feature or project build is complete in staging or ai sandbox
- Before promoting any repo from staging to prod

### Maker prompt (Cursor or Claude Code — building)

```prompt
# Intended for: Cursor or Claude Code

Read AI-INSTRUCTIONS.md and all linked global-docs files.
Build [describe the feature or project].
Work on branch feature/[name]. Do not push to main.
When done, update README review notes with what was built, what to test, and what is incomplete.
```

### Checker prompt (Claude — reviewing)

```prompt
# Intended for: Claude Code

Review the diff or the files I will share with you.
Check for:
- bugs or missing error handling
- security issues (hardcoded credentials, unsafe defaults)
- violations of global-docs rules (see links in AI-INSTRUCTIONS.md)
- missing .env.example entries or README updates

Do not rewrite anything. List issues only, with file and line references where possible.
```

Go deeper: [processes/maker-checker.md](processes/maker-checker.md)

---

## How do I promote a repo from staging to prod?

### Checklist before promoting
- [ ] Maker/checker review completed and issues resolved
- [ ] README is complete and accurate
- [ ] .env.example lists all required variables
- [ ] No hardcoded credentials anywhere
- [ ] Feature branch merged to main in staging repo
- [ ] Repo follows standard structure from ai-repo-starter
- [ ] Transfer repo to javcb-prod org via GitHub Settings → Transfer ownership

Go deeper: [processes/promote-staging-to-prod.md](processes/promote-staging-to-prod.md)

---

## How do I add a new AI tool?

### Steps
1. Create a scoped access token for the tool (see [processes/access-tokens.md](processes/access-tokens.md))
2. Give the tool only the token it needs (read-only for docs/templates, write for sandbox)
3. In each repo the tool will work in, confirm AI-INSTRUCTIONS.md is present and links to global-docs
4. Test with a small, low-risk task before using on real work

### Onboarding prompt for any new AI tool

```prompt
# Intended for: any new AI tool

Before we start any work, read the following files:
- AI-INSTRUCTIONS.md (in this repo)
- ai/base-rules.md
- ai/languages.md
- ai/personas.md
- ai/security.md

Confirm you have read them by summarizing the key rules that apply to this repo.
Then wait for my first task.
```

Go deeper: [processes/access-tokens.md](processes/access-tokens.md)

---

## How do I use the design system in a new UI project?

### AI prompt to use
Read global-docs/ai/design-system.md before building any UI.
Use only components documented in javcb-templates/design-system/.
Reference components by their exact names (e.g. PrimaryButton atom, large variant).
Do not create new components. If something is missing, flag it and I will decide.
Apply Apple/Netflix-level design standards: clean, minimal, strong hierarchy.

Go deeper: [ai/design-system.md](ai/design-system.md)


