'use client';

import Draggable from 'react-draggable';
import { useRef } from 'react';

interface DraggableItemProps {
  children: React.ReactNode;
  x: number;
  y: number;
  id: string;
  handleMouseDown?: (e: React.MouseEvent<HTMLDivElement>, id: string) => void;
  setSelectedElementId: (id: string) => void;
  onUpdate?: (id: string, x: number, y: number) => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ children, x, y, id, handleMouseDown, setSelectedElementId, onUpdate }) => {
  const draggableRef = useRef(null);

  const handleDrag = (e: any, data: any) => {
    if (onUpdate) {
      // console.log("[DraggableItem] ...", id, x + data.deltaX, y + data.deltaY)
      onUpdate(id, x + data.deltaX, y + data.deltaY);
    }
  };

  return (
    <Draggable key={id} nodeRef={draggableRef} position={{ x, y }} onDrag={handleDrag}>
      <div
        ref={draggableRef}
        style={{ position: 'absolute', transform: 'translate(-50%, -50%)' }}
        onMouseDown={(e) => handleMouseDown && handleMouseDown(e, id)}
        onClick={() => setSelectedElementId(id)}
      >
        {children}
      </div>
    </Draggable>
  )
};

export default DraggableItem;
