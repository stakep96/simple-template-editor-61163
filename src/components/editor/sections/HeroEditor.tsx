import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Mountain } from 'lucide-react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';

const HeroEditor = () => {
  const { config, updateHero } = useSiteEditor();

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Mountain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Hero</h3>
            <p className="text-xs text-muted-foreground">Banner principal</p>
          </div>
        </div>
        <Switch
          checked={config.hero.enabled}
          onCheckedChange={(enabled) => updateHero({ enabled })}
        />
      </div>

      {config.hero.enabled && (
        <div className="space-y-3">
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
        </div>
      )}
    </Card>
  );
};

export default HeroEditor;
