import { isObjectOrArrayUtil } from './index';

export const isObjectUtil = (
  object: unknown,
): object is Record<string, unknown> =>
  isObjectOrArrayUtil(object) && !Array.isArray(object);
