'use client';

import { useState, useRef, useEffect } from 'react';

import { saveElements } from '@/lib/utils';
import { toast } from 'sonner';
import { db } from '@/lib/instant';
import DraggableItem from '@/components/core/DraggableItem';
import { elementsAtom } from './atoms';
import { useAtom } from 'jotai';
import { Element } from './types';
import { renderElement } from '@/components/ElementRender';

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

  const [elements, setElements] = useAtom(elementsAtom);
  const [selectedElementId, setSelectedElementId] = useState<number | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isLoading && data) {
      console.log("data changed", data.pages[0].content)
      const elementsArray = data.pages[0].content as Element[];
      const elementsMap = elementsArray.reduce((acc, element) => {
        acc[element.id] = element;
        return acc;
      }, {} as Record<number, Element>);
      console.log("elementsMap", elementsMap)
      setElements(elementsMap);
    }
  }, [isLoading, data])

  const handleMouseMove = (e: React.MouseEvent) => {
    mousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const { x, y } = mousePosition.current;

    function addElement(type: string, additionalProps?: Partial<Element>) {
      setElements(prevElements => {
        const newElement = { type, id: Date.now(), x, y, ...additionalProps };
        return { ...prevElements, [newElement.id]: newElement };
      });
    }

    if (e.key === 't') {
      addElement('text');
    } else if (e.key === 'p') {
      addElement('image');
    } else if (e.key === 'd') {
      addElement('diamond');
    } else if (e.key === 'v') {
      addElement('video');
    } else if (e.key === 'Backspace' && selectedElementId !== null) {
      setElements(elements => {
        const newElements = { ...elements };
        delete newElements[selectedElementId];
        return newElements;
      });
      setSelectedElementId(null);
    }
  };

  function moveElement(id: number, x: number, y: number) {
    console.log("moving element", id, x, y)
    setElements(elements => {
      const newElements = { ...elements };
      newElements[id].x = x;
      newElements[id].y = y;
      return newElements;
    });
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'radial-gradient(circle, #ccc 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        position: 'relative'
      }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
    >
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
      {Object.values(elements).map(el => {
        return (
          <DraggableItem
            key={el.id}
            x={el.x}
            y={el.y}
            id={el.id}
            setSelectedElementId={setSelectedElementId}
            onUpdate={(id, x, y) => moveElement(id, x, y)}
          >
            <div>{el.x}, {el.y}</div>
            {renderElement(el)}
          </DraggableItem>
        );
      })}
    </div>
  );
}


export default function HomePage() {
  return <Viewer pageId="7aeac178-cfdf-4d5f-b9b7-d1bf37230f70" />
}