# 设计文档 - 编辑器改进

## 概述

本设计文档描述了对Markdown-HTML双向编辑器的四个关键改进：移除内容联动、修复滚动位置、添加示例内容和修复按钮功能。

## 架构

### 内容独立性架构
- **独立状态管理**: Markdown和HTML内容在EditorContext中完全分离
- **手动转换机制**: 用户主动触发内容转换，而非自动同步
- **模式切换优化**: 切换模式时不触发内容同步逻辑

### 滚动位置保持机制
- **位置记录**: 在内容更新前记录滚动位置和选择状态
- **异步恢复**: 使用requestAnimationFrame确保DOM更新完成后恢复
- **防抖处理**: 避免频繁的位置保存和恢复操作

## 组件和接口

### EditorContext 修改
```typescript
interface EditorContent {
  markdown: string;
  html: string;
  // 移除自动同步相关字段
  // lastSyncTime: number;
  // syncInProgress: boolean;
}

// 新增手动转换方法
interface EditorContextType {
  convertMarkdownToHtml: () => void;
  convertHtmlToMarkdown: () => void;
}
```

### HTMLEditor 组件增强
```typescript
interface ScrollPosition {
  scrollTop: number;
  scrollLeft: number;
  selectionRange?: Range;
}

interface HTMLEditorState {
  scrollPosition: ScrollPosition;
  isUpdating: boolean;
  demoContentLoaded: boolean;
}
```

### Toolbar 组件修复
```typescript
interface ToolbarProps {
  // 确保所有按钮在不同模式下都能正常工作
  onSave: () => Promise<void>;
  onExportMarkdown: () => Promise<void>;
  onExportHtml: () => Promise<void>;
  currentMode: 'markdown' | 'html';
  isProcessing: boolean;
}
```

## 数据模型

### 示例内容模板
```typescript
interface DemoContent {
  title: string;
  html: string;
  features: string[];
  awsStyled: boolean;
}

const HTML_DEMO_CONTENT: DemoContent = {
  title: "HTML可视化编辑器演示",
  html: `<!-- 包含AWS风格的丰富示例内容 -->`,
  features: ["渐变背景", "CSS动画", "响应式表格", "交互按钮"],
  awsStyled: true
};
```

### 滚动状态管理
```typescript
interface ScrollState {
  position: ScrollPosition;
  timestamp: number;
  isValid: boolean;
}

class ScrollManager {
  savePosition(element: HTMLElement): ScrollState;
  restorePosition(element: HTMLElement, state: ScrollState): void;
  debounceRestore(callback: () => void, delay: number): void;
}
```

## 正确性属性

*属性是一个特征或行为，应该在系统的所有有效执行中保持为真——本质上是关于系统应该做什么的正式陈述。属性作为人类可读规范和机器可验证正确性保证之间的桥梁。*

### 属性 1: 内容独立性
*对于任何* 编辑操作，在一个模式下的内容更改不应影响另一个模式的内容
**验证：需求 1.1, 1.2, 1.3**

### 属性 2: 滚动位置保持
*对于任何* 在可视化编辑器中的内容修改，编辑完成后滚动位置应该与编辑前相同（误差在合理范围内）
**验证：需求 2.1, 2.2, 2.3**

### 属性 3: 示例内容完整性
*对于任何* HTML模式的首次加载，应该显示包含所有指定功能特性的示例内容
**验证：需求 3.1, 3.2, 3.3, 3.4, 3.5**

### 属性 4: 按钮功能一致性
*对于任何* 工具栏按钮操作，在HTML模式下应该与在Markdown模式下具有相同的功能行为
**验证：需求 4.1, 4.2, 4.3, 4.4, 4.5**

### 属性 5: 手动转换正确性
*对于任何* 有效的内容，手动转换操作应该产生正确的目标格式内容
**验证：需求 1.4**

## 错误处理

### 滚动位置恢复失败
- **检测**: 监控位置恢复操作的成功率
- **降级**: 如果恢复失败，保持当前位置而不是跳转到顶部
- **日志**: 记录失败原因用于调试

### 示例内容加载失败
- **检测**: 验证示例内容是否正确加载
- **降级**: 使用简化的默认内容
- **重试**: 提供重新加载示例内容的选项

### 按钮功能异常
- **检测**: 监控按钮点击事件和响应
- **反馈**: 提供清晰的错误消息和状态指示
- **恢复**: 自动重试或提供手动重试选项

## 测试策略

### 单元测试
- **内容独立性**: 测试模式切换时内容不变
- **滚动管理**: 测试位置保存和恢复逻辑
- **示例加载**: 测试示例内容的正确加载
- **按钮响应**: 测试各按钮在不同模式下的行为

### 集成测试
- **用户工作流**: 测试完整的编辑和保存流程
- **模式切换**: 测试模式间的无缝切换
- **文件操作**: 测试导入导出功能的完整性

### 属性测试
- **内容隔离**: 验证内容独立性属性
- **位置保持**: 验证滚动位置保持属性
- **功能一致**: 验证按钮功能一致性属性

每个属性测试应该运行最少100次迭代，使用随机生成的测试数据验证通用正确性。测试应该标记为：**Feature: editor-improvements, Property {number}: {property_text}**