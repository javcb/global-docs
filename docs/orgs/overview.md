# Organization overview

This file explains the purpose of each GitHub location and how they relate to each other.

<div class="maintenance-note">
All org docs are parallel — no required reading order. Read the one relevant to your current task.
</div>

## Main GitHub user account (not an org)

This is your personal GitHub login. It holds:
- global-docs (this repo)
- Any repos that belong directly to you, not to a specific org

## Organization: javcb-prod

Purpose:
- production-ready repos
- core reusable libraries
- serious personal systems
- long-term maintainable code

Typical contents:
- Python libraries
- SQL repositories
- data tooling
- production-adjacent utilities
- central documentation

## Organization: javcb-templates

Purpose:
- read-only templates
- purchased UI kits
- starter repos
- reference implementations

Rules:
- do not modify template masters directly
- clone/copy into a new repo before customization
- archive template repos when appropriate

## Organization: javcb-staging

Purpose:
- work in progress
- refactors
- experiments likely to become real projects
- pre-production or incubation work

Rules:
- ideas can start here
- promote mature components to main when proven
- archive abandoned ideas instead of letting them rot

## Organization: javcb-archive

Purpose:
- retired projects
- old experiments
- historical references

Rules:
- archive repos
- no active development
- recover only when needed

## Organization: javcb-ai

Purpose:
- AI sandbox
- repos where coding agents can operate with limited blast radius
- prototypes and experiments safe to break

Rules:
- grant tools access only to this org when possible
- prefer least privilege
- clearly label prototype vs production-ready output

## Design logic

The overall system is:
- prod = durable assets
- templates = reusable starting points
- staging = incubation
- archive = history
- javcb-ai = experimentation sandbox