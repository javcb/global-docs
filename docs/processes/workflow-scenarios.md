<!-- type: how-to -->

# Workflow scenarios

This document covers the most common project workflows so AI tools
and team members know the expected path for each scenario.

<div class="maintenance-note">
Start with the scenario that matches your current task. Scenarios are independent.
</div>

---

## Scenario 1: New project from scratch (prototype first)

Use when: you have an idea and need to validate it quickly before
investing in a properly modularized version.

Steps:
1. Create a new repo in javcb-ai from ai-repo-starter template
   (see architecture/registry.md for template location)
2. Set AI-INSTRUCTIONS.md status to: Prototype
3. Instruct AI with the autonomous build prompt from FAQ.md
4. Build freely — modularity is not required at prototype stage
5. When prototype is validated: run maker/checker review
6. Decide: is this worth productionizing?
   - No → archive the repo in javcb-archive
   - Yes → proceed to Scenario 3 (prototype to production)

What AI tools should know:
- Prototype repos live in javcb-ai
- Speed over structure is acceptable here
- README must still document what was built and what to test
- No hardcoded credentials even in prototypes

---

## Scenario 2: New project, production-ready from the start

Use when: you know exactly what you need and have time to build it right.

Steps:
1. Create a new repo in javcb-staging from ai-repo-starter template
2. Set AI-INSTRUCTIONS.md status to: Staging
3. Follow processes/repo-setup-standard.md fully
4. Build with modularity from the start (standards/modularity.md)
5. Run maker/checker review when feature-complete
6. Promote to javcb-prod via processes/promote-staging-to-prod.md

What AI tools should know:
- Reusable logic goes in src/ modules from the start
- Core libraries in javcb-prod should be used where they exist
  (see architecture/registry.md)
- Feature branches required, no direct commits to main

---

## Scenario 3: Promote a prototype to production

Use when: a prototype in javcb-ai has been validated and is worth
productionizing properly.

Steps:
1. Create a new repo in javcb-staging (do not modify the prototype repo)
2. Use the prototype as reference, not as the base
3. Rebuild with proper modular structure using ai-repo-starter
4. Extract reusable logic into src/ modules
5. Replace any hardcoded values with env vars
6. Run maker/checker review
7. Promote to javcb-prod

What AI tools should know:
- Do not copy-paste from prototype; rebuild cleanly using it as a spec
- The prototype stays in javcb-ai as historical reference
- Follow processes/modularization-playbook.md for extraction guidance

---

## Scenario 4: Use production components in a new prototype

Use when: you want to build a quick proof of concept that uses
existing core libraries from javcb-prod.

Steps:
1. Create a new repo in javcb-ai from ai-repo-starter
2. Set AI-INSTRUCTIONS.md status to: Prototype
3. Import core libraries as dependencies (do not copy their code)
4. Build the prototype logic as a thin adapter on top of core libs
5. Keep prototype-specific code clearly separated from library code

What AI tools should know:
- Core libraries are referenced, not modified
- If a core library is missing a needed function, flag it —
  do not add the function inside the prototype repo
- Missing core library functions should be noted in ai/future-ideas.md
  for a proper addition later

---

## Scenario 5: Refactor an existing monorepo

Use when: you have an existing repo with mixed concerns that needs
to be broken into proper modules.

Steps:
1. Confirm all current code is committed and pushed
2. Create a feature branch: refactor/modularize
3. Use ai-repo-starter as the target structure reference
4. Follow processes/modularization-playbook.md
5. Run maker/checker review when restructuring is complete
6. Promote clean modules to javcb-prod

What AI tools should know:
- Preserve all working behavior during refactor
- Do not change logic and structure in the same commit
- One concern per module
- SQL scripts move to sql/ folder or sql-core repo
  (see architecture/registry.md and architecture/sql-strategy.md)
