export interface Element {
  id: string;
  type: string;
  x: number;
  y: number;
}

export interface ImageElement extends Element {
  image: string;
}

export interface TextElement extends Element {
  text: string;
}