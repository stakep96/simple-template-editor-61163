import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { TitleDescriptionConfig } from '@/contexts/SiteEditorContext';

interface TitleDescriptionEditorProps {
  instanceId: string;
}

const TitleDescriptionEditor: React.FC<TitleDescriptionEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const titleDescriptionConfig = config.moduleInstances[instanceId]?.config as TitleDescriptionConfig;

  if (!titleDescriptionConfig) return null;

  const handleChange = (field: keyof TitleDescriptionConfig, value: string) => {
    updateModuleInstance(instanceId, {
      enabled: titleDescriptionConfig.enabled,
      title: titleDescriptionConfig.title,
      description: titleDescriptionConfig.description,
      [field]: value,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`title-${instanceId}`}>Título</Label>
        <Input
          id={`title-${instanceId}`}
          type="text"
          value={titleDescriptionConfig.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Digite o título"
        />
      </div>

      <div>
        <Label htmlFor={`description-${instanceId}`}>Descrição (opcional)</Label>
        <Textarea
          id={`description-${instanceId}`}
          value={titleDescriptionConfig.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Digite a descrição (deixe em branco para mostrar apenas o título)"
          rows={4}
        />
      </div>
    </div>
  );
};

export default TitleDescriptionEditor;
