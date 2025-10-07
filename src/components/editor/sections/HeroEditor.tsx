import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
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
        <Label htmlFor={`heroImage-${instanceId}`} className="text-sm">Imagem de Fundo (URL)</Label>
        <Input
          id={`heroImage-${instanceId}`}
          type="text"
          value={heroConfig.backgroundImage}
          onChange={(e) => updateModuleInstance(instanceId, { backgroundImage: e.target.value })}
          placeholder="URL da imagem"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor={`gradientOpacity-${instanceId}`} className="text-sm">
          Opacidade do Gradiente: {Math.round(heroConfig.gradientOpacity * 100)}%
        </Label>
        <Slider
          id={`gradientOpacity-${instanceId}`}
          value={[heroConfig.gradientOpacity]}
          onValueChange={(value) => updateModuleInstance(instanceId, { gradientOpacity: value[0] })}
          min={0}
          max={1}
          step={0.1}
          className="mt-2"
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
    </div>
  );
};

export default HeroEditor;
