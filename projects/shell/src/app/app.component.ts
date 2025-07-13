import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'div[shell]',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
