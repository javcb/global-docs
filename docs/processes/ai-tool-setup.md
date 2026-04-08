<!-- type: how-to -->

# AI tool setup

## Principle

Both Cursor and Claude Code work on local files.
They do not need direct GitHub API access for most tasks.
The workflow is: clone locally → open in tool → push via git.

## Prerequisites for all tools

1. GitHub Desktop installed and signed in
2. All orgs enabled for fine-grained PATs (see processes/access-tokens.md)
3. SSH key or HTTPS credential configured in git for pushing
4. global-docs cloned locally at ~/code/github/[your-github-username]/global-docs/

## Cursor setup

1. Open Cursor
2. Settings → Features → GitHub → Connect GitHub account
3. To work on a repo: clone it locally via GitHub Desktop first,
   then File → Open Folder in Cursor
4. Cursor reads local files; no token needed for file access
5. Give Cursor context by opening AI-INSTRUCTIONS.md first
   and saying "read this before we start"

## Claude Code setup

1. Install: npm install -g @anthropic-ai/claude-code
2. Authenticate: claude (follow login prompt on first run)
3. To work on a repo: cd into the local clone, then run claude
4. Claude Code reads all files in the current directory
5. It will find AI-INSTRUCTIONS.md automatically if present at repo root
6. To give it global-docs context explicitly:
   "Before starting, read ~/code/github/[your-github-username]/global-docs/README.md
    and follow the links relevant to this repo"

## For any new AI tool

1. Check whether it works on local files or needs API access
2. If API access needed: create a scoped token per processes/access-tokens.md
3. Clone the relevant repo locally first regardless
4. Confirm AI-INSTRUCTIONS.md is present in the repo root
5. Run the onboarding prompt from FAQ.md before first task