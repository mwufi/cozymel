import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { db } from "./instant"
import { tx, id } from "@instantdb/react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function saveElements(elements: any) {
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