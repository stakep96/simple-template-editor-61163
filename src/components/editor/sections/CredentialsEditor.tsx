import React from 'react';
import { Plus, Trash2, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { CredentialsConfig, CredentialCard } from '@/contexts/SiteEditorContext';

interface CredentialsEditorProps {
  instanceId: string;
}

const CredentialsEditor: React.FC<CredentialsEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const moduleConfig = config.moduleInstances[instanceId]?.config as CredentialsConfig;

  const handleAddCard = () => {
    const newCard: CredentialCard = {
      id: crypto.randomUUID(),
      icon: 'award',
      text: 'Novo card',
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

  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold">Cards de Credenciais</Label>
          <Button onClick={handleAddCard} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Card
          </Button>
        </div>

        {moduleConfig.cards.map((card, index) => (
          <div key={card.id} className="p-4 border rounded-lg space-y-3 bg-muted/30">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Card {index + 1}</span>
              <Button
                onClick={() => handleRemoveCard(card.id)}
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`icon-${card.id}`}>Ícone (lucide-react)</Label>
              <Input
                id={`icon-${card.id}`}
                value={card.icon}
                onChange={(e) => handleUpdateCard(card.id, { icon: e.target.value })}
                placeholder="Ex: award, users, trophy"
              />
              <p className="text-xs text-muted-foreground">
                Use nomes de ícones do lucide-react como: award, users, trophy, star, check-circle
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`text-${card.id}`}>Texto</Label>
              <Input
                id={`text-${card.id}`}
                value={card.text}
                onChange={(e) => handleUpdateCard(card.id, { text: e.target.value })}
                placeholder="Ex: CRN Certificada"
              />
            </div>
          </div>
        ))}

        {moduleConfig.cards.length === 0 && (
          <div className="text-center py-8 border border-dashed rounded-lg">
            <Award className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-3">Nenhum card adicionado</p>
            <Button onClick={handleAddCard} size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Primeiro Card
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CredentialsEditor;
