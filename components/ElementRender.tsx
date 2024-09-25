'use client';

import Diamond from '@/components/DiamondDisplay';
import { Element, ImageElement } from '@/app/types';
import TextAreaThatHandlesBackspace from '@/components/TextAreaThatHandlesBackspace';
import Postcard from '@/components/Postcard';
import BarChart from '@/components/charts/BarChart';
import TwitterEmbed from '@/components/embeds/TwitterEmbed';
import YoutubeEmbed from '@/components/embeds/YoutubeEmbed';
import SpotifyEmbed from '@/components/embeds/SpotifyEmbed';
import Polaroid from './Polaroid';

export function renderElement(el: Element, updateElement: (element: Element) => void, deleteElement: () => void) {
  switch (el.type) {
    case 'text':
      return <TextAreaThatHandlesBackspace element={el} updateElement={updateElement} deleteElement={deleteElement} />;
    case 'postcard':
      return <Postcard />;
    case 'video':
      return <video src="https://www.w3schools.com/html/mov_bbb.mp4" controls />;
    case 'diamond':
      return <Diamond />;
    case 'twitter':
      return <TwitterEmbed />;
    case 'youtube':
      return <YoutubeEmbed />;
    case 'spotify':
      return <SpotifyEmbed />;
    case 'image':
      return (
        <div className="relative group">
          <Polaroid width={400} height={400} style={{
            transform: `rotate(${(el as ImageElement).rotation || 0}deg)`,
            transition: 'transform 0.3s ease-in-out'
          }}>
            <div style={{ maxWidth: '400px' }} className="overflow-hidden rounded">
              <img
                src={(el as ImageElement).image || "https://picsum.photos/200"}
                alt="Random"
                style={{
                  userSelect: 'none',
                }}
                draggable={false}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  const newSrc = prompt("Enter new image source:", (el as ImageElement).image || "https://picsum.photos/200");
                  if (newSrc !== null) {
                    updateElement({ ...el, image: newSrc });
                  }
                }}
              />
            </div>
          </Polaroid>
          <button
            className="absolute top-0 right-0 bg-white rounded-full p-1 m-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={() => {
              const newRotation = Math.floor(Math.random() * 41) - 20; // Random number between -20 and 20
              updateElement({ ...el, rotation: newRotation });
            }}
          >
            🔄
          </button>
        </div>
      );
    case 'bar_chart':
      return <BarChart />;
    default:
      return null;
  }
}
