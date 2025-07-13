import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'button[input-button-icon]',
  imports: [],
  templateUrl: './input-button-icon.component.html',
  styleUrl: './input-button-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputButtonIconComponent {
  public readonly icon = input.required<string>();
}
