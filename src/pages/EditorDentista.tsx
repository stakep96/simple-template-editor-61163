import React from 'react';
import { SiteEditorProvider } from '@/contexts/SiteEditorContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import EditorPanel from '@/components/editor/EditorPanel';
import PreviewPanel from '@/components/preview/PreviewPanel';

const EditorDentista = () => {
  return (
    <SiteEditorProvider templateId="9">
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden">
          <AppSidebar />
          
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 border-r border-border">
              <EditorPanel />
            </div>
            <div className="w-[380px] flex-shrink-0">
              <PreviewPanel />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </SiteEditorProvider>
  );
};

export default EditorDentista;
