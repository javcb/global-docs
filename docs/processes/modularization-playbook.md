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