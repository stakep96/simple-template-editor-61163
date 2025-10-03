import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useSiteEditor } from '@/contexts/SiteEditorContext';

const BrandEditor = () => {
  const { config, updateBrand } = useSiteEditor();

  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="primary" className="text-sm">Cor Primária</Label>
        <div className="flex gap-2 mt-1">
          <Input
            id="primary"
            type="color"
            value={config.brand.primary}
            onChange={(e) => updateBrand({ primary: e.target.value })}
            className="h-10 w-20 p-1 cursor-pointer"
          />
          <Input
            type="text"
            value={config.brand.primary}
            onChange={(e) => updateBrand({ primary: e.target.value })}
            className="flex-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="secondary" className="text-sm">Cor Secundária</Label>
        <div className="flex gap-2 mt-1">
          <Input
            id="secondary"
            type="color"
            value={config.brand.secondary}
            onChange={(e) => updateBrand({ secondary: e.target.value })}
            className="h-10 w-20 p-1 cursor-pointer"
          />
          <Input
            type="text"
            value={config.brand.secondary}
            onChange={(e) => updateBrand({ secondary: e.target.value })}
            className="flex-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="accent" className="text-sm">Cor de Destaque</Label>
        <div className="flex gap-2 mt-1">
          <Input
            id="accent"
            type="color"
            value={config.brand.accent}
            onChange={(e) => updateBrand({ accent: e.target.value })}
            className="h-10 w-20 p-1 cursor-pointer"
          />
          <Input
            type="text"
            value={config.brand.accent}
            onChange={(e) => updateBrand({ accent: e.target.value })}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};

export default BrandEditor;
