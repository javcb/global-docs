<!-- type: how-to -->

# Template intake process

## When to use this

When you purchase or download a new UI kit, starter template, Excel template,
or any reusable boilerplate that should be preserved in javcb-templates.

## Steps

1. Download the original, unmodified files from the vendor

2. Create a new repo in javcb-templates:
   - Name it clearly: `ui-tailwind-dashboard-kit`, `excel-powerquery-starter`, etc.
   - Add a README with:
     - What the template is
     - Where it was purchased (vendor + URL)
     - License type (single use, multi-use, etc.)
     - Date acquired
     - Notes on how to use it

3. Add the original files to the repo as-is (no customization)

4. Archive the repo on GitHub:
   - Settings → Danger Zone → Archive this repository

5. Add topics: `template`, `[type]` (e.g. `ui-kit`, `excel`, `tailwind`)

6. Update your templates inventory document if you maintain one

## Rules

- Never modify the master template in javcb-templates
- To use a template: clone it into javcb-staging or javcb-ai and work from there
- If a license is single-use, note which project it was used for in the README

## Prompt

I'm ingesting a new template into javcb-templates. Help me follow the template intake process: download the original files, create a new repo with a clear name and README (including vendor, license, date, and usage notes), archive the repo, and add appropriate topics. Remember: never modify the master template; clone it when you need to use it.