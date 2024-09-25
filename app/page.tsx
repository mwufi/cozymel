'use client';

import { useState, useRef, useEffect } from 'react';

import { deleteElement, saveElements, updateElement, updateMove } from '@/lib/utils';
import { toast } from 'sonner';
import { db } from '@/lib/instant';
import DraggableItem from '@/components/core/DraggableItem';
import { elementsAtom } from './atoms';
import { useAtom } from 'jotai';
import { Element } from './types';
import { renderElement } from '@/components/ElementRender';
import DynamicHeightContainer from '@/components/DynamicHeightContainer';

interface ViewerProps {
  pageId: string;
}

function Viewer({ pageId }: ViewerProps) {
  const query = {
    pages: {
      $: {
        where: {
          id: pageId
        }
      }
    }
  }
  const { isLoading, data, error } = db.useQuery(query)
  if (error) {
    return <div>Error: {error.message}</div>
  }

  const [elements, setElements] = useAtom(elementsAtom);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isLoading && data) {
      if (Array.isArray(data.pages[0].content)) {
        const elementsArray = data.pages[0].content as Element[];
        const elementsMap = elementsArray.reduce((acc, element) => {
          acc[element.id] = element;
          return acc;
        }, {} as Record<string, Element>);
        console.log("elementsMap", elementsMap)
        setElements(elementsMap);
      } else {
        const filteredContent = Object.fromEntries(
          Object.entries(data.pages[0].content as Record<string, Element>).filter(([key, value]) => value !== undefined)
        );
        console.log("filteredContent", filteredContent)
        setElements(filteredContent);
      }
    }
  }, [isLoading, data])

  const handleMouseMove = (e: React.MouseEvent) => {
    mousePosition.current = { x: e.pageX, y: e.pageY };
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const { x, y } = mousePosition.current;

    function addElement(type: string, additionalProps?: Partial<Element>) {
      const newId = Date.now().toString();
      const newElement = { type, id: newId, x, y, ...additionalProps };
      updateElement(pageId, newId, newElement);
    }
    if (e.ctrlKey || e.metaKey) return;

    if (e.key === 't') {
      addElement('text');
    } else if (e.key === 'b') {
      addElement('bar_chart');
    } else if (e.key === 'p') {
      addElement('image');
    } else if (e.key === 'd') {
      addElement('diamond');
    } else if (e.key === 'v') {
      addElement('video');
    } else if (e.key === 'x') {
      addElement('twitter');
    } else if (e.key === 'y') {
      addElement('youtube');
    } else if (e.key === 's') {
      addElement('spotify');
    } else if (e.key === 'Backspace' && selectedElementId !== null) {
      deleteElement(pageId, selectedElementId);
      setSelectedElementId(null);
    }
  };

  function moveElement(id: string, x: number, y: number) {
    if (!id || id === "undefined" || !elements[id]) return;

    console.log("moving element", id, x, y)
    updateMove(pageId, id, x, y);
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasteData = e.clipboardData.getData('text');
    const { x, y } = mousePosition.current;

    if (pasteData) {
      const newId = Date.now().toString();
      updateElement(pageId, newId, {
        type: 'text', id: newId, x, y, text: pasteData
      });
    }
  };

  return (
    <DynamicHeightContainer
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onMouseMove={handleMouseMove}
    >
      <div className='sticky top-0 left-0'>{JSON.stringify(mousePosition.current)}</div>
      <button
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        onClick={() => {
          saveElements(elements)
          toast.success('Elements saved')
        }}
      >
        Save
      </button>
      {Object.entries(elements).map(([id, el]) => {
        return (
          <DraggableItem
            key={id}
            x={el.x}
            y={el.y}
            id={id}
            setSelectedElementId={setSelectedElementId}
            onUpdate={(id, x, y) => moveElement(id, x, y)}
          >
            {/* <div>{id} - {el.x}, {el.y}</div> */}
            {renderElement(el, (element) => updateElement(pageId, id, element), () => deleteElement(pageId, id))}
          </DraggableItem>
        );
      })}
    </DynamicHeightContainer>

  );
}


export default function HomePage() {
  return <Viewer pageId="7aeac178-cfdf-4d5f-b9b7-d1bf37230f70" />
}