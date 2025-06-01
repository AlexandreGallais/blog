import type { CreateElementFunctionType } from '@alexandregallais/markdown-reader/src/lib/structures';

export const createElementParagraphFromBlockUtils: CreateElementFunctionType<
  HTMLParagraphElement
> = (block) => {
  const element = document.createElement('p');

  block.forEach((line) => {
    const textNode = document.createTextNode(line);

    element.append(textNode);

    if (line.endsWith('\\')) {
      textNode.textContent = line.slice(0, -1);

      const brElement = document.createElement('br');
      element.append(brElement);
    }
  });

  return {
    element,
  };
};
