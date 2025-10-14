import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import { Trash2, Plus } from 'lucide-react';
import type { Testimonial } from '@/contexts/SiteEditorContext';

interface TestimonialsEditorProps {
  instanceId: string;
}

const TestimonialsEditor: React.FC<TestimonialsEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();

  const moduleInstance = config.moduleInstances[instanceId];
  if (!moduleInstance || moduleInstance.type !== 'testimonials') return null;

  const testimonialsConfig = moduleInstance.config as import('@/contexts/SiteEditorContext').TestimonialsConfig;

  const updateTestimonial = (id: string, field: keyof Testimonial, value: string) => {
    const updatedTestimonials = testimonialsConfig.testimonials.map((testimonial) =>
      testimonial.id === id ? { ...testimonial, [field]: value } : testimonial
    );
    updateModuleInstance(instanceId, { testimonials: updatedTestimonials });
  };

  const removeTestimonial = (id: string) => {
    const updatedTestimonials = testimonialsConfig.testimonials.filter((t) => t.id !== id);
    updateModuleInstance(instanceId, { testimonials: updatedTestimonials });
  };

  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      name: 'Novo Cliente',
      role: 'Cargo/Empresa',
      testimonial: 'Digite o depoimento aqui...',
    };
    updateModuleInstance(instanceId, {
      testimonials: [...testimonialsConfig.testimonials, newTestimonial],
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Título da Seção</Label>
        <Input
          value={testimonialsConfig.title}
          onChange={(e) => updateModuleInstance(instanceId, { title: e.target.value })}
          placeholder="Depoimentos"
        />
      </div>

      <div className="space-y-4">
        <Label>Depoimentos</Label>
        {testimonialsConfig.testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <Label className="text-sm font-semibold">Depoimento</Label>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeTestimonial(testimonial.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div>
              <Label className="text-xs">URL da Imagem</Label>
              <Input
                value={testimonial.image}
                onChange={(e) => updateTestimonial(testimonial.id, 'image', e.target.value)}
                placeholder="https://exemplo.com/foto.jpg"
              />
            </div>

            <div>
              <Label className="text-xs">Nome</Label>
              <Input
                value={testimonial.name}
                onChange={(e) => updateTestimonial(testimonial.id, 'name', e.target.value)}
                placeholder="Nome do cliente"
              />
            </div>

            <div>
              <Label className="text-xs">Cargo/Empresa</Label>
              <Input
                value={testimonial.role}
                onChange={(e) => updateTestimonial(testimonial.id, 'role', e.target.value)}
                placeholder="Cargo ou empresa"
              />
            </div>

            <div>
              <Label className="text-xs">Depoimento</Label>
              <Textarea
                value={testimonial.testimonial}
                onChange={(e) => updateTestimonial(testimonial.id, 'testimonial', e.target.value)}
                placeholder="Digite o depoimento..."
                rows={3}
              />
            </div>
          </Card>
        ))}

        <Button onClick={addTestimonial} variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Depoimento
        </Button>
      </div>
    </div>
  );
};

export default TestimonialsEditor;
