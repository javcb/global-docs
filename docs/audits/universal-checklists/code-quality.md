<!-- type: reference -->

# Universal Checklist — Code Quality

Reference from repo-local audit-process.md files.
Checklist ID prefix: CQ

## CQ-1: TypeScript
- tsconfig.json exists at repo root
- strict mode enabled
- noEmit: true (for Next.js apps)
- Path alias @/* → ./* configured
- npm run typecheck → exit code 0, zero errors
PASS = exit code 0

## CQ-2: Token / Hardcoded Value Violations
For token-based UI repos (design-system):
- No hardcoded hex values: #[0-9a-fA-F]{3,8}
- No concrete Tailwind color families + number
- No inline style color overrides
PASS = zero violations

For all repos:
- No hardcoded environment-specific values (URLs, ports)
  that should live in config or .env files
PASS = zero hardcoded config values

## CQ-3: Exports and Barrel Files
- Every module directory has an index.ts
- Every export has a matching implementation file
- No orphaned exports
PASS = 100% match

## CQ-4: Dependency Health
- No packages in dependencies that belong in devDependencies
- No duplicate packages serving the same function
- package.json scripts include: build, dev, typecheck, test
PASS = all scripts present, no duplicates
