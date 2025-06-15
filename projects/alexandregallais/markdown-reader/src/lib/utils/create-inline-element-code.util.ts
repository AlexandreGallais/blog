import type { CreateInlineElementType } from '../structures';

export const createInlineElementCodeUtil: CreateInlineElementType = [
  /`(?<content>[^*]+)`/u,
  (match: RegExpExecArray): HTMLElement => {
    const element = document.createElement('code');
    const content = match.groups?.['content'];
    const node = document.createTextNode(content ?? '');

    element.append(node);

    return element;
  },
];
