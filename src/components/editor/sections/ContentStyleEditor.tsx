import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Circle, Check } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { ContentStyleConfig, ContentStyleItem } from '@/contexts/SiteEditorContext';

interface ContentStyleEditorProps {
  instanceId: string;
}

const iconOptions = [
  { value: 'circle', label: 'Círculo', Icon: Circle },
  { value: 'check', label: 'Check', Icon: Check },
];

const ContentStyleEditor: React.FC<ContentStyleEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const moduleConfig = config.moduleInstances[instanceId]?.config as ContentStyleConfig;
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  const updateTitle = (title: string) => {
    updateModuleInstance(instanceId, { title });
  };

  const updateItem = (itemId: string, field: keyof ContentStyleItem, value: string) => {
    const updatedItems = moduleConfig.items.map((item) =>
      item.id === itemId ? { ...item, [field]: value } : item
    );
    updateModuleInstance(instanceId, { items: updatedItems });
  };

  const removeItem = (itemId: string) => {
    const updatedItems = moduleConfig.items.filter((item) => item.id !== itemId);
    updateModuleInstance(instanceId, { items: updatedItems });
  };

  const addItem = () => {
    const newId = Date.now().toString();
    const newItem: ContentStyleItem = {
      id: newId,
      text: 'Novo item',
      icon: 'circle',
    };
    updateModuleInstance(instanceId, { items: [...moduleConfig.items, newItem] });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Título do Componente</Label>
        <Input
          value={moduleConfig.title}
          onChange={(e) => updateTitle(e.target.value)}
          placeholder="Ex: Estilo de conteúdo"
        />
      </div>

      <div className="space-y-3">
        <Label>Itens da Lista</Label>
        {moduleConfig.items.map((item) => {
          const selectedIcon = iconOptions.find(opt => opt.value === item.icon);
          const SelectedIconComponent = selectedIcon?.Icon || Circle;

          return (
            <div key={item.id} className="p-3 border rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Item</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <Label className="text-xs">Texto</Label>
                  <Input
                    value={item.text}
                    onChange={(e) => updateItem(item.id, 'text', e.target.value)}
                    placeholder="Ex: IRL"
                  />
                </div>

                <div>
                  <Label className="text-xs">Ícone</Label>
                  <Popover 
                    open={openPopoverId === item.id} 
                    onOpenChange={(open) => setOpenPopoverId(open ? item.id : null)}
                  >
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-[60px] justify-center">
                        <SelectedIconComponent className="w-4 h-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40 p-2">
                      <div className="grid grid-cols-2 gap-1">
                        {iconOptions.map((option) => {
                          const IconComponent = option.Icon;
                          return (
                            <Button
                              key={option.value}
                              variant={item.icon === option.value ? "default" : "ghost"}
                              size="sm"
                              onClick={() => {
                                updateItem(item.id, 'icon', option.value);
                                setOpenPopoverId(null);
                              }}
                              className="justify-start"
                            >
                              <IconComponent className="w-4 h-4" />
                            </Button>
                          );
                        })}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          );
        })}

        <Button
          onClick={addItem}
          variant="outline"
          className="w-full"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Item
        </Button>
      </div>
    </div>
  );
};

export default ContentStyleEditor;
