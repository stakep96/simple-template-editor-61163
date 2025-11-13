import React from 'react';
import PreviewSite from '@/components/preview/PreviewSite';
import { SiteEditorProvider, useSiteEditor } from '@/contexts/SiteEditorContext';

const PreviewRestauranteContent = () => {
  const { isLoading } = useSiteEditor();
  
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="w-full min-h-screen relative">
      <PreviewSite />
    </div>
  );
};

const PreviewRestaurante = () => {
  return (
    <SiteEditorProvider defaultTemplate="8">
      <PreviewRestauranteContent />
    </SiteEditorProvider>
  );
};

export default PreviewRestaurante;
