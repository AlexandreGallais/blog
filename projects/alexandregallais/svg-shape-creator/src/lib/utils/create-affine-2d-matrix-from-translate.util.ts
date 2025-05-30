import type { Affine2dMatrixModel } from '../structures';

/* eslint-disable @typescript-eslint/naming-convention */
const Constant = {
  DefaultY: 0,
} as const;
/* eslint-enable @typescript-eslint/naming-convention */

export const createAffine2dMatrixFromTranslateUtil = (
  x: number,
  y: number = Constant.DefaultY,
): Affine2dMatrixModel => ({
  a: 1,
  b: 0,
  c: 0,
  d: 1,
  e: x,
  f: y,
});
