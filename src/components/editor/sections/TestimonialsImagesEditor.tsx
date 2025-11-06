import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ImageUpload } from '@/components/ui/image-upload';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import { Trash2, Plus } from 'lucide-react';
import type { TestimonialImage } from '@/contexts/SiteEditorContext';

interface TestimonialsImagesEditorProps {
  instanceId: string;
}

const TestimonialsImagesEditor: React.FC<TestimonialsImagesEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();

  const moduleInstance = config.moduleInstances[instanceId];
  if (!moduleInstance || moduleInstance.type !== 'testimonials-images') return null;

  const testimonialsConfig = moduleInstance.config as import('@/contexts/SiteEditorContext').TestimonialsImagesConfig;

  const updateImage = (id: string, value: string) => {
    const updatedImages = testimonialsConfig.images.map((img) =>
      img.id === id ? { ...img, image: value } : img
    );
    updateModuleInstance(instanceId, { images: updatedImages });
  };

  const removeImage = (id: string) => {
    const updatedImages = testimonialsConfig.images.filter((img) => img.id !== id);
    updateModuleInstance(instanceId, { images: updatedImages });
  };

  const addImage = () => {
    const newImage: TestimonialImage = {
      id: Date.now().toString(),
      image: '',
    };
    updateModuleInstance(instanceId, {
      images: [...testimonialsConfig.images, newImage],
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
        <Label>Imagens de Depoimentos</Label>
        {testimonialsConfig.images.map((img) => (
          <Card key={img.id} className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <Label className="text-sm font-semibold">Imagem #{img.id.slice(-4)}</Label>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeImage(img.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div>
              <Label className="text-xs">Imagem da Conversa</Label>
              <ImageUpload
                value={img.image}
                onChange={(value) => updateImage(img.id, value)}
              />
            </div>
          </Card>
        ))}

        <Button onClick={addImage} variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Imagem
        </Button>
      </div>
    </div>
  );
};

export default TestimonialsImagesEditor;
