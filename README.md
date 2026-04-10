<!-- type: reference -->

# javcb Standards & Documentation

Central documentation hub for all standards, workflows, and AI instructions across the javcb GitHub profile.

**What this is:** The canonical reference for how to build, design, and collaborate using the design system and organizational processes.

**Who it's for:** Developers, AI assistants (Claude, Cursor), and anyone building projects with the design system.

**How to use it:** Read the quick start below, then navigate to the specific guides you need.

---

## Quick Start

### For Starting a New Build Session (any project)

1. **Always begin here:** 
   ```
   prompts/audit-trigger.md
   ```
   Paste this prompt into Claude Code to confirm what's complete and what needs work.

2. **Choose your task:**
   - Recreating a template? → `docs/design-system/ai-usage-guide.md`
   - Building a new feature? → `docs/design-system/component-guide.md`
   - Analyzing a competitor? → `docs/workflows/competitive-analysis.md`
   - Harvesting a UI pattern? → `docs/workflows/pattern-harvest.md`

3. **Refer to the design system:**
   - Find components: `design-system-shadcn-tailwind/docs/component-inventory.md`
   - Find blocks: `design-system-shadcn-tailwind/src/blocks/INDEX.md`
   - Check template readiness: `design-system-shadcn-tailwind/src/blocks/MASTER-GAP-REPORT.md`

4. **After building:**
   ```
   design-system-shadcn-tailwind/docs/token-audit-prompt.md
   ```
   Paste this to verify token compliance before committing.

---

## What's Here

### 📚 Design System Documentation

**Five core guides** explaining the design system philosophy, architecture, and usage:

| File | Purpose |
|------|---------|
| **[philosophy.md](docs/design-system/philosophy.md)** | Why the system exists, core principles, what it is and isn't |
| **[architecture.md](docs/design-system/architecture.md)** | Three-layer model: Radix → shadcn → blocks |
| **[ai-usage-guide.md](docs/design-system/ai-usage-guide.md)** | How to use the design system with Claude/Cursor |
| **[token-system.md](docs/design-system/token-system.md)** | Token reference, dark mode, animation tokens |
| **[component-guide.md](docs/design-system/component-guide.md)** | Decision tree for choosing components |
| **[repo-map.md](docs/design-system/repo-map.md)** | Complete file structure and quick lookup |

### 🔄 Workflows

**Step-by-step processes** for common tasks:

| Workflow | Purpose |
|----------|---------|
| **[assess-before-building.md](docs/workflows/assess-before-building.md)** | Evaluate existing solutions before writing code |
| **[competitive-analysis.md](docs/workflows/competitive-analysis.md)** | Study competitors and map to design system |
| **[pattern-harvest.md](docs/workflows/pattern-harvest.md)** | Extract and document UI patterns |
| **[close-out-protocol.md](docs/workflows/close-out-protocol.md)** | Wrap up work sessions properly |
| **[release-notes-monitoring.md](docs/workflows/release-notes-monitoring.md)** | Stay current with breaking changes |

### 💬 Reusable Prompts

**Ready-to-use prompts** for common tasks:

| Prompt | Use When |
|--------|----------|
| **[audit-trigger.md](prompts/audit-trigger.md)** | Starting a new build session (always use this first) |
| **[block-intake.md](prompts/block-intake.md)** | Adding new UI blocks to the design system |

### 📋 AI Instructions

**Rules and guidelines** for working with AI tools:

| File | Scope |
|------|-------|
| **[universal-rules.md](docs/ai-instructions/universal-rules.md)** | Rules that apply to every repository |
| **[per-repo/](docs/ai-instructions/per-repo/)** | Repository-specific rules and conventions |

### 🏗️ Architecture Reference

**Understanding the system** at a high level:

| File | Topic |
|------|-------|
| **[ecosystem-overview.md](docs/architecture/ecosystem-overview.md)** | How repos fit together |
| **[hub-and-spoke-model.md](docs/architecture/hub-and-spoke-model.md)** | How global-docs connects to other repos |
| **[design-system.md](docs/architecture/design-system.md)** | Design system technical architecture |

---

## Most Used Files

**These 8 files are your go-to references:**

1. **[prompts/audit-trigger.md](prompts/audit-trigger.md)** — Start every session here
2. **[docs/design-system/component-guide.md](docs/design-system/component-guide.md)** — Decide what to build
3. **[design-system-shadcn-tailwind/docs/component-inventory.md](../design-system-shadcn-tailwind/docs/component-inventory.md)** — Find components
4. **[design-system-shadcn-tailwind/src/blocks/INDEX.md](../design-system-shadcn-tailwind/src/blocks/INDEX.md)** — Find blocks
5. **[docs/design-system/token-system.md](docs/design-system/token-system.md)** — Token rules
6. **[design-system-shadcn-tailwind/docs/token-audit-prompt.md](../design-system-shadcn-tailwind/docs/token-audit-prompt.md)** — Verify compliance
7. **[docs/workflows/competitive-analysis.md](docs/workflows/competitive-analysis.md)** — Analyze competitors
8. **[docs/design-system/ai-usage-guide.md](docs/design-system/ai-usage-guide.md)** — AI tool integration

---

## The Design System (design-system-shadcn-tailwind)

**What it is:** A complete, token-based UI component library built from Radix UI primitives, shadcn styling, and Tailwind CSS tokens.

**Key features:**
- ✅ 59 total components (46 shadcn + 12 custom + animations)
- ✅ 364 production-ready blocks (from Tailwind UI)
- ✅ 15+ animation variants (framer-motion powered)
- ✅ Token-first design (all colors, spacing, timing controlled)
- ✅ Accessibility-first (WCAG AA, keyboard nav, prefers-reduced-motion)
- ✅ AI-ready (documentation written for Claude/Cursor)

**Access Storybook:**
```bash
cd design-system-shadcn-tailwind
npm run storybook
# Opens http://localhost:6006/
```

**Key files in design-system-shadcn-tailwind:**
- `src/styles/tokens.css` — source of truth for all design decisions
- `docs/component-inventory.md` — complete component list for AI
- `src/blocks/INDEX.md` — fast index of 364 blocks
- `src/blocks/MASTER-GAP-REPORT.md` — template readiness scores

---

## Template Readiness (Phase 5)

**Current status** (as of 2026-04-09):
- ✅ **13 templates at 95%+ coverage** (ready to recreate now)
- ⚠️ **1 template with CMS gap** (Radiant — post-Phase-5 project)

**Ready templates include:**
- All 12 Magic UI Pro templates
- Cruip templates (Appy, Fintech, Creative, Community, Docs)
- Tailwind Plus (Catalyst, Studio, Spotlight, Compass)

**Check readiness:** `design-system-shadcn-tailwind/src/blocks/MASTER-GAP-REPORT.md`

---

## Directory Structure

```
global-docs/
├── README.md (you are here)
├── CLAUDE.md (AI session instructions)
├── docs/
│   ├── design-system/ (5 core guides)
│   ├── ai-instructions/ (rules + conventions)
│   ├── workflows/ (step-by-step processes)
│   ├── architecture/ (high-level overview)
│   └── (other guides)
├── prompts/ (reusable prompts)
└── workflows/ (detailed workflow files)
```

---

## How Repos Work Together

**global-docs** (this repo)
- ↓ Contains standards & conventions
- → Referenced by all other repos
- Doesn't reference external files

**design-system-shadcn-tailwind** (the design system)
- ↓ Implements standards from global-docs
- ↓ Contains 59 components, 364 blocks, tokens
- ↓ Referenced by all projects
- Implements all rules from global-docs

**Your project repo** (any downstream project)
- ↓ Follows standards from global-docs
- ↓ Uses components from design-system-shadcn-tailwind
- ↓ References workflows from global-docs

---

## Key Principles

1. **Shop before you build** — Check component-inventory.md and INDEX.md before writing code
2. **Consistency over speed** — All design decisions flow from one token file
3. **Provenance matters** — Every file shows where it came from (shadcn, block, custom)
4. **AI-first documentation** — Docs are written so Claude/Cursor can follow them
5. **Accessibility is mandatory** — WCAG AA, keyboard nav, prefers-reduced-motion are not optional

---

## Need Help?

| I want to... | Start here |
|---|---|
| Understand the design system | [philosophy.md](docs/design-system/philosophy.md) |
| Use the design system with Claude/Cursor | [ai-usage-guide.md](docs/design-system/ai-usage-guide.md) |
| Choose a component | [component-guide.md](docs/design-system/component-guide.md) |
| Learn the token system | [token-system.md](docs/design-system/token-system.md) |
| Recreate a template | [design-system-shadcn-tailwind/docs/reproduction-prompt.md](../design-system-shadcn-tailwind/docs/reproduction-prompt.md) |
| Analyze competitors | [workflows/competitive-analysis.md](docs/workflows/competitive-analysis.md) |
| Build a custom component | [design-system-shadcn-tailwind/docs/component-conventions.md](../design-system-shadcn-tailwind/docs/component-conventions.md) |
| Start a new session | [prompts/audit-trigger.md](prompts/audit-trigger.md) |

---

## Further Reading

- **Philosophy & Principles:** [philosophy.md](docs/design-system/philosophy.md)
- **How Everything Connects:** [repo-map.md](docs/design-system/repo-map.md)
- **Complete Workflows:** [workflows/](docs/workflows/)
- **Architecture Overview:** [architecture/](docs/architecture/)
- **All AI Instructions:** [ai-instructions/](docs/ai-instructions/)

---

**Last updated:** 2026-04-09  
**Maintained by:** Claude Code + manual review  
**Status:** Active — Updated with Phase 3E completion
