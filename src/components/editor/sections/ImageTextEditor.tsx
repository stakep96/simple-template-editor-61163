import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/ui/image-upload';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { ImageTextConfig } from '@/contexts/SiteEditorContext';

interface ImageTextEditorProps {
  instanceId: string;
}

const ImageTextEditor: React.FC<ImageTextEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const imageTextConfig = instance?.config as ImageTextConfig;

  if (!imageTextConfig) return null;

  return (
    <div className="space-y-3">
      <div>
        <Label className="text-sm">Imagem</Label>
        <ImageUpload
          value={imageTextConfig.image}
          onChange={(value) => updateModuleInstance(instanceId, { image: value })}
          className="mt-1"
        />
      </div>

      <div>
        <Label className="text-sm">Título</Label>
        <Input
          value={imageTextConfig.title}
          onChange={(e) => updateModuleInstance(instanceId, { title: e.target.value })}
          className="mt-1"
        />
      </div>

      <div>
        <Label className="text-sm">Texto</Label>
        <Textarea
          value={imageTextConfig.description}
          onChange={(e) => updateModuleInstance(instanceId, { description: e.target.value })}
          className="mt-1"
          rows={4}
        />
      </div>
    </div>
  );
};

export default ImageTextEditor;
