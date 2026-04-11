# Environment Setup — Tools, Configs, and Conventions

**Purpose:** Reference documentation for development environment configuration, tool setup, and port/workflow conventions for template recreation and visual QA.

---

## GitHub Desktop — Org Association

### Proper Repo Setup for Claude Code

When creating repositories via gh CLI (Claude creates them this way):

#### ❌ WRONG Way
```bash
# Creates repo but doesn't associate with org in Desktop
gh repo create [name] --public
# Then manually: File → Add Existing Repository
```

#### ✅ CORRECT Way
```bash
# Create repo via gh
gh repo create [name] --org javcb-ai --public

# Then in GitHub Desktop:
# 1. File → Clone Repository
# 2. Find [name] in javcb-ai org dropdown
# 3. Clone to existing local folder
# ← This ensures proper org association
```

### Why This Matters
- **GitHub Desktop** knows which org owns the repo
- **Proper remotes** are set up automatically
- **Push/pull workflows** work without manual configuration
- **Branch protection** rules enforce correctly
- **Collaborator access** is straightforward

### Quick Reference

| Action | Desktop Menu | Notes |
|--------|--------------|-------|
| New repo | File → New Repository | Creates empty; associate org in gh first |
| Clone repo | File → Clone Repository | Find in dropdown by org; point to folder |
| Add existing | File → Add Existing Repository | Use only if repo already exists; must have remote |
| Remove repo | Right-click in sidebar | Unlinks from Desktop; doesn't delete files |

---

## Port Conventions

### Template Recreation Workflow

When recreating a template and comparing side-by-side with source:

#### Primary Ports
- **`:3000`** — Your recreation (always)
  ```bash
  cd design-system-shadcn-tailwind
  npm run dev
  # → localhost:3000
  ```

- **`:3001`** — Source template (for comparison)
  ```bash
  cd templates-[source]/extracted/[template]
  PORT=3001 npm run dev
  # → localhost:3001
  ```

#### Side-by-Side Reference
```
Browser Tab 1: http://localhost:3000  ← Your code
Browser Tab 2: http://localhost:3001  ← Source (fidelity reference)

Resize to breakpoints:
- 375px (mobile)
- 768px (tablet)
- 1280px (desktop)
```

#### Why Separate Ports
- ✅ Run both simultaneously without conflicts
- ✅ Easy browser tab switching for comparison
- ✅ No port re-binding delays
- ✅ Standard DevTools side-by-side workflow

#### Alternative: Same Port, Different Windows
```bash
# If you prefer full windows instead of tabs:

# Terminal 1: yarn install && PORT=3000 npm run dev
# Terminal 2: yarn install && PORT=3001 npm run dev

# Open two windows:
# - Window 1: localhost:3000 (recreation)
# - Window 2: localhost:3001 (source)
```

---

## Claude Code — Browser Automation (Cowork MCP)

### Cowork MCP for Visual QA

The Cowork MCP enables Claude to automate browser tasks:

#### Features
- **Screenshot capture** at exact viewport sizes
- **Viewport resizing** to test responsive design
- **DOM inspection** to verify element presence
- **Network monitoring** to catch missing resources
- **Console logging** to catch client-side errors

#### Configuration Status

**To check if configured:**
```bash
# Look for cowork in Claude Code settings
# File > Settings > MCP Servers
```

**If not configured:**
1. Open Claude Code
2. Settings → MCP Servers
3. Add `cowork` server if available
4. Authenticate if required

#### Using Cowork for Fidelity Mode Visual QA

```
1. Start dev server: npm run dev (localhost:3000)
2. Start source: PORT=3001 npm run dev (localhost:3001)

3. In Claude Code task:
   "Resize browser to 375px and take screenshots of:
    - /page1
    - /page2
    - /blog
    Then compare with source at same breakpoints"

4. Cowork automates:
   - Resize viewport
   - Navigate to URLs
   - Capture screenshots at exact sizes
   - Store for comparison
```

#### Key Cowork Commands (if available)
```
/resize [width]x[height]     # Resize viewport
/screenshot [filename]        # Capture with filename
/navigate [url]              # Go to URL
/wait [seconds]              # Wait before action
/inspect #id                 # Get element info
```

**Note:** Check Cowork documentation or `/help cowork` in Claude Code for full command list.

---

## Node & NPM Versions

### Tested Environments

| Tool | Version | Status |
|------|---------|--------|
| Node.js | 18.x, 19.x, 20.x (LTS) | ✅ Tested |
| npm | 9.x, 10.x | ✅ Tested |
| pnpm | 8.x, 9.x | ✅ Tested (alternative) |
| yarn | 4.x | ⚠️ Check compatibility |

### Recommended Setup
```bash
# Use Node version manager (nvm, fnm, etc)
nvm use 20    # LTS recommended for stability

# Verify
node --version   # Should be v20.x
npm --version    # Should be 9.x or 10.x
```

---

## Development Server Scripts

### Standard Scripts (Design System)

```bash
# All design-system repositories use these:

npm run dev              # Start dev server (localhost:3000)
npm run build            # Production build
npm run typecheck        # TypeScript checking
npm run test             # Run tests (Vitest)
npm run lint             # Run ESLint
npm run build-storybook  # Storybook static build
npm run storybook        # Storybook dev server (localhost:6006)
```

### Custom Scripts (Phase Test Repos)

```bash
# May vary — check package.json in each repo

# Common patterns:
next dev                 # Next.js standard
npm run dev              # Often wraps `next dev`
npm run build            # Vercel build
npm run start            # Start production server
npm run preview          # Preview after build
```

### Stopping Servers

```bash
# Graceful shutdown
Ctrl + C          # In terminal running server

# Force kill (if stuck)
# Terminal 1:
npm run dev
Ctrl + C

# Terminal 2 (if needed):
lsof -i :3000          # macOS/Linux: find process on port
kill -9 [PID]          # Kill by ID

# Windows:
netstat -ano | findstr :3000
taskkill /PID [number] /F
```

---

## Troubleshooting Common Issues

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Option 1: Use different port
PORT=3002 npm run dev

# Option 2: Kill process using port
# See "Stopping Servers" section above

# Option 3: Wait 30 seconds (socket timeout)
# Then restart server
```

### Module Not Found

```
Error: Cannot find module '@/components/ui/button'
```

**Solution:**
1. Verify path is absolute (@ alias works)
2. Check file exists: `ls src/components/ui/button.tsx`
3. Rebuild: `npm run build` or restart server
4. If using IDE: Reload window (VS Code: Cmd+Shift+P → Reload)

### TypeScript Errors After Update

```
npm run typecheck       # See all errors
npm run build           # Trigger full build check
```

**Common fixes:**
- Restart IDE
- Delete `.next` folder and rebuild
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Storybook Won't Start

```
npm run storybook
# Hangs or errors...
```

**Solution:**
```bash
# Clear Storybook cache
rm -rf node_modules/.vite node_modules/.storybook

# Reinstall
npm install

# Try again
npm run storybook
```

---

## File Organization for Visual QA

### Where Screenshots Go

During Fidelity Mode visual QA, create a screenshots directory:

```
project-root/
├── screenshots/
│   ├── mobile-375px/
│   │   ├── homepage.png
│   │   ├── pricing.png
│   │   └── blog.png
│   ├── tablet-768px/
│   │   ├── homepage.png
│   │   ├── pricing.png
│   │   └── blog.png
│   └── desktop-1280px/
│       ├── homepage.png
│       ├── pricing.png
│       └── blog.png
└── FIDELITY-BRIEF.md
```

### Reference in RECREATION-REPORT.md

```markdown
## Visual QA Results

### Mobile (375px)
- **Homepage:** `./screenshots/mobile-375px/homepage.png`
  - Color: ✅ Matches source palette
  - Typography: ✅ Font and weight match
  - Layout: ✅ No edge bleed

### Tablet (768px)
- **Pricing:** `./screenshots/tablet-768px/pricing.png`
  - [assessment continues...]

### Desktop (1280px)
- **Blog:** `./screenshots/desktop-1280px/blog.png`
  - [assessment continues...]
```

---

## MCP Servers for Claude Code

### Available MCPs (if configured)

These may be available depending on your setup:

| MCP | Purpose | Status |
|-----|---------|--------|
| **Cowork** | Browser automation, screenshots, resize | May be configured |
| **Git** | Git operations (clone, branch, commit) | Typically available |
| **GitHub** | GitHub API (search repos, create issues) | May need auth |
| **Anthropic Skills** | PDF, Word, Excel generation | May be available |

### How to Check Available MCPs

**In Claude Code:**
```
/help mcp    # Show MCP help
/mcp list    # List configured MCPs (if supported)
```

**Or check settings:**
1. File → Settings
2. Look for "MCP Servers" section
3. See what's currently active

---

## Quick Setup Checklist

For starting a new template recreation project:

- [ ] Repo cloned to local folder
- [ ] GitHub Desktop shows proper org association
- [ ] `npm install` completed (no errors)
- [ ] `npm run dev` starts on localhost:3000
- [ ] `npm run typecheck` passes
- [ ] Storybook available (if needed): `npm run storybook` → localhost:6006
- [ ] Source template prepped on different port (`:3001`)
- [ ] Screenshots directory created
- [ ] FIDELITY-BRIEF.md template ready
- [ ] Cowork/browser automation verified (optional but helpful)

---

## Reference Documentation

- **Fidelity Mode:** `../../docs/fidelity-mode.md`
- **Repo Management:** `../../docs/repo-management.md`
- **Port Usage:** Section above
- **Environment:** This document

---

**Last Updated:** 2026-04-10  
**Status:** Complete
