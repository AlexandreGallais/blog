/* eslint-disable @typescript-eslint/naming-convention */

export type Coordinate = number & { readonly Coordinate: unique symbol };
export type CoordinateDelta = number & {
  readonly CoordinateDelta: unique symbol;
};

export type Length = number & { readonly Length: unique symbol };
export type Radius = number & { readonly Radius: unique symbol };
export type Diameter = number & { readonly Diameter: unique symbol };
export type Translation = number & { readonly Translation: unique symbol };

export type Angle = number & { readonly Angle: unique symbol };
export type SweepAngle = number & { readonly SweepAngle: unique symbol };
export type Aperture = number & { readonly Aperture: unique symbol };

export type Scale = number & { readonly Scale: unique symbol };
export type Shear = number & { readonly Shear: unique symbol };
export type Ratio = number & { readonly Ratio: unique symbol };
