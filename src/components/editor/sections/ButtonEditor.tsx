import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { ButtonConfig } from '@/contexts/SiteEditorContext';

interface ButtonEditorProps {
  instanceId: string;
}

const ButtonEditor: React.FC<ButtonEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const buttonConfig = instance?.config as ButtonConfig;

  if (!buttonConfig) return null;

  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor={`button-cta-${instanceId}`} className="text-sm">Texto do Botão (CTA)</Label>
        <Input
          id={`button-cta-${instanceId}`}
          type="text"
          value={buttonConfig.ctaText}
          onChange={(e) => updateModuleInstance(instanceId, { ctaText: e.target.value })}
          placeholder="Ex: Fale Conosco"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor={`button-link-${instanceId}`} className="text-sm">Link</Label>
        <Input
          id={`button-link-${instanceId}`}
          type="text"
          value={buttonConfig.link}
          onChange={(e) => updateModuleInstance(instanceId, { link: e.target.value })}
          placeholder="Ex: https://wa.me/5511999999999"
          className="mt-1"
        />
      </div>
    </div>
  );
};

export default ButtonEditor;
