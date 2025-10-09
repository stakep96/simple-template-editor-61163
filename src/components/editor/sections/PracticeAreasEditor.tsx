import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { PracticeAreasConfig, PracticeArea } from '@/contexts/SiteEditorContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, GripVertical, Home, Smartphone, Lightbulb, Users, Shield, Car } from 'lucide-react';

interface PracticeAreasEditorProps {
  instanceId: string;
}

const iconOptions = [
  { value: 'home', label: 'Casa', Icon: Home },
  { value: 'smartphone', label: 'Smartphone', Icon: Smartphone },
  { value: 'lightbulb', label: 'Lâmpada', Icon: Lightbulb },
  { value: 'users', label: 'Pessoas', Icon: Users },
  { value: 'shield', label: 'Escudo', Icon: Shield },
  { value: 'car', label: 'Carro', Icon: Car },
];

const PracticeAreasEditor: React.FC<PracticeAreasEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const practiceConfig = instance?.config as PracticeAreasConfig;

  if (!practiceConfig) return null;

  const updateArea = (areaId: string, field: keyof PracticeArea, value: string) => {
    const updatedAreas = practiceConfig.areas.map((area) =>
      area.id === areaId ? { ...area, [field]: value } : area
    );
    updateModuleInstance(instanceId, { areas: updatedAreas });
  };

  const removeArea = (areaId: string) => {
    const updatedAreas = practiceConfig.areas.filter((area) => area.id !== areaId);
    updateModuleInstance(instanceId, { areas: updatedAreas });
  };

  const addArea = () => {
    const newArea: PracticeArea = {
      id: Date.now().toString(),
      title: 'Nova Área',
      icon: 'shield',
    };
    updateModuleInstance(instanceId, { areas: [...practiceConfig.areas, newArea] });
  };

  return (
    <div className="space-y-4">
      {practiceConfig.areas.map((area, index) => {
        const selectedIcon = iconOptions.find((opt) => opt.value === area.icon);
        
        return (
          <div
            key={area.id}
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
                onClick={() => removeArea(area.id)}
                className="h-8 w-8 text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor={`icon-${area.id}`} className="text-sm">
                  Ícone
                </Label>
                <Select
                  value={area.icon}
                  onValueChange={(value) => updateArea(area.id, 'icon', value)}
                >
                  <SelectTrigger id={`icon-${area.id}`}>
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        {selectedIcon && <selectedIcon.Icon className="w-4 h-4" />}
                        <span>{selectedIcon?.label}</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <option.Icon className="w-4 h-4" />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`title-${area.id}`} className="text-sm">
                  Título
                </Label>
                <Input
                  id={`title-${area.id}`}
                  value={area.title}
                  onChange={(e) => updateArea(area.id, 'title', e.target.value)}
                  placeholder="Nome da área"
                />
              </div>
            </div>
          </div>
        );
      })}

      <Button
        variant="outline"
        onClick={addArea}
        className="w-full border-dashed"
      >
        <Plus className="w-4 h-4 mr-2" />
        Adicionar Nova Área (1/{practiceConfig.areas.length + 1})
      </Button>
    </div>
  );
};

export default PracticeAreasEditor;
