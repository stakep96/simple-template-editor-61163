import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { IconSelector } from '@/components/editor/IconSelector';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { ServicesConfig, ServiceCard } from '@/contexts/SiteEditorContext';

interface ServicesEditorProps {
  instanceId: string;
}

const ServicesEditor: React.FC<ServicesEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const servicesConfig = instance?.config as ServicesConfig;
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  if (!servicesConfig) return null;

  // Ensure cards array exists
  const cards = servicesConfig.cards || [];

  const updateCard = (cardId: string, field: keyof ServiceCard, value: string) => {
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, [field]: value } : card
    );
    updateModuleInstance(instanceId, { cards: updatedCards });
  };

  const removeCard = (cardId: string) => {
    const updatedCards = cards.filter((card) => card.id !== cardId);
    updateModuleInstance(instanceId, { cards: updatedCards });
  };

  const addCard = () => {
    const newCard: ServiceCard = {
      id: `service-${Date.now()}`,
      icon: 'award',
      title: 'Novo Serviço',
      subtitle: 'Subtítulo do serviço',
      description: 'Descrição detalhada do serviço oferecido.',
    };
    updateModuleInstance(instanceId, { cards: [...cards, newCard] });
  };

  return (
    <div className="space-y-4">
      {cards.map((card, index) => (
        <div key={card.id} className="border rounded-lg p-4 space-y-3 bg-background">
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm font-semibold">Serviço {index + 1}</Label>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeCard(card.id)}
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-3">
            <div className="flex flex-col gap-2">
              <Label className="text-sm">Ícone</Label>
              <IconSelector
                value={card.icon}
                onChange={(value) => updateCard(card.id, 'icon', value)}
                open={openPopoverId === card.id}
                onOpenChange={(open) => setOpenPopoverId(open ? card.id : null)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor={`card-title-${card.id}`} className="text-sm">Título</Label>
              <Input
                id={`card-title-${card.id}`}
                type="text"
                value={card.title}
                onChange={(e) => updateCard(card.id, 'title', e.target.value)}
                placeholder="Ex: Nutrição Clínica"
              />
            </div>
          </div>

          <div>
            <Label htmlFor={`card-subtitle-${card.id}`} className="text-sm">Subtítulo</Label>
            <Input
              id={`card-subtitle-${card.id}`}
              type="text"
              value={card.subtitle}
              onChange={(e) => updateCard(card.id, 'subtitle', e.target.value)}
              placeholder="Ex: Diabetes, hipertensão e saúde"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor={`card-description-${card.id}`} className="text-sm">Descrição</Label>
            <Textarea
              id={`card-description-${card.id}`}
              value={card.description}
              onChange={(e) => updateCard(card.id, 'description', e.target.value)}
              placeholder="Ex: Planos para diabetes, hipertensão e outros cuidados de saúde."
              className="mt-1 min-h-[80px]"
            />
          </div>
        </div>
      ))}

      <Button
        onClick={addCard}
        variant="outline"
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Adicionar Novo Serviço
      </Button>
    </div>
  );
};

export default ServicesEditor;
