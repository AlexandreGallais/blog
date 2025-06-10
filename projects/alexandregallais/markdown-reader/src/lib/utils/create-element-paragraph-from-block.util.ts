import { getLastIndexUtil, UTILS } from '@alexandregallais/utils';
import type { CreateElementFunctionType } from '../structures';
import { createInlineElementsFromContentUtil } from '@alexandregallais/markdown-reader/src/lib/utils/create-inline-elements-from-content.util';

export const createElementParagraphFromBlockUtil: CreateElementFunctionType<
  HTMLParagraphElement
> = (block) => {
  const element = document.createElement('p');
  let br = false;

  block.forEach((line, i) => {
    const inlineElements = createInlineElementsFromContentUtil(line);

    element.append(...inlineElements);

    const lastInlineElement = inlineElements.pop();

    if (
      getLastIndexUtil(block) !== i &&
      lastInlineElement?.textContent?.endsWith('\\') === true
    ) {
      lastInlineElement.textContent = line.slice(
        UTILS.ARRAY.FIRST_INDEX,
        UTILS.NUMBER.MINUS_ONE,
      );

      element.append(document.createElement('br'));
      br = true;
    } else if (lastInlineElement && !br && i) {
      lastInlineElement.textContent = ` ${lastInlineElement.textContent}`;
      br = false;
    }
  });

  return element;
};
