import React, { useState } from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { MetricsConfig, MetricItem } from '@/contexts/SiteEditorContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import * as LucideIcons from 'lucide-react';

interface MetricsEditorProps {
  instanceId: string;
}

const iconOptions = [
  { value: 'instagram', label: 'Instagram', Icon: LucideIcons.Instagram },
  { value: 'facebook', label: 'Facebook', Icon: LucideIcons.Facebook },
  { value: 'twitter', label: 'Twitter', Icon: LucideIcons.Twitter },
  { value: 'linkedin', label: 'LinkedIn', Icon: LucideIcons.Linkedin },
  { value: 'youtube', label: 'YouTube', Icon: LucideIcons.Youtube },
  { value: 'tiktok', label: 'TikTok', Icon: LucideIcons.Music },
  { value: 'smartphone', label: 'Smartphone', Icon: LucideIcons.Smartphone },
  { value: 'globe', label: 'Globe', Icon: LucideIcons.Globe },
  { value: 'share2', label: 'Share', Icon: LucideIcons.Share2 },
];

const MetricsEditor: React.FC<MetricsEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const moduleConfig = config.moduleInstances[instanceId]?.config as MetricsConfig;
  const [searchTerm, setSearchTerm] = useState('');
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  if (!moduleConfig) return null;

  const updateTitle = (title: string) => {
    updateModuleInstance(instanceId, { title });
  };

  const updateMetric = (metricId: string, field: keyof MetricItem, value: string) => {
    const updatedMetrics = moduleConfig.metrics.map(metric =>
      metric.id === metricId ? { ...metric, [field]: value } : metric
    );
    updateModuleInstance(instanceId, { metrics: updatedMetrics });
  };

  const removeMetric = (metricId: string) => {
    const updatedMetrics = moduleConfig.metrics.filter(metric => metric.id !== metricId);
    updateModuleInstance(instanceId, { metrics: updatedMetrics });
  };

  const addMetric = () => {
    const newMetric: MetricItem = {
      id: Date.now().toString(),
      icon: 'instagram',
      platform: 'Instagram',
      followers: '120K',
      engagement: '4.8%',
      monthlyViews: '1.5M',
    };
    updateModuleInstance(instanceId, { metrics: [...moduleConfig.metrics, newMetric] });
  };

  const filteredIcons = iconOptions.filter(icon =>
    icon.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Título da Seção</Label>
        <Input
          value={moduleConfig.title}
          onChange={(e) => updateTitle(e.target.value)}
          placeholder="Ex: Métricas & Resultados"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Métricas</Label>
          <Button onClick={addMetric} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1" />
            Adicionar
          </Button>
        </div>

        {moduleConfig.metrics.map((metric, index) => {
          const selectedIcon = iconOptions.find(opt => opt.value === metric.icon);
          const IconComponent = selectedIcon?.Icon || LucideIcons.BarChart;

          return (
            <div key={metric.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Métrica {index + 1}</span>
                <Button
                  onClick={() => removeMetric(metric.id)}
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Ícone</Label>
                <Popover 
                  open={openPopoverId === metric.id}
                  onOpenChange={(open) => setOpenPopoverId(open ? metric.id : null)}
                >
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {selectedIcon?.label || 'Selecionar ícone'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-[200px]" align="start">
                    <Command>
                      <CommandInput 
                        placeholder="Buscar ícone..." 
                        value={searchTerm}
                        onValueChange={setSearchTerm}
                      />
                      <CommandEmpty>Nenhum ícone encontrado.</CommandEmpty>
                      <CommandGroup className="max-h-[200px] overflow-auto">
                        {filteredIcons.map((icon) => {
                          const Icon = icon.Icon;
                          return (
                            <CommandItem
                              key={icon.value}
                              value={icon.value}
                              onSelect={() => {
                                updateMetric(metric.id, 'icon', icon.value);
                                setOpenPopoverId(null);
                                setSearchTerm('');
                              }}
                            >
                              <Icon className="w-4 h-4 mr-2" />
                              {icon.label}
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Nome da Plataforma</Label>
                <Input
                  value={metric.platform}
                  onChange={(e) => updateMetric(metric.id, 'platform', e.target.value)}
                  placeholder="Ex: Instagram"
                />
              </div>

              <div className="space-y-2">
                <Label>Seguidores</Label>
                <Input
                  value={metric.followers}
                  onChange={(e) => updateMetric(metric.id, 'followers', e.target.value)}
                  placeholder="Ex: 120K"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Engajamento</Label>
                  <Input
                    value={metric.engagement}
                    onChange={(e) => updateMetric(metric.id, 'engagement', e.target.value)}
                    placeholder="Ex: 4.8%"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Views Mensais</Label>
                  <Input
                    value={metric.monthlyViews}
                    onChange={(e) => updateMetric(metric.id, 'monthlyViews', e.target.value)}
                    placeholder="Ex: 1.5M"
                  />
                </div>
              </div>
            </div>
          );
        })}

        {moduleConfig.metrics.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">Nenhuma métrica adicionada.</p>
            <p className="text-xs mt-1">Clique em "Adicionar" para começar.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsEditor;
