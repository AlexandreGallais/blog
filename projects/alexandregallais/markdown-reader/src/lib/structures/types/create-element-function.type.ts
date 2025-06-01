import type { BlockType } from './block.type';
import type { CreateElementReturnTypeModel } from '../model';

export type CreateElementFunctionType<T extends HTMLElement = HTMLElement> = (
  block: BlockType,
) => CreateElementReturnTypeModel<T>;
