import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layout, Check } from 'lucide-react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import { toast } from 'sonner';
interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  color: string;
}
const templates: Template[] = [{
  id: '1',
  name: 'Jurídico',
  category: 'Jurídico',
  thumbnail: '',
  color: 'from-red-500 to-red-700'
}, {
  id: '3',
  name: 'Consultório Médico',
  category: 'Saúde',
  thumbnail: '',
  color: 'from-green-500 to-green-700'
}, {
  id: '4',
  name: 'Clínica Dentária',
  category: 'Saúde',
  thumbnail: '',
  color: 'from-teal-500 to-teal-700'
}, {
  id: '5',
  name: 'E-commerce',
  category: 'Mercado Digital',
  thumbnail: '',
  color: 'from-purple-500 to-purple-700'
}, {
  id: '6',
  name: 'Agência Digital',
  category: 'Mercado Digital',
  thumbnail: '',
  color: 'from-pink-500 to-pink-700'
}, {
  id: '7',
  name: 'Loja de Roupas',
  category: 'Produtos',
  thumbnail: '',
  color: 'from-orange-500 to-orange-700'
}, {
  id: '8',
  name: 'Restaurante',
  category: 'Produtos',
  thumbnail: '',
  color: 'from-amber-500 to-amber-700'
}];
const categories = ['Todos', 'Jurídico', 'Saúde', 'Mercado Digital', 'Produtos'];
const TemplatesEditor = () => {
  const { applyTemplate } = useSiteEditor();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const filteredTemplates = selectedCategory === 'Todos' ? templates : templates.filter(t => t.category === selectedCategory);

  const handleApplyTemplate = () => {
    if (!selectedTemplate) {
      toast.error('Selecione um template primeiro');
      return;
    }
    
    applyTemplate(selectedTemplate);
    setIsDialogOpen(false);
    toast.success('Template aplicado com sucesso!');
  };
  return <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Layout className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Modelos</h3>
            <p className="text-xs text-muted-foreground">Escolha um template</p>
          </div>
        </div>
      </div>

      {selectedTemplate && (
        <div className="mb-4 p-3 bg-primary/10 rounded-lg flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">
            Template selecionado: {templates.find(t => t.id === selectedTemplate)?.name}
          </p>
          <Button onClick={handleApplyTemplate} size="sm">
            Aplicar Template
          </Button>
        </div>
      )}

      <Carousel className="w-full">
        <div className="flex items-center justify-end gap-2 mb-2">
          <CarouselPrevious className="static translate-y-0 h-9 w-9" />
          <CarouselNext className="static translate-y-0 h-9 w-9" />
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">Ver tudo</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Todos os Modelos</DialogTitle>
              </DialogHeader>
              
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="grid w-full grid-cols-5">
                  {categories.map(cat => <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>)}
                </TabsList>
                
                <div className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredTemplates.map(template => <button key={template.id} onClick={() => setSelectedTemplate(template.id)} className={`group relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${selectedTemplate === template.id ? 'border-blue-500 ring-2 ring-blue-500' : 'border-border hover:border-primary'}`}>
                        <div className={`w-full h-full bg-gradient-to-br ${template.color} flex items-end justify-center p-4`}>
                          <div className="bg-background/90 backdrop-blur-sm rounded px-3 py-1">
                            <p className="font-bold text-sm text-foreground">{template.name}</p>
                          </div>
                        </div>
                        {selectedTemplate === template.id && <div className="absolute top-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                            <Check className="w-5 h-5 text-white" />
                          </div>}
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all" />
                      </button>)}
                  </div>
                  
                  <div className="mt-6 flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleApplyTemplate} disabled={!selectedTemplate}>
                      Aplicar Template
                    </Button>
                  </div>
                </div>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
        <CarouselContent className="-ml-2">
          {templates.slice(0, 6).map(template => <CarouselItem key={template.id} className="pl-2 basis-1/5">
              <button onClick={() => setSelectedTemplate(template.id)} className={`group relative aspect-[2/3] w-full rounded-lg overflow-hidden border-2 transition-all ${selectedTemplate === template.id ? 'border-blue-500 ring-2 ring-blue-500' : 'border-border hover:border-primary'}`}>
                <div className={`w-full h-full bg-gradient-to-br ${template.color} flex items-end justify-center p-2`}>
                  <div className="bg-background/90 backdrop-blur-sm rounded px-2 py-1">
                    <p className="font-bold text-xs text-foreground">{template.name}</p>
                  </div>
                </div>
                {selectedTemplate === template.id && <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-4 h-4 text-white" />
                  </div>}
                
              </button>
            </CarouselItem>)}
        </CarouselContent>
      </Carousel>
    </Card>;
};
export default TemplatesEditor;