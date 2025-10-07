import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import PreviewHeader from './sections/PreviewHeader';
import PreviewHero from './sections/PreviewHero';
import PreviewAbout from './sections/PreviewAbout';
import PreviewPracticeAreas from './sections/PreviewPracticeAreas';
import PreviewSuccessCases from './sections/PreviewSuccessCases';
import PreviewContactForm from './sections/PreviewContactForm';
import WhatsAppButton from './WhatsAppButton';

const PreviewSite = () => {
  const { config } = useSiteEditor();

  const renderModule = (instanceId: string) => {
    const instance = config.moduleInstances[instanceId];
    if (!instance || !instance.enabled) return null;

    const key = instanceId;

    switch (instance.type) {
      case 'header':
        return <PreviewHeader key={key} instanceId={instanceId} />;
      case 'hero':
        return <PreviewHero key={key} instanceId={instanceId} />;
      case 'about':
        return <PreviewAbout key={key} instanceId={instanceId} />;
      case 'practice':
        return <PreviewPracticeAreas key={key} instanceId={instanceId} />;
      case 'cases':
        return <PreviewSuccessCases key={key} instanceId={instanceId} />;
      case 'contact':
        return <PreviewContactForm key={key} instanceId={instanceId} />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="w-full h-full overflow-y-auto overflow-x-hidden relative"
      style={{ 
        '--brand-primary': config.brand.primary,
        '--brand-secondary': config.brand.secondary,
        '--brand-accent': config.brand.accent,
        '--brand-text': config.brand.text,
      } as React.CSSProperties}
    >
      {config.moduleOrder.map(renderModule)}
      <WhatsAppButton />
    </div>
  );
};

export default PreviewSite;
