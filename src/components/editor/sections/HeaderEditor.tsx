import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ImageUpload } from '@/components/ui/image-upload';
import { Switch } from '@/components/ui/switch';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import type { HeaderConfig } from '@/contexts/SiteEditorContext';

interface HeaderEditorProps {
  instanceId: string;
}

const HeaderEditor: React.FC<HeaderEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const headerConfig = instance?.config as HeaderConfig;
  const [logoType, setLogoType] = useState<'text' | 'image'>(
    headerConfig?.logo?.startsWith('http') || headerConfig?.logo?.startsWith('data:') ? 'image' : 'text'
  );

  if (!headerConfig) return null;

  const alignmentOptions = [
    { value: 'left', label: 'Esquerda', icon: AlignLeft },
    { value: 'center', label: 'Centro', icon: AlignCenter },
    { value: 'right', label: 'Direita', icon: AlignRight },
  ];

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm mb-3 block">Tipo de Logo</Label>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            type="button"
            onClick={() => setLogoType('text')}
            className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
              logoType === 'text'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-border bg-background text-muted-foreground hover:border-primary/50'
            }`}
          >
            Texto
          </button>
          <button
            type="button"
            onClick={() => setLogoType('image')}
            className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
              logoType === 'image'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-border bg-background text-muted-foreground hover:border-primary/50'
            }`}
          >
            Imagem
          </button>
        </div>

        {logoType === 'text' ? (
          <div>
            <Label htmlFor={`logo-${instanceId}`} className="text-sm">Nome da Empresa</Label>
            <Input
              id={`logo-${instanceId}`}
              type="text"
              value={headerConfig.logo}
              onChange={(e) => updateModuleInstance(instanceId, { logo: e.target.value })}
              placeholder="Digite o nome da empresa"
              className="mt-1"
            />
          </div>
        ) : (
          <div>
            <Label className="text-sm mb-2 block">Logo</Label>
            <ImageUpload
              value={headerConfig.logo}
              onChange={(value) => updateModuleInstance(instanceId, { logo: value })}
            />
          </div>
        )}
      </div>
      
      <div>
        <Label className="text-sm mb-2 block">Alinhamento</Label>
        <div className="grid grid-cols-3 gap-2">
          {alignmentOptions.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => updateModuleInstance(instanceId, { alignment: value as 'left' | 'center' | 'right' })}
              className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
                headerConfig.alignment === value
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-background hover:border-primary/50'
              }`}
            >
              <Icon className={`w-5 h-5 ${
                headerConfig.alignment === value ? 'text-primary' : 'text-muted-foreground'
              }`} />
              <span className={`text-xs font-medium ${
                headerConfig.alignment === value ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor={`transparent-${instanceId}`} className="text-sm">
          Background Transparente
        </Label>
        <Switch
          id={`transparent-${instanceId}`}
          checked={headerConfig.transparentBackground || false}
          onCheckedChange={(checked) => updateModuleInstance(instanceId, { transparentBackground: checked })}
        />
      </div>
    </div>
  );
};

export default HeaderEditor;
