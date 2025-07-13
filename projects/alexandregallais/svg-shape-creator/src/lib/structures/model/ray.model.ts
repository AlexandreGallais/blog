import type { Point2dModel } from './index';
import type { Angle } from '../types';

/**
 * A ray — an infinite directional line starting from an origin point.
 *
 * Used as a geometric tool for alignment, intersection, or polar constructions.
 */
export interface RayModel {
  /** Origin point of the ray */
  origin: Point2dModel;
  /** Angle in radians from the X+ axis */
  angle: Angle;
}
