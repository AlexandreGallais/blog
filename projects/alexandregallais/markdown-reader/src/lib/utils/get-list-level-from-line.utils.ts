import { UTILS } from '@alexandregallais/utils';

export const getListLevelFromLineUtils = (line: string): undefined | number => {
  const match = /^\s*[-*+]\s+/u.exec(line);

  if (!match) {
    return undefined;
  }

  return (
    match[UTILS.ARRAY.FIRST_INDEX].length * UTILS.MATH.HALF - UTILS.NUMBER.ONE
  );
};
