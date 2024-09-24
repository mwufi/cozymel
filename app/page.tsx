'use client';

import { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import Diamond from '@/components/DiamondDisplay';

import { useEffect } from 'react';

const DraggableItem = ({ children, x, y, id, handleMouseDown, setSelectedElementId }) => {
  return (
    <Draggable key={id}>
      <div
        style={{ position: 'absolute', top: y, left: x, transform: 'translate(-50%, -50%)' }}
        onMouseDown={(e) => handleMouseDown(e, id)}
        onClick={() => setSelectedElementId(id)}
      >
        {children}
      </div>
    </Draggable>
  )
};

const TextAreaThatHandlesBackspace = () => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    if (e.key === 'Backspace') {
      console.log('Backspace key pressed');
    }
  };

  return (
    <textarea className="p-4 bg-gray-100 rounded-lg" onKeyDown={handleKeyDown} />
  );
};

const Postcard = () => {
  return (
    <div className="relative w-[600px] h-[400px] rounded-xl overflow-hidden">
      <img src="https://picsum.photos/200" alt="Random" className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-4">
        <h1 className="text-3xl font-cursive mb-2">Postcard</h1>
        <p className="text-lg font-cursive">This is a beautiful postcard with a random image from Picsum.</p>
      </div>
    </div>
  );
};

const library = [
  {
    id: 1,
    name: 'Postcard',
    description: 'This is a beautiful postcard with a random image from Picsum.',
    image: 'https://cdn.midjourney.com/9d62f18e-a79e-4b5c-bc81-807c27f7ceca/0_0.png'
  },
  {
    id: 2,
    name: 'Postcard',
    description: 'This is a beautiful postcard with a random image from Picsum.',
    image: 'https://cdn.midjourney.com/9d62f18e-a79e-4b5c-bc81-807c27f7ceca/0_1.png'
  },
  {
    id: 3,
    name: 'Postcard',
    description: 'This is a beautiful postcard with a random image from Picsum.',
    image: 'https://cdn.midjourney.com/9d62f18e-a79e-4b5c-bc81-807c27f7ceca/0_2.png'
  },

  {
    id: 4,
    name: 'Postcard',
    description: 'This is a beautiful postcard with a random image from Picsum.',
    image: 'https://cdn.midjourney.com/9d62f18e-a79e-4b5c-bc81-807c27f7ceca/0_3.png'
  }
]

export default function HomePage() {
  const [elements, setElements] = useState<any[]>([
    { type: 'postcard', id: Date.now(), x: 100, y: 100 },
    { type: 'image', id: Date.now() + 1, x: 200, y: 200, image: library[0].image },
    { type: 'image', id: Date.now() + 2, x: 300, y: 300, image: library[1].image },
    { type: 'image', id: Date.now() + 3, x: 400, y: 400, image: library[2].image },
    { type: 'image', id: Date.now() + 4, x: 500, y: 500, image: library[3].image }
  ]);
  const [selectedElementId, setSelectedElementId] = useState<number | null>(null);
  const arrowRef = useRef<{ id: number; startX: number; startY: number } | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    mousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleKeyDown = (e) => {
    const { x, y } = mousePosition.current;
    if (e.key === 't') {
      setElements([...elements, { type: 'text', id: Date.now(), x, y }]);
    } else if (e.key === 'p') {
      setElements([...elements, { type: 'image', id: Date.now(), x, y }]);
    } else if (e.key === 'd') {
      setElements([...elements, { type: 'diamond', id: Date.now(), x, y }]);
    } else if (e.key === 'v') {
      setElements([...elements, { type: 'video', id: Date.now(), x, y }]);
    } else if (e.key === 'a') {
      setElements([...elements, { type: 'arrow', id: Date.now(), startX: x, startY: y, endX: x, endY: y }]);
    } else if (e.key === 'Backspace' && selectedElementId !== null) {
      setElements(elements.filter(el => el.id !== selectedElementId));
      setSelectedElementId(null);
    }
  };

  const handleMouseDown = (e, id) => {
    setSelectedElementId(id);
    if (elements.find(el => el.id === id && el.type === 'arrow')) {
      arrowRef.current = { id, startX: e.clientX, startY: e.clientY };
    }
  };

  const handleMouseUp = (e) => {
    if (arrowRef.current) {
      const { id, startX, startY } = arrowRef.current;
      setElements(elements.map(el => el.id === id ? { ...el, endX: e.clientX, endY: e.clientY } : el));
      arrowRef.current = null;
    }
  };

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
      onMouseUp={handleMouseUp}
    >
      {elements.map(el => {
        const renderElement = () => {
          if (el.type === 'text') {
            return <TextAreaThatHandlesBackspace />;
          } else if (el.type === 'postcard') {
            return <Postcard />;
          } else if (el.type === 'video') {
            return <video src="https://www.w3schools.com/html/mov_bbb.mp4" controls />;
          } else if (el.type === 'diamond') {
            return <Diamond />;
          } else if (el.type === 'image') {
            return (
              <div style={{ width: '400px' }}>
                <img
                  src={el.image || "https://picsum.photos/200"}
                  alt="Random"
                  style={{ userSelect: 'none' }}
                  draggable={false}
                />
              </div>
            );
          } else if (el.type === 'arrow') {
            return (
              <svg key={el.id} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
                <line
                  x1={el.startX}
                  y1={el.startY}
                  x2={el.endX}
                  y2={el.endY}
                  stroke="black"
                  strokeWidth="2"
                  onMouseDown={(e) => handleMouseDown(e, el.id)}
                  onClick={() => setSelectedElementId(el.id)}
                />
              </svg>
            );
          }
          return null;
        };

        return (
          <DraggableItem
            key={el.id}
            x={el.x}
            y={el.y}
            id={el.id}
            handleMouseDown={handleMouseDown}
            setSelectedElementId={setSelectedElementId}
          >
            {renderElement()}
          </DraggableItem>
        );
      })}
    </div>
  );
}
