import { getLinesFromTextUtil } from '@alexandregallais/utils';
import type { BlockType } from '../structures';

export const createBlocksFromTextUtil = (text: string): BlockType[] => {
  const blocks: BlockType[] = [];
  let block: BlockType = [];
  let isBlockCode = false;

  getLinesFromTextUtil(text).forEach((line) => {
    const trimmedLine = line.trim();

    if (!isBlockCode && trimmedLine === '') {
      blocks.push(block);
      block = [];
      return;
    }

    block.push(line);

    if (/^```\w+/u.exec(trimmedLine)) {
      isBlockCode = true;
    } else if (isBlockCode && /^```/u.exec(trimmedLine)) {
      isBlockCode = false;
    }
  });

  return blocks;
};
