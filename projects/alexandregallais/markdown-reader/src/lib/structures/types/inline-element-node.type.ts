import type { InlineMarkerEnum } from '@alexandregallais/markdown-reader';

export type InlineElementNodeType =
  | { marker: InlineMarkerEnum.Bold; content: InlineElementNodeType[] }
  | { marker: InlineMarkerEnum.BoldItalic; content: InlineElementNodeType[] }
  | { marker: InlineMarkerEnum.Italic; content: InlineElementNodeType[] }
  | { marker: InlineMarkerEnum.Image; src: string; alt: string }
  | {
      marker: InlineMarkerEnum.Link;
      href: string;
      content: InlineElementNodeType[];
    }
  | { marker: InlineMarkerEnum.Strikethrough; content: InlineElementNodeType[] }
  | { marker: InlineMarkerEnum.Text; content: string };
