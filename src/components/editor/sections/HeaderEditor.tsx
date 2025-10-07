import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

const HeaderEditor = () => {
  const { config, updateHeader } = useSiteEditor();

  return (
    <div className="space-y-4">
      {config.header.enabled && (
        <>
          <div>
            <Label htmlFor="logo" className="text-sm">Logo (URL ou texto)</Label>
            <Input
              id="logo"
              type="text"
              value={config.header.logo}
              onChange={(e) => updateHeader({ logo: e.target.value })}
              placeholder="Digite o nome ou URL da logo"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label className="text-sm">Alinhamento</Label>
            <RadioGroup
              value={config.header.alignment}
              onValueChange={(value: 'left' | 'center' | 'right') => updateHeader({ alignment: value })}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="left" id="align-left" />
                <Label htmlFor="align-left" className="flex items-center gap-1 cursor-pointer">
                  <AlignLeft className="w-4 h-4" />
                  Esquerda
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="center" id="align-center" />
                <Label htmlFor="align-center" className="flex items-center gap-1 cursor-pointer">
                  <AlignCenter className="w-4 h-4" />
                  Centro
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="right" id="align-right" />
                <Label htmlFor="align-right" className="flex items-center gap-1 cursor-pointer">
                  <AlignRight className="w-4 h-4" />
                  Direita
                </Label>
              </div>
            </RadioGroup>
          </div>
        </>
      )}
    </div>
  );
};

export default HeaderEditor;
