import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, Award, Users, Trophy, Star, CheckCircle, Shield, Target, Briefcase, Zap, Heart, TrendingUp, Medal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { CredentialsConfig, CredentialCard } from '@/contexts/SiteEditorContext';

interface CredentialsEditorProps {
  instanceId: string;
}

const iconOptions = [
  { value: 'award', label: 'Certificado', Icon: Award },
  { value: 'users', label: 'Pessoas', Icon: Users },
  { value: 'trophy', label: 'Troféu', Icon: Trophy },
  { value: 'star', label: 'Estrela', Icon: Star },
  { value: 'check-circle', label: 'Check', Icon: CheckCircle },
  { value: 'shield', label: 'Escudo', Icon: Shield },
  { value: 'target', label: 'Alvo', Icon: Target },
  { value: 'briefcase', label: 'Maleta', Icon: Briefcase },
  { value: 'zap', label: 'Raio', Icon: Zap },
  { value: 'heart', label: 'Coração', Icon: Heart },
  { value: 'trending-up', label: 'Crescimento', Icon: TrendingUp },
  { value: 'medal', label: 'Medalha', Icon: Medal },
];

const CredentialsEditor: React.FC<CredentialsEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const moduleConfig = config.moduleInstances[instanceId]?.config as CredentialsConfig;
  const [searchTerm, setSearchTerm] = useState('');
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  const handleAddCard = () => {
    const newCard: CredentialCard = {
      id: crypto.randomUUID(),
      icon: 'award',
      text: 'Nova credencial',
    };
    updateModuleInstance(instanceId, {
      cards: [...moduleConfig.cards, newCard],
    });
  };

  const handleUpdateCard = (id: string, updates: Partial<CredentialCard>) => {
    updateModuleInstance(instanceId, {
      cards: moduleConfig.cards.map((card) =>
        card.id === id ? { ...card, ...updates } : card
      ),
    });
  };

  const handleRemoveCard = (id: string) => {
    updateModuleInstance(instanceId, {
      cards: moduleConfig.cards.filter((card) => card.id !== id),
    });
  };

  const filteredIcons = iconOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {moduleConfig.cards.map((card, index) => {
        const selectedIcon = iconOptions.find((opt) => opt.value === card.icon);
        const isOpen = openPopoverId === card.id;

        return (
          <div
            key={card.id}
            className="border rounded-lg p-4 space-y-3 bg-background"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  Área {index + 1}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveCard(card.id)}
                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-[auto_1fr] gap-3">
              <div className="flex flex-col gap-2">
                <Label className="text-sm">Ícone</Label>
                <Popover open={isOpen} onOpenChange={(open) => {
                  setOpenPopoverId(open ? card.id : null);
                  if (!open) setSearchTerm('');
                }}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-10 w-10 p-0"
                    >
                      {selectedIcon && <selectedIcon.Icon className="w-5 h-5" />}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4" align="start">
                    <div className="space-y-3">
                      <Input
                        placeholder="Buscar ícones..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-10"
                      />
                      <div className="grid grid-cols-6 gap-2 max-h-[240px] overflow-y-auto">
                        {filteredIcons.map((option) => (
                          <Button
                            key={option.value}
                            variant="outline"
                            className="h-12 w-12 p-0 hover:bg-accent"
                            onClick={() => {
                              handleUpdateCard(card.id, { icon: option.value });
                              setOpenPopoverId(null);
                              setSearchTerm('');
                            }}
                          >
                            <option.Icon className="w-5 h-5" />
                          </Button>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Clique em um ícone para selecioná-lo
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor={`text-${card.id}`} className="text-sm">
                  Título
                </Label>
                <Input
                  id={`text-${card.id}`}
                  value={card.text}
                  onChange={(e) => handleUpdateCard(card.id, { text: e.target.value })}
                  placeholder="Ex: CRN Certificada"
                />
              </div>
            </div>
          </div>
        );
      })}

      <Button
        variant="outline"
        onClick={handleAddCard}
        className="w-full border-dashed hover:border-solid"
      >
        <Plus className="w-4 h-4 mr-2" />
        Adicionar Nova Credencial
      </Button>
    </div>
  );
};

export default CredentialsEditor;
