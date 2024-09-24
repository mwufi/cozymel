import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { db } from "./instant"
import { tx, id } from "@instantdb/react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function saveElements(elements: Record<string, Element>) {
  const pageId = id()

  db.transact([
    tx.pages[pageId].update({
      name: 'Untitled',
      content: elements,
      isPublic: false
    })
  ]);

  return pageId
}

export function updateMove(pageId: string, elementId: string, x: number, y: number) {
  db.transact([
    tx.pages[pageId].merge({
      content: {
        [elementId]: { x, y }
      }
    })
  ]);
  console.log("[db] updating element...", elementId, x, y)
}

export function updateElement(pageId: string, elementId: string, element: Element) {
  db.transact([
    tx.pages[pageId].merge({
      content: {
        [elementId]: { ...element }
      }
    })
  ]);
}