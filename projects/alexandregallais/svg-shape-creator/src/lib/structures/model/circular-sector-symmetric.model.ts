import type { Point2dModel } from './index';
import type { Angle, Aperture, Radius } from '../types';

/**
 * A circular sector (filled area between two radii and an arc, centered around a given direction).
 */
export interface CircularSectorSymmetricModel {
  /** Center of the sector */
  center: Point2dModel;
  /** Radius of the sector */
  radius: Radius;
  /** Central direction of the sector (in radians, from the X+ axis) */
  direction: Angle;
  /** Total aperture of the sector (in radians, always ≥ 0) */
  aperture: Aperture;
}
