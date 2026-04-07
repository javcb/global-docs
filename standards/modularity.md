# Modularity and centralization standards

## Core principle

Shared elements are defined once and referenced everywhere.
No copy-pasting of structural, styling, or behavioral code across files.

## What this means per context

### HTML/CSS/JS projects
- Shared layout, navigation, header, footer: driven from one JS module or include
- Shared styles: one CSS file (or one design-token-based stylesheet)
- Shared scripts: one JS file per concern (nav.js, search.js, etc.)
- Each page contains only its unique content plus the minimal shell to load shared assets
- If a structural element appears in more than one place, it belongs in a shared module

### Python projects
- Shared logic (connections, logging, config, utilities): extracted into src/ modules
- Scripts and workflows import from modules; they do not reimplement shared logic
- If the same pattern appears in two scripts, it belongs in a module

### UI component projects (design system)
- Follow atomic design: atoms → molecules → organisms → templates → pages
- No one-off components; every UI element traces back to the design system
- New UI work uses existing components by name; does not re-implement from scratch

### SQL
- Reusable logic belongs in views or stored procedures, not repeated inline
- CTEs are preferred over subquery repetition within a single query

## Rule for AI tools

Before adding any new page, component, script, or module, ask:
- Does a shared version of this already exist?
- If yes: use it, do not duplicate it.
- If no: create it as a shared/reusable asset, then reference it.

Never add a structural or behavioral element to a single file
if it is likely to be needed in more than one place.

## Violation signals

Flag these as modularity violations:
- The same CSS class defined in multiple files
- The same nav/header/footer HTML block in multiple pages
- The same database connection logic in multiple scripts
- The same utility function copied across modules
- A UI component built from scratch when one exists in the design system

---

## Documentation hierarchy

The same principle that prevents code duplication also prevents documentation duplication.

Rules:
- One topic belongs in exactly one file at exactly one level of detail
- Higher-level documents (README, FAQ, index pages) point DOWN to detail files.
  They do not duplicate the detail
- Cross-references go downward (index → detail) not sideways (detail → detail)
  or upward (detail → index)
- When updating a topic, you update exactly one file
- If the same instruction appears in two files, one of them is wrong

Hierarchy for this repo:
- README.md → master index, points to everything, contains no detail itself
- FAQ.md → task-oriented pointers only, links to detail docs, no duplicated instructions
- UPDATING.md → single source for all update and audit instructions
- ai/, processes/, standards/, architecture/, orgs/ → detail files, one topic each
- site/ → mirrors the above, never contains unique content not in a .md source

Duplication signals to flag in audits:
- The same step-by-step instructions appear in more than one file
- A FAQ entry contains full instructions instead of a pointer + link
- A process doc contains rules that belong in a standards doc
- An AI prompt appears in more than one place