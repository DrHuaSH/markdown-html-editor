# 需求文档 - 编辑器改进

## 介绍

对现有的Markdown-HTML双向编辑器进行用户体验改进，解决内容联动、滚动位置、示例内容和按钮功能等问题。

## 术语表

- **Editor**: 编辑器系统
- **HTML_Mode**: HTML编辑模式
- **Markdown_Mode**: Markdown编辑模式
- **Visual_Editor**: HTML可视化编辑区域
- **Content_Sync**: 内容同步机制
- **Toolbar_Buttons**: 工具栏按钮组件

## 需求

### 需求 1: 移除模式间内容联动

**用户故事:** 作为用户，我希望HTML和Markdown两个编辑模式的内容完全独立，这样我可以在不同模式下编辑不同的内容而不会相互影响。

#### 验收标准

1. WHEN 用户在Markdown模式下编辑内容 THEN HTML模式的内容SHALL保持不变
2. WHEN 用户在HTML模式下编辑内容 THEN Markdown模式的内容SHALL保持不变
3. WHEN 用户切换编辑模式 THEN 系统SHALL NOT自动同步内容
4. THE Editor SHALL提供手动转换按钮供用户主动转换内容

### 需求 2: 修复HTML可视化编辑滚动位置

**用户故事:** 作为用户，我希望在HTML可视化编辑区域进行编辑后，页面保持在当前位置，而不是跳转到顶部。

#### 验收标准

1. WHEN 用户在Visual_Editor中编辑内容 THEN 滚动位置SHALL保持不变
2. WHEN 内容更新完成后 THEN 系统SHALL恢复到编辑前的滚动位置
3. WHEN 用户选择文本后编辑 THEN 选择状态和位置SHALL尽可能保持
4. THE Visual_Editor SHALL使用requestAnimationFrame确保DOM更新完成后再恢复位置

### 需求 3: 添加HTML编辑界面示例内容

**用户故事:** 作为用户，我希望HTML编辑界面首次打开时显示丰富美观的示例内容，展示编辑器的功能特性。

#### 验收标准

1. WHEN HTML模式首次加载 THEN 系统SHALL显示功能演示的示例内容
2. THE 示例内容SHALL符合AWS设计风格
3. THE 示例内容SHALL包含多种HTML元素和CSS样式效果
4. THE 示例内容SHALL展示渐变、阴影、动画等现代CSS特性
5. THE 示例内容SHALL包含交互式元素和表格数据

### 需求 4: 修复HTML编辑界面按钮功能

**用户故事:** 作为用户，我希望HTML编辑界面的保存、.md、.html按钮能够正常工作，这样我可以保存和导出我的工作。

#### 验收标准

1. WHEN 用户在HTML模式下点击保存按钮 THEN 系统SHALL保存当前HTML内容
2. WHEN 用户在HTML模式下点击.md按钮 THEN 系统SHALL导出Markdown格式文件
3. WHEN 用户在HTML模式下点击.html按钮 THEN 系统SHALL导出HTML格式文件
4. THE Toolbar_Buttons SHALL在HTML模式下正确响应用户操作
5. THE 按钮状态SHALL根据当前内容和模式正确更新