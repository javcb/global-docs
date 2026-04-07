# How to update global-docs

This page is the **single source** for when and how to change global-docs, run documentation health audits, and avoid stale documentation.

---

## How the documentation site is published

The documentation site at https://javcb.github.io/global-docs/ is auto-generated
from the markdown files in this repo using MkDocs Material.

**You never manually update the site.** The only thing you edit is markdown files.

### How publishing works

1. You edit or add a `.md` file in this repo
2. You push to `main`
3. GitHub Actions runs `.github/workflows/deploy-docs.yml` automatically
4. MkDocs builds the site from all markdown files
5. The built site is pushed to the `gh-pages` branch
6. GitHub Pages serves it live at https://javcb.github.io/global-docs/

Build time is approximately 30–60 seconds after pushing.

### To preview before pushing

```bash
pip install -r requirements-docs.txt   # one-time setup
mkdocs serve                           # starts local server
```

Then open http://127.0.0.1:8000 — full nav, search, and styling work here.
Hot-reloads as you save changes. Use this to check formatting before pushing.

### To add a new page

1. Create the `.md` file in the appropriate folder
2. Add it to the `nav:` section of `mkdocs.yml` in the correct position
3. Push to `main` — the site updates automatically

### What not to do

- Do not edit anything inside `site/` — it is auto-generated and gitignored
- Do not run `mkdocs build` and commit the output — the workflow handles this
- Do not manually upload files to the `gh-pages` branch

---

## 1. When to update (one-off changes vs. full audit)

### One-off updates

Use a normal edit when you are:

- Recording a new rule, standard, or process that came out of day-to-day work
- Fixing a typo, link, or small inaccuracy
- Adding or updating a single doc after a repo/org/tooling change
- Adding a new `.md` file to this repo (and adding it to mkdocs.yml nav + README index)

### Full documentation audit

Run a **full audit** (see section 3) when:

- You are about to start a **major project** or large refactor that will lean on global-docs
- You have made **many doc changes** in a short time and want a consistency check
- Something feels “off” (broken links, duplicated rules, site out of sync) and you want a structured review

Audits are **read-only reports** unless you then apply fixes as separate edits.

---

## 2. How to do a one-off update

### Steps

1. Edit the relevant `.md` file (right file, right section).
2. If you add a **new** file:
   - Add it to the master index in [index.md](index.md)
   - Add it to the nav in `mkdocs.yml`
3. If the change is a **major decision**, note it in [processes/setup-history.md](processes/setup-history.md).
4. If the change needs a new user-facing “how do I…?” answer in the FAQ (not update/audit procedure), add or adjust a question in [FAQ.md](FAQ.md) — **do not** paste full update/audit instructions there; keep a pointer to this file instead (see [FAQ.md](FAQ.md)).
5. Commit with a clear message, e.g. `Update ai/languages.md to document OpenClaw rules` or `Add processes/new-process.md and update mkdocs.yml nav`.

### Site auto-generation

The documentation site auto-generates from markdown on every push to main.

To preview your changes locally before pushing:
```bash
pip install -r requirements-docs.txt
mkdocs serve
```
Then open http://127.0.0.1:8000 and verify your changes look correct.

---

## 3. How to run a full documentation audit

### When to run it

- Before major projects (same as above): run an audit **first**, fix **High** issues, then start work.
- After a batch of structural doc changes: run an audit to catch index gaps, broken links, and site drift.

### The audit prompt (copy everything in the block)

Paste the following into any AI tool that has this repo open locally. It is LLM-agnostic and **report-only** (no edits unless you ask for a follow-up).

```text
Before starting, read index.md to understand the purpose and structure of this repo.

I want a full documentation health audit of this global-docs repository.

Background:
- This repo is the single source of truth for how I work across my main GitHub
  account and 5 organizations: javcb-prod, javcb-staging, javcb-templates,
  javcb-archive, and javcb-ai
- AI tools read this repo before starting any project — accuracy and internal
  consistency are critical
- The repo covers: org governance, AI behavior rules, architecture, coding
  standards, process playbooks, and an operational model
- The documentation site auto-generates from markdown via MkDocs and GitHub Actions

Work through every item below. Do not make any changes. Report only.

---

## 1. Registry check

- Confirm architecture/registry.md exists
- Verify every doc that references a cross-repo asset (ai-repo-starter,
  design-system, core libraries) links to the registry instead of
  hardcoding an org/repo location
- Flag every file that hardcodes a location that should defer to the registry

## 2. Master index completeness

- Find index.md and its master index tables
- List every .md file on disk that is NOT referenced in the index
- List every index entry that points to a file that does not exist on disk
- Flag orphaned files not referenced anywhere in the repo

## 3. Internal link integrity — markdown

- Scan every .md file for relative links
- Flag every link pointing to a file or anchor that does not exist
- Include file name and line reference for each broken link

## 4. Documentation site configuration

- Confirm .github/workflows/deploy-docs.yml exists and is correctly configured
- Confirm site/ is in .gitignore (not manually committed)
- Confirm mkdocs.yml nav includes every .md file in the repo
- Confirm no .md files are referenced in mkdocs.yml nav that do not exist on disk
- Confirm docs/assets/extra.css exists with proper Material theme customizations
- Confirm requirements-docs.txt exists with mkdocs, mkdocs-material, and mkdocs-minify-plugin

## 5. Terminology consistency

- Confirm "main GitHub user account" and org names (javcb-prod, javcb-staging,
  javcb-templates, javcb-archive, javcb-ai) are used consistently throughout
- Flag any file that confuses the main account with an org
- Confirm local machine folder paths are consistent across all docs that reference them

## 6. Rules consistency

- Find any rule, process, or standard that appears in more than one file
  with different or conflicting content
- Flag any content that should be consolidated into one canonical location
- Check that ai/base-rules.md, ai/languages.md, ai/security.md, and
  standards/modularity.md do not contradict each other

## 7. Placeholder audit

- List every file or section marked TODO, "not yet built", or "placeholder"
- Confirm each is clearly labeled as such and not presented as active content
- Flag any placeholder that appears in a visible HTML page without a draft label

## 8. AI readiness check

- Read AI-INSTRUCTIONS.md at the repo root
- Verify every linked file path is valid
- Confirm the file gives a new AI tool enough orientation to understand the
  repo and find the rules it needs without any prior conversation history
- Flag anything that would confuse a first-time reader

## 9. Coverage check

Confirm the following files exist and contain substantive or clearly labeled
placeholder content:
- architecture/registry.md
- processes/operational-model.md
- processes/ai-tool-setup.md
- processes/expansion-roadmap.md
- processes/link-checker-setup.md
- standards/modularity.md
- context/about-me.md
- context/roles.md
- context/priorities.md
- context/constraints.md
- FAQ.md at repo root
- UPDATING.md at repo root

---

## Report format

Group findings by severity: High / Medium / Low

For each finding:
- File name and location (line or section if possible)
- What the problem is
- Suggested fix

End with:
- Overall health score: 1–10
- Single most important fix to do first
- Any patterns in the issues that suggest a systemic problem to address
```

The machine-readable source of this checklist also lives in [audit-prompt.md](audit-prompt.md); this section embeds the same prompt so you can run an audit without hunting for the file.

### What to do with audit findings

1. **Triage** by severity (fix High first: wrong org pointers, broken links, missing security guidance).
2. **Track** fixes as normal one-off updates (section 2): edit `.md`, sync `site/`, update [index.md](index.md) index if you add files.
3. **Re-run** the audit after large fixes if you need confirmation (optional).

**Optional:** use GitHub Actions link checking — [processes/link-checker-setup.md](processes/link-checker-setup.md).

---

## 4. Staleness rule

If something important was decided or changed in a work session, **update global-docs before you close the session**.

Do not rely on AI chat history or tool memory: **this repo is the durable context** that survives tool and session changes.

When you push changes to main, the documentation site automatically updates within seconds via the GitHub Actions workflow.
