import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'shared-card',
  standalone: true,
  templateUrl: './shared-card.component.html',
  styleUrl: './shared-card.component.scss',
  imports: [MatIconModule]
})
export class SharedCardComponent {}
