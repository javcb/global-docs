# Audit Trigger Prompt

Use this prompt at any point in any repo to get a full status report from Claude without triggering any changes.

## Standard Repo Audit Prompt

Paste this into Claude Code (replacing bracketed values with the actual names):

---

Review the entire [REPO NAME] repo. Read [CHECKLIST FILE — e.g. DESIGN-SYSTEM-CHECKLIST.md] first, then audit the actual files against each checklist item. Report:

1. **What is complete and verified** (with file evidence)
2. **What is missing or broken**
3. **Any token violations, naming convention violations, or component misuse**
4. **Your recommended next action**

Do not make any changes — report only.

---

## Common Repo Audit Setups

### Design System Audit
```
Review the entire design-system-shadcn-tailwind repo. Read DESIGN-SYSTEM-CHECKLIST.md first, then audit the actual files against each checklist item. Report:

1. What is complete and verified (with file evidence)
2. What is missing or broken
3. Any token violations, naming convention violations, or component misuse (check: no hardcoded colors, cva() for variants, cn() for composition, forwardRef+displayName on components, full file sets per component)
4. Your recommended next action

Do not make any changes — report only.
```

### Global-Docs Audit
See `docs/audit-prompt.md` for the comprehensive global-docs specific audit.
