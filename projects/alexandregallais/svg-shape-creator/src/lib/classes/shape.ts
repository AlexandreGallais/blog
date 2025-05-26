import type { ClassObjectObservable } from '@alexandregallais/utils';
import { obsClassArr, obsComp } from '@alexandregallais/utils';
import type { Point2dModel, ShapeModel } from '../structures';
import type { Point2d } from './point-2d';

export class Shape implements ClassObjectObservable<ShapeModel> {
  public path;

  public toObject;
  public toString;

  public constructor(points: Point2d[]) {
    this.path = obsClassArr(points);

    this.toObject = obsComp(
      { path: this.path },
      ({ path }): ShapeModel => ({
        path: path.map((point): Point2dModel => point.toObject()),
      }),
    );

    this.toString = obsComp({ path: this.path }, ({ path }) =>
      path.map((x) => x.toString()).join(' '),
    );
  }
}
