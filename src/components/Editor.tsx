// 简化的统一编辑器组件 - 合并 Markdown 和 HTML 编辑功能
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { convertMarkdownToHtml } from '../utils/conversion';

// 光标位置保存和恢复工具函数
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

const restoreCursorPosition = (element: HTMLElement, position: { start: number; end: number }) => {
  if (!position) return;
  
  const selection = window.getSelection();
  if (!selection) return;
  
  const range = document.createRange();
  let charIndex = 0;
  let nodeStack = [element as Node];
  let node: Node | undefined;
  let foundStart = false;
  let stop = false;
  
  while (!stop && (node = nodeStack.pop())) {
    if (node.nodeType === Node.TEXT_NODE) {
      const nextCharIndex = charIndex + (node.textContent?.length || 0);
      if (!foundStart && position.start >= charIndex && position.start <= nextCharIndex) {
        range.setStart(node, position.start - charIndex);
        foundStart = true;
      }
      if (foundStart && position.end >= charIndex && position.end <= nextCharIndex) {
        range.setEnd(node, position.end - charIndex);
        stop = true;
      }
      charIndex = nextCharIndex;
    } else {
      let i = node.childNodes.length;
      while (i--) {
        nodeStack.push(node.childNodes[i]);
      }
    }
  }
  
  selection.removeAllRanges();
  selection.addRange(range);
};

interface EditorProps {
  mode: 'markdown' | 'html';
  markdownContent: string;
  htmlContent: string;
  onMarkdownChange: (content: string) => void;
  onHtmlChange: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({
  mode,
  markdownContent,
  htmlContent,
  onMarkdownChange,
  onHtmlChange,
}) => {
  const [previewContent, setPreviewContent] = useState('');
  const previewRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLTextAreaElement>(null);
  const cursorPositionRef = useRef<{ start: number; end: number } | null>(null);
  const isUpdatingFromCodeRef = useRef(false);

  // 初始化 HTML 内容
  useEffect(() => {
    if (!htmlContent && mode === 'html') {
      const demoHtml = `<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px; color: white;">
  <h1 style="text-align: center; color: #FFD700; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">🎨 HTML 编辑器</h1>
  <p style="text-align: center; font-style: italic; opacity: 0.9;">体验所见即所得的编辑功能</p>
  
  <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">
    <h3>✨ 功能特点</h3>
    <ul>
      <li>🎨 <strong>丰富样式</strong> - 支持各种CSS效果</li>
      <li>✏️ <strong>实时编辑</strong> - 直接在预览区域编辑</li>
      <li>🔄 <strong>代码同步</strong> - 可视化编辑与代码实时同步</li>
    </ul>
  </div>
  
  <p style="background: rgba(255,215,0,0.2); border-left: 5px solid #FFD700; padding: 15px; border-radius: 0 10px 10px 0;">
    <strong>开始编辑：</strong>点击任何文字开始编辑，使用工具栏快速格式化。所有样式都会完美保持！
  </p>
</div>`;
      onHtmlChange(demoHtml);
    }
  }, [htmlContent, mode, onHtmlChange]);

  // Markdown 模式：更新预览
  useEffect(() => {
    if (mode === 'markdown') {
      const html = convertMarkdownToHtml(markdownContent);
      setPreviewContent(html);
    }
  }, [markdownContent, mode]);

  // HTML 模式：同步预览和代码，保持光标位置
  useEffect(() => {
    if (mode === 'html' && previewRef.current && !isUpdatingFromCodeRef.current) {
      // 保存当前光标位置
      const savedPosition = saveCursorPosition(previewRef.current);
      
      // 更新内容
      previewRef.current.innerHTML = htmlContent;
      
      // 恢复光标位置
      if (savedPosition) {
        // 使用 setTimeout 确保 DOM 更新完成后再恢复光标
        setTimeout(() => {
          if (previewRef.current) {
            restoreCursorPosition(previewRef.current, savedPosition);
          }
        }, 0);
      }
    }
    isUpdatingFromCodeRef.current = false;
  }, [htmlContent, mode]);

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

  // 处理代码编辑
  const handleCodeChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (mode === 'markdown') {
      onMarkdownChange(newContent);
    } else {
      // 标记这次更新来自代码编辑器
      isUpdatingFromCodeRef.current = true;
      onHtmlChange(newContent);
    }
  }, [mode, onMarkdownChange, onHtmlChange]);

  // 格式化工具函数
  const formatText = useCallback((command: string, value?: string) => {
    if (mode === 'html' && previewRef.current) {
      // 保存光标位置
      const savedPosition = saveCursorPosition(previewRef.current);
      
      // 执行格式化命令
      document.execCommand(command, false, value);
      
      // 更新内容
      handleHtmlPreviewEdit();
      
      // 恢复光标位置
      if (savedPosition) {
        setTimeout(() => {
          if (previewRef.current) {
            restoreCursorPosition(previewRef.current, savedPosition);
          }
        }, 0);
      }
    }
  }, [mode, handleHtmlPreviewEdit]);

  if (mode === 'markdown') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full" style={{ minHeight: '600px' }}>
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-3 text-aws-primary">Markdown 编辑</h3>
          <textarea
            className="markdown-editor flex-1"
            value={markdownContent}
            onChange={handleCodeChange}
            placeholder="在这里输入Markdown内容..."
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-3 text-aws-primary">实时预览</h3>
          <div 
            className="preview-panel flex-1"
            dangerouslySetInnerHTML={{ __html: previewContent }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full" style={{ minHeight: '600px' }}>
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold mb-3 text-aws-primary">HTML 编辑</h3>
        <textarea
          ref={codeRef}
          className="html-editor flex-1"
          value={htmlContent}
          onChange={handleCodeChange}
          placeholder="在这里输入HTML内容..."
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold text-aws-primary">可视化编辑</h3>
          <span className="text-sm text-gray-600">💡 可直接编辑</span>
        </div>
        <div 
          ref={previewRef}
          className="preview-panel flex-1"
          contentEditable={true}
          suppressContentEditableWarning={true}
          onInput={handleHtmlPreviewEdit}
          style={{ cursor: 'text' }}
        />
        
        {/* HTML 编辑工具栏 */}
        <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => formatText('bold')}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 font-bold"
              title="加粗"
            >
              B
            </button>
            <button
              onClick={() => formatText('italic')}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 italic"
              title="斜体"
            >
              I
            </button>
            <button
              onClick={() => formatText('underline')}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 underline"
              title="下划线"
            >
              U
            </button>
            <button
              onClick={() => {
                const url = prompt('请输入链接地址:');
                if (url) formatText('createLink', url);
              }}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
              title="插入链接"
            >
              🔗 链接
            </button>
            <button
              onClick={() => formatText('formatBlock', 'h1')}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
              title="标题1"
            >
              H1
            </button>
            <button
              onClick={() => formatText('formatBlock', 'h2')}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
              title="标题2"
            >
              H2
            </button>
            <button
              onClick={() => formatText('insertUnorderedList')}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50"
              title="无序列表"
            >
              • 列表
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;