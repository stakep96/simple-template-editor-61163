import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Palette } from 'lucide-react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';

const BrandEditor = () => {
  const { config, updateBrand } = useSiteEditor();

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Palette className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Cores</h3>
          <p className="text-xs text-muted-foreground">Paleta de cores do site</p>
        </div>
      </div>

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
    </Card>
  );
};

export default BrandEditor;
