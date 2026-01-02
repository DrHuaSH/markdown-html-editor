// 简化的转换工具 - 合并 Markdown 和 HTML 转换功能
import { marked } from 'marked';
import TurndownService from 'turndown';

// 转换引擎类
export class ConversionEngine {
  private turndownService: TurndownService;

  constructor() {
    // 配置 marked - 禁用已弃用的选项
    marked.setOptions({
      breaks: true,
      gfm: true,
      mangle: false,
      headerIds: false,
    });

    // 配置 turndown
    this.turndownService = new TurndownService({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
    });
  }

  // Markdown 转 HTML
  markdownToHtml(markdown: string): string {
    try {
      return marked.parse(markdown);
    } catch (error) {
      console.error('Markdown转换错误:', error);
      return '<p>转换失败，请检查Markdown语法</p>';
    }
  }

  // HTML 转 Markdown
  htmlToMarkdown(html: string): string {
    try {
      return this.turndownService.turndown(html);
    } catch (error) {
      console.error('HTML转换错误:', error);
      return '转换失败，请检查HTML语法';
    }
  }
}

// 导出默认实例
export const conversionEngine = new ConversionEngine();

// 便捷函数
export const convertMarkdownToHtml = (markdown: string) => 
  conversionEngine.markdownToHtml(markdown);

export const convertHtmlToMarkdown = (html: string) => 
  conversionEngine.htmlToMarkdown(html);