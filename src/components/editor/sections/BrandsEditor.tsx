import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { BrandsConfig, BrandLogo } from '@/contexts/SiteEditorContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/ui/image-upload';
import { Plus, Trash2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface BrandsEditorProps {
  instanceId: string;
}

const BrandsEditor: React.FC<BrandsEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const brandsConfig = instance?.config as BrandsConfig;

  if (!brandsConfig) return null;

  const updateLogo = (logoId: string, field: keyof BrandLogo, value: string) => {
    const updatedLogos = brandsConfig.logos.map((logo) =>
      logo.id === logoId ? { ...logo, [field]: value } : logo
    );
    updateModuleInstance(instanceId, { logos: updatedLogos });
  };

  const removeLogo = (logoId: string) => {
    const updatedLogos = brandsConfig.logos.filter((logo) => logo.id !== logoId);
    updateModuleInstance(instanceId, { logos: updatedLogos });
  };

  const addLogo = () => {
    const newLogo: BrandLogo = {
      id: `logo-${Date.now()}`,
      url: '',
      alt: '',
    };
    updateModuleInstance(instanceId, { logos: [...brandsConfig.logos, newLogo] });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="brands-title">Título</Label>
          <Input
            id="brands-title"
            type="text"
            value={brandsConfig.title}
            onChange={(e) => updateModuleInstance(instanceId, { title: e.target.value })}
            placeholder="Marcas Parceiras"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="brands-description">Descrição</Label>
          <Textarea
            id="brands-description"
            value={brandsConfig.description}
            onChange={(e) => updateModuleInstance(instanceId, { description: e.target.value })}
            placeholder="Já colaborei com marcas renomadas..."
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>Estilo da Caixa</Label>
          <RadioGroup
            value={brandsConfig.boxStyle || 'filled'}
            onValueChange={(value: 'filled' | 'outlined') => updateModuleInstance(instanceId, { boxStyle: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="filled" id="filled" />
              <Label htmlFor="filled" className="font-normal cursor-pointer">
                Fundo branco (preenchido)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="outlined" id="outlined" />
              <Label htmlFor="outlined" className="font-normal cursor-pointer">
                Apenas borda branca
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold">Logos</h4>
        <div className="grid grid-cols-2 gap-4">
          {brandsConfig.logos.map((logo, index) => (
            <div key={logo.id} className="relative p-4 border border-border rounded-lg space-y-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeLogo(logo.id)}
                className="absolute top-2 right-2 h-6 w-6 p-0 z-10"
              >
                <Trash2 className="w-3 h-3" />
              </Button>

              <div className="space-y-2">
                <ImageUpload
                  value={logo.url}
                  onChange={(value) => updateLogo(logo.id, 'url', value)}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor={`alt-${logo.id}`} className="text-xs">
                  Nome da Marca
                </Label>
                <Input
                  id={`alt-${logo.id}`}
                  type="text"
                  value={logo.alt || ''}
                  onChange={(e) => updateLogo(logo.id, 'alt', e.target.value)}
                  placeholder="Nome da marca"
                  className="h-8 text-xs"
                />
              </div>
            </div>
          ))}
          
          <button
            onClick={addLogo}
            className="p-4 border-2 border-dashed border-border rounded-lg hover:border-primary hover:bg-accent/50 transition-colors flex flex-col items-center justify-center gap-2 min-h-[200px]"
          >
            <Plus className="w-8 h-8 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Adicionar Logo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandsEditor;
