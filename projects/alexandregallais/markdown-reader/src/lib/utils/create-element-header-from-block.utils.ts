import type { CreateElementFunctionType } from '@alexandregallais/markdown-reader/src/lib/structures';

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
type HeaderLevel = 1 | 2 | 3 | 4 | 5 | 6;

const isHeaderLevel = (level: number): level is HeaderLevel =>
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  level >= 1 && level <= 6;

export const createElementHeaderFromBlockUtils: CreateElementFunctionType<
  HTMLHeadingElement
> = (block) => {
  const [firstLine, ...errorBlock] = block;

  if (firstLine === undefined) {
    return {
      errorBlock: block,
    };
  }

  const [marker, ...contentArr] = firstLine.trim().split(' ');

  if (marker === undefined) {
    return {
      errorBlock: block,
    };
  }

  const level = marker.length;

  if (!isHeaderLevel(level)) {
    return {
      errorBlock: block,
    };
  }

  const element = document.createElement(`h${level}`);
  element.textContent = contentArr.join(' ');

  const res: ReturnType<typeof createElementHeaderFromBlockUtils> = {
    element,
  };

  if (errorBlock.length) {
    res.errorBlock = errorBlock;
  }

  return res;
};
