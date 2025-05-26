import { LineEndingEnum } from '../enums';
import { getLineEnding } from './get-line-ending';

export const getLinesFromText = (value: string): string[] => {
  const lineEnding = getLineEnding(value);

  if (lineEnding === LineEndingEnum.Unknown) {
    throw new Error('');
  }

  const splitter =
    lineEnding === LineEndingEnum.Lf
      ? '\n'
      : lineEnding === LineEndingEnum.CrLf
        ? '\r\n'
        : '\r';

  return value.split(splitter);
};
