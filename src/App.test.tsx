import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('应该正确渲染应用', () => {
    render(<App />);
    
    // 应该显示工具栏
    expect(screen.getByText('Markdown-HTML编辑器')).toBeInTheDocument();
    
    // 应该显示模式切换按钮
    expect(screen.getByText('📝 Markdown')).toBeInTheDocument();
    expect(screen.getByText('🌐 HTML')).toBeInTheDocument();
    
    // 应该显示工具栏按钮
    expect(screen.getByText('📁 导入')).toBeInTheDocument();
    expect(screen.getByText('💾 保存')).toBeInTheDocument();
    expect(screen.getByText('🔄 转换')).toBeInTheDocument();
  });

  it('应该默认显示Markdown模式', () => {
    render(<App />);
    
    // Markdown按钮应该是激活状态
    const markdownButton = screen.getByText('📝 Markdown');
    expect(markdownButton).toHaveClass('bg-white', 'text-aws-primary');
    
    // 应该显示Markdown编辑标题
    expect(screen.getByText('Markdown 编辑')).toBeInTheDocument();
    // 使用更具体的选择器来避免重复文本
    expect(screen.getByRole('heading', { name: '实时预览' })).toBeInTheDocument();
  });

  it('应该有响应式的CSS类', () => {
    render(<App />);
    
    const appContainer = document.querySelector('.min-h-screen');
    expect(appContainer).toBeInTheDocument();
    expect(appContainer).toHaveClass('bg-aws-light');
  });
});