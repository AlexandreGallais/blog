import { HeaderLevelEnum } from '@alexandregallais/utils';

export const getElementHeaderLevel = (element: Element): HeaderLevelEnum => {
  switch (element.tagName) {
    case 'H1':
      return HeaderLevelEnum.H1;
    case 'H2':
      return HeaderLevelEnum.H2;
    case 'H3':
      return HeaderLevelEnum.H3;
    case 'H4':
      return HeaderLevelEnum.H4;
    case 'H5':
      return HeaderLevelEnum.H5;
    case 'H6':
      return HeaderLevelEnum.H6;
    default:
      return HeaderLevelEnum.Unknown;
  }
};
