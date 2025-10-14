import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import PreviewHeader from './sections/PreviewHeader';
import PreviewHero from './sections/PreviewHero';
import PreviewAbout from './sections/PreviewAbout';
import PreviewPracticeAreas from './sections/PreviewPracticeAreas';
import PreviewSuccessCases from './sections/PreviewSuccessCases';
import PreviewContactForm from './sections/PreviewContactForm';
import PreviewButton from './sections/PreviewButton';
import PreviewTestimonials from './sections/PreviewTestimonials';
import PreviewGallery from './sections/PreviewGallery';
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
      case 'button':
        return <PreviewButton key={key} instanceId={instanceId} />;
      case 'testimonials':
        if (instance.type === 'testimonials') {
          return <PreviewTestimonials key={key} config={instance.config as import('@/contexts/SiteEditorContext').TestimonialsConfig} />;
        }
        return null;
      case 'gallery':
        return <PreviewGallery key={key} instanceId={instanceId} />;
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
        '--brand-background': config.brand.background,
        '--brand-title-color': config.brand.titleColor,
        '--brand-text-color': config.brand.textColor,
        backgroundColor: config.brand.background,
      } as React.CSSProperties}
    >
      <div className="relative min-h-full">
        {config.moduleOrder.map(renderModule)}
        <WhatsAppButton />
      </div>
    </div>
  );
};

export default PreviewSite;
