# Project Lifecycle — Full Build Process

**Version:** 2026-04-10  
**Status:** Operational  

This workflow is invoked by:
- `create website [name] in repo [repo]` command
- `recreate template [name]` command (phases 1-3 only)

---

## Overview

Every project built in this workspace follows this lifecycle.
Phases 1-3 apply to all projects.
Phase 4 applies to template recreations only.
Phase 5 applies to all projects before marking complete.

---

## Phase 1 — Repo Initialization

### Steps:

**1. Determine org from context:**
```
Sandbox/test/phase work → javcb-ai org
Production/client work → javcb org (switch to GATED mode)
If unclear, ask: "Is this sandbox or production?"
```

**2. Create repo via GitHub CLI:**
```bash
gh repo create [org]/[repo-name] --private --clone
```

**3. Navigate into repo:**
```bash
cd [repo-name]
```

**4. Initialize Next.js project:**
```bash
npx create-next-app@latest . --typescript --tailwind \
--eslint --app --src-dir --import-alias "@/*" --no-git
```

**5. Install design system dependencies:**
- Copy tokens from `design-system-shadcn-tailwind/src/tokens/`
- Copy `shadcn-bridge.css` 
- Install shadcn/ui: `npx shadcn@latest init`
- Configure `tailwind.config.ts` to use design system tokens
- Set up `globals.css` with token imports

**6. Install animation dependencies:**
```bash
npm install framer-motion
```

**7. Copy core magic components needed for this project from:**
```
design-system-shadcn-tailwind/src/components/magic/
```

**8. Verify setup:**
```bash
npm run build          # must pass with 0 errors before proceeding
npm run typecheck      # must pass before proceeding
```

**9. Initial commit:**
```bash
git add . && git commit -m "init: project scaffold with design system"
git push -u origin main
```

### Checkpoint:
✅ Build passes, repo exists in correct org, initial commit pushed  
Log any issues to EXECUTION-LOG.md before proceeding.

---

## Phase 2 — Component Planning

**Before writing any section or page code:**

1. **Read the project brief or template spec**

2. **List every UI section/pattern needed**

3. **For each item, check in order:**
   - [ ] `src/components/magic/` — custom animated components
   - [ ] `src/components/ui/` — shadcn primitives  
   - [ ] `src/blocks/` — full section blocks (check INDEX.md)
   - [ ] Build new only if not found in above

4. **Produce a COMPONENT-PLAN.md:**

   | Section | Pattern | Source | Notes |
   |---------|---------|--------|-------|
   | Hero | HeroSection | blocks/hero-01 | Needs animation |
   | Pricing | PricingTable | build new | 3-tier required |

5. **If building a template recreation:**
   - Run all `fidelity-mode.md` extraction steps NOW
   - Create `FIDELITY-BRIEF.md` before Phase 3

### Checkpoint:
✅ COMPONENT-PLAN.md exists  
✅ If recreation: FIDELITY-BRIEF.md exists with all 5 tables complete

---

## Phase 3 — Build

**Build order (always bottom-up):**
1. `theme-override.css` (if recreation — colors/fonts from FIDELITY-BRIEF.md)
2. Smallest reusable components first (atoms)
3. Composite components (molecules)
4. Section components (organisms)
5. Page assembly
6. Navigation and layout wrappers
7. Responsive passes at 375px, 768px, 1280px

### Build Rules:
- **Shop-first:** check existing components before building
- **Token-first:** no hardcoded hex values ever
- **Padding rule:** every section container gets explicit padding-inline at all 3 breakpoints
- **No content bleeds:** to viewport edge at any breakpoint
- **TypeScript:** run `npm run typecheck` after every major component

### After all sections built:
```bash
npm run build       # must pass with 0 errors
npm run typecheck   # must pass
```
Fix all errors before proceeding to Phase 4/5

### Checkpoint:
✅ Full build passes  
✅ All sections render at all breakpoints

---

## Phase 4 — Fidelity QA (Recreation Only)

**Skip this phase for net-new projects.**

1. **Run visual QA** per `fidelity-mode.md § Step 7`

2. **Screenshot at 375px, 768px, 1280px** for each major section:
   - Hero
   - Features/Benefits
   - Pricing (if present)
   - Social proof (if present)
   - CTA / Footer

3. **Score all 7 fidelity dimensions** from fidelity-mode.md

4. **Any dimension below 6/10:** fix before proceeding

5. **Target:** ≥8/10 across all dimensions

6. **Add screenshot paths and scores** to RECREATION-REPORT.md

### Checkpoint:
✅ All dimensions ≥8/10 with screenshot evidence

---

## Phase 5 — Delivery

1. **Final build check:**
   ```bash
   npm run build       # must pass
   ```

2. **Final typecheck:**
   ```bash
   npm run typecheck   # must pass
   ```

3. **Token audit:** scan for hardcoded hex values (must be clean)

4. **Accessibility spot check:**
   - [ ] All images have alt text
   - [ ] All interactive elements have aria labels
   - [ ] Color contrast passes at AA level

5. **Git:**
   ```bash
   git add .
   git commit -m "feat: [project-name] — complete"
   git push
   ```

6. **Create delivery report:**
   - For recreations: `RECREATION-REPORT.md`
   - For new projects: `PROJECT-REPORT.md`

7. **Report must include:**
   - GitHub URL
   - localhost preview URL
   - Build status ✅/❌
   - TypeScript status ✅/❌
   - For recreations: fidelity scores with screenshot paths
   - Issues encountered and how resolved
   - Recommended next steps

### Completion Signal:
```
[project-name] complete — [GitHub URL] — build ✅ — typecheck ✅
```

---

## Troubleshooting

**Build fails during Phase 1:**
- Check Node.js version (require 18-20 LTS)
- Delete `node_modules` and `package-lock.json`
- Run `npm install` fresh
- Try `npm run build` again

**TypeScript errors in existing components:**
- These are expected if using mismatched token names
- Run: `npm run typecheck | grep "error"` to isolate
- Fix in the component, not in tokens.css (use theme-override.css instead)

**Recreation looks different at certain breakpoint:**
- Screenshot both source (localhost:3001) and recreation (localhost:3000)
- Compare side-by-side at problematic viewport
- Likely: missing responsive padding rule or breakpoint-specific layout
