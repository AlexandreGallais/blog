import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { httpResource } from '@angular/common/http';
import { MarkdownReaderService } from '@alexandregallais/markdown-reader';
import { getRect } from '@alexandregallais/svg-shape-creator/src/lib/rectangle';

@Component({
  selector: 'div[shell]',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public markdownReaderService = inject(MarkdownReaderService);
  public dPath = getRect();
  protected markdown = httpResource.text('markdown.md');
  protected markdownEffect = effect(() => {
    this.markdownReaderService.toto(this.markdown.value());
  });
}
