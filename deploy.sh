#!/usr/bin/env bash
# Публикация сайта на GitHub Pages.
#
#   1. Создай пустой репозиторий на github.com (без README, без .gitignore).
#   2. Запусти:  ./deploy.sh https://github.com/<username>/<repo>.git
#   3. В репозитории: Settings → Pages → Source: Deploy from a branch
#      → Branch: main / (root) → Save.
#
set -euo pipefail

REMOTE="${1:-}"
if [ -z "$REMOTE" ]; then
  echo "Использование: ./deploy.sh https://github.com/<username>/<repo>.git"
  exit 1
fi

cd "$(dirname "$0")"

git add -A
git commit -m "Yandex.Forms case study" || echo "нечего коммитить, идём дальше"
git branch -M main

if git remote | grep -q '^origin$'; then
  git remote set-url origin "$REMOTE"
else
  git remote add origin "$REMOTE"
fi

git push -u origin main

echo
echo "Готово. Осталось включить Pages: Settings → Pages → main / (root)."
