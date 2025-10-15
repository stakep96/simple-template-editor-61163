import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import { Droplet, Type, Check } from 'lucide-react';
import { fontCombinations } from '@/lib/fontCombinations';

const BrandEditor = () => {
  const { config, updateBrand } = useSiteEditor();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Paleta de Cores */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Droplet className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Paleta de Cores</h3>
        </div>

        <div className="space-y-3">
          <div>
            <Label htmlFor="primary" className="text-sm mb-2 block">Cor Primária</Label>
            <div className="flex gap-2">
              <Input
                id="primary"
                type="color"
                value={config.brand.primary}
                onChange={(e) => updateBrand({ primary: e.target.value })}
                className="h-10 w-16 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={config.brand.primary}
                onChange={(e) => updateBrand({ primary: e.target.value })}
                className="flex-1 font-mono text-sm"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="secondary" className="text-sm mb-2 block">Cor Secundária</Label>
            <div className="flex gap-2">
              <Input
                id="secondary"
                type="color"
                value={config.brand.secondary}
                onChange={(e) => updateBrand({ secondary: e.target.value })}
                className="h-10 w-16 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={config.brand.secondary}
                onChange={(e) => updateBrand({ secondary: e.target.value })}
                className="flex-1 font-mono text-sm"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="accent" className="text-sm mb-2 block">Cor de Destaque</Label>
            <div className="flex gap-2">
              <Input
                id="accent"
                type="color"
                value={config.brand.accent}
                onChange={(e) => updateBrand({ accent: e.target.value })}
                className="h-10 w-16 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={config.brand.accent}
                onChange={(e) => updateBrand({ accent: e.target.value })}
                className="flex-1 font-mono text-sm"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="background" className="text-sm mb-2 block">Background do Site</Label>
            <div className="flex gap-2">
              <Input
                id="background"
                type="color"
                value={config.brand.background}
                onChange={(e) => updateBrand({ background: e.target.value })}
                className="h-10 w-16 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={config.brand.background}
                onChange={(e) => updateBrand({ background: e.target.value })}
                className="flex-1 font-mono text-sm"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="titleColor" className="text-sm mb-2 block">Cor dos Títulos</Label>
            <div className="flex gap-2">
              <Input
                id="titleColor"
                type="color"
                value={config.brand.titleColor}
                onChange={(e) => updateBrand({ titleColor: e.target.value })}
                className="h-10 w-16 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={config.brand.titleColor}
                onChange={(e) => updateBrand({ titleColor: e.target.value })}
                className="flex-1 font-mono text-sm"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="textColor" className="text-sm mb-2 block">Cor dos Textos</Label>
            <div className="flex gap-2">
              <Input
                id="textColor"
                type="color"
                value={config.brand.textColor}
                onChange={(e) => updateBrand({ textColor: e.target.value })}
                className="h-10 w-16 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={config.brand.textColor}
                onChange={(e) => updateBrand({ textColor: e.target.value })}
                className="flex-1 font-mono text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Combinações de Fontes */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Type className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Combinações de Fontes</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {fontCombinations.map((combo) => (
            <button
              key={combo.id}
              onClick={() => updateBrand({ fontCombination: combo.id })}
              className={`relative p-6 rounded-lg border-2 transition-all hover:border-primary ${
                config.brand.fontCombination === combo.id
                  ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                  : 'border-border bg-card'
              }`}
            >
              <div className="space-y-2">
                <p 
                  className="text-3xl font-bold text-center"
                  style={{ fontFamily: combo.titleFamily }}
                >
                  {combo.titleFont}
                </p>
                <p 
                  className="text-base text-center text-muted-foreground"
                  style={{ fontFamily: combo.textFamily }}
                >
                  {combo.textFont}
                </p>
              </div>
              {config.brand.fontCombination === combo.id && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandEditor;
