# Netlify 拖拽部署指南

## 🚀 最快的部署方式 - Netlify

### 方法1: 拖拽部署 (超简单!)

1. 构建项目：
```bash
npm run build
```

2. 访问 [netlify.com](https://netlify.com)
3. 直接将 `build` 文件夹拖拽到页面上
4. 几秒钟后就部署完成！

### 方法2: GitHub 连接部署

1. 在 Netlify 中点击 "New site from Git"
2. 连接 GitHub 并选择仓库
3. 设置构建命令：
   - Build command: `npm run build`
   - Publish directory: `build`
4. 点击 "Deploy site"

### 配置文件

创建 `netlify.toml`：

```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### 访问链接
Netlify 会提供类似这样的链接：
```
https://amazing-name-123456.netlify.app
```

### 优势
- ✅ 完全免费
- ✅ 拖拽即部署
- ✅ 自动 HTTPS
- ✅ 表单处理
- ✅ 函数支持