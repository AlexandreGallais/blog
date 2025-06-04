export type MinusOneType<N extends number, Acc extends unknown[] = []> = [
  ...Acc,
  unknown,
]['length'] extends N
  ? Acc['length']
  : MinusOneType<N, [...Acc, unknown]>;
