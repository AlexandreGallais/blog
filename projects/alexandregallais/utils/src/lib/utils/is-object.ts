import { isObjectOrArray } from './is-object-or-array';

export const isObject = (object: unknown): object is Record<string, unknown> =>
  isObjectOrArray(object) && !Array.isArray(object);
