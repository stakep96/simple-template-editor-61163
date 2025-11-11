import React from 'react';
import PreviewSite from '@/components/preview/PreviewSite';
import { SiteEditorProvider, useSiteEditor } from '@/contexts/SiteEditorContext';

const PreviewAgenciaContent = () => {
  const { isLoading } = useSiteEditor();
  
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="w-full min-h-screen">
      <PreviewSite />
    </div>
  );
};

const PreviewAgencia = () => {
  return (
    <SiteEditorProvider defaultTemplate="6">
      <PreviewAgenciaContent />
    </SiteEditorProvider>
  );
};

export default PreviewAgencia;
