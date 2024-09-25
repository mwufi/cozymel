'use client';

import Diamond from '@/components/DiamondDisplay';
import { Element, ImageElement } from '@/app/types';
import TextAreaThatHandlesBackspace from '@/components/TextAreaThatHandlesBackspace';
import Postcard from '@/components/Postcard';
import BarChart from '@/components/charts/BarChart';
import TwitterEmbed from '@/components/embeds/TwitterEmbed';
import YoutubeEmbed from '@/components/embeds/YoutubeEmbed';
import SpotifyEmbed from '@/components/embeds/SpotifyEmbed';

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
        <div style={{ maxWidth: '400px' }} className="border-4 overflow-hidden rounded-xl border-white shadow-xl">
          <img
            src={(el as ImageElement).image || "https://picsum.photos/200"}
            alt="Random"
            style={{ userSelect: 'none' }}
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
      );
    case 'bar_chart':
      return <BarChart />;
    default:
      return null;
  }
}
