import { getLinesFromText } from '@alexandregallais/utils';
import type { BlockType } from '../structures';

export const createBlocksFromTextUtil = (document: string): BlockType[] => {
  const blocks: BlockType[] = [];
  let block: BlockType = [];
  let isBlockCode = false;

  getLinesFromText(document).forEach((line) => {
    const trimmedLine = line.trim();

    if (!isBlockCode && trimmedLine === '') {
      blocks.push(block);
      block = [];
      return;
    }

    block.push(line);

    if (isBlockCode && /^```/u.exec(trimmedLine)) {
      isBlockCode = false;
    }

    if (/^```\w+/u.exec(trimmedLine)) {
      isBlockCode = true;
    }
  });

  return blocks;
};
