import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { MetricsConfig, MetricItem } from '@/contexts/SiteEditorContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import * as LucideIcons from 'lucide-react';

interface MetricsEditorProps {
  instanceId: string;
}

const platformOptions = [
  { value: 'instagram', label: 'Instagram', Icon: LucideIcons.Instagram },
  { value: 'facebook', label: 'Facebook', Icon: LucideIcons.Facebook },
  { value: 'twitter', label: 'Twitter', Icon: LucideIcons.Twitter },
  { value: 'linkedin', label: 'LinkedIn', Icon: LucideIcons.Linkedin },
  { value: 'youtube', label: 'YouTube', Icon: LucideIcons.Youtube },
  { value: 'tiktok', label: 'TikTok', Icon: LucideIcons.Music },
  { value: 'smartphone', label: 'Smartphone', Icon: LucideIcons.Smartphone },
  { value: 'globe', label: 'Website', Icon: LucideIcons.Globe },
  { value: 'share2', label: 'Outras Redes', Icon: LucideIcons.Share2 },
];

const MetricsEditor: React.FC<MetricsEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const moduleConfig = config.moduleInstances[instanceId]?.config as MetricsConfig;

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

  const updatePlatform = (metricId: string, platformValue: string) => {
    const selectedPlatform = platformOptions.find(p => p.value === platformValue);
    if (selectedPlatform) {
      const updatedMetrics = moduleConfig.metrics.map(metric =>
        metric.id === metricId 
          ? { ...metric, icon: selectedPlatform.value, platform: selectedPlatform.label } 
          : metric
      );
      updateModuleInstance(instanceId, { metrics: updatedMetrics });
    }
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
          const selectedPlatform = platformOptions.find(opt => opt.value === metric.icon);

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
                <Label>Rede Social / Plataforma</Label>
                <Select 
                  value={metric.icon} 
                  onValueChange={(value) => updatePlatform(metric.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma rede social" />
                  </SelectTrigger>
                  <SelectContent>
                    {platformOptions.map((platform) => {
                      const Icon = platform.Icon;
                      return (
                        <SelectItem key={platform.value} value={platform.value}>
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            <span>{platform.label}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
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
