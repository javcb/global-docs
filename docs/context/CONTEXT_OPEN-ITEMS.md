Personal-ops and full context for AI
You're right that having AI tools understand who you are, how you think, and what you're trying to accomplish produces much better results. And you're right that it should live in one place.

The right approach: add a context/ folder to global-docs, not a separate repo. This keeps one documentation hub while separating personal context from technical rules:

text
global-docs/
  context/
    about-me.md          ← who you are, how you think, your goals
    roles.md             ← the different roles you operate in
    priorities.md        ← what matters most right now
    constraints.md       ← time, access, tools, skills
This folder is included in the master index and linked from ai/base-rules.md as optional context for AI tools. When you want an AI to understand the full picture, you add:

text
Before starting, also read global-docs/context/about-me.md and global-docs/context/roles.md
For non-technical life areas (tutoring, QuickBooks, family), create a separate personal-ops repo later when you actually have content. Link to it from architecture/registry.md. This keeps global-docs technically focused while acknowledging the broader system exists.