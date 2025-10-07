import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { ContactFormConfig } from '@/contexts/SiteEditorContext';

interface ContactFormEditorProps {
  instanceId: string;
}

const ContactFormEditor: React.FC<ContactFormEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const formConfig = instance?.config as ContactFormConfig;

  if (!formConfig) return null;

  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor={`form-title-${instanceId}`} className="text-sm">Título</Label>
        <Input
          id={`form-title-${instanceId}`}
          type="text"
          value={formConfig.title}
          onChange={(e) => updateModuleInstance(instanceId, { title: e.target.value })}
          placeholder="Digite o título"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor={`form-subtitle-${instanceId}`} className="text-sm">Subtítulo</Label>
        <Input
          id={`form-subtitle-${instanceId}`}
          type="text"
          value={formConfig.subtitle}
          onChange={(e) => updateModuleInstance(instanceId, { subtitle: e.target.value })}
          placeholder="Digite o subtítulo"
          className="mt-1"
        />
      </div>
    </div>
  );
};

export default ContactFormEditor;
