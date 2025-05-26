import type { CircularSectorModel } from './circular-sector.model';

export interface CircularSectorFromRadialLineModel extends CircularSectorModel {
  originAngle: number;
  aperture: number;
}
