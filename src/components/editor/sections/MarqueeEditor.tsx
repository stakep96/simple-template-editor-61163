import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
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
      <div>
        <Label htmlFor="marquee-items">Textos (separados por vírgula)</Label>
        <Textarea
          id="marquee-items"
          value={config.items}
          onChange={(e) => handleChange({ items: e.target.value })}
          placeholder="App Design, Website Design, Dashboard, Wireframe"
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
  );
};

export default MarqueeEditor;
