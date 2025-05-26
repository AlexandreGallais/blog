import type {
  CircularSectorFromRadialLineModel,
  RadialLineModel,
} from '../structures';
import { MathConstant } from '@alexandregallais/utils';

export const createCircularSectorFromRadialLineUtil = (
  radialLine: RadialLineModel,
  aperture: number,
): CircularSectorFromRadialLineModel => {
  const startAngle =
    (radialLine.angle -
      aperture * MathConstant.Half +
      MathConstant.FullCircleDegrees) %
    MathConstant.FullCircleDegrees;

  return {
    center: radialLine.center,
    radius: radialLine.length,
    originAngle: radialLine.angle,
    startAngle,
    endAngle: startAngle + aperture,
    aperture,
  };
};
