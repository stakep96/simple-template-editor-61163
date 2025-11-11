import React, { useEffect } from 'react';
import PreviewSite from '@/components/preview/PreviewSite';
import { SiteEditorProvider, useSiteEditor } from '@/contexts/SiteEditorContext';

const PreviewDentistaContent = () => {
  const { applyTemplate } = useSiteEditor();
  
  useEffect(() => {
    applyTemplate('9');
  }, [applyTemplate]);
  
  return (
    <div className="w-full min-h-screen">
      <PreviewSite />
    </div>
  );
};

const PreviewDentista = () => {
  return (
    <SiteEditorProvider>
      <PreviewDentistaContent />
    </SiteEditorProvider>
  );
};

export default PreviewDentista;
