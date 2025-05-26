import type { Point2dModel } from './point-2d.model';

export interface CircularSectorModel {
  center: Point2dModel;
  radius: number;
  startAngle: number;
  endAngle: number;
}
