import React from 'react';
import type { BeforeAfterConfig } from '@/contexts/SiteEditorContext';

interface PreviewBeforeAfterProps {
  config: BeforeAfterConfig;
}

const PreviewBeforeAfter: React.FC<PreviewBeforeAfterProps> = ({ config }) => {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <p className="text-sm text-muted-foreground mb-4 text-center">
          {config.title}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {config.items.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all p-4"
            >
              <div className="relative w-full rounded-2xl overflow-hidden mb-4">
                <div className="grid grid-cols-2 h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.beforeImage || 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop'}
                      alt="Antes"
                      className="w-full h-full object-cover aspect-[3/4]"
                    />
                    <div className="absolute bottom-3 left-3 text-white text-base font-bold drop-shadow-lg">
                      Before
                    </div>
                  </div>
                  
                  <div className="relative overflow-hidden">
                    <img
                      src={item.afterImage || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop'}
                      alt="Depois"
                      className="w-full h-full object-cover aspect-[3/4]"
                    />
                    <div className="absolute bottom-3 right-3 text-white text-base font-bold drop-shadow-lg">
                      After
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">
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
