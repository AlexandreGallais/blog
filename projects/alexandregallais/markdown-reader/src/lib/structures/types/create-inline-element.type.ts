export type CreateInlineElementType<T extends HTMLElement = HTMLElement> = [
  RegExp,
  (match: RegExpExecArray) => T,
];
