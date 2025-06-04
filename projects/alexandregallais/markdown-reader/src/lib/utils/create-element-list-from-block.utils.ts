import { getNthParentElementUtil, UTILS } from '@alexandregallais/utils';
import type { CreateElementFunctionType } from '../structures';
import { getListLevelFromLineUtils } from './index';

export const createElementListFromBlockUtils: CreateElementFunctionType<
  HTMLUListElement
  // eslint-disable-next-line max-lines-per-function
> = (block) => {
  const element = document.createElement('ul');

  let currentLevel = 0;
  let currentUl = element;
  let currentLi = document.createElement('li');

  block.forEach((line) => {
    const level = getListLevelFromLineUtils(line);
    const content = line.trim().replace(/^[-*+]\s+/u, '');

    if (level === undefined) {
      if (currentLi.textContent?.endsWith('\\') === true) {
        currentLi.textContent = currentLi.textContent.slice(
          UTILS.ARRAY.FIRST_INDEX,
          UTILS.NUMBER.MINUS_ONE,
        );

        currentLi.append(document.createElement('br'));
        currentLi.append(document.createTextNode(content));

        return;
      }

      currentLi.append(document.createTextNode(` ${content}`));

      return;
    }

    currentLi = document.createElement('li');
    currentLi.textContent = content;

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
        return;
      }

      parent.append(currentLi);
      currentUl = parent;
    }

    currentLevel = level;
  });

  return element;
};
