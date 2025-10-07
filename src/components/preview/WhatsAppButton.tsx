import React from 'react';
import { MessageCircle } from 'lucide-react';
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
      className="absolute bottom-4 right-4 w-12 h-12 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
      aria-label="Abrir WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
};

export default WhatsAppButton;
