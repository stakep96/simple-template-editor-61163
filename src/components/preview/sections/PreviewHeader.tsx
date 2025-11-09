import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import { Disc } from 'lucide-react';
import type { HeaderConfig } from '@/contexts/SiteEditorContext';

interface PreviewHeaderProps {
  instanceId: string;
}

const PreviewHeader: React.FC<PreviewHeaderProps> = ({ instanceId }) => {
  const { config } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const headerConfig = instance?.config as HeaderConfig;

  if (!headerConfig) return null;

  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <header 
      className={`px-4 py-6 flex items-center ${alignmentClasses[headerConfig.alignment]} ${
        headerConfig.transparentBackground ? 'absolute top-0 left-0 right-0 z-10' : ''
      }`}
      style={{ 
        backgroundColor: headerConfig.transparentBackground ? 'transparent' : config.brand.primary 
      }}
    >
      {headerConfig.logo ? (
        (headerConfig.logo.startsWith('http') || headerConfig.logo.startsWith('data:') || headerConfig.logo.startsWith('/')) ? (
          <img src={headerConfig.logo} alt="Logo" className="h-8" />
        ) : (
          <div className="flex items-center gap-2">
            <Disc className="w-6 h-6" style={{ color: config.brand.secondary }} />
            <span className="font-bold text-lg" style={{ 
              color: config.brand.secondary,
              fontFamily: 'var(--brand-title-font)'
            }}>
              {headerConfig.logo}
            </span>
          </div>
        )
      ) : (
        <div className="flex items-center gap-2">
          <Disc className="w-6 h-6" style={{ color: config.brand.secondary }} />
          <span className="font-bold text-lg" style={{ 
            color: config.brand.secondary,
            fontFamily: 'var(--brand-title-font)'
          }}>
            Jurídico
          </span>
        </div>
      )}
    </header>
  );
};

export default PreviewHeader;
