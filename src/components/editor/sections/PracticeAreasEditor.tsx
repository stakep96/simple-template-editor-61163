import React from 'react';

import { useSiteEditor } from '@/contexts/SiteEditorContext';

const PracticeAreasEditor = () => {
  const { config, updatePracticeAreas } = useSiteEditor();

  return (
    <div className="space-y-3">
      {config.practiceAreas.enabled && (
        <div className="text-sm text-muted-foreground">
          {config.practiceAreas.areas.length} áreas configuradas
        </div>
      )}
    </div>
  );
};

export default PracticeAreasEditor;
