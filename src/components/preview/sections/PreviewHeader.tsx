import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import { Scale } from 'lucide-react';

const PreviewHeader = () => {
  const { config } = useSiteEditor();

  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <header 
      className={`px-4 py-3 flex items-center ${alignmentClasses[config.header.alignment]}`}
      style={{ backgroundColor: config.brand.primary }}
    >
      {config.header.logo ? (
        config.header.logo.startsWith('http') ? (
          <img src={config.header.logo} alt="Logo" className="h-8" />
        ) : (
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6" style={{ color: config.brand.secondary }} />
            <span className="font-bold text-lg" style={{ color: config.brand.secondary }}>
              {config.header.logo}
            </span>
          </div>
        )
      ) : (
        <div className="flex items-center gap-2">
          <Scale className="w-6 h-6" style={{ color: config.brand.secondary }} />
          <span className="font-bold text-lg" style={{ color: config.brand.secondary }}>
            Advogado
          </span>
        </div>
      )}
    </header>
  );
};

export default PreviewHeader;
