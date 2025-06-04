import type { CircularSectorModel } from '@alexandregallais/svg-shape-creator/src/lib/structures';
import { addOneUtil, getLastIndexUtil, UTILS } from '@alexandregallais/utils';

/* eslint-disable @typescript-eslint/naming-convention */
const MIN_TWO_SECTOR = 2;
/* eslint-enable @typescript-eslint/naming-convention */

export const resolveCircularSectorOverlapsUtil = (
  sectors: CircularSectorModel[],
): CircularSectorModel[] => {
  if (sectors.length < MIN_TWO_SECTOR) {
    return sectors;
  }

  const sorted = structuredClone(sectors).sort(
    (a, b) => a.startAngle - b.startAngle,
  );

  sorted.forEach((a, i, arr) => {
    const b =
      arr[
        i === getLastIndexUtil(arr) ? UTILS.ARRAY.FIRST_INDEX : addOneUtil(i)
      ];

    if (b === undefined) {
      return;
    }

    if (b.startAngle < a.startAngle) {
      b.startAngle += 360;
      b.endAngle += 360;
    }

    if (a.endAngle <= b.startAngle) {
      return;
    }

    a.endAngle -= (a.endAngle - b.startAngle) * UTILS.MATH.HALF;
    b.startAngle = a.endAngle;
  });

  sorted.forEach((sector) => {
    sector.startAngle %= 360;
    sector.endAngle %= 360;

    if (sector.endAngle < sector.startAngle) {
      sector.endAngle += 360;
    }
  });

  return sorted;
};
