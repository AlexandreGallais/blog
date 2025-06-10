import { createInlineElementsFromContentUtil } from './index';
import type { CreateInlineElementType } from '../structures';

export const createInlineLinkElementUtil: CreateInlineElementType<HTMLAnchorElement> =
  [
    /\[(?<content>[^\]]+)\]\((?<href>[^)]+)\)/u,
    (match: RegExpExecArray): HTMLAnchorElement => {
      const element = document.createElement('a');
      const content = match.groups?.['content'];
      const href = match.groups?.['href'];
      const node =
        content === undefined
          ? [document.createTextNode('')]
          : createInlineElementsFromContentUtil(content);

      if (href !== undefined) {
        element.href = href;
      }

      element.append(...node);

      return element;
    },
  ];
