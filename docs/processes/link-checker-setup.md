# Automated link checker setup

## Purpose

Automatically check all links in global-docs markdown files on a schedule.
Catches broken internal links, dead external URLs, and missing file references
without any manual work.

## Setup (GitHub Actions)

Create this file in global-docs repo:
`.github/workflows/link-check.yml`

```yaml
name: Link Checker

on:
  schedule:
    - cron: '0 9 * * 1'  # Every Monday at 9am UTC
  workflow_dispatch:       # Allow manual trigger from GitHub Actions tab

jobs:
  link-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Check links in markdown files
        uses: lycheeverse/lychee-action@v1
        with:
          args: >
            --verbose
            --no-progress
            --exclude-loopback
            --exclude 'localhost'
            './**/*.md'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Check links in HTML site
        uses: lycheeverse/lychee-action@v1
        with:
          args: >
            --verbose
            --no-progress
            --exclude-loopback
            './site/**/*.html'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## What it checks

- All links in every .md file in global-docs
- All links in every .html file in site/
- Reports broken links, 404s, and unreachable URLs

## Where to see results

- GitHub → global-docs repo → Actions tab → Link Checker workflow
- If a run fails, GitHub will show which links are broken

## Manual trigger

- Go to GitHub → global-docs → Actions → Link Checker → Run workflow

## What to do when links break

1. Open the Actions log to see which links failed
2. Fix the broken links in the relevant .md and .html files
3. Re-run the workflow to confirm fixes