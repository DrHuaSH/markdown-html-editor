# GitHub Pages 部署指南

## 🚀 快速部署到 GitHub Pages

### 步骤1: 准备部署脚本

1. 在 `package.json` 中添加部署脚本：

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
  "homepage": "https://yourusername.github.io/markdown-html-editor"
}
```

2. 安装 gh-pages 工具：
```bash
npm install --save-dev gh-pages
```

### 步骤2: 构建和部署

```bash
# 构建项目
npm run build

# 部署到 GitHub Pages
npm run deploy
```

### 步骤3: 配置 GitHub 仓库

1. 在 GitHub 仓库设置中启用 Pages
2. 选择 `gh-pages` 分支作为源
3. 几分钟后即可通过链接访问

### 访问链接格式
```
https://yourusername.github.io/markdown-html-editor
```

## 🔧 自动化部署 (GitHub Actions)

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

这样每次推送代码都会自动部署！