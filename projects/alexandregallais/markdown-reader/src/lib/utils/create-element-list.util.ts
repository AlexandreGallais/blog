import { getNthParentElementUtil, UTILS } from '@alexandregallais/utils';
import type { BlockType, CreateElementType } from '../structures';
import {
  createInlineElementsFromContentUtil,
  getListLevelFromLineUtil,
} from './index';

export const createElementListUtil: CreateElementType<HTMLUListElement> = [
  /^-\s/u,
  // eslint-disable-next-line max-lines-per-function
  (block: BlockType): HTMLUListElement => {
    const element = document.createElement('ul');
    let currentLi = document.createElement('li');
    let currentUl = element;
    let currentLevel = 0;

    for (const line of block) {
      const level = getListLevelFromLineUtil(line);
      const content = line.trim().replace(/^[-*+]\s+/u, '');
      const inlineElements = createInlineElementsFromContentUtil(content);

      if (level === undefined) {
        if (currentLi.lastChild?.textContent?.endsWith('\\') === true) {
          currentLi.lastChild.textContent =
            currentLi.lastChild.textContent.slice(
              UTILS.ARRAY.FIRST_INDEX,
              UTILS.NUMBER.MINUS_ONE,
            );

          currentLi.append(document.createElement('br'), ...inlineElements);

          continue;
        }

        currentLi.append(...createInlineElementsFromContentUtil(` ${content}`));

        continue;
      }

      currentLi = document.createElement('li');
      currentLi.append(...inlineElements);

      if (currentLevel === level) {
        currentUl.append(currentLi);
      } else if (currentLevel < level) {
        const newUl = document.createElement('ul');
        newUl.append(currentLi);
        currentUl.append(newUl);
        currentUl = newUl;
      } else if (currentLevel > level) {
        const parent = getNthParentElementUtil(currentUl, currentLevel - level);

        if (!(parent instanceof HTMLUListElement)) {
          throw new Error('Impossible case: the first parent is a <ul>');
        }

        parent.append(currentLi);
        currentUl = parent;
      }

      currentLevel = level;
    }

    return element;
  },
];
