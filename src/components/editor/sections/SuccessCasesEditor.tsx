import React from 'react';

import { useSiteEditor } from '@/contexts/SiteEditorContext';

const SuccessCasesEditor = () => {
  const { config, updateSuccessCases } = useSiteEditor();

  return (
    <div className="space-y-3">
      {config.successCases.enabled && (
        <div className="text-sm text-muted-foreground">
          {config.successCases.cases.length} cases configurados
        </div>
      )}
    </div>
  );
};

export default SuccessCasesEditor;
