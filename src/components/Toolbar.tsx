// 简化的工具栏组件
import React, { useRef } from 'react';
import { FileOperations } from '../utils/fileOperations';
import { convertMarkdownToHtml, convertHtmlToMarkdown } from '../utils/conversion';

interface ToolbarProps {
  mode: 'markdown' | 'html';
  onModeChange: (mode: 'markdown' | 'html') => void;
  markdownContent: string;
  htmlContent: string;
  setMarkdownContent: (content: string) => void;
  setHtmlContent: (content: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  mode,
  onModeChange,
  markdownContent,
  htmlContent,
  setMarkdownContent,
  setHtmlContent,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 处理文件导入
  const handleFileLoad = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const result = await FileOperations.importFile(file);
        setMarkdownContent(result.markdown);
        setHtmlContent(result.html);
        if (result.type === 'html') {
          onModeChange('html');
        } else {
          onModeChange('markdown');
        }
      } catch (error) {
        alert('文件加载失败: ' + (error as Error).message);
      }
    }
  };

  // 保存文件
  const handleSave = () => {
    const content = mode === 'markdown' ? markdownContent : htmlContent;
    const filename = `文档_${new Date().toISOString().split('T')[0]}`;
    FileOperations.saveFile(content, filename, mode === 'html' ? 'html' : 'markdown');
  };

  // 转换功能
  const handleConvert = () => {
    if (mode === 'markdown') {
      const html = convertMarkdownToHtml(markdownContent);
      setHtmlContent(html);
      alert('已将Markdown转换为HTML！切换到HTML模式查看。');
    } else {
      const markdown = convertHtmlToMarkdown(htmlContent);
      setMarkdownContent(markdown);
      alert('已将HTML转换为Markdown！切换到Markdown模式查看。');
    }
  };

  return (
    <div className="toolbar">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-aws-secondary rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">MD</span>
          </div>
          <h1 className="text-xl font-semibold text-aws-primary">
            Markdown-HTML编辑器
          </h1>
        </div>
        
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onModeChange('markdown')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              mode === 'markdown' 
                ? 'bg-white text-aws-primary shadow-sm' 
                : 'text-gray-600 hover:text-aws-primary'
            }`}
          >
            📝 Markdown
          </button>
          <button
            onClick={() => onModeChange('html')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              mode === 'html' 
                ? 'bg-white text-aws-primary shadow-sm' 
                : 'text-gray-600 hover:text-aws-primary'
            }`}
          >
            🌐 HTML
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="aws-button aws-button-secondary"
        >
          📁 导入
        </button>
        
        <button
          onClick={handleSave}
          className="aws-button aws-button-secondary"
        >
          💾 保存
        </button>
        
        <button
          onClick={handleConvert}
          className="aws-button aws-button-secondary"
          title={mode === 'markdown' ? '将当前Markdown转换为HTML' : '将当前HTML转换为Markdown'}
        >
          🔄 转换
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".md,.html,.txt"
          onChange={handleFileLoad}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default Toolbar;