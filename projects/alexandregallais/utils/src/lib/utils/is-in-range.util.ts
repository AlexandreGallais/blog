import type { IntRangeFromToType } from '../structures';

export const isInRangeUtil = <A extends number, B extends number>(
  value: number,
  a: A,
  b: B,
): value is IntRangeFromToType<A, B> => value >= a && value <= b;
