import { UTILS } from '@alexandregallais/utils';
import type { BlockType, CreateElementFunctionType } from '../structures';
import {
  createElementHeaderFromBlockUtils,
  createElementListFromBlockUtils,
  createElementParagraphFromBlockUtils,
} from './index';

export const createElementFromBlockUtils = (block: BlockType): HTMLElement => {
  const marker = block[UTILS.ARRAY.FIRST_INDEX]?.trim().split(' ')[
    UTILS.ARRAY.FIRST_INDEX
  ];

  if (marker === undefined) {
    throw new Error('');
  }

  /* eslint-disable @typescript-eslint/naming-convention */
  const markerFunctionMap: Record<string, CreateElementFunctionType> = {
    '#': createElementHeaderFromBlockUtils,
    '##': createElementHeaderFromBlockUtils,
    '###': createElementHeaderFromBlockUtils,
    '####': createElementHeaderFromBlockUtils,
    '#####': createElementHeaderFromBlockUtils,
    '######': createElementHeaderFromBlockUtils,
    '-': createElementListFromBlockUtils,
  };
  /* eslint-enable @typescript-eslint/naming-convention */

  const markerFunction =
    markerFunctionMap[marker] ?? createElementParagraphFromBlockUtils;

  return markerFunction(block);
};
