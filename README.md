# global-docs

This repository is the source of truth for how I structure GitHub, local development folders, shared libraries, data-platform integrations, and AI-assisted development.

## Purpose

This repo exists to:
- document how my GitHub user and organizations are structured
- define shared architecture and reusable component strategy
- define AI operating rules, personas, and security guardrails
- define language boundaries by repo/org/project type
- document repeatable processes for new repos, templates, staging, and modularization

## Core principles

- Build once, reuse across roles where possible.
- Keep core libraries role-agnostic.
- Keep credentials and environment-specific wiring out of shared libraries.
- Prefer Python and SQL for production-grade systems.
- Use TypeScript, JavaScript, and CSS mainly for UI/UX prototypes and designated frontend work.
- Keep AI tools constrained, documented, and reviewable.
- Optimize for systems I can understand, maintain, and debug myself.

## How to use this repo

- Read `orgs/overview.md` for the GitHub map.
- Read `architecture/` for reusable system design.
- Read `ai/` for AI operating rules and tool behavior.
- Read `processes/` for implementation playbooks.
- Read `standards/` for language- and platform-specific conventions.

## Rule precedence

When rules conflict, use this order:
1. Security and credential handling
2. Repo-specific instructions
3. Organization-specific rules
4. Global AI rules
5. General coding/style standards

## Change policy

This repo should be updated before or alongside meaningful changes to repo structure, AI operating rules, or reusable architecture.