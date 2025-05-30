import type { Affine2dMatrixModel } from '../structures';
import { MathConstant } from '@alexandregallais/utils';

/* eslint-disable @typescript-eslint/naming-convention */
const Constant = {
  DefaultCenter: 0,
} as const;
/* eslint-enable @typescript-eslint/naming-convention */

export const createAffine2dMatrixFromRotateUtil = (
  angle: number,
  cx: number = Constant.DefaultCenter,
  cy: number = Constant.DefaultCenter,
): Affine2dMatrixModel => {
  const rad = (angle * Math.PI) / MathConstant.HalfCircleDegrees;
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
