import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss'],
  standalone: true,
  imports: [MatInputModule, TranslateModule],
})
export class InputErrorComponent {
  @Input() control!: AbstractControl | FormControl;
  @Input() label: string = '';
  @Input() error: string = '';
  @Input() min?: number;
  @Input() max?: number;
  @Input() minLength?: number;
  @Input() maxLength?: number;
  @Input() startsWith?: string;

  shouldShowError(): boolean {
    return (
      this.control &&
      this.control.invalid &&
      (this.control.dirty || this.control.touched)
    );
  }
}
