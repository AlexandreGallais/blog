import { UTILS } from '../constants';

export const getNthParentElementUtil = (
  element: HTMLElement,
  level: number,
): HTMLElement => {
  let current = element;

  for (let i = 0; i < level; i += UTILS.NUMBER.ONE) {
    const { parentElement } = current;

    if (!parentElement) {
      return current;
    }

    current = parentElement;
  }

  return current;
};
