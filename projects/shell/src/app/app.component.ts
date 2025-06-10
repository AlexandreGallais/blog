import type { AfterViewInit, ElementRef } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  viewChild,
} from '@angular/core';
import { httpResource } from '@angular/common/http';
import { createBlocksFromTextUtil } from '@alexandregallais/markdown-reader';
import { getRect } from '@alexandregallais/svg-shape-creator/src/lib/rectangle';
import { createElementFromBlockUtil } from '@alexandregallais/markdown-reader/src/lib/utils/create-element-from-block.util';

@Component({
  selector: 'div[shell]',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
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
      this.element().nativeElement.append(createElementFromBlockUtil(a));
    });

    console.log(t);
  });
  private readonly svg = viewChild.required<ElementRef<SVGSVGElement>>('svg');

  public ngAfterViewInit(): void {
    const svg = this.svg().nativeElement;
    const rect = svg.querySelector('rect');
    const text = svg.querySelector('text');

    if (!text || !rect) {
      return;
    }

    // Important : forcer le browser à afficher le texte pour que getBBox soit correct
    requestAnimationFrame(() => {
      const textBBox = text.getBBox();
      const rectBBox = rect.getBBox();

      const centerX = rectBBox.x + rectBBox.width / 2;
      const centerY = rectBBox.y + rectBBox.height / 2;

      // Calcul du décalage pour centrer
      const dx = centerX - (textBBox.x + textBBox.width / 2);
      const dy = centerY - (textBBox.y + textBBox.height / 2);

      // Applique la translation ET la rotation en une seule transform
      text.setAttribute(
        'transform',
        `rotate(0, ${centerX}, ${centerY}) translate(${dx}, ${dy})`,
      );
    });
  }
}
