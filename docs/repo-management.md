# Repo Management — Naming, Archival, and Access Policies

**Purpose:** Clear conventions for organizing and managing repositories across organizations, preventing naming confusion, and establishing archival/lifecycle protocols.

---

## Repo Naming Conventions

| Type | Org | Naming Pattern | Example | Purpose |
|------|-----|---------------|---------|---------|
| **Design System** | javcb | `design-system` | `design-system` | Canonical UI tokens, components, blocks — stable, non-versioned |
| **Phase Test** | javcb-ai | `phase[N]-[template]` | `phase5-magic-ui-saas` | Litmus tests for design system phases — disposable sandbox |
| **Client Project** | javcb | `client-[name]` | `client-acme-web` | Production client work — stable, gated access |
| **Template Source** | javcb | `templates-[source]` | `templates-magic-ui-pro` | Template source archives — immutable, read-only |
| **Archived Repos** | javcb-archive | `[original-name]` | `design-system-v1` | Deprecatedhaven't — historical record only |

---

## Organization-Level Policies

### javcb Org (Production)
- **Purpose:** Canonical standards, client work, production-grade code
- **Access:** Gated on CLAUDE.md procedures
- **Changes require:** Architectural review, visual regression check, token audit
- **Maintenance:** Owner-managed, versioned where applicable
- **Repos:**
  - `design-system` — Main system (non-versioned)
  - `client-[name]` — Active projects
  - `templates-[source]` — Template archives

### javcb-ai Org (Sandbox)
- **Purpose:** Experimentation, Phase tests, learning
- **Access:** Open — no gating, no formal procedures
- **Changes:** Independent of production, can be destructive
- **Maintenance:** Can be deleted, archived, or reset at any time
- **Repos:**
  - `phase[N]-[template]` — Phase objectives (disposable)
  - Experimentation and R&D branches
  - Training and example projects

### javcb-archive Org (Historical)
- **Purpose:** Historical record and migration tracking
- **Access:** Read-only reference
- **Repos:** Deprecated versions, replaced systems, previous approaches
- **Cleanup:** Archives >2 years old may be deleted by maintainer

---

## Template Source Repo Policy

**CRITICAL:** The templates source repo is READ-ONLY.

### Claude's Responsibilities
- ✅ Read and reference template files
- ✅ Extract and analyze templates to /extracted/ subfolder
- ✅ Create FIDELITY-BRIEF.md based on extractions
- ❌ Never modify, delete, or reorganize source files
- ❌ Never unzip additional files without explicit instruction
- ❌ Never overwrite or re-zip source archives

### One-Time Extraction Protocol

When Javier instructs a template to be extracted:

1. **Extract to designated subfolder only**
   ```
   templates-[source]/
   ├── [original-zip-structure]  (untouched)
   └── extracted/
       ├── [template-name]/       (extracted contents)
       └── EXTRACTION-LOG.md      (what was found)
   ```

2. **Log extraction in /extracted/EXTRACTION-LOG.md**
   ```markdown
   | Template | Source Zip | Extracted Path | Date | Contents |
   |----------|-----------|-----------------|------|----------|
   | Magic UI Pro | magic-ui-pro.zip | extracted/magic-ui-pro/ | 2026-04-10 | 12 templates, assets |
   ```

3. **Confirm extraction complete**
   - Report what was found
   - Document any issues
   - Note dependencies, assets, code structure

4. **Do NOT extract again** unless Javier explicitly re-issues the instruction
   - Reuse previous extraction
   - Document reuse in FIDELITY-BRIEF.md

---

## GitHub Desktop — Org Association

### Creating Repos (via gh CLI)
When Claude creates repos (using gh CLI):

1. **Never manually initialize**
   - ❌ Don't use File → Add Existing Repository
   - ❌ Don't manually init git and add remote

2. **Always use GitHub Desktop clone UI**
   - ✅ File → Clone Repository
   - ✅ Find repo in javcb-ai or javcb org
   - ✅ Point to existing local folder
   - This ensures proper org association from day one

3. **Why this matters**
   - GitHub Desktop knows which org owns the repo
   - Proper remotes are set up automatically
   - Push/pull workflows work without manual config

---

## Port Conventions

When running template recreation alongside source template for visual QA:

- **Recreation always runs on `:3000`**
  ```bash
  npm run dev  # localhost:3000
  ```

- **Source template runs on `:3001`** (for comparison)
  ```bash
  PORT=3001 npm run dev  # localhost:3001
  ```

- **Side-by-side URL reference**
  ```
  http://localhost:3000 ← Your recreation
  http://localhost:3001 ← Source template (for fidelity comparison)
  ```

---

## Archival Policy

When moving a repo to archive:

### Step 1: Create Archive Report
Claude produces `ARCHIVE-REPORT.md` in the repo:
```markdown
# Archive Report — [Repo Name]

## What This Repo Contained
- Design system v1.0 (deprecated for v2.0)
- 34 hand-crafted components
- Tailwind v3 configuration (now v4)

## What Was Migrated
- Components → design-system (updated to v4)
- Token mappings → MIGRATION-LOG.md
- Storybook stories → version histories

## What Was Discarded
- Legacy shadcn versions (outdated)
- Webpack configs (Vite now standard)
- Storybook 8 (upgraded to v10)

## Why
- Design system v2 replaces v1
- Tailwind CSS v4 requires token restructure
- Storybook 10 with Vite improves performance

## Migration Tracking
- See MIGRATION-LOG.md for component-by-component changes
- Git history preserved for reference
```

### Step 2: Commit Archive Report
```bash
git add ARCHIVE-REPORT.md
git commit -m "docs: archive report for [repo-name]"
```

### Step 3: Move Repo
```bash
# Manually in GitHub.com:
# 1. Owner settings → Danger Zone → Transfer repository
# 2. Select javcb-archive as new owner
# 3. Confirm
```

### Step 4: Update Global Documentation
- Add entry to `global-docs/CHANGELOG.md`:
  ```
  [2026-04-10] Archived `design-system-v1` to javcb-archive
  ```
- Remove from active tooling (GitHub Desktop views, Readme lists, etc.)

### Step 5: Document in Memory
- Save entry to `global-docs/docs/archived-repos.md`:
  ```
  | Repo | Archived | Reason | Notes |
  |------|----------|--------|-------|
  | design-system-v1 | 2026-04-10 | Replaced by v2 | Components migrated |
  ```

---

## Lifecycle Summary

```
┌─────────────────┐
│ CREATION        │
│ (javcb-ai)      │
└────────┬────────┘
         │
    Phase work
    Experiments
         │
    ✅ Successful
         │
    ┌────┴────────────┐
    │                 │
    ▼                 ▼
┌────────┐      ┌─────────────────────┐
│ DELETE │      │ MIGRATE TO MAIN     │
│ (if    │      │ (javcb or archive)  │
│ unused)│      └─────────────────────┘
└────────┘
              Stable Use
                 │
            ┌────┴────────┐
            │             │
         Active ←→ Deprecated
                    │
                 Archive
                 (javcb-archive)
```

---

## Reference Checklist

Before creating or archiving a repo, verify:

- [ ] **Creation:** Correct org assigned (javcb-ai sandbox vs. javcb production)
- [ ] **Naming:** Follows convention pattern
- [ ] **Documentation:** CLAUDE.md or README present
- [ ] **Access:** Permissions match intended lifecycle (public/private)
- [ ] **Archival:** ARCHIVE-REPORT.md created and committed
- [ ] **Migration:** All live work documented before deletion
- [ ] **History:** Repo remains in archive for reference

---

**Last Updated:** 2026-04-10  
**Status:** Complete
