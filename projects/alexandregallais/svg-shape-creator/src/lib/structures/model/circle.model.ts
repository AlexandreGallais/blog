import type { Point2dModel } from './index';
import type { Radius } from '../types';

/**
 * A circle defined by its center and radius.
 */
export interface CircleModel {
  /** Center of the circle */
  center: Point2dModel;
  /** Radius of the circle */
  radius: Radius;
}
