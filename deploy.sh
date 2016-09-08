#!/bin/bash
set -o errexit -o nounset
rev=$(git rev-parse --short HEAD)

rm -rf deploy

npm install

mkdir deploy
cp -r sonidos deploy
node genpages.js > deploy/index.html

(
  cd deploy
  git init
  git config user.name "Autopush (Travis-CI)"
  git config user.email "iglosiggio@gmail.com"
  git remote add origin "https://${GH_TOKEN}@${GH_REF}"
  git fetch origin
  git reset origin/gh-pages
  git add .
  git commit -m "Deploy automático de ${rev}"
  git push --quiet upstream HEAD:gh-pages >/dev/null 2>&1
)
