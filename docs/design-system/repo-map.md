<!-- type: reference -->

# Repository Map

Complete overview of all repositories and where to find key resources.

---

## Profile Repos (github.com/javcb)

### Primary Repositories

| Repo | Purpose | Status | Key Files |
|------|---------|--------|-----------|
| **global-docs** | Standards, workflows, prompts, architecture | Active | `README.md`, `docs/design-system/`, `prompts/`, `workflows/` |
| **design-system-shadcn-tailwind** | The canonical design system | Active | `CLAUDE.md`, `src/styles/tokens.css`, `src/components/`, `docs/` |
| **repo-starter-kit** | Template for new projects | Active | See design-system as reference |
| **design-system-TO-ARCHIVE** | Old design system (reference only) | Archive pending | Do not use |

### Secondary/Reference Repos

| Repo | Purpose | Status |
|------|---------|--------|
| javcb-templates/templates_tailwind-plus | 364 Tailwind UI blocks + pages | Reference (ingested) |
| javcb-templates/templates_cruip-including-mosaic | 21 Cruip templates | Reference (analyzed) |
| javcb-templates/templates_magic-ui-pro | 12 Magic UI Pro templates | Reference (analyzed) |
| javcb-templates/templates_maker-kit | SaaS starter templates | Reference (not yet analyzed) |
| javcb-templates/templates_creative-tim | Design templates | Reference (not yet analyzed) |
| javcb-templates/templates_one-offs | Miscellaneous templates | Reference (not yet analyzed) |

---

## Design System File Structure

### Complete Directory Map

```
design-system-shadcn-tailwind/
├── src/
│   ├── app/
│   │   └── globals.css              ← imports all token files + framework setup
│   │
│   ├── styles/
│   │   ├── tokens.css               ← SOURCE OF TRUTH (all design tokens)
│   │   ├── shadcn-bridge.css        ← maps tokens → shadcn CSS variables
│   │   └── animation-tokens.css     ← animation durations, easings, spring configs
│   │
│   ├── components/
│   │   ├── ui/                      ← shadcn primitives (46 components, read-only)
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   ├── dialog/
│   │   │   └── ...40 more
│   │   │
│   │   ├── charts/                  ← dashboard chart components (5 total)
│   │   │   ├── DashboardLineChart.tsx
│   │   │   ├── DashboardBarChart.tsx
│   │   │   ├── DashboardAreaChart.tsx
│   │   │   ├── DashboardDonutChart.tsx
│   │   │   ├── KpiCard.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── date-picker/             ← date selection components (2 total)
│   │   │   ├── DatePicker.tsx
│   │   │   ├── DateRangePicker.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── magic/                   ← animation components (7 total)
│   │   │   ├── BlurFade.tsx
│   │   │   ├── BorderBeam.tsx
│   │   │   ├── Marquee.tsx
│   │   │   ├── FadeText.tsx
│   │   │   ├── NumberTicker.tsx
│   │   │   ├── ShimmerButton.tsx
│   │   │   ├── SparklesText.tsx
│   │   │   ├── magic.stories.tsx    ← all 7 components' stories (16+ stories)
│   │   │   └── index.ts
│   │   │
│   │   ├── stat/                    ← KPI metric card
│   │   ├── data-grid/               ← sortable/filterable data table
│   │   ├── navbar/                  ← top navigation bar
│   │   ├── search-input/            ← enhanced search input
│   │   └── file-upload/             ← drag/drop upload area
│   │
│   ├── blocks/                      ← Tailwind UI blocks (364 total)
│   │   ├── INDEX.md                 ← fast-scan index for AI tools
│   │   ├── MASTER-GAP-REPORT.md     ← template readiness scores (Phase 5)
│   │   ├── page-examples/           ← 6 blocks
│   │   ├── feedback/                ← 12 blocks
│   │   ├── headings/                ← 25 blocks
│   │   ├── application-shells/      ← 23 blocks
│   │   ├── data-display/            ← 19 blocks
│   │   ├── overlays/                ← 24 blocks
│   │   ├── layout/                  ← 38 blocks
│   │   ├── lists/                   ← 44 blocks
│   │   ├── elements/                ← 45 blocks
│   │   ├── navigation/              ← 54 blocks
│   │   └── forms/                   ← 74 blocks
│   │
│   ├── lib/
│   │   ├── animation.ts             ← framer-motion variants (15+ exports)
│   │   └── utils.ts                 ← utility functions
│   │
│   └── hooks/
│       └── useScrollAnimation.ts     ← scroll-triggered animation hook
│
├── docs/
│   ├── component-inventory.md       ← complete component list for AI (59 total)
│   ├── usage-for-ai.md              ← how to use each component
│   ├── reproduction-prompt.md       ← template recreation prompt
│   ├── token-audit-prompt.md        ← token compliance audit prompt
│   ├── component-conventions.md     ← rules for building new components
│   └── (future: advanced guides)
│
├── .storybook/
│   ├── main.ts                      ← Storybook config (Vite-based)
│   └── preview.tsx                  ← theme switcher, globals
│
├── CLAUDE.md                        ← AI session instructions
├── .cursorrules                     ← Cursor mirror of CLAUDE.md
├── DESIGN-SYSTEM-CHECKLIST.md       ← phase progress + audit trigger
└── package.json                     ← dependencies (framer-motion, embla-carousel, etc.)
```

---

## Global Docs Structure

```
global-docs/
├── README.md                        ← you are here
│
├── CLAUDE.md                        ← AI session instructions
├── CHECKLIST.md                     ← documentation phase progress
│
├── docs/
│   ├── design-system/               ← design system philosophy & guides
│   │   ├── philosophy.md            ← why the system exists
│   │   ├── architecture.md          ← three-layer model, component hierarchy
│   │   ├── ai-usage-guide.md        ← how to use with Claude/Cursor
│   │   ├── token-system.md          ← token reference + rules
│   │   ├── component-guide.md       ← decision tree for components
│   │   └── repo-map.md              ← this file
│   │
│   ├── ai-instructions/
│   │   ├── README.md
│   │   ├── universal-rules.md       ← rules for all repos
│   │   ├── per-repo/
│   │   │   ├── global-docs.md
│   │   │   ├── design-system.md
│   │   │   └── ...
│   │   └── (other AI rules)
│   │
│   ├── workflows/
│   │   ├── assess-before-building.md
│   │   ├── competitive-analysis.md
│   │   ├── pattern-harvest.md
│   │   ├── close-out-protocol.md
│   │   └── release-notes-monitoring.md
│   │
│   ├── architecture/
│   │   ├── ecosystem-overview.md
│   │   ├── hub-and-spoke-model.md
│   │   ├── design-system.md
│   │   └── ...
│   │
│   └── (other guides: context, standards, processes, etc.)
│
├── prompts/
│   ├── audit-trigger.md             ← start every session here
│   ├── block-intake.md
│   └── (other reusable prompts)
│
└── workflows/
    ├── assess-before-building.md
    ├── competitive-analysis.md
    ├── pattern-harvest.md
    └── ...
```

---

## Template Source Map

### Cruip + Mosaic

**Location:** `../javcb-templates/templates_cruip-including-mosaic/`

**21 templates** (analyzed in MASTER-GAP-REPORT.md):
- Mosaic (5 templates)
- Appy Next
- Fintech Next
- Docs Next
- Creative Next
- Community Next
- (and others)

**Current readiness:** 95%+ coverage (ready for Phase 5)

### Magic UI Pro

**Location:** `../javcb-templates/templates_magic-ui-pro/`

**12 templates** (analyzed in MASTER-GAP-REPORT.md):
- Magic UI SaaS
- Dillion Verma Portfolio
- Startup Template
- Agent Template
- Blog Template
- Changelog Template
- CodeForge DevTool
- Mobile Template
- Portfolio 2
- SaaS Template (alternate)
- (and 2 more)

**Current readiness:** 95%+ coverage (ready for Phase 5)

### Tailwind Plus

**Location:** `../javcb-templates/templates_tailwind-plus/`

**364 blocks + 10+ page examples** (analyzed, ingested):
- All blocks categorized and token-swapped
- Full pages: Catalyst, Radiant, Studio, Spotlight, Compass, etc.
- **Current readiness:** 95%+ coverage (ready for Phase 5, except Radiant which needs Sanity CMS)

---

## Quick File Lookup

### I need to...

| Task | File |
|------|------|
| **Start a new session** | `global-docs/prompts/audit-trigger.md` |
| **Understand philosophy** | `global-docs/docs/design-system/philosophy.md` |
| **Use with AI tools** | `global-docs/docs/design-system/ai-usage-guide.md` |
| **Learn architecture** | `global-docs/docs/design-system/architecture.md` |
| **Check token rules** | `global-docs/docs/design-system/token-system.md` |
| **Choose a component** | `global-docs/docs/design-system/component-guide.md` |
| **Find a component** | `design-system-shadcn-tailwind/docs/component-inventory.md` |
| **Find a block** | `design-system-shadcn-tailwind/src/blocks/INDEX.md` |
| **Audit token compliance** | `design-system-shadcn-tailwind/docs/token-audit-prompt.md` |
| **Recreate a template** | `design-system-shadcn-tailwind/docs/reproduction-prompt.md` |
| **Check template readiness** | `design-system-shadcn-tailwind/src/blocks/MASTER-GAP-REPORT.md` |
| **Build custom component** | `design-system-shadcn-tailwind/docs/component-conventions.md` |
| **Learn workflows** | `global-docs/docs/workflows/` (all files) |
| **Assess before building** | `global-docs/docs/workflows/assess-before-building.md` |
| **Competitive analysis** | `global-docs/docs/workflows/competitive-analysis.md` |
| **Harvest UI patterns** | `global-docs/docs/workflows/pattern-harvest.md` |

---

## Key Statistics

### Design System Content
- **Components:** 59 total (46 shadcn + 12 custom + 1 index)
- **Magic components:** 7 (with 15+ animation variants)
- **Animation variants:** 15+ from lib/animation.ts
- **Blocks:** 364 (across 11 categories)
- **Storybook stories:** 200+ (comprehensive coverage)

### Template Coverage
- **Ready now (95%+):** 13 templates (0 hours to ready)
- **Minor gaps:** 1 template (requires CMS, post-Phase-5)
- **Analyzed templates:** 43 total (12 Magic UI + 21 Cruip + 10 Tailwind Plus)

### Documentation
- **Philosophy & guides:** 5 files in docs/design-system/
- **Reusable prompts:** 2 in global-docs/prompts/
- **Workflows:** 5 in global-docs/docs/workflows/
- **AI instructions:** 3 core + per-repo supplements

---

## Cross-Reference Examples

### Scenario: "I want to recreate the Magic UI SaaS template"

1. Check MASTER-GAP-REPORT.md → 95%+ ready
2. Use reproduction-prompt.md → identifies gaps
3. Reference component-inventory.md → find components
4. Reference src/blocks/INDEX.md → find blocks
5. Check CLAUDE.md → learn design system rules
6. Build using component-guide.md decision tree
7. Run token-audit-prompt.md → verify compliance

### Scenario: "I want to add a new feature"

1. Read ai-instructions/universal-rules.md
2. Read ai-instructions/per-repo/[repo].md
3. Check component-guide.md → what component to use?
4. If building custom → follow component-conventions.md
5. Add Storybook story
6. Update component-inventory.md
7. Run token-audit-prompt.md before commit

### Scenario: "I want to understand the animation system"

1. Read philosophy.md (why animations matter)
2. Read architecture.md (three-layer model)
3. Read token-system.md (animation tokens)
4. Reference src/lib/animation.ts (15+ variants)
5. Reference src/components/magic/ (7 components)
6. Check Storybook for live examples

---

## Further Reading

- **Design System Philosophy:** `philosophy.md`
- **Architecture Deep Dive:** `architecture.md`
- **Using with AI:** `ai-usage-guide.md`
- **Token Reference:** `token-system.md`
- **Component Decisions:** `component-guide.md`
