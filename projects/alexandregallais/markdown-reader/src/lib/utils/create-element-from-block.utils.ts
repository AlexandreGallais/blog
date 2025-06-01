import type {
  BlockType,
  CreateElementFunctionType,
} from '@alexandregallais/markdown-reader/src/lib/structures';
import { ArrayConstant } from '@alexandregallais/utils';
import { createElementHeaderFromBlockUtils } from '@alexandregallais/markdown-reader/src/lib/utils/create-element-header-from-block.utils';
import { createElementParagraphFromBlockUtils } from '@alexandregallais/markdown-reader/src/lib/utils/create-element-paragraph-from-block.utils';

export const createElementFromBlockUtils = (block: BlockType): HTMLElement => {
  const marker = block[ArrayConstant.FirstIndex]?.trim().split(' ')[
    ArrayConstant.FirstIndex
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
  };
  /* eslint-enable @typescript-eslint/naming-convention */

  const markerFunction =
    markerFunctionMap[marker] ?? createElementParagraphFromBlockUtils;

  const el = markerFunction(block).element;

  if (el === undefined) {
    throw new Error('');
  }

  return el;
};
