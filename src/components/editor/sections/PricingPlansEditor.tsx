import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Trash2, Plus, X } from 'lucide-react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { PricingPlansConfig, PricingPlan } from '@/contexts/SiteEditorContext';

interface PricingPlansEditorProps {
  instanceId: string;
}

const PricingPlansEditor: React.FC<PricingPlansEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const plansConfig = instance?.config as PricingPlansConfig;

  if (!plansConfig || !plansConfig.plans) return null;

  const updatePlan = (planId: string, field: keyof PricingPlan, value: any) => {
    const updatedPlans = plansConfig.plans.map((plan) =>
      plan.id === planId ? { ...plan, [field]: value } : plan
    );
    updateModuleInstance(instanceId, { plans: updatedPlans });
  };

  const addBenefit = (planId: string) => {
    const updatedPlans = plansConfig.plans.map((plan) =>
      plan.id === planId ? { ...plan, benefits: [...plan.benefits, ''] } : plan
    );
    updateModuleInstance(instanceId, { plans: updatedPlans });
  };

  const updateBenefit = (planId: string, benefitIndex: number, value: string) => {
    const updatedPlans = plansConfig.plans.map((plan) => {
      if (plan.id === planId) {
        const newBenefits = [...plan.benefits];
        newBenefits[benefitIndex] = value;
        return { ...plan, benefits: newBenefits };
      }
      return plan;
    });
    updateModuleInstance(instanceId, { plans: updatedPlans });
  };

  const removeBenefit = (planId: string, benefitIndex: number) => {
    const updatedPlans = plansConfig.plans.map((plan) => {
      if (plan.id === planId) {
        const newBenefits = plan.benefits.filter((_, index) => index !== benefitIndex);
        return { ...plan, benefits: newBenefits };
      }
      return plan;
    });
    updateModuleInstance(instanceId, { plans: updatedPlans });
  };

  const removePlan = (planId: string) => {
    const updatedPlans = plansConfig.plans.filter((plan) => plan.id !== planId);
    updateModuleInstance(instanceId, { plans: updatedPlans });
  };

  const addPlan = () => {
    const newPlan: PricingPlan = {
      id: Date.now().toString(),
      name: 'Novo Plano',
      price: '0',
      period: 'mensal',
      benefits: ['Benefício 1'],
      ctaText: 'Escolher Plano',
      ctaLink: '',
    };
    const currentPlans = plansConfig.plans || [];
    updateModuleInstance(instanceId, { plans: [...currentPlans, newPlan] });
  };

  return (
    <div className="space-y-4">
      {plansConfig.plans.map((plan) => (
        <Card key={plan.id} className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm">Plano</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removePlan(plan.id)}
              className="h-8 w-8 p-0 hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>

          <div>
            <Label htmlFor={`plan-name-${plan.id}`} className="text-sm">
              Nome do Plano
            </Label>
            <Input
              id={`plan-name-${plan.id}`}
              value={plan.name}
              onChange={(e) => updatePlan(plan.id, 'name', e.target.value)}
              placeholder="Ex: Plano Premium"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor={`plan-original-price-${plan.id}`} className="text-sm">
              Preço Original (Opcional)
            </Label>
            <Input
              id={`plan-original-price-${plan.id}`}
              value={plan.originalPrice || ''}
              onChange={(e) => updatePlan(plan.id, 'originalPrice', e.target.value)}
              placeholder="Ex: 600"
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Deixe vazio se não houver desconto. Apenas o valor numérico.
            </p>
          </div>

          <div>
            <Label htmlFor={`plan-price-${plan.id}`} className="text-sm">
              Preço Final
            </Label>
            <Input
              id={`plan-price-${plan.id}`}
              value={plan.price}
              onChange={(e) => updatePlan(plan.id, 'price', e.target.value)}
              placeholder="Ex: 450"
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Apenas o valor numérico, sem R$
            </p>
          </div>

          <div>
            <Label className="text-sm mb-3 block">Período</Label>
            <RadioGroup
              value={plan.period}
              onValueChange={(value) => updatePlan(plan.id, 'period', value)}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mensal" id={`mensal-${plan.id}`} />
                <Label htmlFor={`mensal-${plan.id}`} className="font-normal cursor-pointer">
                  Mensal
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="trimestral" id={`trimestral-${plan.id}`} />
                <Label htmlFor={`trimestral-${plan.id}`} className="font-normal cursor-pointer">
                  Trimestral
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="semestral" id={`semestral-${plan.id}`} />
                <Label htmlFor={`semestral-${plan.id}`} className="font-normal cursor-pointer">
                  Semestral
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="anual" id={`anual-${plan.id}`} />
                <Label htmlFor={`anual-${plan.id}`} className="font-normal cursor-pointer">
                  Anual
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="vitalicio" id={`vitalicio-${plan.id}`} />
                <Label htmlFor={`vitalicio-${plan.id}`} className="font-normal cursor-pointer">
                  Vitalício
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="text-sm mb-2 block">Lista de Benefícios</Label>
            <div className="space-y-2">
              {plan.benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={benefit}
                    onChange={(e) => updateBenefit(plan.id, index, e.target.value)}
                    placeholder="Ex: Consultas ilimitadas"
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBenefit(plan.id, index)}
                    className="h-10 w-10 p-0 hover:bg-destructive/10"
                  >
                    <X className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addBenefit(plan.id)}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Benefício
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor={`plan-cta-${plan.id}`} className="text-sm">
              Texto do Botão (CTA)
            </Label>
            <Input
              id={`plan-cta-${plan.id}`}
              value={plan.ctaText}
              onChange={(e) => updatePlan(plan.id, 'ctaText', e.target.value)}
              placeholder="Ex: Escolher Premium"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor={`plan-link-${plan.id}`} className="text-sm">
              Link do Botão
            </Label>
            <Input
              id={`plan-link-${plan.id}`}
              value={plan.ctaLink}
              onChange={(e) => updatePlan(plan.id, 'ctaLink', e.target.value)}
              placeholder="Ex: https://wa.me/5511999999999"
              className="mt-1"
            />
          </div>
        </Card>
      ))}

      <Button variant="outline" onClick={addPlan} className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Adicionar Novo Plano
      </Button>
    </div>
  );
};

export default PricingPlansEditor;
