# Vercel 一键部署指南

## 🚀 最简单的部署方式 - Vercel

### 方法1: 通过 GitHub 连接

1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 选择您的 markdown-html-editor 仓库
5. 点击 "Deploy" - 就这么简单！

### 方法2: 使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 在项目目录中运行
vercel

# 按照提示完成部署
```

### 配置文件 (可选)

创建 `vercel.json`：

```json
{
  "name": "markdown-html-editor",
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### 访问链接
部署完成后，Vercel 会提供类似这样的链接：
```
https://markdown-html-editor-yourusername.vercel.app
```

### 优势
- ✅ 完全免费
- ✅ 自动 HTTPS
- ✅ 全球 CDN
- ✅ 自动部署
- ✅ 自定义域名支持