// 简化的编辑器上下文
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EditorContextType {
  mode: 'markdown' | 'html';
  markdownContent: string;
  htmlContent: string;
  setMode: (mode: 'markdown' | 'html') => void;
  setMarkdownContent: (content: string) => void;
  setHtmlContent: (content: string) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

interface EditorProviderProps {
  children: ReactNode;
}

export const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<'markdown' | 'html'>('markdown');
  const [markdownContent, setMarkdownContent] = useState(`# 欢迎使用 Markdown-HTML 编辑器

这是一个简洁高效的在线编辑器，支持：

## 主要功能

- **Markdown编辑**: 支持语法高亮和实时预览
- **HTML编辑**: 可视化HTML编辑和预览
- **双向转换**: Markdown ↔ HTML 无缝转换
- **文件操作**: 导入导出 .md 和 .html 文件

## 使用方法

1. 点击上方的 **📝 Markdown** 或 **🌐 HTML** 切换编辑模式
2. 在左侧编辑区域输入内容，右侧会实时显示预览
3. 使用 **📁 导入** 按钮加载本地文件
4. 使用 **💾 保存** 按钮保存您的工作

## 示例内容

### 代码块
\`\`\`javascript
function hello() {
    console.log("Hello, World!");
}
\`\`\`

### 表格
| 功能 | 支持 |
|------|------|
| Markdown | ✅ |
| HTML | ✅ |
| 实时预览 | ✅ |

### 列表
- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2

**祝您使用愉快！**`);
  const [htmlContent, setHtmlContent] = useState('');

  return (
    <EditorContext.Provider value={{
      mode,
      markdownContent,
      htmlContent,
      setMode,
      setMarkdownContent,
      setHtmlContent,
    }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = (): EditorContextType => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};