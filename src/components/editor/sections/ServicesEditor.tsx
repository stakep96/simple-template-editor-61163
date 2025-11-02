import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Award, Users, Trophy, Star, CheckCircle, Shield, Target, Briefcase, Zap, Heart, TrendingUp, Medal, Plus, Trash2 } from 'lucide-react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { ServicesConfig, ServiceCard } from '@/contexts/SiteEditorContext';

interface ServicesEditorProps {
  instanceId: string;
}

const iconOptions = [
  { value: 'award', label: 'Troféu/Prêmio', Icon: Award },
  { value: 'trophy', label: 'Taça', Icon: Trophy },
  { value: 'medal', label: 'Medalha', Icon: Medal },
  { value: 'star', label: 'Estrela', Icon: Star },
  { value: 'check-circle', label: 'Check Circle', Icon: CheckCircle },
  { value: 'shield', label: 'Escudo', Icon: Shield },
  { value: 'target', label: 'Alvo', Icon: Target },
  { value: 'briefcase', label: 'Maleta', Icon: Briefcase },
  { value: 'zap', label: 'Raio', Icon: Zap },
  { value: 'heart', label: 'Coração', Icon: Heart },
  { value: 'trending-up', label: 'Crescimento', Icon: TrendingUp },
  { value: 'users', label: 'Pessoas', Icon: Users },
];

const ServicesEditor: React.FC<ServicesEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const servicesConfig = instance?.config as ServicesConfig;
  const [searchTerm, setSearchTerm] = useState('');
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  if (!servicesConfig) return null;

  const updateCard = (cardId: string, field: keyof ServiceCard, value: string) => {
    const updatedCards = servicesConfig.cards.map((card) =>
      card.id === cardId ? { ...card, [field]: value } : card
    );
    updateModuleInstance(instanceId, { cards: updatedCards });
  };

  const removeCard = (cardId: string) => {
    const updatedCards = servicesConfig.cards.filter((card) => card.id !== cardId);
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
    updateModuleInstance(instanceId, { cards: [...servicesConfig.cards, newCard] });
  };

  const filteredIcons = iconOptions.filter((icon) =>
    icon.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {servicesConfig.cards.map((card, index) => (
        <div key={card.id} className="p-4 border rounded-lg space-y-3 bg-muted/30">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold">Serviço {index + 1}</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeCard(card.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div>
            <Label htmlFor={`card-icon-${card.id}`} className="text-sm">Ícone</Label>
            <Popover 
              open={openPopoverId === card.id} 
              onOpenChange={(open) => setOpenPopoverId(open ? card.id : null)}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-start mt-1"
                >
                  {(() => {
                    const selectedIcon = iconOptions.find((icon) => icon.value === card.icon);
                    const IconComponent = selectedIcon?.Icon || Award;
                    return (
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4" />
                        <span>{selectedIcon?.label || 'Selecione um ícone'}</span>
                      </div>
                    );
                  })()}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] p-0" align="start">
                <Command>
                  <CommandInput 
                    placeholder="Buscar ícone..." 
                    value={searchTerm}
                    onValueChange={setSearchTerm}
                  />
                  <CommandList>
                    <CommandEmpty>Nenhum ícone encontrado.</CommandEmpty>
                    <CommandGroup>
                      {filteredIcons.map((icon) => {
                        const IconComponent = icon.Icon;
                        return (
                          <CommandItem
                            key={icon.value}
                            value={icon.value}
                            onSelect={() => {
                              updateCard(card.id, 'icon', icon.value);
                              setOpenPopoverId(null);
                              setSearchTerm('');
                            }}
                          >
                            <IconComponent className="mr-2 h-4 w-4" />
                            <span>{icon.label}</span>
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor={`card-title-${card.id}`} className="text-sm">Título</Label>
            <Input
              id={`card-title-${card.id}`}
              type="text"
              value={card.title}
              onChange={(e) => updateCard(card.id, 'title', e.target.value)}
              placeholder="Ex: Nutrição Clínica"
              className="mt-1"
            />
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
