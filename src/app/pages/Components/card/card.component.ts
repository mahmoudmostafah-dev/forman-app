import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedCardComponent } from '../../../shared/components/shared-card/shared-card.component';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  imports: [MatIconModule, SharedCardComponent]
})
export class CardComponent {}
