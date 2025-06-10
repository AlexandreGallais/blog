import { isHeaderLevelUtil } from '@alexandregallais/utils';
import type { BlockType, CreateElementType } from '../structures';

export const createElementHeaderUtil: CreateElementType<HTMLHeadingElement> = [
  /^#{1,6}\s/u,
  (block: BlockType): HTMLHeadingElement => {
    const [firstLine] = block;

    if (firstLine === undefined) {
      throw new Error('First line of block is undefined');
    }

    const [marker, ...contentArr] = firstLine.trim().split(' ');

    if (marker === undefined) {
      throw new Error('Marker is undefined');
    }

    const level = marker.length;

    if (!isHeaderLevelUtil(level)) {
      throw new Error('Header level is invalid');
    }

    const element = document.createElement(`h${level}`);
    element.textContent = contentArr.join(' ');

    return element;
  },
];
