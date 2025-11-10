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
  const instance = config.moduleInstances[instanceId];
  const titleDescriptionConfig = instance?.config as TitleDescriptionConfig;

  if (!titleDescriptionConfig) return null;

  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor={`title-${instanceId}`} className="text-sm">Título</Label>
        <Input
          id={`title-${instanceId}`}
          type="text"
          value={titleDescriptionConfig.title}
          onChange={(e) => updateModuleInstance(instanceId, { title: e.target.value })}
          placeholder="Digite o título"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor={`description-${instanceId}`} className="text-sm">Descrição (opcional)</Label>
        <Textarea
          id={`description-${instanceId}`}
          value={titleDescriptionConfig.description}
          onChange={(e) => updateModuleInstance(instanceId, { description: e.target.value })}
          placeholder="Digite a descrição (deixe em branco para mostrar apenas o título)"
          className="mt-1 min-h-[80px]"
        />
      </div>
    </div>
  );
};

export default TitleDescriptionEditor;
