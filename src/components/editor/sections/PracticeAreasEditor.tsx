import React from 'react';
import { Switch } from '@/components/ui/switch';
import { useSiteEditor } from '@/contexts/SiteEditorContext';

const PracticeAreasEditor = () => {
  const { config, updatePracticeAreas } = useSiteEditor();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Ativar seção</span>
        <Switch
          checked={config.practiceAreas.enabled}
          onCheckedChange={(enabled) => updatePracticeAreas({ enabled })}
        />
      </div>

      {config.practiceAreas.enabled && (
        <div className="text-sm text-muted-foreground">
          {config.practiceAreas.areas.length} áreas configuradas
        </div>
      )}
    </div>
  );
};

export default PracticeAreasEditor;
