'use client';

import { Element } from '@/app/types';

const TextAreaThatHandlesBackspace = ({ element, updateElement }: { element: Element, updateElement: (element: Element) => void }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    if (e.key === 'Backspace') {
      console.log('Backspace key pressed');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateElement({ ...element, text: e.target.value });
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
