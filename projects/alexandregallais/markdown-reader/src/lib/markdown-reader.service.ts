import { Injectable } from '@angular/core';
import { Header } from '@alexandregallais/markdown-reader';
import { getLinesFromText } from '@alexandregallais/utils';

@Injectable({
  providedIn: 'root',
})
export class MarkdownReaderService {
  public t = (value?: string): void => {
    if (value === undefined) {
      return;
    }

    getLinesFromText(value)
      .filter((x) => x.trim())
      .forEach((line) => {
        new Header(line);
      });
  };
}
