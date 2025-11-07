import React, { useState } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IconSelector } from '@/components/editor/IconSelector';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { CredentialsConfig, CredentialCard } from '@/contexts/SiteEditorContext';

interface CredentialsEditorProps {
  instanceId: string;
}

const CredentialsEditor: React.FC<CredentialsEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const moduleConfig = config.moduleInstances[instanceId]?.config as CredentialsConfig;
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

  return (
    <div className="space-y-4">
      {moduleConfig.cards.map((card, index) => {
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
                <IconSelector
                  value={card.icon}
                  onChange={(value) => handleUpdateCard(card.id, { icon: value })}
                  open={isOpen}
                  onOpenChange={(open) => setOpenPopoverId(open ? card.id : null)}
                />
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
