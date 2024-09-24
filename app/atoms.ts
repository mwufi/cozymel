import { atom } from "jotai";
import { Element } from './types';

export const elementsAtom = atom<Record<string, Element>>({});