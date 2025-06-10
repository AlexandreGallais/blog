import { UTILS } from '@alexandregallais/utils';
import type { BlockType } from '../structures';
import {
  createElementHeaderUtil,
  createElementListUtil,
  createElementParagraphUtil,
} from './index';

export const createElementFromBlockUtil = (block: BlockType): HTMLElement => {
  const createElements = [createElementHeaderUtil, createElementListUtil];
  const blockFirstLine = block[UTILS.ARRAY.FIRST_INDEX];

  // eslint-disable-next-line @typescript-eslint/init-declarations
  let element: HTMLElement | undefined;

  if (blockFirstLine === undefined) {
    throw new Error('The text block is empty.');
  }

  for (const [regex, elementFunction] of createElements) {
    const match = regex.exec(blockFirstLine);

    if (!match) {
      continue;
    }

    element = elementFunction(block);

    break;
  }

  return element ?? createElementParagraphUtil[UTILS.NUMBER.ONE](block);
};
