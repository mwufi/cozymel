'use client';

import Diamond from '@/components/DiamondDisplay';
import { Element } from '@/app/types';
import TextAreaThatHandlesBackspace from '@/components/TextAreaThatHandlesBackspace';
import Postcard from '@/components/Postcard';

export function renderElement(el: Element) {
  switch (el.type) {
    case 'text':
      return <TextAreaThatHandlesBackspace />;
    case 'postcard':
      return <Postcard />;
    case 'video':
      return <video src="https://www.w3schools.com/html/mov_bbb.mp4" controls />;
    case 'diamond':
      return <Diamond />;
    case 'image':
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
    default:
      return null;
  }
}
