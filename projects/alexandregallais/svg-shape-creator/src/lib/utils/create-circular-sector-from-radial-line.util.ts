import type {
  CircularSectorFromRadialLineModel,
  RadialLineModel,
} from '../structures';
import { MathConstant } from '@alexandregallais/utils';

export const createCircularSectorFromRadialLineUtil = (
  radialLine: RadialLineModel,
  aperture: number,
): CircularSectorFromRadialLineModel => ({
  center: radialLine.center,
  radius: radialLine.length,
  originAngle: radialLine.angle,
  startAngle: radialLine.angle - aperture * MathConstant.Half,
  endAngle: radialLine.angle + aperture * MathConstant.Half,
  aperture,
});
