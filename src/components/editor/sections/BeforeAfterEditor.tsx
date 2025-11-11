import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/image-upload';
import { Plus, Trash2, Rows2, Columns2 } from 'lucide-react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { BeforeAfterConfig, BeforeAfterItem } from '@/contexts/SiteEditorContext';

interface BeforeAfterEditorProps {
  instanceId: string;
}

const BeforeAfterEditor: React.FC<BeforeAfterEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const beforeAfterConfig = instance?.config as BeforeAfterConfig;

  if (!beforeAfterConfig) return null;

  const updateItem = (id: string, field: keyof BeforeAfterItem, value: string) => {
    const updatedItems = beforeAfterConfig.items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    );
    updateModuleInstance(instanceId, { items: updatedItems });
  };

  const removeItem = (id: string) => {
    const updatedItems = beforeAfterConfig.items.filter(item => item.id !== id);
    updateModuleInstance(instanceId, { items: updatedItems });
  };

  const addItem = () => {
    const newItem: BeforeAfterItem = {
      id: Date.now().toString(),
      beforeImage: '',
      afterImage: '',
      description: 'Nova transformação',
    };
    updateModuleInstance(instanceId, { items: [...beforeAfterConfig.items, newItem] });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`title-${instanceId}`} className="text-sm">Título da Seção</Label>
        <Input
          id={`title-${instanceId}`}
          type="text"
          value={beforeAfterConfig.title}
          onChange={(e) => updateModuleInstance(instanceId, { title: e.target.value })}
          className="mt-1"
        />
      </div>

      <div>
        <Label className="text-sm mb-3 block">Layout das Imagens</Label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => updateModuleInstance(instanceId, { orientation: 'vertical' })}
            className={`flex-1 flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors ${
              (beforeAfterConfig.orientation || 'vertical') === 'vertical' 
                ? 'border-primary bg-primary/5' 
                : 'border-muted bg-popover'
            }`}
          >
            <Columns2 className="mb-3 h-6 w-6" />
            <span className="text-xs font-medium">Lado a Lado</span>
          </button>
          
          <button
            type="button"
            onClick={() => updateModuleInstance(instanceId, { orientation: 'horizontal' })}
            className={`flex-1 flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors ${
              beforeAfterConfig.orientation === 'horizontal' 
                ? 'border-primary bg-primary/5' 
                : 'border-muted bg-popover'
            }`}
          >
            <Rows2 className="mb-3 h-6 w-6" />
            <span className="text-xs font-medium">Uma em Cima</span>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {beforeAfterConfig.items.map((item) => (
          <Card key={item.id} className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium">Comparação</Label>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm">Imagem Antes</Label>
                <ImageUpload
                  value={item.beforeImage}
                  onChange={(value) => updateItem(item.id, 'beforeImage', value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm">Imagem Depois</Label>
                <ImageUpload
                  value={item.afterImage}
                  onChange={(value) => updateItem(item.id, 'afterImage', value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm">Descrição</Label>
              <Input
                type="text"
                value={item.description}
                onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                className="mt-1"
                placeholder="Descrição dos resultados"
              />
            </div>
          </Card>
        ))}
      </div>

      <Button
        type="button"
        onClick={addItem}
        variant="outline"
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Adicionar Comparação
      </Button>
    </div>
  );
};

export default BeforeAfterEditor;
