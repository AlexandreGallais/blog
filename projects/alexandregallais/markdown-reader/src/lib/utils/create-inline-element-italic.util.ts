import { createInlineElementUtil } from './index';
import type { CreateInlineElementType } from '../structures';

export const createInlineElementItalicUtil: CreateInlineElementType = [
  /\*(?<content>[^*]+)\*/u,
  (match: RegExpExecArray): HTMLElement => {
    const element = document.createElement('em');
    const content = match.groups?.['content'];
    const node =
      content === undefined
        ? [document.createTextNode('')]
        : createInlineElementUtil(content);

    element.append(...node);

    return element;
  },
];
