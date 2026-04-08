<!-- type: reference -->

# Open items

This is the living backlog for global-docs.
Every audit must review this file, mark completed items, and add newly discovered items.
Items are ordered by priority within each section.

---

## How to use this file

- During an audit: check each item, mark completed ones with ✅, add new findings
- When completing an item outside an audit: mark it ✅ and add completion date
- When adding a new item: add it to the correct priority section with a brief description
- Completed items older than 30 days can be moved to the bottom under "Completed archive"

---

## 🔴 Do before any project starts

- [ ] Fill in context/about-me.md with real content (not TODO stubs)
- [ ] Fill in context/roles.md with real content
- [ ] Fill in context/priorities.md with real content
- [ ] Fill in context/constraints.md with real content
- [x] Go through all existing prompts in global-docs and reformat to prompt code block standard per standards/prompt-format.md (Apr 7, 2026)
- [x] Verify audit-prompt.md uses prompt code block format for its main prompt (Apr 7, 2026)
- [x] Migrated documentation site to MkDocs Material with GitHub Pages auto-deploy (Apr 7, 2026)
- [ ] Add "re-read global-docs at every session start" rule to ai-repo-starter/AI-INSTRUCTIONS.md
- [ ] Verify ai-repo-starter exists in correct org (see architecture/registry.md)
- [ ] Confirm all 5 GitHub orgs have fine-grained PATs enabled and tokens created

## 🟠 Do after first project

- [ ] Write first post-mortem using processes/post-mortem.md format
- [ ] Start dependency table in architecture/registry.md as first real project creates deps
- [ ] Assess whether MkDocs migration is worth doing (see architecture/registry.md note)

## 🟡 Do when team members join

- [ ] Write processes/team-onboarding.md
- [ ] Review which global-docs sections need simplification for non-owner readers
- [ ] Set up read-only access tokens for team members

## 🔵 Ongoing / recurring

- [ ] Run audit-prompt.md before every major project
- [ ] Update OPEN-ITEMS.md as part of every audit
- [ ] Update processes/setup-history.md when major decisions are made

---

## Completed archive

<!-- Move completed items here with ✅ and date when older than 30 days -->
