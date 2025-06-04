import { LineEndingEnum } from '../enums';
import { getLineEndingUtil } from './index';

export const getLinesFromTextUtil = (value: string): string[] => {
  const lineEnding = getLineEndingUtil(value);

  if (lineEnding === LineEndingEnum.Unknown) {
    return [value];
  }

  const splitter =
    lineEnding === LineEndingEnum.Lf
      ? '\n'
      : lineEnding === LineEndingEnum.CrLf
        ? '\r\n'
        : '\r';

  return value.split(splitter);
};
