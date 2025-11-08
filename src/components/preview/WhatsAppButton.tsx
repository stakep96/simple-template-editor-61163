import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';

const WhatsAppButton = () => {
  const { config } = useSiteEditor();

  if (!config.marketing.whatsapp.enabled) {
    return null;
  }

  const handleClick = () => {
    if (config.marketing.whatsapp.number) {
      const url = `https://wa.me/${config.marketing.whatsapp.number}`;
      window.open(url, '_blank');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="sticky bottom-4 left-full -ml-16 w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-50 p-3"
      aria-label="Abrir WhatsApp"
    >
      <img 
        src="/icons/whatsapp-logo.svg" 
        alt="WhatsApp" 
        className="w-full h-full"
        style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
      />
    </button>
  );
};

export default WhatsAppButton;
