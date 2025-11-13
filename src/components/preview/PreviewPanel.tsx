import React from 'react';
import { Smartphone, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import PreviewSite from './PreviewSite';

const PreviewPanel = () => {
  const { forceReloadFromBackend, lastSyncTime, isLoading } = useSiteEditor();
  
  const handleRefresh = async () => {
    await forceReloadFromBackend();
  };
  
  return (
    <div className="h-full bg-muted flex flex-col">
      <div className="p-6 border-b border-border bg-background flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Preview ao Vivo</h2>
          {lastSyncTime && (
            <span className="text-xs text-muted-foreground">
              • Atualizado às {lastSyncTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={isLoading}
          className="gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Recarregar
        </Button>
      </div>
      
      <div className="flex-1 p-8 flex items-center justify-center overflow-auto">
        <div className="w-[320px] h-[620px] bg-preview-frame rounded-[2.5rem] p-3 shadow-2xl">
          <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden">
            <PreviewSite />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
