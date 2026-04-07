# Prompt format standard

## Purpose

Reusable prompts must be formatted consistently so they are:
- Easy to copy with one click in any interface
- Clearly distinguished from surrounding explanation
- Identifiable as prompts vs. code or output

---

## Standard format

All reusable prompts must use a fenced code block with the language tag `prompt`:

```
    ```prompt
    Your prompt text here.
    Multi-line is fine.
    ```
```

This renders with a copy button in most modern interfaces (Perplexity, GitHub,
VS Code preview, etc.) and is visually distinct from code blocks.

## Rules

- Every reusable prompt in global-docs must use this format
- Never use plain text, blockquotes, or italics for prompts intended to be reused
- Never use a generic ``` code block without the `prompt` language tag for prompts
- Prompt blocks should be self-contained: include all context needed to run them
  without the surrounding explanation
- Label the intended tool at the top of long prompts:
  "# Intended for: Claude Code" or "# Intended for: Cursor"

## Example

```prompt
# Intended for: Claude Code

Read AI-INSTRUCTIONS.md and README.md before starting.
Find every instance of [X] across this repo.
Consolidate into [canonical location].
Report every file changed.
```

## Where prompts live

- Reusable audit prompt: UPDATING.md (embedded) and audit-prompt.md (standalone)
- Workflow trigger prompts: processes/workflow-scenarios.md
- Tool onboarding prompt: processes/ai-tool-setup.md
- One-off prompts: do not save unless they will be reused
