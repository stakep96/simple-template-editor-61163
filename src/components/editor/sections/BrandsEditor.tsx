import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { BrandsConfig, BrandLogo } from '@/contexts/SiteEditorContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ImageUpload } from '@/components/ui/image-upload';
import { Plus, Trash2 } from 'lucide-react';

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
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold">Logos</h4>
        {brandsConfig.logos.map((logo, index) => (
          <div key={logo.id} className="p-4 border border-border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Logo {index + 1}</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeLogo(logo.id)}
                className="h-8 w-8 p-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`url-${logo.id}`} className="text-xs">
                Logo
              </Label>
              <ImageUpload
                value={logo.url}
                onChange={(value) => updateLogo(logo.id, 'url', value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`alt-${logo.id}`} className="text-xs">
                Nome da Marca
              </Label>
              <Input
                id={`alt-${logo.id}`}
                type="text"
                value={logo.alt || ''}
                onChange={(e) => updateLogo(logo.id, 'alt', e.target.value)}
                placeholder="Nome da marca"
              />
            </div>
          </div>
        ))}
      </div>

      <Button onClick={addLogo} variant="outline" className="w-full border-dashed hover:border-solid">
        <Plus className="w-4 h-4 mr-2" />
        Adicionar Logo
      </Button>
    </div>
  );
};

export default BrandsEditor;
