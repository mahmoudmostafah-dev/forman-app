import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'shared-button',
  templateUrl: './shared-button.component.html',
  styleUrl: './shared-button.component.scss',
  standalone: true,
  imports: [MatButtonModule, MatProgressSpinnerModule, MatIconModule],
})
export class SharedButtonComponent {
  @Input() label: string = '';
  @Input() title: string = '';
  @Input() color: string = 'primary';
  @Input() className: string = 'btn btn-primary';
  @Input() isDisabled: boolean = false;
  @Input() showSpinner: boolean = false;
  @Input() dataTestId: string = '';
  @Input() isLink: boolean = false;

  @Input() icon?: string;
  @Input() iconClass: string = '';

  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  handleClick(): void {
    if (!this.isDisabled) {
      this.buttonClick.emit();
    }
  }
}
