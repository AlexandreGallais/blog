import type { Point2dModel } from './index';
import type { Angle, Radius, SweepAngle } from '../types';

/**
 * A circular arc segment, defined by center, radius and angular range.
 */
export interface ArcSegmentModel {
  /** Center of the arc's circle */
  center: Point2dModel;
  /** Radius of the arc */
  radius: Radius;
  /** Starting angle (in radians, from the X+ axis) */
  startAngle: Angle;
  /** Angular span of the arc (in radians, always ≥ 0) */
  sweepAngle: SweepAngle;
  /** Direction of the arc: true = clockwise (default: false) */
  clockwise?: boolean;
}
