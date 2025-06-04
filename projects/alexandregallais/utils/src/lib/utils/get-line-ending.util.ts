import { LineEndingEnum } from '../enums';

export const getLineEndingUtil = (value: string): LineEndingEnum => {
  if (value.includes('\r\n')) {
    return LineEndingEnum.CrLf;
  }

  if (value.includes('\n')) {
    return LineEndingEnum.Lf;
  }

  if (value.includes('\r')) {
    return LineEndingEnum.Cr;
  }

  return LineEndingEnum.Unknown;
};
