import type { Point2dModel } from '@alexandregallais/svg-shape-creator/src/lib/structures';

export interface RadialLineModel {
  center: Point2dModel;
  angle: number;
  length: number;
}
