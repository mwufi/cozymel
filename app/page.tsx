'use client';

import { useState, useRef } from 'react';
import Draggable from 'react-draggable';

export default function HomePage() {
  const [elements, setElements] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const arrowRef = useRef(null);
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
        if (el.type === 'text') {
          return (
            <Draggable key={el.id}>
              <textarea
                style={{ position: 'absolute', top: el.y, left: el.x, transform: 'translate(-50%, -50%)' }}
                onMouseDown={(e) => handleMouseDown(e, el.id)}
                onClick={() => setSelectedElementId(el.id)}
              />
            </Draggable>
          );
        } else if (el.type === 'image') {
          return (
            <Draggable key={el.id}>
              <img
                src="https://picsum.photos/200"
                alt="Random"
                style={{ position: 'absolute', top: el.y, left: el.x, transform: 'translate(-50%, -50%)', userSelect: 'none' }}
                draggable={false}
                onMouseDown={(e) => handleMouseDown(e, el.id)}
                onClick={() => setSelectedElementId(el.id)}
              />
            </Draggable>
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
      })}
    </div>
  );
}
