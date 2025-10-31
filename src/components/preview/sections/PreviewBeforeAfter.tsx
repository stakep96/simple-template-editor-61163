import React from 'react';
import type { BeforeAfterConfig } from '@/contexts/SiteEditorContext';

interface PreviewBeforeAfterProps {
  config: BeforeAfterConfig;
}

const PreviewBeforeAfter: React.FC<PreviewBeforeAfterProps> = ({ config }) => {
  return (
    <section className="py-16 px-4" style={{ backgroundColor: '#4a4a4a' }}>
      <div className="container mx-auto max-w-6xl">
        <p className="text-xs text-muted-foreground mb-8 text-left opacity-60">
          {config.title}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {config.items.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden p-6 mx-auto max-w-sm"
            >
              <div className="relative w-full rounded-2xl overflow-hidden mb-6">
                <div className="grid grid-cols-2 gap-0">
                  <div className="relative">
                    <img
                      src={item.beforeImage || 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=500&fit=crop'}
                      alt="Antes"
                      className="w-full h-full object-cover"
                      style={{ aspectRatio: '3/4' }}
                    />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-base font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      Before
                    </div>
                  </div>
                  
                  <div className="relative">
                    <img
                      src={item.afterImage || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop'}
                      alt="Depois"
                      className="w-full h-full object-cover"
                      style={{ aspectRatio: '3/4' }}
                    />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-base font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      After
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreviewBeforeAfter;
