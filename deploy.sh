#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

mkdir temp_web
cd temp_web

# 拷贝 gh-pages 目录下到
git clone --depth 1 -b gh-pages --single-branch https://${GITHUB_TOKEN}@github.com/cjfff/xmind-analysis.git && cd /xmind-analysis

# 删除原本的所有文件
rm -rf ./*

cp -rf ../../dist/* .

git add -A .
git commit -m "deploy"
git push -f origin gh-pages

cd ../../
rm -rf temp_web
