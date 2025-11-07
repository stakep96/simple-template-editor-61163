import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { iconLibrary, iconCategories, searchIcons, getIconByValue } from '@/lib/iconLibrary';
import { CustomIcon } from './CustomIcon';
import type { IconOption } from '@/lib/iconLibrary';

interface IconSelectorProps {
  value: string;
  onChange: (value: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const IconSelector: React.FC<IconSelectorProps> = ({
  value,
  onChange,
  open,
  onOpenChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const selectedIcon = getIconByValue(value);
  const filteredIcons = searchIcons(searchTerm, selectedCategory);

  const handleSelect = (iconValue: string) => {
    onChange(iconValue);
    onOpenChange?.(false);
    setSearchTerm('');
  };

  const renderIconPreview = (icon: IconOption) => {
    if (icon.type === 'lucide' && icon.Icon) {
      return <icon.Icon className="w-5 h-5" />;
    } else if (icon.type === 'custom' && icon.path) {
      return <CustomIcon path={icon.path} className="w-5 h-5" />;
    }
    return null;
  };

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-10 w-10 p-0">
          {selectedIcon && renderIconPreview(selectedIcon)}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-[420px] p-0" align="start">
        <div className="p-4 space-y-3">
          {/* Campo de busca */}
          <Input
            placeholder="Buscar ícones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10"
          />
          
          {/* Tabs de categorias */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="w-full flex-wrap h-auto gap-1">
              {iconCategories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="text-xs"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {/* Grid de ícones */}
            <div className="mt-3">
              <ScrollArea className="h-[320px]">
                <div className="grid grid-cols-8 gap-2 p-1">
                  {filteredIcons.map((icon) => (
                    <Button
                      key={icon.value}
                      variant={value === icon.value ? 'default' : 'outline'}
                      className="h-10 w-10 p-0"
                      onClick={() => handleSelect(icon.value)}
                      title={icon.label}
                    >
                      {renderIconPreview(icon)}
                    </Button>
                  ))}
                </div>
                
                {filteredIcons.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Nenhum ícone encontrado
                  </p>
                )}
              </ScrollArea>
            </div>
          </Tabs>
          
          {selectedIcon && (
            <p className="text-xs text-muted-foreground text-center border-t pt-2">
              Selecionado: <strong>{selectedIcon.label}</strong>
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
