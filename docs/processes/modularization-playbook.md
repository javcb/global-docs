<!-- type: how-to -->

# Modularization playbook

## Goal

Refactor existing repos into reusable components without breaking working behavior.

## Method

1. identify stable workflows that already work
2. identify repeated logic
3. extract repeated logic into internal modules
4. keep orchestration scripts thin
5. test the refactor with real workflows
6. only split into separate repos when the boundaries are proven

## Extraction rule

Do not split into a new repo prematurely.
First create stable internal modules inside the current repo.
Promote to a separate core library only after reuse is real and boundaries are obvious.

## Prompt

Help me refactor this repo by identifying repeated logic and extracting it into reusable internal modules. First, I'll show you the existing code. Find stable workflows that already work, identify patterns that repeat, and recommend extractions into src/ modules. Keep orchestration scripts thin. We'll only split into a separate repo after the modules are proven and boundaries are clear.