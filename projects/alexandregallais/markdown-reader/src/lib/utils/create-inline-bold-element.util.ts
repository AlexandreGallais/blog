import { createInlineElementsFromContentUtil } from './index';
import type { CreateInlineElementType } from '../structures';

export const createInlineBoldElementUtil: CreateInlineElementType = [
  /\*{2}(?<content>\**[^*]+\**)\*{2}/u,
  (match: RegExpExecArray): HTMLElement => {
    const element = document.createElement('strong');
    const content = match.groups?.['content'];
    const node =
      content === undefined
        ? [document.createTextNode('')]
        : createInlineElementsFromContentUtil(content);

    element.append(...node);

    return element;
  },
];
