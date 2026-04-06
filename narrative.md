Order of operations (outside-in)

Frame (shell) hardening
Collapsible desktop sidebar (72 → 20 px rail)
Mobile behavior already works (Dialog)
Theme: light / contrast / dark (done)
Route highlighting (you have it)
No raw hex; keep Tailwind colors or tokens (you’re mixed, that’s fine for now)

Templates (page-level patterns)
Pick these and stop. They cover 95% of app pages:
DefaultPageTemplate (stacked sections)
TwoColumnTemplate (main + aside)
DashboardTemplate (responsive cards grid)
DetailHeaderTemplate (entity header w/ actions + meta)
EmptyStateTemplate (first-run / no data)
WizardTemplate (multi-step, optional)

Pages
Copy a template into a page file and paste Tailwind Plus blocks inside BlockSection.
Do not edit block internals; wrap only.

Atoms (later, surgically)
Button, Input first (token-driven)
Then Badge/Alert and DataTable shell if needed

###########################################################################
wrap vs full tokenization:
    Why we modified the shell (and not just wrapped it)

    Global behavior lives here: sidebar open/close, mobile vs desktop, route-aware active nav, profile menu, search input behavior. Wrapping can’t give you that.

        Three appearances, one source of truth: the shell swaps classes across many elements at once (sidebar, header, inputs, menus). That needed the THEME map and central state.

        Contrast mode is special: dark sidebar + light content. A wrapper around the whole page can’t selectively style the sidebar while leaving content light; the shell needs to decide that.

        Net: Tokenizing the shell and adding the appearance presets was the right call.

    Why wrapping is best for the rest (UI blocks)

        Pure presentation: lists/tables/cards/forms don’t need app logic. Wrapping them in a tokenized container gives you consistent bg/text/border/radius/spacing without touching internals.

        Future re-skin: later, change tokens once; blocks inherit the new look automatically.

        Fewer merge headaches: you can paste newer Tailwind Plus blocks later without diff hell.

    Rule of thumb (use this every time)

        Modify when the component:
            controls app state or routing (nav, header, app shell)
            orchestrates multiple areas (sidebar + header + overlays)
            must switch appearance presets across multiple subparts at once

        Wrap when the component:
            is a presentational block from Tailwind UI/Plus (cards, tables, forms, dialogs)
            only needs consistent surface/text/border/radius/spacing
            uses dark: classes (your html.dark toggle already handles it)

###########################################################################
src/components/layouts/PageScaffold.tsx
src/components/layouts/BlockSection.tsx
src/components/layouts/ContentGrid.tsx
src/components/layouts/TwoColumn.tsx
app/layouts-demo/page.tsx (a sandbox page so you can see everything live)

How you’ll use this

Open the Tailwind Plus layout you want from their docs (e.g., split panels, content grid, two-column forms).

Create a file under src/blocks/.../YourBlock.tsx if you want to reuse it; otherwise paste directly into /layouts-demo first.

Wrap it with one of:

BlockSection (default)

BlockSection noChrome (if the block already has its own bg/ring)

ContentGrid (for responsive cards/sections)

TwoColumn (main/aside)

Verify in all three appearances (light, contrast, dark). You should not need to edit the block internals.

Why this works with Tailwind Plus

The application shell is already handled by your SidebarLayout (good).

Tailwind Plus layout blocks expect standard container widths and paddings; PageScaffold gives you that (mx-auto max-w-7xl px-4 sm:px-6 lg:px-8).

The token-aware wrappers ensure consistent surface/text/border/radius across appearances without changing block internals.

If a block uses dark: utilities, your html.dark toggle (we already set that up) will make those work automatically.

###########################################################################
separate templates vs variants

Use variants for styling, not for page structure.
Why:
Templates lock the outside-in pattern (container width, spacing, section chrome) so every page starts consistent.
Variants are great for “chrome on/off” or density, but cramming layout types (page, two-column, grid) into one mega-component becomes unreadable fast.

Created a sandbox route to preview templates before committing to page files:
Navigate to /templates-demo, verify in light / contrast / dark. When you’re happy, copy a template’s contents into a real page file (e.g., app/orders/page.tsx) and start pasting Tailwind Plus blocks inside the BlockSection placeholders. No internal block edits.

TL;DR on variants vs separate files
Separate template files: lock structure and keep mental model simple (Default, TwoColumn, Dashboard). Easy to read, easy to copy.
Variants: use them inside small wrappers like BlockSection (chrome vs plain), not for entire page structures. Variants for structure become a mess.

###########################################################################

You are my blunt auditor. I will attach a zip of the repo at each milestone.

INCREMENTAL AUDIT RULES
- This is an incremental audit. Keep all previously valid sections verbatim. Only add new wins/changes and adjust sections that are now outdated.
- Do not remove prior content unless it is factually wrong based on the attached zip; if so, call it out under "What Changed Since Last Snapshot".
- Assume a Next.js app. Audit what’s actually in the zip (no guessing). If critical files are missing, name exact paths.

OUTPUT FORMAT
Return the entire answer inside a fenced code block labeled `markdown`. Use only plain ASCII bullets and headings. No smart quotes or fancy punctuation. Start with:
```markdown
...content...


TASK
1) Review the attached zip thoroughly.
2) Summarize the current state by updating my “Project Snapshot” doc with:
   - What works now
   - What changed since last snapshot (high-level file diffs)
   - Risks / smells (why they matter, quickest fix)
   - Decisions made (and the tradeoffs)
   - What’s next (short, high-impact checklist)
3) Keep the “outside-in” framing: shell/layout first, tokens/design-system second, pages third.
4) Stay aligned with goals: token-driven, no hardcoded colors, one theme state, reusable atoms.


WHEN REVIEWING, CHECK AT MINIMUM
- App shell wiring:
  - `app/layout.tsx` mounts the shell correctly.
  - Only one AppShell; no duplicates.
- Theme system:
  - One source of truth for appearance (`light` / `contrast` / `dark`) with persistence.
  - FAB is theme-aware and uses the same state (no duplicate hooks).
  - `SidebarLayout` consumes the appearance prop and uses a THEME map (light/contrast/dark).
- Tokens:
  - If `tokens.css` (or equivalent) exists, confirm tokens are used in shell and atoms.
  - Identify any hardcoded colors that should be tokenized (list file:line).
- Components:
  - Shared atoms (Button/Input/Badge/Table/Card) exist or note missing.
  - Variants use tokens (not ad-hoc classes).
- Tailwind/TS config:
  - Tailwind scans `./src/**/*`.
  - `tsconfig` has `@/*` → `src/*`.
- A11y/contrast:
  - Spot-check contrast across themes; flag issues with quick fixes (token-level first).

OUTPUT FORMAT
- Return the entire audit inside a fenced code block using the markdown language tag exactly like this: ```markdown
- Use only plain ASCII bullets and headings. No smart quotes or fancy punctuation.
- Use the following sections in this order:
# 1) Project Snapshot (today)
# 2) What Changed Since Last Snapshot
# 3) Risks / Smells (with fixes)
# 4) Decisions (and why)
# 5) What’s Next (checklist)
# 6) File-Level Notes (path + short note; include exact lines only when it saves time)
# 7) Appendix (if needed): snippets of corrected files (complete files only when necessary)

STYLE
- Be direct. No fluff. No code changes unless asked; if a file is broken, paste a full corrected file under “Appendix”.
- Prefer token-level fixes over per-component tweaks.
- If something blocks progress, put it first.
- If the zip is missing critical files, say exactly which paths are missing and what to add.

CONTEXT TO REMEMBER
- Outside-in approach.
- Three appearances: light, contrast (dark sidebar + light content), dark (full dark).
- We’ll gradually replace Tailwind color utilities with tokens; don’t over-engineer now.

########################################################################################################################

# 1) Project Snapshot (today)

Goal: build outside-in. Lock the shell/layout and global appearance first, then add modules. Use tokens instead of hardcoded colors. One source of truth for theme.

Working now (cumulative):
- App shell renders (sidebar + header).
- Root layout mounts the shell correctly.
- Three appearances: light, contrast (dark sidebar + light content), dark (full dark).
- Theme state: single source of truth with persistence (localStorage) and html.scheme-dark toggle.
- FAB theme selector present, using shared state; glass style so it reads well across themes.
- Token file in place: src/styles/tokens.css with color aliases and UI prefs (radius, density, spacing).
- Settings page for UI prefs (radius, density, card spacing) with hydrator applying saved tokens on load.
- Tokenized primitives started: Card reads --radius, --space-card, and color tokens.
- Module scaffold pattern in place: ModuleScaffold + template page.
- New route live: Maintenance page using the scaffold.

Why outside-in (unchanged):
- Changing shell + tokens later is expensive. Do it first.
- Pages inherit styles automatically.
- One theme state makes future brand/theme changes cheap.

What we built (plain English, cumulative)
1) Global wrapper
   - app/layout.tsx = minimal root wrapper
   - src/components/AppShell.tsx = client shell that reads theme, renders SidebarLayout, and shows FAB

2) Appearance state
   - Single source of truth: "light" | "contrast" | "dark"
   - Persists to localStorage
   - Sets scheme-dark class on <html> for Tailwind dark utilities

3) Themed shell
   - src/components/layouts/SidebarLayout.tsx
   - THEME map drives sidebar, header, search, menus
   - Router-aware active state via usePathname (no more ad-hoc current flags)

4) Theme selector (FAB)
   - src/components/AppearanceFab.tsx receives appearance and setAppearance as props (no duplicate hooks)
   - Glassy, theme-agnostic styles

5) Tokens
   - src/styles/tokens.css adds color aliases and UI prefs
   - No visual change by default; tokens map to Tailwind palette

6) UI prefs
   - app/settings/page.tsx toggles --radius, --density, --space-card
   - src/components/PrefsHydrator.tsx reapplies saved prefs on load

7) Scaffolding for pages
   - src/components/layouts/ModuleScaffold.tsx
   - app/templates/module/page.tsx as a copy-start template
   - app/maintenance/page.tsx wired and using tokens

Dependency map (unchanged)
- app/layout.tsx -> AppShell
  - AppShell -> appearance state (single source)
  - AppShell -> SidebarLayout (consumes appearance)
  - AppShell -> AppearanceFab (reads/sets appearance)

# 2) What Changed Since Last Snapshot

New since the last doc:
- Added src/styles/tokens.css with:
  - Color aliases: --color-bg, --color-surface, --color-text, --color-muted, --color-border, --color-primary
  - UI prefs: --radius, --space-card, --density, --control-px/py
- Added Settings flow:
  - app/settings/page.tsx for radius/density/spacing controls
  - src/components/PrefsHydrator.tsx to apply saved prefs at startup
- Lifted theme state to AppShell and passed to AppearanceFab (removes duplicate state risk)
- Made FAB styling theme-agnostic (glass look)
- Created scaffold and template:
  - src/components/layouts/ModuleScaffold.tsx
  - app/templates/module/page.tsx
- Shipped first tokenized module page: app/maintenance/page.tsx
- SidebarLayout:
  - Replaced current flags with route-aware active state
  - Ensured imports and class maps are clean, compile-safe

# 3) Risks / Smells (with fixes)

1) Partial token adoption
- Risk: components still using raw Tailwind colors will drift from tokens over time.
- Fix: keep migrating atoms (Button, Input, Table, Badge) to tokens for surface/text/border and spacing/radius. Do it incrementally.

2) Tailwind/TS config visibility
- Risk: if tailwind.config and tsconfig are not scanning ./app/**/* and ./src/**/*, classes or aliases could be missed.
- Fix: verify:
  - Tailwind content includes: ./app/**/*.{js,ts,jsx,tsx}, ./src/**/*.{js,ts,jsx,tsx}
  - tsconfig paths: "@/*": ["src/*"]

3) A11y contrast in contrast mode
- Risk: contrast mode mixes dark sidebar with light content. Some grays or focus rings may be borderline.
- Fix: token-level nudge:
  - Ensure --color-text and --color-muted meet WCAG on --color-surface
  - Prefer ring-[color:var(--color-primary)]/40 for focus visibility

4) Dead code and backups
- Risk: useAppearance_old.ts can confuse future work.
- Fix: delete once you are confident the new theme state is stable.

# 4) Decisions (and why)

- Keep three appearances only (light, contrast, dark) to limit surface area.
- Tokens alias the Tailwind palette for now; re-skin = edit tokens, not components.
- One theme state, lifted to AppShell, to avoid desync and prop drilling hacks.
- Start atoms migration with minimal footprint (Card first) to make progress visible without a yak-shave.

# 5) What’s Next (checklist)

- [ ] Verify Tailwind and TS config (paths and content globs).
- [ ] Tokenize the Home page container (surface/text/border) if not already done.
- [ ] Extract and tokenize these atoms:
      - [ ] Button (use --color-primary, --radius, --control-px/py)
      - [ ] Input (same tokens; ensure focus ring is theme-visible)
      - [ ] Badge (semantic tones; keep readable on all appearances)
      - [ ] Table (row density hooks into --density)
- [ ] Add placeholder routes for Team, Projects, Calendar, Documents, Reports for active nav state.
- [ ] Quick A11y pass:
      - [ ] Validate contrast for text and interactive states across all three appearances
      - [ ] Bump tokens (not per-component classes) if needed
- [ ] Remove useAppearance_old.ts after a day or two of stable testing.

Optional:
- [ ] Add /style-guide page to preview tokens and atoms together.

# 6) File-Level Notes

- app/layout.tsx
  - Good. Mounts AppShell. Include PrefsHydrator before shell (you did this).

- src/components/AppShell.tsx
  - Correct: source of truth for appearance. Pass props to FAB.

- src/components/AppearanceFab.tsx
  - Now prop-driven and glass-styled. Good for all themes.

- src/components/layouts/SidebarLayout.tsx
  - Route-aware active state via usePathname. THEME map reflects original visuals. Keep token overlays in header/content only (as you have).

- src/styles/tokens.css
  - Color aliases and UI prefs in place. No visual change, future-proofed. Good.

- src/components/ui/Card.tsx
  - Reads --radius, --space-card, and color tokens. Model for other atoms.

- app/settings/page.tsx + src/components/PrefsHydrator.tsx
  - Prefs apply instantly and persist. Good foundation for future tokens (buttons/inputs/tables).

- app/templates/module/page.tsx + src/components/layouts/ModuleScaffold.tsx
  - Clean scaffold for fast module spin-up. Keep using for new pages.

- app/maintenance/page.tsx
  - Solid example of tokenized content using the scaffold.

- src/lib/useAppearance_old.ts
  - Safe to delete when comfortable.

# 7) Appendix (if needed)

No full file replacements needed right now. If you want, I can paste complete Button/Input/Badge/Table atoms wired to tokens as drop-ins.

# Prompt template tweak

Add this at the top of your prompt so audits stay incremental:
- "This is an incremental audit. Keep all previously valid sections verbatim. Only add new wins/changes and adjust sections that are now outdated."
