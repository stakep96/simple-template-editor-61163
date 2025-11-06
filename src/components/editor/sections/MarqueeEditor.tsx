import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import ColorPicker from '../ColorPicker';
import type { MarqueeConfig } from '@/contexts/SiteEditorContext';

interface MarqueeEditorProps {
  instanceId: string;
}

const MarqueeEditor: React.FC<MarqueeEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];

  if (!instance || instance.type !== 'marquee') return null;

  const marqueeConfig = instance.config as MarqueeConfig;

  const handleChange = (field: keyof MarqueeConfig, value: any) => {
    const newConfig = {
      ...marqueeConfig,
      [field]: value,
    };
    updateModuleInstance(instanceId, newConfig);
  };

  const handleSecondLayerChange = (value: string) => {
    const newConfig = {
      ...marqueeConfig,
      secondLayer: {
        ...marqueeConfig.secondLayer,
        backgroundColor: value,
      },
    };
    updateModuleInstance(instanceId, newConfig);
  };

  const emojiOptions = ['✱', '✦', '★', '●', '◆', '▪', '•', '◉', '◎', '○', '⬥', '⬪', '⭐', '🌟', '💫'];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="marquee-items">Textos do Marquee (separados por vírgula)</Label>
          <Textarea
            id="marquee-items"
            value={marqueeConfig.items}
            onChange={(e) => handleChange('items', e.target.value)}
            placeholder="App Design, Website Design, Dashboard"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="marquee-separator">Separador</Label>
          <Input
            id="marquee-separator"
            value={marqueeConfig.separator}
            onChange={(e) => handleChange('separator', e.target.value)}
            placeholder="★"
            maxLength={3}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {emojiOptions.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleChange('separator', emoji)}
                className="px-3 py-2 text-xl rounded-md border border-border hover:bg-accent transition-colors"
                type="button"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="marquee-bg">Cor de Fundo Principal</Label>
          <ColorPicker
            id="marquee-bg"
            value={marqueeConfig.backgroundColor}
            onChange={(value) => handleChange('backgroundColor', value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="marquee-speed">Velocidade ({marqueeConfig.speed}s)</Label>
          <Slider
            id="marquee-speed"
            min={5}
            max={30}
            step={1}
            value={[marqueeConfig.speed]}
            onValueChange={([value]) => handleChange('speed', value)}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Menor = mais rápido, Maior = mais lento
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="second-layer-bg">Cor das Faixas Decorativas</Label>
          <ColorPicker
            id="second-layer-bg"
            value={marqueeConfig.secondLayer.backgroundColor}
            onChange={(value) => handleSecondLayerChange(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default MarqueeEditor;
