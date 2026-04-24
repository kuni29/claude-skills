#!/bin/bash
# Sync .claude/skills/ → claude-skills repo and push to GitHub
# Usage: ~/claude-skills/sync.sh

set -e

SKILLS_SRC="$HOME/.claude/skills"
REPO_DIR="$HOME/claude-skills/skills"

echo "Syncing skills to GitHub..."

# rsync: follow symlinks, exclude node_modules, delete removed files
rsync -avL --delete --exclude='node_modules' "$SKILLS_SRC/" "$REPO_DIR/"

cd "$HOME/claude-skills"

# Check for changes
if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  echo "No changes to sync."
  exit 0
fi

# Commit and push
git add -A
git commit -m "Sync skills $(date '+%Y-%m-%d %H:%M')"
git push

echo "Done! Skills synced to GitHub."
