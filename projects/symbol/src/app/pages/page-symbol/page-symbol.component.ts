import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { InputButtonIconComponent, InputNumberComponent } from '../../shared';

@Component({
  selector: 'div[page-symbol]',
  imports: [InputNumberComponent, InputButtonIconComponent],
  templateUrl: './page-symbol.component.html',
  styleUrl: './page-symbol.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSymbolComponent {
  public readonly t = signal<number>(40);
}
