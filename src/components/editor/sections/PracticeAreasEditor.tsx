import React from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Briefcase } from 'lucide-react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';

const PracticeAreasEditor = () => {
  const { config, updatePracticeAreas } = useSiteEditor();

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Áreas de Atuação</h3>
            <p className="text-xs text-muted-foreground">Especialidades</p>
          </div>
        </div>
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
    </Card>
  );
};

export default PracticeAreasEditor;
