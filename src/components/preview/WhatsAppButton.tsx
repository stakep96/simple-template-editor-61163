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
      className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
      aria-label="Abrir WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </button>
  );
};

export default WhatsAppButton;
