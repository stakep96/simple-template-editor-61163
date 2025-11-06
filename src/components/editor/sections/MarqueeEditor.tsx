import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import ColorPicker from '../ColorPicker';
import type { MarqueeConfig } from '@/components/preview/sections/PreviewMarquee';

interface MarqueeEditorProps {
  config: MarqueeConfig;
  onChange: (config: MarqueeConfig) => void;
}

const MarqueeEditor: React.FC<MarqueeEditorProps> = ({ config, onChange }) => {
  const emojiOptions = ['✱', '✦', '★', '●', '◆', '▪', '•', '◉', '◎', '○', '⬥', '⬪', '⭐', '🌟', '💫'];

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="marquee-items">Textos (separados por vírgula)</Label>
        <Textarea
          id="marquee-items"
          value={config.items}
          onChange={(e) => onChange({ ...config, items: e.target.value })}
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
            onChange={(e) => onChange({ ...config, separator: e.target.value })}
            placeholder="✱"
            maxLength={5}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {emojiOptions.map((emoji) => (
              <button
                key={emoji}
                onClick={() => onChange({ ...config, separator: emoji })}
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
          onChange={(color) => onChange({ ...config, backgroundColor: color })}
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
          onValueChange={(value) => onChange({ ...config, speed: value[0] })}
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
