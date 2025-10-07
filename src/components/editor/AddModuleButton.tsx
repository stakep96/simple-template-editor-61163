import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import ModuleSelector from './ModuleSelector';
import { useSiteEditor } from '@/contexts/SiteEditorContext';

interface AddModuleButtonProps {
  position: number;
}

const AddModuleButton: React.FC<AddModuleButtonProps> = ({ position }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { addModuleAt } = useSiteEditor();

  const handleModuleSelect = (moduleId: string) => {
    addModuleAt(moduleId, position);
    setIsOpen(false);
  };

  return (
    <div className="group relative h-0 flex items-center justify-center">
      <div className="absolute inset-x-0 h-8 -translate-y-1/2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-full h-px bg-border" />
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button className="absolute flex items-center justify-center w-8 h-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all hover:scale-110 z-10">
              <Plus className="w-4 h-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="center">
            <ModuleSelector onSelect={handleModuleSelect} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default AddModuleButton;
