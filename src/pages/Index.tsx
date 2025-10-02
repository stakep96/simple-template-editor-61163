import React from 'react';
import { SiteEditorProvider } from '@/contexts/SiteEditorContext';
import EditorPanel from '@/components/editor/EditorPanel';
import PreviewPanel from '@/components/preview/PreviewPanel';

const Index = () => {
  return (
    <SiteEditorProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <div className="w-[420px] flex-shrink-0">
          <EditorPanel />
        </div>
        <div className="flex-1">
          <PreviewPanel />
        </div>
      </div>
    </SiteEditorProvider>
  );
};

export default Index;
