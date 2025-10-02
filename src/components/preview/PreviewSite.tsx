import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import PreviewHeader from './sections/PreviewHeader';
import PreviewHero from './sections/PreviewHero';
import PreviewAbout from './sections/PreviewAbout';
import PreviewPracticeAreas from './sections/PreviewPracticeAreas';
import PreviewSuccessCases from './sections/PreviewSuccessCases';

const PreviewSite = () => {
  const { config } = useSiteEditor();

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
      {config.header.enabled && <PreviewHeader />}
      {config.hero.enabled && <PreviewHero />}
      {config.about.enabled && <PreviewAbout />}
      {config.practiceAreas.enabled && <PreviewPracticeAreas />}
      {config.successCases.enabled && <PreviewSuccessCases />}
    </div>
  );
};

export default PreviewSite;
