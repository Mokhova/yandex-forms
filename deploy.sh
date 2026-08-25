#!/usr/bin/env bash
# Публикация на GitHub Pages.
#   ./deploy.sh https://github.com/mokhova/<repo>.git
# После первого пуша: Settings → Pages → Deploy from a branch → main / (root).
set -euo pipefail
REMOTE="${1:-}"
[ -z "$REMOTE" ] && { echo "Использование: ./deploy.sh https://github.com/mokhova/<repo>.git"; exit 1; }
cd "$(dirname "$0")"
git add -A
git diff --cached --quiet || git commit -m "Обновление сайта-кейса"
git branch -M main
git remote | grep -q '^origin$' && git remote set-url origin "$REMOTE" || git remote add origin "$REMOTE"
git push -u origin main
echo "Готово. Проверь Settings → Pages: main / (root)."
