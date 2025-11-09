import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import type { GalleryConfig } from '@/contexts/SiteEditorContext';

interface PreviewGalleryProps {
  instanceId: string;
}

const PreviewGallery: React.FC<PreviewGalleryProps> = ({ instanceId }) => {
  const { config } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  const galleryConfig = instance?.config as GalleryConfig;

  if (!galleryConfig || galleryConfig.images.length === 0) return null;

  const totalImages = galleryConfig.images.length;
  const displayImages = galleryConfig.images.slice(0, 3);
  const remainingCount = totalImages - 3;

  // Create a mosaic pattern for up to 3 images
  const getMosaicPattern = (imageCount: number) => {
    if (imageCount === 1) return ['col-span-2 row-span-2'];
    if (imageCount === 2) return ['col-span-1 row-span-2', 'col-span-1 row-span-2'];
    return ['col-span-1 row-span-2', 'col-span-1 row-span-1', 'col-span-1 row-span-1'];
  };

  const patterns = getMosaicPattern(displayImages.length);

  return (
    <section 
      className="w-full"
      style={{ backgroundColor: config.brand.background }}
    >
      <h2 
        className="text-2xl font-bold text-center py-8 px-6"
        style={{ color: config.brand.titleColor }}
      >
        Galeria
      </h2>

      <div className="grid grid-cols-2 gap-1 auto-rows-[200px]">
        {displayImages.map((image, index) => (
          <div
            key={image.id}
            className={`relative overflow-hidden ${patterns[index]}`}
          >
            <img
              src={image.url || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop'}
              alt={image.alt || `Imagem ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop';
              }}
            />
            {index === 2 && remainingCount > 0 && (
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{ 
                  backgroundColor: `${config.brand.primary}CC`
                }}
              >
                <span 
                  className="text-4xl font-bold"
                  style={{ 
                    color: config.brand.secondary,
                    fontFamily: 'var(--brand-title-font)'
                  }}
                >
                  +{remainingCount}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PreviewGallery;
