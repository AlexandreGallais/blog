import { UTILS } from '@alexandregallais/utils';

export const getListLevelUtil = (line: string): undefined | number => {
  const match = /^\s*[-*+]\s+/u.exec(line);

  if (!match) {
    return undefined;
  }

  return (
    match[UTILS.ARRAY.FIRST_INDEX].length * UTILS.MATH.HALF - UTILS.NUMBER.ONE
  );
};
