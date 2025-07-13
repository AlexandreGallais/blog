import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'label[input-number]',
  imports: [FormsModule],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberComponent {
  public readonly label = input.required<string>();
  public readonly value = model.required<number | null>();
}
