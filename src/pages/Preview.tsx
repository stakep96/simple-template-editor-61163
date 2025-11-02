import React from 'react';
import PreviewSite from '@/components/preview/PreviewSite';
import { SiteEditorProvider } from '@/contexts/SiteEditorContext';

const Preview = () => {
  return (
    <SiteEditorProvider>
      <div className="w-full min-h-screen">
        <PreviewSite />
      </div>
    </SiteEditorProvider>
  );
};

export default Preview;
