import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layout } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  color: string;
}

const templates: Template[] = [
  { id: '1', name: 'Advocacia Criminal', category: 'Jurídico', thumbnail: '', color: 'from-red-500 to-red-700' },
  { id: '2', name: 'Direito Imobiliário', category: 'Jurídico', thumbnail: '', color: 'from-blue-500 to-blue-700' },
  { id: '3', name: 'Consultório Médico', category: 'Saúde', thumbnail: '', color: 'from-green-500 to-green-700' },
  { id: '4', name: 'Clínica Dentária', category: 'Saúde', thumbnail: '', color: 'from-teal-500 to-teal-700' },
  { id: '5', name: 'E-commerce', category: 'Mercado Digital', thumbnail: '', color: 'from-purple-500 to-purple-700' },
  { id: '6', name: 'Agência Digital', category: 'Mercado Digital', thumbnail: '', color: 'from-pink-500 to-pink-700' },
  { id: '7', name: 'Loja de Roupas', category: 'Produtos', thumbnail: '', color: 'from-orange-500 to-orange-700' },
  { id: '8', name: 'Restaurante', category: 'Produtos', thumbnail: '', color: 'from-amber-500 to-amber-700' },
];

const categories = ['Todos', 'Jurídico', 'Saúde', 'Mercado Digital', 'Produtos'];

const TemplatesEditor = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredTemplates = selectedCategory === 'Todos' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <Card className="p-4">
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
        
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">Ver tudo</Button>
            </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Todos os Modelos</DialogTitle>
            </DialogHeader>
            
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full grid-cols-5">
                {categories.map(cat => (
                  <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
                ))}
              </TabsList>
              
              <div className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredTemplates.map(template => (
                    <button
                      key={template.id}
                      className="group relative aspect-[3/4] rounded-lg overflow-hidden border-2 border-border hover:border-primary transition-all"
                    >
                      <div className={`w-full h-full bg-gradient-to-br ${template.color} flex items-end justify-center p-4`}>
                        <div className="bg-background/90 backdrop-blur-sm rounded px-3 py-1">
                          <p className="font-bold text-sm text-foreground">{template.name}</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            </Tabs>
          </DialogContent>
        </Dialog>
        </div>
      </div>

      <Carousel className="w-full">
        <div className="flex items-center justify-end gap-2 mb-2">
          <CarouselPrevious className="static translate-y-0 h-9 w-9" />
          <CarouselNext className="static translate-y-0 h-9 w-9" />
        </div>
        <CarouselContent className="-ml-2">
          {templates.slice(0, 6).map((template) => (
            <CarouselItem key={template.id} className="pl-2 basis-1/4">
              <button className="group relative aspect-[2/3] w-full rounded-lg overflow-hidden border-2 border-border hover:border-primary transition-all">
                <div className={`w-full h-full bg-gradient-to-br ${template.color} flex items-end justify-center p-2`}>
                  <div className="bg-background/90 backdrop-blur-sm rounded px-2 py-1">
                    <p className="font-bold text-xs text-foreground">{template.name}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all" />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Card>
  );
};

export default TemplatesEditor;
