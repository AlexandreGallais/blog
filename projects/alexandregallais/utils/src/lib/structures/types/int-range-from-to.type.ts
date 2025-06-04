import type { AddOneType, IntRangeUntilType } from './index';

export type IntRangeFromToType<A extends number, B extends number> = Exclude<
  IntRangeUntilType<AddOneType<B>>,
  IntRangeUntilType<A>
>;
