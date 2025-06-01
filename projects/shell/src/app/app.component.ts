import type { ElementRef } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  viewChild,
} from '@angular/core';
import { httpResource } from '@angular/common/http';
import { createBlocksFromTextUtil } from '@alexandregallais/markdown-reader';
import { getRect } from '@alexandregallais/svg-shape-creator/src/lib/rectangle';
import { createElementFromBlockUtils } from '@alexandregallais/markdown-reader/src/lib/utils/create-element-from-block.utils';

@Component({
  selector: 'div[shell]',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public dPath = getRect();
  protected markdown = httpResource.text('markdown.md');
  private readonly element =
    viewChild.required<ElementRef<HTMLDivElement>>('element');
  protected markdownEffect = effect(() => {
    const value = this.markdown.value();

    if (value === undefined) {
      return;
    }

    const t = createBlocksFromTextUtil(value);
    t.forEach((a) => {
      this.element().nativeElement.append(createElementFromBlockUtils(a));
    });

    console.log(t);
  });
}
