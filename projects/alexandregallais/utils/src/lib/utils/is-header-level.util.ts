import type { IntRangeFromToType } from '../structures';
import { isInRangeUtil } from './index';

export const isHeaderLevelUtil = (
  value: number,
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
): value is IntRangeFromToType<1, 6> => isInRangeUtil(value, 1, 6);
