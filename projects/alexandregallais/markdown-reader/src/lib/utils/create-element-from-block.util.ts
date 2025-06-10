import { UTILS } from '@alexandregallais/utils';
import type { BlockType, CreateElementFunctionType } from '../structures';
import {
  createElementHeaderFromBlockUtil,
  createElementListFromBlockUtil,
  createElementParagraphFromBlockUtil,
} from './index';

export const createElementFromBlockUtil = (block: BlockType): HTMLElement => {
  const marker = block[UTILS.ARRAY.FIRST_INDEX]?.trim().split(' ')[
    UTILS.ARRAY.FIRST_INDEX
  ];

  if (marker === undefined) {
    throw new Error('');
  }

  /* eslint-disable @typescript-eslint/naming-convention */
  const markerFunctionMap: Record<string, CreateElementFunctionType> = {
    '#': createElementHeaderFromBlockUtil,
    '##': createElementHeaderFromBlockUtil,
    '###': createElementHeaderFromBlockUtil,
    '####': createElementHeaderFromBlockUtil,
    '#####': createElementHeaderFromBlockUtil,
    '######': createElementHeaderFromBlockUtil,
    '-': createElementListFromBlockUtil,
  };
  /* eslint-enable @typescript-eslint/naming-convention */

  const markerFunction =
    markerFunctionMap[marker] ?? createElementParagraphFromBlockUtil;

  return markerFunction(block);
};
