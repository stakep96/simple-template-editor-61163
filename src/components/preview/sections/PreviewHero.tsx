import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';

const PreviewHero = () => {
  const { config } = useSiteEditor();

  return (
    <section 
      className="relative px-6 py-16 flex flex-col items-center justify-center text-center min-h-[300px]"
      style={{
        backgroundImage: config.hero.backgroundImage 
          ? `url(${config.hero.backgroundImage})` 
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${config.brand.primary}${Math.round(config.hero.gradientOpacity * 255).toString(16).padStart(2, '0')}, ${config.brand.primary}${Math.round(config.hero.gradientOpacity * 255).toString(16).padStart(2, '0')})`,
        }}
      />
      <div className="relative z-10 space-y-4">
        <h1 
          className="text-2xl font-bold leading-tight"
          style={{ color: config.brand.secondary }}
        >
          {config.hero.title}
        </h1>
        <p 
          className="text-sm leading-relaxed"
          style={{ color: config.brand.secondary, opacity: 0.9 }}
        >
          {config.hero.description}
        </p>
      </div>
    </section>
  );
};

export default PreviewHero;
