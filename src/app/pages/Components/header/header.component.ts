import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedButtonComponent } from '../../../shared/components/shared-button/shared-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [SharedButtonComponent, TranslateModule]
})
export class HeaderComponent {
  click($event: void) {}
}
