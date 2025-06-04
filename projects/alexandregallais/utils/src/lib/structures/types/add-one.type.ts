export type AddOneType<
  N extends number,
  Acc extends unknown[] = [],
> = Acc['length'] extends N
  ? [...Acc, unknown]['length']
  : AddOneType<N, [...Acc, unknown]>;
