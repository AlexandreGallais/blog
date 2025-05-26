import type { CircularSectorModel } from '@alexandregallais/svg-shape-creator/src/lib/structures';
import {
  ArrayConstant,
  getLastIndex,
  getNextIndex,
  MathConstant,
} from '@alexandregallais/utils';

/* eslint-disable @typescript-eslint/naming-convention */
const Constant = {
  MinTwoSector: 2,
} as const;
/* eslint-enable @typescript-eslint/naming-convention */

export const resolveCircularSectorOverlapsUtil = (
  sectors: CircularSectorModel[],
): CircularSectorModel[] => {
  if (sectors.length < Constant.MinTwoSector) {
    return sectors;
  }

  const sorted = [...sectors].sort((a, b) => a.startAngle - b.startAngle);

  sorted.forEach((a, i, arr) => {
    const b =
      arr[i === getLastIndex(arr) ? ArrayConstant.FirstIndex : getNextIndex(i)];

    if (b === undefined) {
      return;
    }

    if (a.endAngle <= b.startAngle) {
      return;
    }

    a.endAngle -= (a.endAngle - b.startAngle) * MathConstant.Half;
    b.startAngle = a.endAngle;
  });

  return sorted;
};
