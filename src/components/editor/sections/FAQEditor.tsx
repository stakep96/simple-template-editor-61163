import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import { FAQConfig, FAQItem } from '@/contexts/SiteEditorContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface FAQEditorProps {
  instanceId: string;
}

const FAQEditor: React.FC<FAQEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const moduleInstance = config.moduleInstances[instanceId];
  const faqConfig = moduleInstance?.config as FAQConfig;

  if (!faqConfig) return null;

  const handleTitleChange = (value: string) => {
    updateModuleInstance(instanceId, { title: value });
  };

  const handleAddItem = () => {
    const newItem: FAQItem = {
      id: Date.now().toString(),
      question: 'Nova pergunta',
      answer: 'Resposta aqui...',
    };
    updateModuleInstance(instanceId, {
      items: [...faqConfig.items, newItem],
    });
  };

  const handleUpdateItem = (itemId: string, field: keyof FAQItem, value: string) => {
    const updatedItems = faqConfig.items.map((item) =>
      item.id === itemId ? { ...item, [field]: value } : item
    );
    updateModuleInstance(instanceId, { items: updatedItems });
  };

  const handleRemoveItem = (itemId: string) => {
    const updatedItems = faqConfig.items.filter((item) => item.id !== itemId);
    updateModuleInstance(instanceId, { items: updatedItems });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="faq-title">Título da Seção</Label>
        <Input
          id="faq-title"
          value={faqConfig.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="FAQ"
        />
      </div>

      <div className="space-y-4">
        <Label>Perguntas Frequentes</Label>

        <div className="space-y-4">
          {faqConfig.items.map((item, index) => (
            <Card key={item.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Pergunta {index + 1}
                </span>
                <Button
                  onClick={() => handleRemoveItem(item.id)}
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`question-${item.id}`}>Pergunta</Label>
                <Input
                  id={`question-${item.id}`}
                  value={item.question}
                  onChange={(e) => handleUpdateItem(item.id, 'question', e.target.value)}
                  placeholder="Digite a pergunta"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`answer-${item.id}`}>Resposta</Label>
                <Textarea
                  id={`answer-${item.id}`}
                  value={item.answer}
                  onChange={(e) => handleUpdateItem(item.id, 'answer', e.target.value)}
                  placeholder="Digite a resposta"
                  rows={4}
                />
              </div>
            </Card>
          ))}
        </div>

        {faqConfig.items.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Nenhuma pergunta adicionada. Clique em "Adicionar Pergunta" para começar.
          </div>
        )}

        <Button
          onClick={handleAddItem}
          variant="outline"
          className="w-full border-dashed"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Pergunta
        </Button>
      </div>
    </div>
  );
};

export default FAQEditor;
