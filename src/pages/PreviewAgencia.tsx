import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PreviewSite from '@/components/preview/PreviewSite';
import { SiteEditorProvider, useSiteEditor } from '@/contexts/SiteEditorContext';

const PreviewAgenciaContent = () => {
  const { isLoading, forceReloadFromBackend, lastSyncTime } = useSiteEditor();
  
  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="w-full min-h-screen relative">
      {/* Floating Refresh Button */}
      <div className="fixed top-4 right-4 z-50 bg-background/95 backdrop-blur rounded-lg shadow-lg p-2 border border-border">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => forceReloadFromBackend()}
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Recarregar do Servidor
        </Button>
        {lastSyncTime && (
          <p className="text-xs text-muted-foreground mt-1 px-2">
            Atualizado: {lastSyncTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
      <PreviewSite />
    </div>
  );
};

const PreviewAgencia = () => {
  return (
    <SiteEditorProvider defaultTemplate="6">
      <PreviewAgenciaContent />
    </SiteEditorProvider>
  );
};

export default PreviewAgencia;
