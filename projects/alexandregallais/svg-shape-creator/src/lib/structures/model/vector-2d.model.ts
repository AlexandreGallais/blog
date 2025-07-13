import type { CoordinateDelta } from '../types';

/**
 * A 2D vector (difference between two points).
 */
export interface Vector2dModel {
  /** Delta X */
  dx: CoordinateDelta;
  /** Delta Y */
  dy: CoordinateDelta;
}
