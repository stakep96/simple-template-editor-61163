import React, { useEffect } from 'react';
import PreviewSite from '@/components/preview/PreviewSite';
import { SiteEditorProvider, useSiteEditor } from '@/contexts/SiteEditorContext';

const PreviewAgenciaContent = () => {
  const { applyTemplate } = useSiteEditor();
  
  useEffect(() => {
    applyTemplate('1');
  }, [applyTemplate]);
  
  return (
    <div className="w-full min-h-screen">
      <PreviewSite />
    </div>
  );
};

const PreviewAgencia = () => {
  return (
    <SiteEditorProvider>
      <PreviewAgenciaContent />
    </SiteEditorProvider>
  );
};

export default PreviewAgencia;
