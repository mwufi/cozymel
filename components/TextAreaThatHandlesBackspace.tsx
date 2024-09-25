'use client';

import { Element } from '@/app/types';

const TextAreaThatHandlesBackspace = ({ element, updateElement, deleteElement }: { element: Element, updateElement: (element: Element) => void, deleteElement: () => void }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    if (e.key === 'Backspace') {
      console.log('Backspace key pressed');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (element.text?.includes('delete fr')) {
      deleteElement();
    } else {
      updateElement({ ...element, text: e.target.value });
    }
  };

  return (
    <textarea
      className="p-4 bg-gray-100 rounded-lg"
      onKeyDown={handleKeyDown}
      value={element.text}
      onChange={handleChange}
    />
  );
};

export default TextAreaThatHandlesBackspace;
