import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useSiteEditor } from '@/contexts/SiteEditorContext';

const ContactFormEditor = () => {
  const { config, updateContactForm } = useSiteEditor();

  return (
    <div className="space-y-3">
      {config.contactForm.enabled && (
        <>
          <div>
            <Label htmlFor="form-title" className="text-sm">Título</Label>
            <Input
              id="form-title"
              type="text"
              value={config.contactForm.title}
              onChange={(e) => updateContactForm({ title: e.target.value })}
              placeholder="Digite o título"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="form-subtitle" className="text-sm">Subtítulo</Label>
            <Input
              id="form-subtitle"
              type="text"
              value={config.contactForm.subtitle}
              onChange={(e) => updateContactForm({ subtitle: e.target.value })}
              placeholder="Digite o subtítulo"
              className="mt-1"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ContactFormEditor;
