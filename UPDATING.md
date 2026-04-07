# How to update global-docs

This page is the **single source** for when and how to change global-docs, keep the static site in sync, run documentation health audits, and avoid stale documentation.

---

## 1. When to update (one-off changes vs. full audit)

### One-off updates

Use a normal edit when you are:

- Recording a new rule, standard, or process that came out of day-to-day work
- Fixing a typo, link, or small inaccuracy
- Adding or updating a single doc after a repo/org/tooling change
- Adding a new `.md` file to this repo (and its `site/` page + README index)

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
2. If you add a **new** file: add it to the master index in [README.md](README.md).
3. **In the same commit**, update the matching page under `site/` so the HTML mirrors the markdown ([processes/link-checker-setup.md](processes/link-checker-setup.md) describes automated link checks; there is no automatic md→html sync).
4. If the change is a **major decision**, note it in [processes/setup-history.md](processes/setup-history.md).
5. If the change needs a new user-facing “how do I…?” answer in the FAQ (not update/audit procedure), add or adjust a question in [FAQ.md](FAQ.md) — **do not** paste full update/audit instructions there; keep a pointer to this file instead (see [FAQ.md](FAQ.md)).
6. Commit with a clear message, e.g. `Update ai/languages.md to document OpenClaw rules` or `Sync site/processes/access-tokens.html with markdown`.

### Site sync rule

Markdown and HTML are maintained **together**. When any `.md` file changes, its corresponding `site/...html` file must be updated in the **same commit**.

**Prompt to sync one page** (any AI tool):

```text
The content of [filename].md has been updated.
Update site/[path]/[filename].html to match.
Do not change structural HTML, nav, or shared assets. Update content only.
```

**Prompt to compare many pages** (report only):

```text
Compare every .md file in global-docs with its corresponding .html page in site/.
List any pages where the HTML content does not match the current markdown.
Do not make changes yet. Report discrepancies only.
```

---

## 3. How to run a full documentation audit

### When to run it

- Before major projects (same as above): run an audit **first**, fix **High** issues, then start work.
- After a batch of structural doc changes: run an audit to catch index gaps, broken links, and site drift.

### The audit prompt (copy everything in the block)

Paste the following into any AI tool that has this repo open locally. It is LLM-agnostic and **report-only** (no edits unless you ask for a follow-up).

```text
Before starting, read README.md to understand the purpose and structure of this repo.

I want a full documentation health audit of this global-docs repository,
including the static HTML site in site/.

Background:
- This repo is the single source of truth for how I work across my main GitHub
  account and 5 organizations: javcb-prod, javcb-staging, javcb-templates,
  javcb-archive, and javcb-ai
- AI tools read this repo before starting any project — accuracy and internal
  consistency are critical
- The repo covers: org governance, AI behavior rules, architecture, coding
  standards, process playbooks, an operational model, and a static HTML site
- A static HTML documentation site lives in site/ and should mirror the .md files

Work through every item below. Do not make any changes. Report only.

---

## 1. Registry check

- Confirm architecture/registry.md exists
- Verify every doc that references a cross-repo asset (ai-repo-starter,
  design-system, core libraries) links to the registry instead of
  hardcoding an org/repo location
- Flag every file that hardcodes a location that should defer to the registry

## 2. Master index completeness

- Find README.md and its master index tables
- List every .md file on disk that is NOT referenced in the index
- List every index entry that points to a file that does not exist on disk
- Flag orphaned files not referenced anywhere in the repo

## 3. Internal link integrity — markdown

- Scan every .md file for relative links
- Flag every link pointing to a file or anchor that does not exist
- Include file name and line reference for each broken link

## 4. Site integrity and parity

- Confirm site/ exists with assets/style.css, assets/nav.js, index.html, faq.html
- Confirm site/updating.html exists as a top-level page separate from faq.html
- List every .md file that does not have a corresponding .html page in site/
- List every .html page in site/ that does not have a corresponding .md source file
- Check nav.js sidebar order matches exactly:
  Home → FAQ → How to update docs → Orgs → AI Rules → Architecture → Processes → Standards
- Scan every .html file in site/ for href links pointing to non-existent pages
- Flag any content visible in a .html page that contradicts or is out of sync
  with its source .md file
- Confirm site/assets/nav.js implements localStorage-based sidebar state persistence
- Confirm the active page's nav section is always expanded on load
- Confirm no visible nav reflow or flash occurs on page load
- Confirm font sizes use relative units (rem/em) not fixed px
- Confirm a mobile breakpoint exists in style.css for sidebar collapse

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
2. **Track** fixes as normal one-off updates (section 2): edit `.md`, sync `site/`, update [README.md](README.md) index if you add files.
3. **Re-run** the audit after large fixes if you need confirmation (optional).

**Optional:** use GitHub Actions link checking — [processes/link-checker-setup.md](processes/link-checker-setup.md).

---

## 4. Staleness rule

If something important was decided or changed in a work session, **update global-docs before you close the session** (including the matching `site/` page when a `.md` file changed).

Do not rely on AI chat history or tool memory: **this repo is the durable context** that survives tool and session changes.
