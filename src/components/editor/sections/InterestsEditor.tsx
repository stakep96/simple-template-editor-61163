import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { InterestsConfig } from '@/contexts/SiteEditorContext';

interface InterestsEditorProps {
  instanceId: string;
}

const InterestsEditor: React.FC<InterestsEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const moduleConfig = config.moduleInstances[instanceId]?.config as InterestsConfig;

  const updateTitle = (title: string) => {
    updateModuleInstance(instanceId, { title });
  };

  const updateTag = (index: number, value: string) => {
    const updatedTags = [...moduleConfig.tags];
    updatedTags[index] = value;
    updateModuleInstance(instanceId, { tags: updatedTags });
  };

  const removeTag = (index: number) => {
    const updatedTags = moduleConfig.tags.filter((_, i) => i !== index);
    updateModuleInstance(instanceId, { tags: updatedTags });
  };

  const addTag = () => {
    updateModuleInstance(instanceId, { tags: [...moduleConfig.tags, 'Nova tag'] });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Título do Componente</Label>
        <Input
          value={moduleConfig.title}
          onChange={(e) => updateTitle(e.target.value)}
          placeholder="Ex: Interesses do Público"
        />
      </div>

      <div className="space-y-3">
        <Label>Tags de Interesse</Label>
        {moduleConfig.tags.map((tag, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={tag}
              onChange={(e) => updateTag(index, e.target.value)}
              placeholder="Ex: Moda"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeTag(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}

        <Button
          onClick={addTag}
          variant="outline"
          className="w-full"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Tag
        </Button>
      </div>
    </div>
  );
};

export default InterestsEditor;
