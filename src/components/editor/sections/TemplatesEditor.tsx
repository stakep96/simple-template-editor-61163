import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layout, Check } from 'lucide-react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import { toast } from 'sonner';
import templateJuridico from '@/assets/template-juridico.png';
import templateAgency from '@/assets/template-agency-new.png';
interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  color: string;
  description: string;
}
const templates: Template[] = [{
  id: '1',
  name: 'Jurídico',
  category: 'Jurídico',
  thumbnail: templateJuridico,
  color: 'from-red-500 to-red-700',
  description: 'Design profissional para escritórios de advocacia'
}, {
  id: '3',
  name: 'Médico',
  category: 'Saúde',
  thumbnail: '',
  color: 'from-green-500 to-green-700',
  description: 'Layout clean para consultórios e clínicas médicas'
}, {
  id: '10',
  name: 'Influencer (Kit Midia)',
  category: 'Digital',
  thumbnail: '',
  color: 'from-purple-500 to-pink-500',
  description: 'Template minimalista para influenciadores digitais e criadores de conteúdo'
}, {
  id: '6',
  name: 'Agência de Marketing',
  category: 'Digital',
  thumbnail: templateAgency,
  color: 'from-pink-500 to-pink-700',
  description: 'Layout criativo para agências e startups'
}, {
  id: '5',
  name: 'Produtor Digital',
  category: 'Digital',
  thumbnail: '',
  color: 'from-purple-500 to-purple-700',
  description: 'Template otimizado para lojas virtuais'
}, {
  id: '9',
  name: 'Odontologia',
  category: 'Saúde',
  thumbnail: '',
  color: 'from-blue-500 to-purple-700',
  description: 'Excellence in Dental Care - Design moderno para clínicas odontológicas'
}, {
  id: '7',
  name: 'Loja de Roupas',
  category: 'Produtos',
  thumbnail: '',
  color: 'from-orange-500 to-orange-700',
  description: 'Design elegante para moda e vestuário'
}, {
  id: '8',
  name: 'Restaurante',
  category: 'Produtos',
  thumbnail: '',
  color: 'from-amber-500 to-amber-700',
  description: 'Template atrativo para restaurantes e delivery'
}];
const categories = ['Todos', 'Jurídico', 'Saúde', 'Digital', 'Produtos'];
const TemplatesEditor = () => {
  const { applyTemplate, config } = useSiteEditor();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const filteredTemplates = selectedCategory === 'Todos' ? templates : templates.filter(t => t.category === selectedCategory);
  
  // Reordenar templates para mostrar o selecionado primeiro
  const reorderedTemplates = React.useMemo(() => {
    const currentId = config.currentTemplateId;
    if (!currentId) return templates;
    
    const currentTemplate = templates.find(t => t.id === currentId);
    if (!currentTemplate) return templates;
    
    const otherTemplates = templates.filter(t => t.id !== currentId);
    return [currentTemplate, ...otherTemplates];
  }, [config.currentTemplateId]);

  const handleApplyTemplate = (templateId?: string) => {
    const idToApply = templateId || selectedTemplate;
    if (!idToApply) {
      toast.error('Selecione um template primeiro');
      return;
    }
    
    applyTemplate(idToApply);
    setIsDialogOpen(false);
    toast.success('Template aplicado com sucesso!');
  };
  return <div>
      <Carousel className="w-full">
        <div className="flex items-center justify-end gap-2 mb-2">
          <CarouselPrevious className="static translate-y-0 h-9 w-9" />
          <CarouselNext className="static translate-y-0 h-9 w-9" />
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">Ver tudo</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0">
              <div className="sticky top-0 z-10 bg-background border-b px-6 pt-6 pb-4">
                <DialogHeader className="mb-4">
                  <DialogTitle>Todos os Modelos</DialogTitle>
                </DialogHeader>
                
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                  <TabsList className="grid w-full grid-cols-5">
                    {categories.map(cat => <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>)}
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredTemplates.map(template => (
                    <div key={template.id} className="relative group">
                      {/* Borda de seleção quando aplicado */}
                      {config.currentTemplateId === template.id && (
                        <div className="absolute -inset-1 border-[3px] border-primary rounded-xl z-20 pointer-events-none" />
                      )}
                      
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                        {/* Imagem/Gradient do template */}
                        {template.thumbnail ? (
                          <img src={template.thumbnail} alt={template.name} className="w-full h-full object-cover object-top" />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${template.color}`} />
                        )}
                        
                        {/* Check mark quando aplicado */}
                        {config.currentTemplateId === template.id && (
                          <div className="absolute top-2 right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg z-30">
                            <Check className="w-5 h-5 text-primary-foreground" />
                          </div>
                        )}
                        
                        {/* Overlay com informações no hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10">
                          <div className="space-y-3">
                            <div>
                              <h3 className="font-bold text-lg text-foreground">{template.name}</h3>
                              <span className="inline-block px-2 py-0.5 bg-primary/20 text-primary text-xs rounded mt-1">
                                {template.category}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
                            <Button 
                              onClick={() => handleApplyTemplate(template.id)} 
                              className="w-full"
                              size="sm"
                            >
                              Aplicar Tema
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <CarouselContent className="-ml-2">
          {reorderedTemplates.slice(0, 6).map(template => <CarouselItem key={template.id} className="pl-2 basis-1/5 p-3">
              <div className="relative">
                {/* Borda de seleção - fica por cima de tudo - apenas se for o template aplicado */}
                {config.currentTemplateId === template.id && (
                  <div className="absolute -inset-1 border-[3px] border-primary rounded-xl z-20 pointer-events-none" />
                )}
                
                <button 
                  onClick={() => setSelectedTemplate(template.id)} 
                  className="group relative w-full rounded-lg overflow-hidden transition-all hover:shadow-lg"
                >
                  {/* Imagem/Gradient do template - ocupa toda extensão */}
                  <div className="w-full aspect-[9/16]">
                    {template.thumbnail ? (
                      <img src={template.thumbnail} alt={template.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${template.color}`} />
                    )}
                  </div>
                    
                    {/* Check mark quando aplicado */}
                    {config.currentTemplateId === template.id && (
                      <div className="absolute top-2 right-2 w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-lg z-30">
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  
                  {/* Informações que aparecem no hover - sobrepostas à imagem */}
                  <div className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-3 space-y-2 flex flex-col justify-between z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-xs text-foreground text-left">{template.name}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary whitespace-nowrap">{template.category}</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 text-left">{template.description}</p>
                    </div>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApplyTemplate(template.id);
                      }} 
                      size="sm" 
                      className="w-full h-8 text-xs"
                    >
                      Aplicar Tema
                    </Button>
                  </div>
                </button>
              </div>
            </CarouselItem>)}
        </CarouselContent>
      </Carousel>
    </div>;
};
export default TemplatesEditor;