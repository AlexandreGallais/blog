import { getLinesFromTextUtil } from '@alexandregallais/utils';
import type { BlockType } from '../structures';

export const createBlocksUtil = (text: string): BlockType[] => {
  const blocks: BlockType[] = [];
  let block: BlockType = [];
  let isBlockCode = false;

  for (const line of getLinesFromTextUtil(text)) {
    const trimmedLine = line.trim();

    if (!isBlockCode && trimmedLine === '') {
      blocks.push(block);
      block = [];
      continue;
    }

    block.push(line);

    if (/^```\w+/u.exec(trimmedLine)) {
      isBlockCode = true;
    } else if (isBlockCode && /^```$/u.exec(trimmedLine)) {
      isBlockCode = false;
    }
  }

  return blocks;
};
