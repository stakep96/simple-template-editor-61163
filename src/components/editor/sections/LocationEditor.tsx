import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { LocationConfig, BusinessHour } from '@/contexts/SiteEditorContext';

interface LocationEditorProps {
  instanceId: string;
}

const LocationEditor: React.FC<LocationEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const locationConfig = instance?.config as LocationConfig;

  if (!locationConfig) return null;

  const addBusinessHour = () => {
    const newHour: BusinessHour = {
      id: Date.now().toString(),
      day: 'Segunda a Sexta',
      hours: '8h às 18h',
    };
    updateModuleInstance(instanceId, {
      businessHours: [...locationConfig.businessHours, newHour],
    });
  };

  const removeBusinessHour = (id: string) => {
    updateModuleInstance(instanceId, {
      businessHours: locationConfig.businessHours.filter((hour) => hour.id !== id),
    });
  };

  const updateBusinessHour = (id: string, field: keyof BusinessHour, value: string) => {
    updateModuleInstance(instanceId, {
      businessHours: locationConfig.businessHours.map((hour) =>
        hour.id === id ? { ...hour, [field]: value } : hour
      ),
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`location-title-${instanceId}`} className="text-sm">Título</Label>
        <Input
          id={`location-title-${instanceId}`}
          type="text"
          value={locationConfig.title}
          onChange={(e) => updateModuleInstance(instanceId, { title: e.target.value })}
          onMouseDown={(e) => e.stopPropagation()}
          placeholder="Localização"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor={`location-address-${instanceId}`} className="text-sm">Endereço</Label>
        <Textarea
          id={`location-address-${instanceId}`}
          value={locationConfig.address}
          onChange={(e) => updateModuleInstance(instanceId, { address: e.target.value })}
          onMouseDown={(e) => e.stopPropagation()}
          placeholder="Rua das Flores, 123 - Centro&#10;São Paulo - SP, 01234-567"
          className="mt-1 min-h-[80px]"
        />
      </div>

      <div>
        <Label className="text-sm">Horários de Atendimento</Label>
        <div className="space-y-2 mt-2">
          {locationConfig.businessHours.map((hour) => (
            <div key={hour.id} className="flex gap-2">
              <Input
                type="text"
                value={hour.day}
                onChange={(e) => updateBusinessHour(hour.id, 'day', e.target.value)}
                onMouseDown={(e) => e.stopPropagation()}
                placeholder="Segunda a Sexta"
                className="flex-1"
              />
              <Input
                type="text"
                value={hour.hours}
                onChange={(e) => updateBusinessHour(hour.id, 'hours', e.target.value)}
                onMouseDown={(e) => e.stopPropagation()}
                placeholder="8h às 18h"
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeBusinessHour(hour.id)}
                className="flex-shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          onClick={addBusinessHour}
          className="w-full mt-2 border-dashed hover:border-solid"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Horário
        </Button>
      </div>

      <div>
        <Label htmlFor={`location-map-${instanceId}`} className="text-sm">
          Link do Google Maps (Embed)
        </Label>
        <Input
          id={`location-map-${instanceId}`}
          type="text"
          value={locationConfig.mapEmbedUrl}
          onChange={(e) => updateModuleInstance(instanceId, { mapEmbedUrl: e.target.value })}
          onMouseDown={(e) => e.stopPropagation()}
          placeholder="https://www.google.com/maps/embed?pb=..."
          className="mt-1"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Cole o link de incorporação do Google Maps
        </p>
      </div>
    </div>
  );
};

export default LocationEditor;
