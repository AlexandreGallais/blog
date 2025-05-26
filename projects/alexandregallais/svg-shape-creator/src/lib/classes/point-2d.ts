import type { ClassObjectObservable } from '@alexandregallais/utils';
import { obs, obsComp } from '@alexandregallais/utils';
import type { Point2dModel } from '../structures';

type ToString = `${Point2dModel['x']} ${Point2dModel['y']}`;

export class Point2d implements ClassObjectObservable<Point2dModel> {
  public x;
  public y;

  public toObject;
  public toString;

  public constructor(x: number, y: number) {
    this.x = obs(x);
    this.y = obs(y);
    this.toObject = obsComp(
      { x: this.x, y: this.y },
      (object): Point2dModel => object,
    );
    this.toString = obsComp(
      { xVal: this.x, yVal: this.y },
      ({ xVal, yVal }): ToString => `${xVal} ${yVal}`,
    );
  }
}
