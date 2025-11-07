import React, { useState } from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { PracticeAreasConfig, PracticeArea } from '@/contexts/SiteEditorContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { IconSelector } from '@/components/editor/IconSelector';
import { Trash2, Plus, GripVertical } from 'lucide-react';

interface PracticeAreasEditorProps {
  instanceId: string;
}

const PracticeAreasEditor: React.FC<PracticeAreasEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const practiceConfig = instance?.config as PracticeAreasConfig;
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

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
        const isOpen = openPopoverId === area.id;
        
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
                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-[auto_1fr] gap-3">
              <div className="flex flex-col gap-2">
                <Label className="text-sm">Ícone</Label>
                <IconSelector
                  value={area.icon}
                  onChange={(value) => updateArea(area.id, 'icon', value)}
                  open={isOpen}
                  onOpenChange={(open) => setOpenPopoverId(open ? area.id : null)}
                />
              </div>

              <div className="flex flex-col gap-2">
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
        className="w-full border-dashed hover:border-solid"
      >
        <Plus className="w-4 h-4 mr-2" />
        Adicionar Nova Área de atuação
      </Button>
    </div>
  );
};

export default PracticeAreasEditor;
