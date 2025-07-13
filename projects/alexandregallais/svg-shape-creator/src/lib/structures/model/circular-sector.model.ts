import type { Point2dModel } from './index';
import type { Angle, Radius, SweepAngle } from '../types';

/**
 * A circular sector (filled area between two radii and an arc).
 */
export interface CircularSectorModel {
  /** Center of the sector's circle */
  center: Point2dModel;
  /** Radius of the sector */
  radius: Radius;
  /** Starting angle (in radians, from the X+ axis) */
  startAngle: Angle;
  /** Angular span of the sector (in radians, always ≥ 0) */
  sweepAngle: SweepAngle;
  /** Direction of the arc: true = clockwise (default: false) */
  clockwise?: boolean;
}
