import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { DemographicsConfig, DemographicStat } from '@/contexts/SiteEditorContext';

interface DemographicsEditorProps {
  instanceId: string;
}

const DemographicsEditor: React.FC<DemographicsEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const moduleConfig = config.moduleInstances[instanceId]?.config as DemographicsConfig;

  const updateTitle = (title: string) => {
    updateModuleInstance(instanceId, { title });
  };

  const updateStat = (statId: string, field: keyof DemographicStat, value: string) => {
    const updatedStats = moduleConfig.stats.map((stat) =>
      stat.id === statId ? { ...stat, [field]: value } : stat
    );
    updateModuleInstance(instanceId, { stats: updatedStats });
  };

  const removeStat = (statId: string) => {
    const updatedStats = moduleConfig.stats.filter((stat) => stat.id !== statId);
    updateModuleInstance(instanceId, { stats: updatedStats });
  };

  const addStat = () => {
    const newId = Date.now().toString();
    const newStat: DemographicStat = {
      id: newId,
      value: '0',
      label: 'Nova informação',
    };
    updateModuleInstance(instanceId, { stats: [...moduleConfig.stats, newStat] });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Título do Componente</Label>
        <Input
          value={moduleConfig.title}
          onChange={(e) => updateTitle(e.target.value)}
          placeholder="Ex: Demografia"
        />
      </div>

      <div className="space-y-3">
        <Label>Estatísticas (máximo 2 recomendado)</Label>
        {moduleConfig.stats.map((stat) => (
          <div key={stat.id} className="p-3 border rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Estatística</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeStat(stat.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            
            <div>
              <Label className="text-xs">Valor Destacado</Label>
              <Input
                value={stat.value}
                onChange={(e) => updateStat(stat.id, 'value', e.target.value)}
                placeholder="Ex: 18-35 ou 78%"
              />
            </div>

            <div>
              <Label className="text-xs">Descrição</Label>
              <Input
                value={stat.label}
                onChange={(e) => updateStat(stat.id, 'label', e.target.value)}
                placeholder="Ex: Idade média"
              />
            </div>
          </div>
        ))}

        <Button
          onClick={addStat}
          variant="outline"
          className="w-full"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Estatística
        </Button>
      </div>
    </div>
  );
};

export default DemographicsEditor;
