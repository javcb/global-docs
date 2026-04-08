<!-- type: how-to -->

# Promote staging to prod

## When to promote

A repo is ready to promote from javcb-staging to javcb-prod when:
- Maker/checker review is complete and issues are resolved
- README is accurate and complete
- .env.example lists all required variables
- No hardcoded credentials exist anywhere
- Standard repo structure is in place
- Feature branch has been merged to main

## Definition of done

Before any repo is promoted to javcb-prod, all of the following must be true.
No exceptions without a documented and approved reason.

### Code quality
- [ ] All functions handle errors explicitly (no bare excepts, no silent failures)
- [ ] No print statements left as debugging artifacts (use logging module instead)
- [ ] No TODO comments left unaddressed — either resolved or documented in OPEN-ITEMS.md
- [ ] No hardcoded values that should be configuration (paths, credentials, IDs)
- [ ] Reusable logic is in src/ modules, not inline in scripts

### Documentation
- [ ] README accurately describes current state, not intended state
- [ ] README includes: what it does, setup steps, env vars, how to run, known limitations
- [ ] .env.example lists every required environment variable with descriptions
- [ ] AI-INSTRUCTIONS.md is present and links are valid

### Testing
- [ ] At least one manual end-to-end test confirmed working by owner
- [ ] Any automated tests present are passing
- [ ] Known failure modes are documented in README

### Review
- [ ] Maker/checker review completed
- [ ] All high-severity checker findings resolved
- [ ] Medium-severity findings either resolved or documented with rationale for deferral

### Security
- [ ] No credentials, tokens, or secrets anywhere in code or commit history
- [ ] .gitignore covers all sensitive file patterns
- [ ] All external connections use environment variables

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

## Prompt

Help me promote this repo from javcb-staging to javcb-prod. Work through the definition-of-done checklist with me: code quality (error handling, no debug artifacts, no TODOs), documentation (README accuracy, .env.example, AI-INSTRUCTIONS), testing, review status, and security (no hardcoded secrets, .gitignore coverage). Once confirmed, I'll transfer ownership on GitHub.