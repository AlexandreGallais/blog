export type IntRangeUntilType<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? Acc[number]
  : IntRangeUntilType<N, [...Acc, Acc['length']]>;
