// 简化的主应用组件
import React from 'react';
import { EditorProvider, useEditor } from './contexts/EditorContext';
import Toolbar from './components/Toolbar';
import Editor from './components/Editor';

const AppContent: React.FC = () => {
  const {
    mode,
    markdownContent,
    htmlContent,
    setMode,
    setMarkdownContent,
    setHtmlContent,
  } = useEditor();

  return (
    <div className="min-h-screen bg-aws-light">
      <Toolbar
        mode={mode}
        onModeChange={setMode}
        markdownContent={markdownContent}
        htmlContent={htmlContent}
        setMarkdownContent={setMarkdownContent}
        setHtmlContent={setHtmlContent}
      />
      <div className="p-4">
        <Editor
          mode={mode}
          markdownContent={markdownContent}
          htmlContent={htmlContent}
          onMarkdownChange={setMarkdownContent}
          onHtmlChange={setHtmlContent}
        />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <EditorProvider>
      <AppContent />
    </EditorProvider>
  );
};

export default App;