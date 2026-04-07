# Branch discipline

## Rule

Never work directly on main.

## Branches

- main: stable, reviewed, production-representative code
- dev or develop: integration branch (optional for solo work)
- feature/description: new feature or build
- fix/description: bug fix
- refactor/description: restructuring without behavior change
- experiment/description: throwaway exploration

## For AI-assisted builds

- AI tools must create a feature branch before making changes
- Branch name should describe the task: feature/cost-estimator-scaffold
- AI tools must not push directly to main
- Owner merges to main after review

## Solo workflow (simplified)

1. Create feature branch
2. Build or refactor on branch
3. Run maker/checker review
4. Merge to main when satisfied
5. Delete branch after merge