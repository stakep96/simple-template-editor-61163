import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { HeroConfig } from '@/contexts/SiteEditorContext';

interface PreviewHeroProps {
  instanceId: string;
}

const PreviewHero: React.FC<PreviewHeroProps> = ({ instanceId }) => {
  const { config } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const heroConfig = instance?.config as HeroConfig;

  if (!heroConfig) return null;

  return (
    <section 
      className="relative px-6 pb-6 pt-32 flex flex-col justify-end text-center min-h-[500px]"
      style={{
        backgroundImage: heroConfig.backgroundImage 
          ? `url(${heroConfig.backgroundImage})` 
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: config.brand.background,
      }}
    >
      {/* Gradiente fade na parte inferior */}
      {heroConfig.imageFade && (
        <div 
          className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, ${config.brand.background}85 25%, ${config.brand.background}98 60%, ${config.brand.background} 100%)`
          }}
        />
      )}
      <div className="relative z-10 space-y-3 mb-8">
        <h1 
          className="text-2xl font-bold leading-tight"
          style={{ 
            color: config.brand.titleColor,
            fontFamily: 'var(--brand-title-font)'
          }}
        >
          {heroConfig.title}
        </h1>
        <p 
          className="text-sm leading-relaxed"
          style={{ 
            color: config.brand.textColor,
            fontFamily: 'var(--brand-text-font)'
          }}
        >
          {heroConfig.description}
        </p>
      </div>
    </section>
  );
};

export default PreviewHero;
