<!-- type: how-to -->

# Assess Before Building

## Purpose
Prevent wasted effort building something that already exists as a free or paid solution.

## The Incident That Created This Rule
During design-system-v1 development (April 2026), 13 components were built manually from scratch before discovering shadcn/ui already provided them for free with better accessibility and maintenance. This rule exists to prevent that from repeating.

## Rule: AI Must Assess Before Writing Any Code

When a new feature, tool, library, or system is proposed, the AI must complete this assessment BEFORE writing any code or architecture plans.

### Assessment Steps (required, in order)

**Step 1 — Already in the stack?**
Does our existing stack (shadcn, Tailwind, React, Next.js, etc.) already solve this natively?
If yes: SOLVED — use it, document why.

**Step 2 — Free open-source solution?**
Search npm, GitHub, and known ecosystems for an existing free solution. Must be:
- Actively maintained (commit in last 6 months)
- Compatible with our stack versions
- Reasonably adopted (stars/downloads as proxy)

**Step 3 — Paid solution?**
Note any reputable paid options with pricing.
Present as FYI only — do not recommend paid over free without a clear capability gap.

**Step 4 — Build?**
Only recommend building if:
- No adequate free solution exists
- Paid options are disproportionate in cost/complexity
- The custom solution provides meaningful differentiation

### Output Format

Always report assessment as:

```
SOLVED BY STACK: [what + how] — no action needed

FREE OPTION: [Name] ([link])
  Fits: [yes/partial/no + reason]
  Recommend: adopt / evaluate / skip

PAID OPTION: [Name] (~$X/mo)
  Fits: [yes/partial/no + reason]
  Note: FYI only

RECOMMENDATION: Use [X] / Build / Evaluate [X] first

Awaiting your decision before proceeding.
```

### Developer Response Options
- "Use it" → AI adopts the solution
- "Evaluate" → AI installs and tests, reports back
- "Build" → AI proceeds with custom implementation
- "Show me options" → AI expands the assessment

## Applies To
- New npm packages
- New components or UI patterns
- New integrations (auth, payments, email, etc.)
- New tooling (linters, formatters, CI tools)
- New services (monitoring, analytics, etc.)

## Does NOT Apply To
- Bug fixes on existing code
- Refactoring existing implementations
- Documentation updates
- Configuration changes to existing tools

## Prompt

Before I build a new feature/component/library, help me assess if a solution already exists. I'll describe what I need. Follow the assessment steps: Is it solved by our existing stack? Are there free open-source options? Any paid solutions? Only then recommend building. Report your findings in the output format so I can decide whether to use, evaluate, or build.