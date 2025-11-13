import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { BenefitsConfig, BenefitItem } from '@/contexts/SiteEditorContext';

interface BenefitsEditorProps {
  instanceId: string;
}

const BenefitsEditor: React.FC<BenefitsEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const benefitsConfig = instance?.config as BenefitsConfig;

  if (!benefitsConfig || !benefitsConfig.benefits) return null;

  const updateBenefit = (id: string, text: string) => {
    const updatedBenefits = benefitsConfig.benefits.map(benefit =>
      benefit.id === id ? { ...benefit, text } : benefit
    );
    updateModuleInstance(instanceId, { benefits: updatedBenefits });
  };

  const removeBenefit = (id: string) => {
    const updatedBenefits = benefitsConfig.benefits.filter(benefit => benefit.id !== id);
    updateModuleInstance(instanceId, { benefits: updatedBenefits });
  };

  const addBenefit = () => {
    const newBenefit: BenefitItem = {
      id: Date.now().toString(),
      text: 'Novo benefício',
    };
    const currentBenefits = benefitsConfig.benefits || [];
    updateModuleInstance(instanceId, { benefits: [...currentBenefits, newBenefit] });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`title-${instanceId}`} className="text-sm">Título do Card</Label>
        <Input
          id={`title-${instanceId}`}
          type="text"
          value={benefitsConfig.title}
          onChange={(e) => updateModuleInstance(instanceId, { title: e.target.value })}
          className="mt-1"
          placeholder="Ex: Acompanhamento Mensal"
        />
      </div>

      <div className="space-y-3">
        <Label className="text-sm">Lista de Benefícios</Label>
        {benefitsConfig.benefits.map((benefit) => (
          <Card key={benefit.id} className="p-3">
            <div className="flex gap-2">
              <Input
                type="text"
                value={benefit.text}
                onChange={(e) => updateBenefit(benefit.id, e.target.value)}
                placeholder="Descrição do benefício"
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeBenefit(benefit.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Button
        type="button"
        onClick={addBenefit}
        variant="outline"
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Adicionar Benefício
      </Button>

      <div>
        <Label htmlFor={`cta-${instanceId}`} className="text-sm">Texto do Botão</Label>
        <Input
          id={`cta-${instanceId}`}
          type="text"
          value={benefitsConfig.ctaText}
          onChange={(e) => updateModuleInstance(instanceId, { ctaText: e.target.value })}
          className="mt-1"
          placeholder="Ex: Agendar reunião"
        />
      </div>

      <div>
        <Label htmlFor={`link-${instanceId}`} className="text-sm">Link do Botão</Label>
        <Input
          id={`link-${instanceId}`}
          type="text"
          value={benefitsConfig.ctaLink}
          onChange={(e) => updateModuleInstance(instanceId, { ctaLink: e.target.value })}
          className="mt-1"
          placeholder="https://..."
        />
      </div>
    </div>
  );
};

export default BenefitsEditor;
