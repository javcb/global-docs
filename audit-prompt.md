# Global-docs audit prompt

## Note on running this audit

Run this prompt with both Cursor and Claude Code when possible.
They catch different issue types:
- Cursor: better at site/HTML link integrity and file-existence checks
- Claude Code: better at semantic consistency and content duplication detection

Compare findings before making fixes.

---

Run this prompt against the global-docs repo whenever a documentation health
check is needed. This prompt is LLM-agnostic — paste it into any AI tool that
has the repo open locally.

---

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
- Scan FAQ.md for any section containing step-by-step instructions or AI prompts
  that also exist in a detail doc. Flag as duplication violation.
- Scan all .md files for paragraphs that are substantially repeated elsewhere.
  Flag any content that appears in more than one file at the same level of detail.
- Verify README.md contains only index entries and no instructional content
- Verify FAQ.md contains only pointers and one-liner summaries, no full instructions
- Verify UPDATING.md is the only file containing update steps and audit prompt

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