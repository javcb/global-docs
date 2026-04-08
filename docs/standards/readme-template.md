<!-- type: how-to -->

# README standard

Every repo must have a README.md at the root.
AI tools must create or update the README before signaling work is complete.

## Required sections

```markdown
# [Repo Name]

## What this does
One to three sentences describing the purpose.

## Who it is for
Which role or project this serves.

## Setup

### Prerequisites
- Python 3.x / Node x / etc.
- Required accounts/access

### Environment variables
Copy `.env.example` to `.env` and fill in values.
See `.env.example` for full list of required variables.

### Install dependencies
pip install -r requirements.txt
# or
npm install

## How to run
Short step-by-step.

## Repo structure
Brief description of main folders.

## Status
[ ] Prototype
[ ] Staging
[ ] Production-ready

## Known limitations / TODO
List any incomplete areas, hardcoded values, or things to fix.
```

The Status and Known limitations sections are especially important for AI-generated repos
so the owner knows what has and has not been tested.