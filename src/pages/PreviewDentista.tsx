import React from 'react';
import PreviewSite from '@/components/preview/PreviewSite';
import { SiteEditorProvider } from '@/contexts/SiteEditorContext';

const PreviewDentistaContent = () => {
  return (
    <div className="w-full min-h-screen">
      <PreviewSite />
    </div>
  );
};

const PreviewDentista = () => {
  return (
    <SiteEditorProvider defaultTemplate="9">
      <PreviewDentistaContent />
    </SiteEditorProvider>
  );
};

export default PreviewDentista;
