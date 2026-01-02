# 项目简化设计文档

## 概述

本设计文档描述了如何系统性地简化 Markdown-HTML 编辑器项目，移除冗余代码，合并相似功能，并优化项目结构。

## 架构

### 简化后的文件结构

```
markdown-html-editor/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Editor.tsx          # 合并后的主编辑器
│   │   └── Toolbar.tsx         # 简化的工具栏
│   ├── utils/
│   │   ├── conversion.ts       # 合并的转换功能
│   │   └── fileOperations.ts   # 简化的文件操作
│   ├── styles/
│   │   └── main.css           # 合并的样式文件
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.css
├── standalone-editor.html      # 独立版本
├── package.json
├── README.md
└── netlify.toml
```

## 组件和接口

### 主要组件

#### 1. Editor 组件
- **功能**: 合并 MarkdownEditor 和 HTMLEditor 的功能
- **状态**: 编辑模式、内容、撤销/重做栈
- **方法**: 模式切换、内容更新、转换功能

#### 2. Toolbar 组件
- **功能**: 简化的工具栏，包含核心操作
- **操作**: 模式切换、文件操作、转换按钮

### 数据模型

```typescript
interface EditorState {
  mode: 'markdown' | 'html';
  markdownContent: string;
  htmlContent: string;
}

interface FileOperation {
  save: (content: string, filename: string) => void;
  load: (file: File) => Promise<string>;
}
```

## 正确性属性

*属性是应该在系统所有有效执行中保持为真的特征或行为——本质上是关于系统应该做什么的正式声明。属性作为人类可读规范和机器可验证正确性保证之间的桥梁。*

### 属性 1: 功能完整性保持
*对于任何*核心编辑功能，简化后的系统应该保持与原系统相同的功能行为
**验证: 需求 1.1, 2.1**

### 属性 2: 文件数量减少
*对于任何*项目目录，简化后的文件数量应该显著少于原始文件数量
**验证: 需求 1.2, 1.5**

### 属性 3: 代码质量提升
*对于任何*代码文件，简化后应该没有未使用的变量或 ESLint 警告
**验证: 需求 4.1, 4.2**

## 错误处理

- 保持基本的错误处理机制
- 简化错误提示逻辑
- 移除过度复杂的错误恢复机制

## 测试策略

### 单元测试
- 保留核心功能的基本测试
- 删除冗余和重复的测试文件
- 专注于主要功能路径的测试

### 属性测试
- 验证简化后功能的完整性
- 测试文件操作的正确性
- 确保转换功能的准确性