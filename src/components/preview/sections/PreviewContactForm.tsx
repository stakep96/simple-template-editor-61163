import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { ContactFormConfig } from '@/contexts/SiteEditorContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface PreviewContactFormProps {
  instanceId: string;
}

const PreviewContactForm: React.FC<PreviewContactFormProps> = ({ instanceId }) => {
  const { config } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const contactConfig = instance?.config as ContactFormConfig;

  if (!contactConfig) return null;

  return (
    <section className="py-8 px-4" style={{ backgroundColor: 'var(--brand-background)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2" style={{ 
            color: 'var(--brand-title-color)',
            fontFamily: 'var(--brand-title-font)'
          }}>
            {contactConfig.title}
          </h2>
          <p className="text-lg" style={{ 
            color: 'var(--brand-text-color)',
            fontFamily: 'var(--brand-text-font)'
          }}>
            {contactConfig.subtitle}
          </p>
        </div>

        <div 
          className="rounded-xl shadow-lg p-8 max-w-2xl mx-auto"
          style={{ backgroundColor: config.brand.primary }}
        >
          <form className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-sm font-medium" style={{ color: config.brand.secondary }}>Nome Completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="Digite seu nome"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium" style={{ color: config.brand.secondary }}>E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm font-medium" style={{ color: config.brand.secondary }}>Telefone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(00) 00000-0000"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="message" className="text-sm font-medium" style={{ color: config.brand.secondary }}>Mensagem</Label>
              <Textarea
                id="message"
                placeholder="Como podemos ajudar?"
                className="mt-1 min-h-[120px]"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              style={{ 
                backgroundColor: config.brand.secondary,
                color: config.brand.primary,
                fontFamily: 'var(--brand-text-font)'
              }}
            >
              Enviar Mensagem
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PreviewContactForm;
