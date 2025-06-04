import { getLastIndexUtil, UTILS } from '@alexandregallais/utils';
import type { CreateElementFunctionType } from '../structures';
import {
  parseInlineMarkdown,
  renderInlineMarkdownToNodes,
} from '@alexandregallais/markdown-reader/src/lib/utils/inline';

export const createElementParagraphFromBlockUtils: CreateElementFunctionType<
  HTMLParagraphElement
> = (block) => {
  const element = document.createElement('p');
  let br = false;

  block.forEach((line, i) => {
    renderInlineMarkdownToNodes(parseInlineMarkdown(line)).forEach(
      (el, ii, arr) => {
        element.append(el);

        if (getLastIndexUtil(arr) !== ii) {
          return;
        }

        if (
          getLastIndexUtil(block) !== i &&
          el.textContent?.endsWith('\\') === true
        ) {
          el.textContent = line.slice(
            UTILS.ARRAY.FIRST_INDEX,
            UTILS.NUMBER.MINUS_ONE,
          );

          element.append(document.createElement('br'));
          br = true;
        } else if (!br && i) {
          el.textContent = ` ${el.textContent}`;
          br = false;
        }
      },
    );
  });

  return element;
};
