'use client';

import { TextElement, Element } from '@/app/types';
import { useRef, useEffect } from 'react';

const TextAreaThatHandlesBackspace = ({ element, updateElement, deleteElement }: { element: TextElement, updateElement: (element: Element) => void, deleteElement: () => void }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [element.text]);

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
      ref={textareaRef}
      className="p-4 bg-gray-100 rounded-lg w-full max-w-[400px] resize-none overflow-hidden"
      onKeyDown={handleKeyDown}
      value={element.text}
      onChange={handleChange}
    />
  );
};

export default TextAreaThatHandlesBackspace;
