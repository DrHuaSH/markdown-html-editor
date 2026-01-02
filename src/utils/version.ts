// 版本信息管理
export const VERSION_INFO = {
  version: '2.1.0',
  buildDate: '2026年1月',
  buildYear: 2026,
  author: 'DrHuaSH',
  license: 'MIT',
  repository: 'https://github.com/DrHuaSH/markdown-html-editor',
  homepage: 'https://DrHuaSH.github.io/markdown-html-editor'
};

export const COPYRIGHT_INFO = {
  owner: 'DrHuaSH',
  year: new Date().getFullYear(),
  projectName: 'Markdown-HTML 双向编辑器',
  description: '一个功能强大的基于Web的双向编辑器，支持Markdown源码编辑和HTML可视化编辑',
  rights: '保留所有权利'
};

export const TECH_STACK = [
  'React 18',
  'TypeScript',
  'Monaco Editor',
  'Marked.js',
  'Turndown.js'
];

export const getCopyrightText = () => {
  return `© ${COPYRIGHT_INFO.year} ${COPYRIGHT_INFO.owner}. ${COPYRIGHT_INFO.rights}.`;
};

export const getVersionText = () => {
  return `版本 v${VERSION_INFO.version} | 构建于 ${VERSION_INFO.buildDate}`;
};