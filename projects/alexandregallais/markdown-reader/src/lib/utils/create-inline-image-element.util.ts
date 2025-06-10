import type { CreateInlineElementType } from '../structures';

export const createInlineImageElementUtil: CreateInlineElementType<HTMLImageElement> =
  [
    /!\[(?<alt>[^\]]*)\]\((?<src>[^)]+)\)/u,
    (match: RegExpExecArray): HTMLImageElement => {
      const element = document.createElement('img');
      const alt = match.groups?.['alt'];
      const src = match.groups?.['src'];

      if (alt !== undefined) {
        element.alt = alt;
      }

      if (src !== undefined) {
        element.src = src;
      }

      return element;
    },
  ];
