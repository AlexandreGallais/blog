import type { BlockType } from './block.type';

export type CreateElementType<T extends HTMLElement = HTMLElement> = [
  RegExp,
  (block: BlockType) => T,
];
