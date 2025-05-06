import type { HeaderLevelEnum } from '@alexandregallais/utils/src/lib/enums/header-level.enum';

export interface HeaderModel {
  readonly content: string;
  readonly element: HTMLHeadingElement;
  readonly headerLevel: HeaderLevelEnum;
}
