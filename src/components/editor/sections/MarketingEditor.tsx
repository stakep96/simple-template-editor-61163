import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const MarketingEditor = () => {
  const { config, updateMarketing } = useSiteEditor();

  return (
    <div className="space-y-4">
      <Accordion type="multiple" defaultValue={['whatsapp']} className="space-y-4">
        <AccordionItem value="whatsapp" className="border rounded-lg bg-background">
          <AccordionTrigger className="px-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                <img 
                  src="/icons/whatsapp-logo.svg" 
                  alt="WhatsApp" 
                  className="w-5 h-5"
                  style={{ filter: 'brightness(0) saturate(100%) invert(47%) sepia(97%) saturate(488%) hue-rotate(92deg) brightness(94%) contrast(89%)' }}
                />
              </div>
              <div className="text-left flex-1">
                <h4 className="font-semibold text-foreground">WhatsApp</h4>
                <p className="text-xs text-muted-foreground">Botão flutuante de contato</p>
              </div>
              <Switch
                checked={config.marketing.whatsapp.enabled}
                onCheckedChange={(enabled) => 
                  updateMarketing({ 
                    whatsapp: { ...config.marketing.whatsapp, enabled } 
                  })
                }
                onClick={(e) => e.stopPropagation()}
                className="mr-2"
              />
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4">
            <div className="space-y-3 pt-2">
              <div className="space-y-2">
                <Label htmlFor="whatsapp-number">Número do WhatsApp</Label>
                <Input
                  id="whatsapp-number"
                  placeholder="Ex: 5511999999999"
                  value={config.marketing.whatsapp.number}
                  onChange={(e) => 
                    updateMarketing({ 
                      whatsapp: { ...config.marketing.whatsapp, number: e.target.value } 
                    })
                  }
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Use o formato: código do país + DDD + número (sem espaços ou símbolos)
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="gtm" className="border rounded-lg bg-background">
          <AccordionTrigger className="px-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FF6C37]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FF6C37">
                  <path d="M9.93 12.645l-1.364 1.364-2.523-2.523L3.52 14.01l2.523 2.523-1.364 1.364-3.9-3.9 3.9-3.9 1.364 1.364-2.523 2.523 2.523 2.523 1.364-1.364 3.887 3.887-1.364 1.364zM24 5.634l-3.9 3.9-1.364-1.364 2.523-2.523-2.523-2.523L20.1 1.76l3.9 3.9-.1-.026zM12 2l7.286 10L12 22 4.714 12 12 2z"/>
                </svg>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-foreground">Google Tag Manager</h4>
                <p className="text-xs text-muted-foreground">Gerenciamento de tags</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4">
            <div className="space-y-3 pt-2">
              <div className="space-y-2">
                <Label htmlFor="gtm-id">ID do Tag Manager</Label>
                <Input
                  id="gtm-id"
                  placeholder="GTM-XXXXXXX"
                  value={config.marketing.googleTagManager}
                  onChange={(e) => updateMarketing({ googleTagManager: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ga" className="border rounded-lg bg-background">
          <AccordionTrigger className="px-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#E37400]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#E37400">
                  <path d="M22.84 2.998v17.999a3.002 3.002 0 01-3.002 3.002h-15A3.002 3.002 0 011.836 21V3a3.002 3.002 0 013.002-3.002h15a3.002 3.002 0 013.002 3zm-8.977 13.683l2.475-8.717c.247-.87.022-1.488-.574-1.488h-3.463c-.594 0-1.283.618-1.528 1.488l-2.475 8.717a1.214 1.214 0 00.08.88c.174.283.47.44.81.44h4.785c.34 0 .636-.157.81-.44a1.214 1.214 0 00.08-.88z"/>
                </svg>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-foreground">Google Analytics</h4>
                <p className="text-xs text-muted-foreground">Análise de tráfego</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4">
            <div className="space-y-3 pt-2">
              <div className="space-y-2">
                <Label htmlFor="ga-id">ID do Google Analytics</Label>
                <Input
                  id="ga-id"
                  placeholder="G-XXXXXXXXXX ou UA-XXXXXXXXX-X"
                  value={config.marketing.googleAnalytics}
                  onChange={(e) => updateMarketing({ googleAnalytics: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="fb" className="border rounded-lg bg-background">
          <AccordionTrigger className="px-4 hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#1877F2]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-foreground">Facebook Pixel</h4>
                <p className="text-xs text-muted-foreground">Rastreamento de conversões</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4">
            <div className="space-y-3 pt-2">
              <div className="space-y-2">
                <Label htmlFor="fb-pixel">ID do Pixel do Facebook</Label>
                <Input
                  id="fb-pixel"
                  placeholder="XXXXXXXXXXXXXXXX"
                  value={config.marketing.facebookPixel}
                  onChange={(e) => updateMarketing({ facebookPixel: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default MarketingEditor;
