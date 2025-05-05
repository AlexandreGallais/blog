import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { httpResource } from '@angular/common/http';
import { MarkdownReaderService } from '@alexandregallais/markdown-reader';

@Component({
  selector: 'div[shell]',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public markdownReaderService = inject(MarkdownReaderService);
  protected markdown = httpResource.text('markdown.md');

  protected markdownEffect = effect(() => {
    this.markdownReaderService.t(this.markdown.value());
  });
}
