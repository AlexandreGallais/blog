export const isObjectOrArray = (
  object: unknown,
): object is unknown[] | Record<string, unknown> =>
  object !== null && typeof object === 'object';
