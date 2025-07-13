import type { Scale, Shear, Translation } from '../types';

/**
 * 2D affine transformation matrix.
 *
 * Represented as:
 *
 * ```
 * | a  c  e |
 * | b  d  f |
 * | 0  0  1 |
 * ```
 */
export interface Matrix2dAffineModel {
  /** Horizontal scaling (scale X) */
  a: Scale;
  /** Vertical skewing (shear Y) */
  b: Shear;
  /** Horizontal skewing (shear X) */
  c: Shear;
  /** Vertical scaling (scale Y) */
  d: Scale;
  /** Horizontal translation (translate X) */
  e: Translation;
  /** Vertical translation (translate Y) */
  f: Translation;
}
