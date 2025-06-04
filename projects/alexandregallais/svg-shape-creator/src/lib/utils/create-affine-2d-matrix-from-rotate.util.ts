import type { Affine2dMatrixModel } from '../structures';
import { UTILS } from '@alexandregallais/utils';

/* eslint-disable @typescript-eslint/naming-convention */
const DEFAULT_CENTER = 0;
/* eslint-enable @typescript-eslint/naming-convention */

export const createAffine2dMatrixFromRotateUtil = (
  angle: number,
  cx: number = DEFAULT_CENTER,
  cy: number = DEFAULT_CENTER,
): Affine2dMatrixModel => {
  const rad = (angle * Math.PI) / UTILS.MATH.HALF_CIRCLE_DEGREES;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const a = cos;
  const b = sin;
  const c = -sin;
  const d = cos;
  const e = cx - cx * cos + cy * sin;
  const f = cy - cx * sin - cy * cos;

  return { a, b, c, d, e, f };
};
