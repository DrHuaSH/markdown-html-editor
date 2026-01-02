// 简化的文件操作工具
import { convertMarkdownToHtml, convertHtmlToMarkdown } from './conversion';

export class FileOperations {
  // 保存文件
  static saveFile(content: string, filename: string, type: 'html' | 'markdown' = 'markdown'): void {
    const blob = new Blob([content], { 
      type: type === 'html' ? 'text/html;charset=utf-8' : 'text/markdown;charset=utf-8' 
    });
    const extension = type === 'html' ? '.html' : '.md';
    const finalFilename = filename.includes('.') ? filename : `${filename}${extension}`;
    
    // 创建下载链接
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = finalFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // 读取文件
  static readFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = () => reject(new Error('文件读取失败'));
      reader.readAsText(file, 'UTF-8');
    });
  }

  // 导入文件并转换
  static async importFile(file: File): Promise<{ 
    title: string; 
    markdown: string; 
    html: string; 
    type: 'markdown' | 'html' | 'text' 
  }> {
    const content = await this.readFile(file);
    const title = file.name.replace(/\.[^/.]+$/, '');
    const extension = file.name.toLowerCase().split('.').pop();
    
    let markdown = '';
    let html = '';
    let type: 'markdown' | 'html' | 'text' = 'text';

    if (extension === 'md' || extension === 'markdown') {
      type = 'markdown';
      markdown = content;
      html = convertMarkdownToHtml(content);
    } else if (extension === 'html' || extension === 'htm') {
      type = 'html';
      html = content;
      markdown = convertHtmlToMarkdown(content);
    } else {
      // 作为 markdown 处理
      type = 'markdown';
      markdown = content;
      html = convertMarkdownToHtml(content);
    }

    return { title, markdown, html, type };
  }
}