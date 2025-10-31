import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { BeforeAfterConfig } from '@/contexts/SiteEditorContext';

interface PreviewBeforeAfterProps {
  config: BeforeAfterConfig;
}

const PreviewBeforeAfter: React.FC<PreviewBeforeAfterProps> = ({ config }) => {
  const { config: siteConfig } = useSiteEditor();
  
  return (
    <section className="py-16 px-4" style={{ backgroundColor: siteConfig.brand.background }}>
      <div className="container mx-auto max-w-6xl">
        <h2 
          className="text-4xl font-bold text-center mb-12"
          style={{ 
            color: siteConfig.brand.titleColor,
            fontFamily: 'var(--brand-title-font)'
          }}
        >
          {config.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {config.items.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col mx-auto w-full max-w-lg"
            >
              <div 
                className="rounded-[2rem] p-8 shadow-lg"
                style={{ backgroundColor: `${siteConfig.brand.primary}26` }}
              >
                <div className="relative w-full rounded-[1.5rem] overflow-hidden mb-6">
                  <div className="grid grid-cols-2 gap-0">
                    <div className="relative">
                      <img
                        src={item.beforeImage || 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=700&fit=crop'}
                        alt="Antes"
                        className="w-full h-full object-cover"
                        style={{ aspectRatio: '1/1.5' }}
                      />
                      <div 
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-lg font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                      >
                        Before
                      </div>
                    </div>
                    
                    <div className="relative">
                      <img
                        src={item.afterImage || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=700&fit=crop'}
                        alt="Depois"
                        className="w-full h-full object-cover"
                        style={{ aspectRatio: '1/1.5' }}
                      />
                      <div 
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-lg font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                      >
                        After
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p 
                    className="text-lg font-bold"
                    style={{ 
                      color: siteConfig.brand.textColor,
                      fontFamily: 'var(--brand-text-font)'
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreviewBeforeAfter;
