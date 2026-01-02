# 📱 在线安装使用指南

本指南详细介绍如何在线使用 Markdown-HTML 双向编辑器的各种方法。

## 🌟 推荐方式：独立版本

### 方法一：直接下载使用
这是最简单、最快速的使用方式，无需任何安装步骤。

#### 步骤：
1. **下载文件**
   - 下载项目中的 `standalone-editor.html` 文件
   - 或者右键点击 [这里](./standalone-editor.html) 选择"另存为"

2. **打开文件**
   - 双击下载的 `standalone-editor.html` 文件
   - 或者右键选择"打开方式" → 选择浏览器

3. **立即使用**
   - 文件会在浏览器中打开
   - 无需网络连接，完全离线使用
   - 所有功能立即可用

#### 优势：
- ✅ **零安装**: 无需安装任何软件
- ✅ **离线使用**: 不需要网络连接
- ✅ **跨平台**: 支持 Windows、macOS、Linux
- ✅ **便携性**: 可以放在U盘中随身携带
- ✅ **完整功能**: 包含所有编辑器功能

## 🌐 在线部署版本

### GitHub Pages 部署

#### 自动部署方法：
1. **Fork 项目**
   ```bash
   # 访问项目页面，点击 Fork 按钮
   https://github.com/your-username/markdown-html-editor
   ```

2. **启用 GitHub Pages**
   - 进入你的 Fork 仓库
   - 点击 Settings → Pages
   - Source 选择 "Deploy from a branch"
   - Branch 选择 "main" 或 "gh-pages"
   - 点击 Save

3. **访问应用**
   - 等待几分钟部署完成
   - 访问 `https://your-username.github.io/markdown-html-editor/`

#### 手动部署方法：
```bash
# 1. 克隆项目
git clone https://github.com/your-username/markdown-html-editor.git
cd markdown-html-editor

# 2. 安装依赖
npm install

# 3. 构建项目
npm run build

# 4. 部署到 GitHub Pages
npm install -g gh-pages
gh-pages -d build
```

### Netlify 部署

#### 方法一：Git 连接（推荐）
1. **注册 Netlify**
   - 访问 [netlify.com](https://netlify.com)
   - 使用 GitHub 账号登录

2. **连接仓库**
   - 点击 "New site from Git"
   - 选择 GitHub
   - 选择你的 markdown-html-editor 仓库

3. **配置构建**
   - Build command: `npm run build`
   - Publish directory: `build`
   - 点击 "Deploy site"

4. **访问应用**
   - 部署完成后获得 `https://your-app.netlify.app/` 地址

#### 方法二：拖拽部署
1. **本地构建**
   ```bash
   npm install
   npm run build
   ```

2. **拖拽部署**
   - 访问 [netlify.com/drop](https://netlify.com/drop)
   - 将 `build` 文件夹拖拽到页面
   - 获得临时访问地址

### Vercel 部署

#### 方法一：CLI 部署
```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录 Vercel
vercel login

# 3. 部署项目
vercel

# 4. 按提示完成配置
# - Set up and deploy? Yes
# - Which scope? 选择你的账号
# - Link to existing project? No
# - Project name? markdown-html-editor
# - In which directory is your code located? ./
```

#### 方法二：Git 连接
1. **访问 Vercel**
   - 登录 [vercel.com](https://vercel.com)
   - 点击 "New Project"

2. **导入仓库**
   - 选择 GitHub
   - 选择 markdown-html-editor 仓库
   - 点击 "Import"

3. **配置项目**
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
   - 点击 "Deploy"

## 🔧 自定义部署

### 使用独立版本进行自定义部署

如果你想在自己的服务器上部署，可以使用独立版本：

1. **准备文件**
   ```bash
   # 只需要这一个文件
   standalone-editor.html
   ```

2. **上传到服务器**
   - 将文件上传到你的 Web 服务器
   - 确保服务器支持静态文件访问

3. **配置服务器**
   ```nginx
   # Nginx 配置示例
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           root /path/to/your/files;
           index standalone-editor.html;
           try_files $uri $uri/ /standalone-editor.html;
       }
   }
   ```

4. **访问应用**
   - 访问 `http://your-domain.com/standalone-editor.html`

## 📱 移动端使用

### 浏览器兼容性
- **iOS Safari**: 14.0+
- **Android Chrome**: 90+
- **Samsung Internet**: 14.0+

### 移动端优化功能
- ✅ 响应式布局自动适配
- ✅ 触摸操作支持
- ✅ 虚拟键盘适配
- ✅ 手势操作支持

### 移动端使用技巧
1. **添加到主屏幕**
   - iOS: Safari → 分享 → 添加到主屏幕
   - Android: Chrome → 菜单 → 添加到主屏幕

2. **全屏模式**
   - 添加到主屏幕后，从主屏幕启动获得类似原生应用的体验

## 🔒 安全性说明

### 数据安全
- ✅ **本地存储**: 所有数据存储在浏览器本地
- ✅ **无服务器传输**: 不会向任何服务器发送你的内容
- ✅ **离线工作**: 完全可以离线使用
- ✅ **隐私保护**: 不收集任何用户数据

### 文件安全
- ✅ **客户端处理**: 所有文件操作在浏览器中完成
- ✅ **无上传**: 文件不会上传到任何服务器
- ✅ **本地保存**: 文件直接保存到你的设备

## 🆘 故障排除

### 常见问题

#### 1. 页面显示空白
**原因**: JavaScript 被禁用或浏览器不兼容
**解决方案**:
- 确保浏览器启用了 JavaScript
- 使用支持的浏览器版本
- 清除浏览器缓存后重试

#### 2. 文件无法保存
**原因**: 浏览器阻止了文件下载
**解决方案**:
- 检查浏览器下载设置
- 允许网站下载文件
- 尝试不同的浏览器

#### 3. 功能不完整
**原因**: 使用了过旧的浏览器版本
**解决方案**:
- 更新浏览器到最新版本
- 参考兼容性列表选择合适的浏览器

#### 4. 移动端显示异常
**原因**: 屏幕尺寸或浏览器兼容性问题
**解决方案**:
- 旋转设备到横屏模式
- 使用推荐的移动浏览器
- 清除浏览器缓存

### 获取帮助

如果遇到其他问题：
1. 查看 [FAQ 文档](./FAQ.md)
2. 搜索 [GitHub Issues](https://github.com/your-username/markdown-html-editor/issues)
3. 创建新的 [Issue](https://github.com/your-username/markdown-html-editor/issues/new)

## 🎯 使用建议

### 最佳实践
1. **定期保存**: 使用 Ctrl+S 或保存按钮定期保存工作
2. **备份重要文档**: 导出重要文档到本地文件
3. **浏览器书签**: 将在线版本添加到浏览器书签
4. **快捷键使用**: 熟悉常用快捷键提高效率

### 性能优化
1. **大文档处理**: 对于超大文档，建议分段编辑
2. **浏览器选择**: Chrome 和 Firefox 提供最佳性能
3. **内存管理**: 定期刷新页面释放内存

---

🎉 **现在你可以开始使用 Markdown-HTML 双向编辑器了！**

选择最适合你的使用方式，享受高效的文档编辑体验。