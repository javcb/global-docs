#!/usr/bin/env python3
"""
Sync root-level documentation files into docs/ directory for MkDocs.

This script copies (not symlinks) the following items into docs/:
- GLOBAL-CONTEXT.md → docs/GLOBAL-CONTEXT.md
- autonomy-matrix.md → docs/autonomy-matrix.md
- domains/ → docs/domains/ (full folder copy)
- skills/ → docs/skills/ (full folder copy)
- upstream/ → docs/upstream/ (full folder copy)

Files are overwritten on each run to keep them in sync with root sources.
This ensures MkDocs can find all files within docs_dir without symlink issues.

Run this script before `mkdocs build`.
"""

import os
import shutil
from pathlib import Path

def sync_docs():
    """Copy documentation files from root into docs/ directory."""

    # Get the repo root (parent of scripts directory)
    repo_root = Path(__file__).parent.parent
    docs_dir = repo_root / "docs"

    # Files to copy (source -> destination in docs/)
    files_to_copy = [
        ("GLOBAL-CONTEXT.md", "GLOBAL-CONTEXT.md"),
        ("autonomy-matrix.md", "autonomy-matrix.md"),
    ]

    # Directories to copy
    dirs_to_copy = [
        ("domains", "domains"),
        ("skills", "skills"),
        ("upstream", "upstream"),
    ]

    print("[*] Syncing documentation files into docs/...")

    # Copy files
    for src_name, dest_name in files_to_copy:
        src = repo_root / src_name
        dest = docs_dir / dest_name

        if src.exists():
            shutil.copy2(src, dest)
            print(f"  [OK] {src_name} -> docs/{dest_name}")
        else:
            print(f"  [SKIP] {src_name} not found")

    # Copy directories
    for src_name, dest_name in dirs_to_copy:
        src = repo_root / src_name
        dest = docs_dir / dest_name

        if src.exists():
            # Remove existing destination if it exists
            if dest.exists():
                shutil.rmtree(dest)
            # Copy entire directory tree
            shutil.copytree(src, dest)
            print(f"  [OK] {src_name}/ -> docs/{dest_name}/ (full copy)")
        else:
            print(f"  [SKIP] {src_name} not found")

    print("[DONE] Sync complete. Ready for mkdocs build.")

if __name__ == "__main__":
    sync_docs()
