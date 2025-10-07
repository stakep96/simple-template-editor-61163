import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import PreviewHeader from './sections/PreviewHeader';
import PreviewHero from './sections/PreviewHero';
import PreviewAbout from './sections/PreviewAbout';
import PreviewPracticeAreas from './sections/PreviewPracticeAreas';
import PreviewSuccessCases from './sections/PreviewSuccessCases';
import PreviewContactForm from './sections/PreviewContactForm';

const PreviewSite = () => {
  const { config } = useSiteEditor();

  const renderModule = (moduleId: string) => {
    switch (moduleId) {
      case 'header':
        return config.header.enabled && <PreviewHeader key={moduleId} />;
      case 'hero':
        return config.hero.enabled && <PreviewHero key={moduleId} />;
      case 'about':
        return config.about.enabled && <PreviewAbout key={moduleId} />;
      case 'practice':
        return config.practiceAreas.enabled && <PreviewPracticeAreas key={moduleId} />;
      case 'cases':
        return config.successCases.enabled && <PreviewSuccessCases key={moduleId} />;
      case 'contact':
        return config.contactForm.enabled && <PreviewContactForm key={moduleId} />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="w-full h-full overflow-y-auto overflow-x-hidden"
      style={{ 
        '--brand-primary': config.brand.primary,
        '--brand-secondary': config.brand.secondary,
        '--brand-accent': config.brand.accent,
        '--brand-text': config.brand.text,
      } as React.CSSProperties}
    >
      {config.moduleOrder.map(renderModule)}
    </div>
  );
};

export default PreviewSite;
