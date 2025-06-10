import type { CreateInlineElementType } from '../structures';
import { createInlineElementUtil } from '@alexandregallais/markdown-reader';

export const createInlineElementStrikethroughUtil: CreateInlineElementType<HTMLModElement> =
  [
    /~{2}(?<content>[^~]+)~{2}/u,
    (match: RegExpExecArray): HTMLModElement => {
      const element = document.createElement('del');
      const content = match.groups?.['content'];
      const node =
        content === undefined
          ? [document.createTextNode('')]
          : createInlineElementUtil(content);

      element.append(...node);

      return element;
    },
  ];
