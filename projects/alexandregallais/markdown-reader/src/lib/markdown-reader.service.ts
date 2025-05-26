import { Injectable } from '@angular/core';
import { getLinesFromText } from '@alexandregallais/utils';

@Injectable({
  providedIn: 'root',
})
export class MarkdownReaderService {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  public toto = (value?: string): void => {
    if (value === undefined) {
      return;
    }

    const page = document.createElement('article');

    getLinesFromText(value).forEach((line) => {
      if (line.trim() === '') {
        return;
      }

      if (line.startsWith('#')) {
        const groups = /^(?<level>#{1,6})\s(?<content>\S+)/u.exec(line)?.groups;

        if (groups === undefined) {
          return;
        }

        const { level, content } = groups;

        if (level === undefined || content === undefined) {
          return;
        }

        const el = document.createElement(`h${level.length}`);
        el.textContent = content;
        page.append(el);

        return;
      }

      const el = document.createElement('p');
      el.textContent = line;
      page.append(el);
    });
  };
}
