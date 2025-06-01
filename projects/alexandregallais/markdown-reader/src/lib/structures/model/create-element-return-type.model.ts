import type { BlockType } from '@alexandregallais/markdown-reader/src/lib/structures';

export interface CreateElementReturnTypeModel<T extends HTMLElement> {
  element?: T;
  errorBlock?: BlockType;
}
