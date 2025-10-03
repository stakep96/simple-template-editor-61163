import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useSiteEditor } from '@/contexts/SiteEditorContext';

const HeroEditor = () => {
  const { config, updateHero } = useSiteEditor();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Ativar seção</span>
        <Switch
          checked={config.hero.enabled}
          onCheckedChange={(enabled) => updateHero({ enabled })}
        />
      </div>

      {config.hero.enabled && (
        <>
          <div>
            <Label htmlFor="heroImage" className="text-sm">Imagem de Fundo (URL)</Label>
            <Input
              id="heroImage"
              type="text"
              value={config.hero.backgroundImage}
              onChange={(e) => updateHero({ backgroundImage: e.target.value })}
              placeholder="URL da imagem"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="gradientOpacity" className="text-sm">
              Opacidade do Gradiente: {Math.round(config.hero.gradientOpacity * 100)}%
            </Label>
            <Slider
              id="gradientOpacity"
              value={[config.hero.gradientOpacity]}
              onValueChange={(value) => updateHero({ gradientOpacity: value[0] })}
              min={0}
              max={1}
              step={0.1}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="heroTitle" className="text-sm">Título</Label>
            <Input
              id="heroTitle"
              type="text"
              value={config.hero.title}
              onChange={(e) => updateHero({ title: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="heroDescription" className="text-sm">Descrição</Label>
            <Textarea
              id="heroDescription"
              value={config.hero.description}
              onChange={(e) => updateHero({ description: e.target.value })}
              className="mt-1"
              rows={3}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HeroEditor;
