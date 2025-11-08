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
              <div className="w-10 h-10 rounded-lg bg-[#4fc3f7]/10 flex items-center justify-center flex-shrink-0">
                <img 
                  src="/icons/google-tag-manager.svg" 
                  alt="Google Tag Manager" 
                  className="w-6 h-6"
                />
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
              <div className="w-10 h-10 rounded-lg bg-[#FFC107]/10 flex items-center justify-center flex-shrink-0">
                <img 
                  src="/icons/google-analytics.svg" 
                  alt="Google Analytics" 
                  className="w-6 h-6"
                />
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
              <div className="w-10 h-10 rounded-lg bg-[#0081FA]/10 flex items-center justify-center flex-shrink-0">
                <img 
                  src="/icons/meta-pixel.svg" 
                  alt="Meta Pixel" 
                  className="w-6 h-6"
                />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-foreground">Meta Pixel (Facebook)</h4>
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
