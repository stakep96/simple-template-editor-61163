import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import ColorPicker from '../ColorPicker';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { MarqueeConfig } from '@/contexts/SiteEditorContext';

interface MarqueeEditorProps {
  instanceId: string;
}

const MarqueeEditor: React.FC<MarqueeEditorProps> = ({ instanceId }) => {
  const { config: siteConfig, updateModuleInstance } = useSiteEditor();
  const instance = siteConfig.moduleInstances[instanceId];
  
  if (!instance || instance.type !== 'marquee') return null;
  
  const config = instance.config as MarqueeConfig;
  
  const handleChange = (newConfig: Partial<MarqueeConfig>) => {
    updateModuleInstance(instanceId, newConfig);
  };
  const emojiOptions = ['✱', '✦', '★', '●', '◆', '▪', '•', '◉', '◎', '○', '⬥', '⬪', '⭐', '🌟', '💫'];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-semibold text-sm">Faixa Principal</h3>
        <div>
          <Label htmlFor="marquee-items">Textos (separados por vírgula)</Label>
          <Textarea
            id="marquee-items"
            value={config.items}
            onChange={(e) => handleChange({ items: e.target.value })}
            placeholder="App Design, Website Design, Dashboard"
            rows={3}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="marquee-separator">Separador</Label>
          <div className="mt-2 space-y-2">
            <Input
              id="marquee-separator"
              value={config.separator}
              onChange={(e) => handleChange({ separator: e.target.value })}
              placeholder="✱"
              maxLength={5}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {emojiOptions.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleChange({ separator: emoji })}
                  className="px-3 py-2 text-xl rounded-md border border-border hover:bg-accent transition-colors"
                  type="button"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="marquee-bg">Cor de Fundo</Label>
          <ColorPicker
            id="marquee-bg"
            value={config.backgroundColor}
            onChange={(color) => handleChange({ backgroundColor: color })}
          />
        </div>

        <div>
          <Label htmlFor="marquee-speed">Velocidade ({config.speed}s)</Label>
          <Slider
            id="marquee-speed"
            min={10}
            max={60}
            step={5}
            value={[config.speed]}
            onValueChange={(value) => handleChange({ speed: value[0] })}
            className="mt-2"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Menor = mais rápido, Maior = mais lento
          </p>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t">
        <div className="flex items-center gap-2">
          <Switch
            id="second-layer"
            checked={config.secondLayer?.enabled ?? false}
            onCheckedChange={(enabled) => handleChange({ 
              secondLayer: { 
                enabled,
                items: config.secondLayer?.items || '',
                backgroundColor: config.secondLayer?.backgroundColor || '#1a5a3a'
              }
            })}
          />
          <Label htmlFor="second-layer" className="font-semibold text-sm">Segunda Faixa (Fundo)</Label>
        </div>

        {config.secondLayer?.enabled && (
          <>
            <div>
              <Label htmlFor="second-layer-items">Textos da Segunda Faixa</Label>
              <Textarea
                id="second-layer-items"
                placeholder="Branding, UX/UI, Prototyping"
                value={config.secondLayer.items}
                onChange={(e) => handleChange({ 
                  secondLayer: { 
                    ...config.secondLayer,
                    items: e.target.value 
                  }
                })}
                rows={3}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Cor de Fundo da Segunda Faixa</Label>
              <ColorPicker
                id="second-layer-bg-color"
                value={config.secondLayer.backgroundColor}
                onChange={(color) => handleChange({ 
                  secondLayer: { 
                    ...config.secondLayer,
                    backgroundColor: color 
                  }
                })}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MarqueeEditor;
