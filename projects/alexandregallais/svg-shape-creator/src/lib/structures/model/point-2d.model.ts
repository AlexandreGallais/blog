import type { Coordinate } from '../types';

/**
 * A 2D point with Cartesian coordinates.
 */
export interface Point2dModel {
  /** Horizontal coordinate */
  x: Coordinate;
  /** Vertical coordinate */
  y: Coordinate;
}
