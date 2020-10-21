#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build:gh-page


mkdir temp_web
cd temp_web

git clone --depth 1 -b gh-pages --single-branch https://${GITHUB_TOKEN}@github.com/cjfff/xmind-analysis.git && cd /xmind-analysis

rm -rf ./xmind-analysis/*

cp -rf ../../dist/* .

git add -A .
git commit -m "deploy"
git push -f origin gh-pages

cd ../../
rm -rf temp_web
