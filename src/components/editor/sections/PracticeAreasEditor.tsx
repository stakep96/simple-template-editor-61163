import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { PracticeAreasConfig } from '@/contexts/SiteEditorContext';

interface PracticeAreasEditorProps {
  instanceId: string;
}

const PracticeAreasEditor: React.FC<PracticeAreasEditorProps> = ({ instanceId }) => {
  const { config } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const practiceConfig = instance?.config as PracticeAreasConfig;

  if (!practiceConfig) return null;

  return (
    <div className="space-y-3">
      <div className="text-sm text-muted-foreground">
        {practiceConfig.areas?.length || 0} áreas configuradas
      </div>
    </div>
  );
};

export default PracticeAreasEditor;
