import { isHeaderLevelUtil } from '@alexandregallais/utils';
import type { CreateElementFunctionType } from '../structures';

export const createElementHeaderFromBlockUtils: CreateElementFunctionType<
  HTMLHeadingElement
> = (block) => {
  const [firstLine] = block;

  if (firstLine === undefined) {
    throw new Error('');
  }

  const [marker, ...contentArr] = firstLine.trim().split(' ');

  if (marker === undefined) {
    throw new Error('');
  }

  const level = marker.length;

  if (!isHeaderLevelUtil(level)) {
    throw new Error('');
  }

  const element = document.createElement(`h${level}`);
  element.textContent = contentArr.join(' ');

  return element;
};
