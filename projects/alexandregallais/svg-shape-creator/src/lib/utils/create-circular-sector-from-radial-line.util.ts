import type {
  CircularSectorFromRadialLineModel,
  RadialLineModel,
} from '../structures';
import { UTILS } from '@alexandregallais/utils';

export const createCircularSectorFromRadialLineUtil = (
  radialLine: RadialLineModel,
  aperture: number,
): CircularSectorFromRadialLineModel => {
  const startAngle =
    (radialLine.angle -
      aperture * UTILS.MATH.HALF +
      UTILS.MATH.FULL_CIRCLE_DEGREES) %
    UTILS.MATH.FULL_CIRCLE_DEGREES;

  return {
    center: radialLine.origin,
    radius: radialLine.length,
    originAngle: radialLine.angle,
    startAngle,
    endAngle: startAngle + aperture,
    aperture,
  };
};
