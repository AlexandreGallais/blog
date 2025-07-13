import type { ArcSegmentModel } from './index';

/**
 * Renderable arc path for SVG, based on a stroke style.
 */
export interface SvgArcPathModel {
  /** Arc geometry */
  arc: ArcSegmentModel;
  /** Stroke width in SVG units */
  strokeWidth: number;
  /** Stroke color */
  strokeColor: Color | string;
  /** Optional stroke linecap (default: 'butt') */
  strokeLinecap?: 'butt' | 'round' | 'square';
  /** Optional stroke linejoin */
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
  /** Optional opacity (0–1) */
  opacity?: number;
}
