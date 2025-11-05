import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ImageUpload } from '@/components/ui/image-upload';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { HeroConfig } from '@/contexts/SiteEditorContext';

interface HeroEditorProps {
  instanceId: string;
}

const HeroEditor: React.FC<HeroEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const heroConfig = instance?.config as HeroConfig;

  if (!heroConfig) return null;

  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor={`heroImage-${instanceId}`} className="text-sm">Imagem de Fundo</Label>
        <ImageUpload
          value={heroConfig.backgroundImage}
          onChange={(value) => updateModuleInstance(instanceId, { backgroundImage: value })}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor={`heroTitle-${instanceId}`} className="text-sm">Título</Label>
        <Input
          id={`heroTitle-${instanceId}`}
          type="text"
          value={heroConfig.title}
          onChange={(e) => updateModuleInstance(instanceId, { title: e.target.value })}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor={`heroDescription-${instanceId}`} className="text-sm">Descrição</Label>
        <Textarea
          id={`heroDescription-${instanceId}`}
          value={heroConfig.description}
          onChange={(e) => updateModuleInstance(instanceId, { description: e.target.value })}
          className="mt-1"
          rows={3}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor={`heroFade-${instanceId}`} className="text-sm">
            Fade sobre imagem
          </Label>
          <p className="text-xs text-muted-foreground">
            Gradiente sobre a imagem de fundo
          </p>
        </div>
        <Switch
          id={`heroFade-${instanceId}`}
          checked={heroConfig.imageFade}
          onCheckedChange={(checked) => updateModuleInstance(instanceId, { imageFade: checked })}
        />
      </div>
    </div>
  );
};

export default HeroEditor;
