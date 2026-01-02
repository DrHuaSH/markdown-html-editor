#!/bin/bash

# GitHub 仓库设置脚本
# 用户名: DrHuaSH

echo "设置 GitHub 远程仓库..."

# 添加远程仓库
git remote add origin https://github.com/DrHuaSH/markdown-html-editor.git

# 设置主分支名称
git branch -M main

# 推送到 GitHub
git push -u origin main

echo "完成！你的项目已经发布到 GitHub"
echo "访问: https://github.com/DrHuaSH/markdown-html-editor"