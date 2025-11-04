import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { BrandsConfig } from '@/contexts/SiteEditorContext';

interface PreviewBrandsProps {
  instanceId: string;
}

const PreviewBrands: React.FC<PreviewBrandsProps> = ({ instanceId }) => {
  const { config } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const brandsConfig = instance?.config as BrandsConfig;

  if (!brandsConfig || !brandsConfig.enabled) return null;

  const validLogos = brandsConfig.logos.filter(logo => logo.url);

  if (validLogos.length === 0) return null;

  return (
    <section 
      className="py-16 px-4"
      style={{ backgroundColor: config.brand.background }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            className="text-2xl font-bold mb-4"
            style={{ 
              color: config.brand.titleColor,
              fontFamily: 'var(--brand-title-font)'
            }}
          >
            {brandsConfig.title}
          </h2>
          <p 
            className="text-base max-w-2xl mx-auto"
            style={{ 
              color: config.brand.textColor,
              fontFamily: 'var(--brand-text-font)'
            }}
          >
            {brandsConfig.description}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 items-center justify-items-center">
          {validLogos.map((logo) => (
            <div 
              key={logo.id} 
              className="flex items-center justify-center w-full h-32 p-6"
            >
              <img 
                src={logo.url} 
                alt={logo.alt || 'Logo'} 
                className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreviewBrands;
