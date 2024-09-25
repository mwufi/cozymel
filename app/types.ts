interface BaseElement {
  id: string;
  type: string;
  x: number;
  y: number;
}

export interface ImageElement extends BaseElement {
  image: string;
}

export interface TextElement extends BaseElement {
  text: string;
}

export type Element = BaseElement & (TextElement | ImageElement | {
  // Add other element types here as needed
  type: 'postcard' | 'video' | 'diamond' | 'twitter' | 'youtube' | 'spotify' | 'bar_chart';
});
