#!/bin/bash
rm -rf deploy;

npm install;

mkdir deploy;
cp -r sonidos deploy;
node genpages.js > deploy/index.html;

(
  cd deploy;
  git init;
  git config user.name "Autopush (Travis-CI)";
  git config user.email "iglosiggio@gmail.com";
  git add .
  git commit -m "Deploy automático"
  git push --force --quiet "http://${GH_TOKEN}@${GH_REF}" master:gh-pages >/dev/null 2>&1;
)
