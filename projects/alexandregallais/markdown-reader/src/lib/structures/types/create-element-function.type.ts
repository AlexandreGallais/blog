import type { BlockType } from './block.type';

export type CreateElementFunctionType<T extends HTMLElement = HTMLElement> = (
  block: BlockType,
) => T;
