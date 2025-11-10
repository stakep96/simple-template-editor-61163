import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { FooterConfig } from '@/contexts/SiteEditorContext';
import aboutWorkLogo from '@/assets/about-work-logo.png';

interface PreviewFooterProps {
  instanceId: string;
}

const PreviewFooter: React.FC<PreviewFooterProps> = ({ instanceId }) => {
  const { config } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const footerConfig = instance?.config as FooterConfig;

  if (!footerConfig) return null;

  return (
    <footer className="w-full">
      {/* Copyright Section - Editable */}
      <div 
        className="w-full pb-6 px-4"
        style={{ backgroundColor: 'var(--brand-primary)' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white text-sm font-medium whitespace-pre-line" style={{ fontFamily: 'var(--brand-text-font)' }}>
            {footerConfig.copyrightText}
          </p>
        </div>
      </div>

      {/* About.work Signature - Fixed */}
      <div className="w-full py-4 px-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
          <span className="text-sm text-gray-700" style={{ fontFamily: 'var(--brand-text-font)' }}>Esse site foi feito com:</span>
          <img 
            src={aboutWorkLogo} 
            alt="About.work" 
            className="h-8 object-contain"
          />
        </div>
      </div>
    </footer>
  );
};

export default PreviewFooter;
