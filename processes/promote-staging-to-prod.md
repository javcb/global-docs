# Promote staging to prod

## When to promote

A repo is ready to promote from javcb-staging to javcb-prod when:
- Maker/checker review is complete and issues are resolved
- README is accurate and complete
- .env.example lists all required variables
- No hardcoded credentials exist anywhere
- Standard repo structure is in place
- Feature branch has been merged to main

## Steps

1. Run final maker/checker review if not already done
   See `processes/maker-checker.md`

2. Confirm checklist:
   - [ ] README complete
   - [ ] .env.example complete
   - [ ] .gitignore in place
   - [ ] No secrets in code
   - [ ] src/ structure correct
   - [ ] Tests present (even minimal)
   - [ ] Branch merged to main

3. Transfer repo to javcb-prod:
   - Open repo on GitHub
   - Settings → scroll to Danger Zone → Transfer ownership
   - Select javcb-prod as destination
   - Confirm by typing repo name

4. Update README status field:
   - Change: `[ ] Production-ready` to `[x] Production-ready`

5. Update processes/setup-history.md with a note about what was promoted and when

6. Remove local staging copy if no longer needed:
   - In GitHub Desktop: right-click repo → Remove
   - Choose to delete local folder
   - Re-clone from javcb-prod location if still needed locally