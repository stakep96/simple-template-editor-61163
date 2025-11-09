import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { BeforeAfterConfig } from '@/contexts/SiteEditorContext';

interface PreviewBeforeAfterProps {
  config: BeforeAfterConfig;
}

const PreviewBeforeAfter: React.FC<PreviewBeforeAfterProps> = ({ config }) => {
  const { config: siteConfig } = useSiteEditor();
  
  return (
    <section className="py-12" style={{ backgroundColor: siteConfig.brand.background }}>
      <h2 
        className="text-2xl font-bold text-center mb-8 px-6"
        style={{ 
          color: siteConfig.brand.titleColor,
          fontFamily: 'var(--brand-title-font)'
        }}
      >
        {config.title}
      </h2>
      
      <div className="max-w-2xl mx-auto space-y-6 px-6">
        {config.items.map((item) => (
          <div 
            key={item.id}
            className="rounded-3xl p-6 shadow-lg"
            style={{ backgroundColor: `${siteConfig.brand.primary}26` }}
          >
            <div className="relative w-full rounded-2xl overflow-hidden mb-5">
              <div className="flex">
                <div className="relative w-1/2">
                  {item.beforeImage ? (
                    <img
                      src={item.beforeImage}
                      alt="Antes"
                      className="w-full h-full object-cover"
                      style={{ aspectRatio: '1/2' }}
                    />
                  ) : (
                    <div 
                      className="w-full h-full"
                      style={{ 
                        aspectRatio: '1/2',
                        backgroundColor: siteConfig.brand.primary
                      }}
                    />
                  )}
                  <div 
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
                  >
                    Antes
                  </div>
                </div>
                
                <div className="relative w-1/2">
                  {item.afterImage ? (
                    <img
                      src={item.afterImage}
                      alt="Depois"
                      className="w-full h-full object-cover"
                      style={{ aspectRatio: '1/2' }}
                    />
                  ) : (
                    <div 
                      className="w-full h-full"
                      style={{ 
                        aspectRatio: '1/2',
                        backgroundColor: siteConfig.brand.primary
                      }}
                    />
                  )}
                  <div 
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
                  >
                    Depois
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p 
                className="text-base font-bold"
                style={{ 
                  color: siteConfig.brand.textColor,
                  fontFamily: 'var(--brand-text-font)'
                }}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PreviewBeforeAfter;
