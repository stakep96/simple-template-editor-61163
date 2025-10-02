import React from 'react';
import { SiteEditorProvider } from '@/contexts/SiteEditorContext';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import EditorPanel from '@/components/editor/EditorPanel';
import PreviewPanel from '@/components/preview/PreviewPanel';

const Index = () => {
  return (
    <SiteEditorProvider>
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden">
          <AppSidebar />
          
          <div className="flex-1 flex overflow-hidden">
            <div className="w-[420px] flex-shrink-0 border-r border-border">
              <EditorPanel />
            </div>
            <div className="flex-1">
              <PreviewPanel />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </SiteEditorProvider>
  );
};

export default Index;
