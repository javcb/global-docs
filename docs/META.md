<!-- type: reference -->

# global-docs documentation standard

This repo follows the Diátaxis framework (diataxis.fr) for all documentation.
Every document is one of four types. Never mix types in a single document.

## The four types

### Tutorial
- Purpose: orientation and learning
- Reader's state: getting started or re-orienting after a gap
- Written as: a guided experience, first person, warm tone
- Contains: context, narrative, "read this next" links
- Does NOT contain: reference specs, executable prompts, decision rationale

### How-to guide
- Purpose: accomplish a specific task right now
- Reader's state: knows what they want to do, needs the steps
- Written as: numbered steps, imperative mood ("Run X", "Open Y")
- Contains: prerequisites, ordered steps, expected outcome, executable
  prompt at the bottom under a "## Prompt" heading
- Does NOT contain: conceptual explanation, background, reference specs

### Reference
- Purpose: factual lookup
- Reader's state: working, needs a specific fact or spec
- Written as: terse, consistent structure, no narrative
- Contains: specs, rules, definitions, options, examples
- Does NOT contain: instructions, explanations of why, step-by-step guides

### Explanation
- Purpose: build understanding of why something is the way it is
- Reader's state: wants deeper context, not trying to do a task right now
- Written as: narrative, analytical, may include history and tradeoffs
- Contains: rationale, context, background, alternatives considered
- Does NOT contain: step-by-step instructions, reference specs

## Rules for contributors (human and AI)

1. Every new document must declare its type in a comment at the top:
   `<!-- type: tutorial | how-to | reference | explanation -->`
2. Never add instructions to a reference doc
3. Never add conceptual background to a how-to guide — link to the
   explanation doc instead
4. Every how-to guide that has an executable AI prompt must include it
   at the bottom under a `## Prompt` heading
5. All docs live in `docs/` and its subdirectories only
6. Every new doc must have a nav entry in mkdocs.yml
7. README.md at repo root is a GitHub landing page only — one line + link

## Nav structure

The mkdocs.yml nav follows Diátaxis:
- Start here (tutorial)
- How-to guides
- Reference
- Explanation
- System maintenance
