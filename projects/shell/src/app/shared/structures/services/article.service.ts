import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { ArticleModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  public readonly store = signal<ArticleModel[]>([]);
  private readonly http = inject(HttpClient);

  public readonly init = (): void => {
    this.http
      .get('/blog/article/index.txt', { responseType: 'text' })
      .subscribe((text) => {
        // ...
      });
  };
}
