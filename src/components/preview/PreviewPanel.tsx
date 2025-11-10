import React from 'react';
import { Smartphone } from 'lucide-react';
import PreviewSite from './PreviewSite';

const PreviewPanel = () => {
  return (
    <div className="h-full bg-muted flex flex-col">
      <div className="p-6 border-b border-border bg-background flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Preview ao Vivo</h2>
        </div>
      </div>
      
      <div className="flex-1 p-8 flex items-center justify-center overflow-auto">
        <div className="w-[320px] h-[620px] bg-preview-frame rounded-[2.5rem] p-3 shadow-2xl">
          <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden">
            <PreviewSite />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
