import React from 'react';
import PreviewSite from '@/components/preview/PreviewSite';
import { SiteEditorProvider } from '@/contexts/SiteEditorContext';

const PreviewAgenciaContent = () => {
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
