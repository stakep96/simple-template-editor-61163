import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import { Copy, Globe, Clock, CheckCircle2, AlertTriangle, ExternalLink, ChevronLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

const DNS_RECORDS = [
  { type: 'A', name: '@', value: '185.158.133.1' },
  { type: 'CNAME', name: 'www', value: '185.158.133.1' },
];

const CustomDomainEditor = () => {
  const { config, updateMetadata } = useSiteEditor();
  const { toast } = useToast();
  const [step, setStep] = useState<1 | 2>(() => {
    if (config.metadata.customDomainSaved) return 2;
    return 1;
  });
  const [dnsConfirmed, setDnsConfirmed] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Valor copiado para a área de transferência",
    });
  };

  const handleContinueToStep2 = () => {
    const domain = config.metadata.customDomainName.trim();
    if (!domain) {
      toast({
        title: "Erro",
        description: "Por favor, insira um nome de domínio válido",
        variant: "destructive",
      });
      return;
    }
    updateMetadata({ customDomainSaved: true });
    setStep(2);
  };

  const handleConfirmDns = () => {
    updateMetadata({ customDomainStatus: 'waiting' });
    toast({
      title: "Domínio salvo!",
      description: "Aguardando a propagação dos registros DNS",
    });
  };

  const handleRemoveDomain = () => {
    updateMetadata({
      customDomain: false,
      customDomainSaved: false,
      customDomainName: '',
      customDomainStatus: 'idle',
    });
    setStep(1);
    setDnsConfirmed(false);
  };

  const handleBackToStep1 = () => {
    updateMetadata({ customDomainSaved: false, customDomainStatus: 'idle' });
    setStep(1);
    setDnsConfirmed(false);
  };

  const domainStatus = config.metadata.customDomainStatus || 'idle';
  const isWaitingOrConnected = domainStatus === 'waiting' || domainStatus === 'connected';

  // Status view (image 7 style) - after DNS confirmed
  if (config.metadata.customDomain && isWaitingOrConnected) {
    return (
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium">Domínio Personalizado</Label>
            <p className="text-xs text-muted-foreground">Use seu próprio domínio</p>
          </div>
          <Switch
            checked={config.metadata.customDomain}
            onCheckedChange={(checked) => {
              if (!checked) handleRemoveDomain();
            }}
          />
        </div>

        {/* Waiting state (image 3 style) */}
        {domainStatus === 'waiting' && (
          <div className="space-y-4 p-5 bg-muted/30 rounded-lg border border-border">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="relative">
                <Globe className="h-12 w-12 text-muted-foreground/50" />
                <div className="absolute -bottom-1 -right-1 bg-accent rounded-full p-0.5">
                  <Clock className="h-3.5 w-3.5 text-accent-foreground" />
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="text-sm font-semibold">
                  Aguardando conexão do domínio
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Se você alterou seus registros DNS, seu domínio será conectado em breve.
                  <br />
                  Pode levar até 24 horas para conectar{' '}
                  <span className="font-medium text-foreground">
                    {config.metadata.customDomainName}
                  </span>{' '}
                  ao seu site.
                </p>
              </div>
              <a
                href="https://docs.lovable.dev/features/custom-domain"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline inline-flex items-center gap-1"
              >
                Como funciona a conexão de domínio
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        )}

        {/* Domain status list (image 7 style) */}
        <div className="space-y-2">
          {/* Root domain */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background">
            <div className="flex items-center gap-3 min-w-0">
              {domainStatus === 'waiting' ? (
                <AlertTriangle className="h-4 w-4 text-primary shrink-0" />
              ) : (
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              )}
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{config.metadata.customDomainName}</p>
                <p className={`text-xs ${domainStatus === 'waiting' ? 'text-muted-foreground' : 'text-primary'}`}>
                  {domainStatus === 'waiting' ? 'Aguardando verificação' : 'Conectado'}
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="text-xs shrink-0"
              onClick={() => {
                updateMetadata({ customDomainStatus: 'connected' });
                toast({ title: "Atualizado", description: "Status do domínio verificado" });
              }}
            >
              Verificar
            </Button>
          </div>

          {/* WWW subdomain */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background">
            <div className="flex items-center gap-3 min-w-0">
              {domainStatus === 'waiting' ? (
                <AlertTriangle className="h-4 w-4 text-primary shrink-0" />
              ) : (
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              )}
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">www.{config.metadata.customDomainName}</p>
                <p className={`text-xs ${domainStatus === 'waiting' ? 'text-muted-foreground' : 'text-primary'}`}>
                  {domainStatus === 'waiting' ? 'Aguardando verificação' : 'Produção'}
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="text-xs shrink-0"
              onClick={() => {
                toast({ title: "Verificando...", description: "Checando status do DNS" });
              }}
            >
              Verificar
            </Button>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleRemoveDomain}
          className="w-full text-destructive hover:text-destructive"
        >
          Remover Domínio
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-4 border-t border-border">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-sm font-medium">Domínio Personalizado</Label>
          <p className="text-xs text-muted-foreground">Use seu próprio domínio</p>
        </div>
        <Switch
          checked={config.metadata.customDomain}
          onCheckedChange={(checked) => {
            updateMetadata({
              customDomain: checked,
              customDomainSaved: checked ? config.metadata.customDomainSaved : false,
              customDomainStatus: checked ? (config.metadata.customDomainStatus || 'idle') : 'idle',
            });
            if (!checked) {
              setStep(1);
              setDnsConfirmed(false);
            }
          }}
        />
      </div>

      {config.metadata.customDomain && (
        <div className="space-y-4 pl-4 border-l-2 border-primary/20">
          {/* Step indicator (image 5 style) */}
          <div className="flex items-center gap-2 text-xs">
            <div className={`flex items-center gap-1.5 ${step === 1 ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
              <span className={`flex items-center justify-center h-5 w-5 rounded-full text-[10px] font-bold ${
                step === 1 ? 'bg-primary text-primary-foreground' : step === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {step > 1 ? '✓' : '1'}
              </span>
              Inserir domínio
            </div>
            <div className="h-px w-6 bg-border" />
            <div className={`flex items-center gap-1.5 ${step === 2 ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
              <span className={`flex items-center justify-center h-5 w-5 rounded-full text-[10px] font-bold ${
                step === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                2
              </span>
              Configurar DNS
            </div>
          </div>

          {/* Step 1: Enter domain */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Insira seu domínio</Label>
                <p className="text-xs text-muted-foreground">
                  Digite um domínio ou subdomínio registrado que você possui.
                </p>
                <Input
                  value={config.metadata.customDomainName}
                  onChange={(e) => updateMetadata({ customDomainName: e.target.value })}
                  placeholder="ex: meusite.com, www.meusite.com"
                  className="w-full"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateMetadata({ customDomain: false })}
                >
                  Cancelar
                </Button>
                <Button size="sm" onClick={handleContinueToStep2}>
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Configure DNS */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={handleBackToStep1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div>
                  <Label className="text-sm font-medium">Configurar registros DNS</Label>
                  <p className="text-xs text-muted-foreground">
                    Domínio: <span className="font-medium text-foreground">{config.metadata.customDomainName}</span>
                  </p>
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-2 text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                <p className="font-medium text-foreground text-sm">Como configurar:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Faça login na conta do seu provedor de domínio</li>
                  <li>Encontre a zona de gerenciamento de registros DNS</li>
                  <li>Exclua todos os registros A existentes que tenham '@' como nome</li>
                  <li>Adicione os novos registros A com os valores abaixo</li>
                </ol>
              </div>

              {/* Tutorial link - moved above DNS records */}
              <a
                href="https://docs.lovable.dev/features/custom-domain"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline inline-flex items-center gap-1"
              >
                📖 Tutorial: Como configurar registros DNS no seu provedor
                <ExternalLink className="h-3 w-3" />
              </a>

              {/* DNS Records table (flat table style) */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Registros DNS necessários
                </p>

                <div className="rounded-lg border border-border bg-background overflow-hidden">
                  {/* Table header */}
                  <div className="grid grid-cols-[72px_1fr_1fr] border-b border-border">
                    <div className="px-3 py-2">
                      <p className="text-xs font-medium text-muted-foreground">Type</p>
                    </div>
                    <div className="px-3 py-2 border-l border-border">
                      <p className="text-xs font-medium text-muted-foreground">Name</p>
                    </div>
                    <div className="px-3 py-2 border-l border-border">
                      <p className="text-xs font-medium text-muted-foreground">Value</p>
                    </div>
                  </div>

                  {/* Table rows */}
                  {DNS_RECORDS.map((record, index) => (
                    <div
                      key={index}
                      className={`grid grid-cols-[72px_1fr_1fr] ${index < DNS_RECORDS.length - 1 ? 'border-b border-border' : ''}`}
                    >
                      <div className="px-3 py-3">
                        <p className="text-sm font-mono font-semibold">{record.type}</p>
                      </div>
                      <div className="px-3 py-3 border-l border-border">
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-mono">{record.name}</p>
                          <button
                            onClick={() => copyToClipboard(record.name)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <div className="px-3 py-3 border-l border-border">
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-mono">{record.value}</p>
                          <button
                            onClick={() => copyToClipboard(record.value)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info alert - offwhite tone */}
              <div className="flex items-start gap-2 p-3 bg-muted/40 border border-border rounded-lg">
                <Clock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div className="text-xs text-foreground space-y-1">
                  <p>
                    O processo de conexão do domínio pode levar <strong>até 24 horas</strong>.
                  </p>
                  <p className="text-muted-foreground">
                    Configurações de DNS personalizadas, como e-mail ou outros serviços, podem parar de funcionar a menos que você as adicione novamente.
                  </p>
                </div>
              </div>

              {/* Bottom row: checkbox + finalizar */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="dnsConfirmed"
                    checked={dnsConfirmed}
                    onCheckedChange={(checked) => setDnsConfirmed(checked === true)}
                  />
                  <Label htmlFor="dnsConfirmed" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                    Eu alterei os registros DNS conforme as instruções acima
                  </Label>
                </div>
                <Button
                  size="sm"
                  onClick={handleConfirmDns}
                  disabled={!dnsConfirmed}
                  className="shrink-0"
                >
                  Finalizar
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomDomainEditor;
