import type { Point2dModel } from '@alexandregallais/svg-shape-creator/src/lib/structures';

export interface RadialLineModel {
  origin: Point2dModel;
  angle: number;
  length: number;
}
