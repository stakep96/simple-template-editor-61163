import React, { useRef } from 'react';
import { Input } from '@/components/ui/input';

interface ColorPickerProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ id, value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex gap-2 items-center">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="h-10 w-10 rounded-full cursor-pointer border-2 border-border hover:border-primary transition-colors flex-shrink-0"
        style={{ backgroundColor: value }}
        aria-label={`Selecionar ${id}`}
      />
      <input
        ref={inputRef}
        id={id}
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="sr-only"
      />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 font-mono text-sm"
      />
    </div>
  );
};

export default ColorPicker;
