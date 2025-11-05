import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SiteMetadataEditor = () => {
  const { config, updateMetadata } = useSiteEditor();
  const { toast } = useToast();

  const handleSaveCustomDomain = () => {
    if (!config.metadata.customDomainName.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira um nome de domínio válido",
        variant: "destructive",
      });
      return;
    }
    
    updateMetadata({ customDomainSaved: true });
    toast({
      title: "Domínio salvo!",
      description: "Configure os nameservers abaixo no seu provedor de domínio",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Endereço copiado para a área de transferência",
    });
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="siteName" className="text-sm font-medium">
          Nome do Site
        </Label>
        <Input
          id="siteName"
          value={config.metadata.siteName}
          onChange={(e) => updateMetadata({ siteName: e.target.value })}
          placeholder="Novo Site"
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="domain" className="text-sm font-medium">
          Escolha seu domínio 4bout.work
        </Label>
        <div className="flex items-center gap-2">
          <div className="px-3 py-2 bg-muted rounded-md text-sm text-muted-foreground border border-input">
            bout-web/
          </div>
          <Input
            id="domain"
            value={config.metadata.domain}
            onChange={(e) => updateMetadata({ domain: e.target.value })}
            placeholder="meusite"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">
          Título/Nome
        </Label>
        <Input
          id="title"
          value={config.metadata.title}
          onChange={(e) => updateMetadata({ title: e.target.value })}
          placeholder="Seu nome ou nome da empresa"
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Bio/Descrição
        </Label>
        <Textarea
          id="description"
          value={config.metadata.description}
          onChange={(e) => updateMetadata({ description: e.target.value })}
          placeholder="Fale um pouco sobre você ou sua empresa"
          className="w-full min-h-[100px] resize-none"
        />
      </div>

      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="customDomain" className="text-sm font-medium">
              Domínio Personalizado
            </Label>
            <p className="text-xs text-muted-foreground">
              Use seu próprio domínio
            </p>
          </div>
          <Switch
            id="customDomain"
            checked={config.metadata.customDomain}
            onCheckedChange={(checked) => {
              updateMetadata({ 
                customDomain: checked,
                customDomainSaved: checked ? config.metadata.customDomainSaved : false
              });
            }}
          />
        </div>

        {config.metadata.customDomain && (
          <div className="space-y-4 pl-4 border-l-2 border-primary/20">
            <div className="space-y-2">
              <Label htmlFor="customDomainName" className="text-sm font-medium">
                Nome do Domínio
              </Label>
              <Input
                id="customDomainName"
                value={config.metadata.customDomainName}
                onChange={(e) => updateMetadata({ customDomainName: e.target.value })}
                placeholder="meusite.com"
                className="w-full"
                disabled={config.metadata.customDomainSaved}
              />
            </div>

            {!config.metadata.customDomainSaved ? (
              <Button 
                onClick={handleSaveCustomDomain}
                className="w-full"
              >
                Salvar Domínio
              </Button>
            ) : (
              <div className="space-y-3 p-4 bg-muted/50 rounded-lg border border-border">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Configure estes nameservers:</p>
                  <p className="text-xs text-muted-foreground">
                    Adicione estes registros no painel do seu provedor de domínio
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Tipo A - Host: @</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        value="185.158.133.1"
                        readOnly
                        className="flex-1 text-sm font-mono"
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => copyToClipboard('185.158.133.1')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Tipo A - Host: www</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        value="185.158.133.1"
                        readOnly
                        className="flex-1 text-sm font-mono"
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => copyToClipboard('185.158.133.1')}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="outline"
                  onClick={() => updateMetadata({ customDomainSaved: false })}
                  className="w-full"
                >
                  Editar Domínio
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteMetadataEditor;
