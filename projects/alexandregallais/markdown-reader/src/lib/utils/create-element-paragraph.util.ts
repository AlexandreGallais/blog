import type { BlockType, CreateElementType } from '../structures';
import { createInlineElementsFromContentUtil } from '@alexandregallais/markdown-reader/src/lib/utils/create-inline-elements-from-content.util';
import { getLastIndexUtil, UTILS } from '@alexandregallais/utils';

export const createElementParagraphUtil: CreateElementType<HTMLParagraphElement> =
  [
    /^./u,
    (block: BlockType): HTMLParagraphElement => {
      const element = document.createElement('p');
      // const br = false;

      block.forEach((line, i) => {
        const inlineElements = createInlineElementsFromContentUtil(line);
        const lastElement = inlineElements.pop();
        let br = false;

        if (lastElement?.textContent?.endsWith('\\') === true) {
          lastElement.textContent = lastElement.textContent.slice(
            UTILS.ARRAY.FIRST_INDEX,
            UTILS.NUMBER.MINUS_ONE,
          );
          br = true;
        } else if (
          typeof lastElement?.textContent === 'string' &&
          getLastIndexUtil(block) !== i
        ) {
          lastElement.textContent += ' ';
        }

        if (lastElement) {
          inlineElements.push(lastElement);
        }

        if (br) {
          inlineElements.push(document.createElement('br'));
        }

        element.append(...inlineElements);
      });

      return element;
    },
  ];
