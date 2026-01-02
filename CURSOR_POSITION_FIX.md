# HTML 可视化编辑光标位置修复

## 问题描述
在 HTML 可视化编辑模式下，当用户修改内容后，光标会跳转到文档的最前面，影响用户体验。

## 解决方案

### 实现的功能
1. **光标位置保存**: 在内容更新前保存当前光标位置
2. **光标位置恢复**: 在内容更新后恢复光标到原来的位置
3. **智能更新**: 区分来自代码编辑器和可视化编辑器的更新

### 核心实现

#### 1. 光标位置工具函数
```typescript
// 保存光标位置
const saveCursorPosition = (element: HTMLElement) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;
  
  const range = selection.getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(element);
  preCaretRange.setEnd(range.startContainer, range.startOffset);
  const caretOffset = preCaretRange.toString().length;
  
  return {
    start: caretOffset,
    end: caretOffset + range.toString().length
  };
};

// 恢复光标位置
const restoreCursorPosition = (element: HTMLElement, position: { start: number; end: number }) => {
  // 遍历DOM节点，找到对应的文本位置并设置光标
  // ...实现细节
};
```

#### 2. 智能更新机制
```typescript
const isUpdatingFromCodeRef = useRef(false);

// HTML 模式：同步预览和代码，保持光标位置
useEffect(() => {
  if (mode === 'html' && previewRef.current && !isUpdatingFromCodeRef.current) {
    // 保存当前光标位置
    const savedPosition = saveCursorPosition(previewRef.current);
    
    // 更新内容
    previewRef.current.innerHTML = htmlContent;
    
    // 恢复光标位置
    if (savedPosition) {
      setTimeout(() => {
        if (previewRef.current) {
          restoreCursorPosition(previewRef.current, savedPosition);
        }
      }, 0);
    }
  }
  isUpdatingFromCodeRef.current = false;
}, [htmlContent, mode]);
```

#### 3. 编辑事件处理
```typescript
// 处理 HTML 预览编辑
const handleHtmlPreviewEdit = useCallback(() => {
  if (mode === 'html' && previewRef.current) {
    // 保存光标位置
    cursorPositionRef.current = saveCursorPosition(previewRef.current);
    
    const newHtml = previewRef.current.innerHTML;
    if (newHtml !== htmlContent) {
      onHtmlChange(newHtml);
    }
  }
}, [mode, htmlContent, onHtmlChange]);
```

## 技术特点

### 1. 精确的光标定位
- 使用字符偏移量而不是DOM节点引用
- 支持跨多个文本节点的选择范围
- 处理嵌套HTML结构

### 2. 性能优化
- 使用 `useRef` 避免不必要的重新渲染
- 异步恢复光标位置，避免阻塞UI更新
- 智能判断更新来源，避免循环更新

### 3. 兼容性
- 使用标准的 Selection API
- 支持现代浏览器的光标操作
- 优雅处理边界情况

## 用户体验改进

### 修复前
- ❌ 编辑后光标跳到文档开头
- ❌ 需要重新定位到编辑位置
- ❌ 影响编辑流畅性

### 修复后
- ✅ 光标保持在编辑位置
- ✅ 无缝的编辑体验
- ✅ 支持选择范围保持

## 测试验证

### 功能测试
1. **基本编辑**: 在文档中间位置编辑文字，光标保持不变
2. **格式化操作**: 使用工具栏按钮格式化文本，光标位置正确
3. **选择范围**: 选择一段文字进行操作，选择范围得到保持
4. **代码同步**: 在代码编辑器中修改，不影响可视化编辑器的光标

### 构建测试
```bash
✅ npm run build - 构建成功
✅ npm test - 所有测试通过
✅ 类型检查通过
```

## 总结

通过实现智能的光标位置保存和恢复机制，成功解决了HTML可视化编辑中光标跳转的问题。这个修复显著提升了用户的编辑体验，使得在HTML模式下的编辑变得更加流畅和直观。

**修复完成！** 🎉