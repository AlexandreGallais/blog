import { UTILS } from '@alexandregallais/utils';
import {
  createInlineBoldElementUtil,
  createInlineImageElementUtil,
  createInlineItalicElementUtil,
  createInlineLinkElementUtil,
  createInlineStrikethroughElementUtil,
} from './index';

export const createInlineElementsFromContentUtil = (
  content: string,
): Node[] => {
  const elements: Node[] = [];
  const createInlineElements = [
    createInlineImageElementUtil,
    createInlineLinkElementUtil,
    createInlineBoldElementUtil,
    createInlineItalicElementUtil,
    createInlineStrikethroughElementUtil,
  ];

  let remaining = content;
  let hasMatched = false;

  while (remaining.length) {
    for (const [regex, elementFunction] of createInlineElements) {
      const match = regex.exec(remaining);

      if (!(hasMatched = match !== null)) {
        continue;
      }

      const previousContent = remaining.slice(
        UTILS.ARRAY.FIRST_INDEX,
        match.index,
      );

      if (previousContent) {
        elements.push(...createInlineElementsFromContentUtil(previousContent));
      }

      elements.push(elementFunction(match));
      remaining = remaining.slice(
        match.index + match[UTILS.ARRAY.FIRST_INDEX].length,
        remaining.length,
      );

      break;
    }

    if (hasMatched) {
      continue;
    }

    elements.push(document.createTextNode(remaining));
    remaining = '';
  }

  return elements;
};
