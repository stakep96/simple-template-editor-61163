import React from 'react';
import { Label } from '@/components/ui/label';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import { Droplet, Type, Check } from 'lucide-react';
import { fontCombinations } from '@/lib/fontCombinations';
import ColorPicker from '@/components/editor/ColorPicker';

const BrandEditor = () => {
  const { config, updateBrand } = useSiteEditor();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Paleta de Cores */}
        <div className="border rounded-lg p-6 bg-card">
          <div className="flex items-center gap-2 mb-6">
            <Droplet className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Paleta de Cores</h3>
          </div>

          <div className="space-y-3">
            <div>
              <Label htmlFor="primary" className="text-sm mb-2 block">Cor Primária</Label>
              <ColorPicker
                id="primary"
                value={config.brand.primary}
                onChange={(value) => updateBrand({ primary: value })}
              />
            </div>

            <div>
              <Label htmlFor="secondary" className="text-sm mb-2 block">Cor Secundária</Label>
              <ColorPicker
                id="secondary"
                value={config.brand.secondary}
                onChange={(value) => updateBrand({ secondary: value })}
              />
            </div>

            <div>
              <Label htmlFor="accent" className="text-sm mb-2 block">Cor de Destaque</Label>
              <ColorPicker
                id="accent"
                value={config.brand.accent}
                onChange={(value) => updateBrand({ accent: value })}
              />
            </div>

            <div>
              <Label htmlFor="background" className="text-sm mb-2 block">Background do Site</Label>
              <ColorPicker
                id="background"
                value={config.brand.background}
                onChange={(value) => updateBrand({ background: value })}
              />
            </div>

            <div>
              <Label htmlFor="titleColor" className="text-sm mb-2 block">Cor dos Títulos</Label>
              <ColorPicker
                id="titleColor"
                value={config.brand.titleColor}
                onChange={(value) => updateBrand({ titleColor: value })}
              />
            </div>

            <div>
              <Label htmlFor="textColor" className="text-sm mb-2 block">Cor dos Textos</Label>
              <ColorPicker
                id="textColor"
                value={config.brand.textColor}
                onChange={(value) => updateBrand({ textColor: value })}
              />
            </div>
          </div>
        </div>

        {/* Combinações de Fontes */}
        <div className="border rounded-lg p-6 bg-card">
          <div className="flex items-center gap-2 mb-6">
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
    </div>
  );
};

export default BrandEditor;
