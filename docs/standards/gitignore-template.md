<!-- type: how-to -->

# Standard .gitignore

Every repo must include a .gitignore with at minimum:

Environment and secrets
.env
.env.*
!.env.example
*.key
*.pem
*.pfx
secrets.*
config/secrets*

Python
_pycache_/
*.py[cod]
*.egg-info/
dist/
build/
.venv/
venv/
*.pyc

Node / JS / TS
node_modules/
dist/
.next/
.nuxt/
*.tsbuildinfo

OS
.DS_Store
Thumbs.db

Editor
.vscode/settings.json
.idea/
*.swp

Jupyter
.ipynb_checkpoints/

Data files (adjust per project)
*.csv
*.xlsx
*.parquet


AI tools must create this file when scaffolding a new repo.
Use `.env.example` to document required variables without exposing values.