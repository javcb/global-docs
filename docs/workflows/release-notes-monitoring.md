<!-- type: how-to -->

# Release Notes Monitoring

## Purpose
Stay current with the tools in our stack so that breaking changes, deprecations, and improvements are caught at the source (standards + library repos) before they silently affect production projects.

## When to Run This Process

### Triggered automatically:
- Before starting any new project
- Before a major design system update session
- Before upgrading any dependency version
- Monthly, at minimum (schedule: first Monday)

### Triggered manually:
- When a build fails unexpectedly
- When an AI tool reports a deprecated API
- When a community post flags a breaking change

## Stack to Monitor

### Core Framework
| Package | Where to check | Check for |
|---|---|---|
| next | github.com/vercel/next.js/releases | Breaking changes, new App Router APIs |
| react | github.com/facebook/react/releases | Deprecations, new hooks |
| typescript | github.com/microsoft/TypeScript/releases | Strict mode changes, new features |

### Styling
| Package | Where to check | Check for |
|---|---|---|
| tailwindcss | github.com/tailwindlabs/tailwindcss/releases | Utility renames, @theme changes |
| shadcn/ui | github.com/shadcn-ui/ui/releases | Component API changes, new components |

### Dev Tools
| Package | Where to check | Check for |
|---|---|---|
| @storybook/nextjs | github.com/storybookjs/storybook/releases | Config changes, addon updates |
| vitest | github.com/vitest-dev/vitest/releases | Config API changes |
| eslint | github.com/eslint/eslint/releases | Rule deprecations |

### AI Tools
| Tool | Where to check | Check for |
|---|---|---|
| Claude Code | anthropic.com/engineering + changelog | New flags, new capabilities, deprecations |
| Cursor | cursor.com/changelog | New features, rule syntax changes |
| GitHub Copilot | github.blog/changelog | If used |

## The AI-Assisted Review Process

Paste this prompt into Claude at the start of a monitoring session:

---
**RELEASE NOTES REVIEW SESSION**

Review release notes for our stack since [last review date].
For each package below, check the official changelog and report findings in this format:

```
Package: [name] [current version → latest version]
  🟢 IMPROVEMENT: [feature that helps us]
  🟡 DEPRECATION: [what's deprecated + migration path]
  🔴 BREAKING: [what breaks + required action]
  ⚪ SKIP: No relevant changes
```

After reviewing all packages, produce:

**IMPACT SUMMARY**
  - Requires immediate action: [list]
  - Requires planning: [list]
  - Nice to adopt: [list]
  - No action needed: [list]

**AFFECTED REPOS**
  For each action item, list which of our repos is affected: [repo name + what needs to change]
```

---

## Applying Findings

### Immediate action (🔴 BREAKING)
1. Open the affected standards/library repo
2. Create a fix branch
3. Apply the change at the source
4. All downstream projects pick it up on next sync

### Planned action (🟡 DEPRECATION)
1. Add to project backlog with deprecation deadline
2. Note in DESIGN-SYSTEM-CHECKLIST.md or equivalent
3. Fix before the deprecation deadline, not after

### Nice to adopt (🟢 IMPROVEMENT)
1. Evaluate against assess-before-building.md criteria
2. Adopt in next design system update session if fits

## Findings Log

Track all findings here for reference:

| Date | Package | Version | Finding | Action Taken |
|---|---|---|---|---|
| 2026-04-08 | Claude Code | — | No `--dangerously-skip-permissions` flag exists. Pre-auth in CLAUDE.md is the correct approach for autonomous operations. | Documented in CLAUDE.md pre-auth section |
