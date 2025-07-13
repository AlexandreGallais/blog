import type { Point2dModel } from './index';
import type { Angle, Length } from '../types';

/**
 * A radial line starting from an origin point,
 * extending outward in a given direction with a fixed length.
 *
 * The line starts at `origin` and points at `angle` (in radians from the X+ axis).
 */
export interface RadialLineModel {
  /** Origin point of the radial line */
  origin: Point2dModel;
  /** Direction angle (in radians, from the X+ axis) */
  angle: Angle;
  /** Length of the line segment (≥ 0) */
  length: Length;
}
