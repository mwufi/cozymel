'use client';

import Draggable from 'react-draggable';
import { useRef } from 'react';

interface DraggableItemProps {
  children: React.ReactNode;
  x: number;
  y: number;
  id: number;
  handleMouseDown?: (e: React.MouseEvent<HTMLDivElement>, id: number) => void;
  setSelectedElementId: (id: number) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ children, x, y, id, handleMouseDown, setSelectedElementId }) => {
  const draggableRef = useRef(null);

  return (
    <Draggable key={id} nodeRef={draggableRef}>
      <div
        ref={draggableRef}
        style={{ position: 'absolute', top: y, left: x, transform: 'translate(-50%, -50%)' }}
        onMouseDown={(e) => handleMouseDown && handleMouseDown(e, id)}
        onClick={() => setSelectedElementId(id)}
      >
        {children}
      </div>
    </Draggable>
  )
};

export default DraggableItem;
