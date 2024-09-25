import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { ChangeDirService } from './shared/service/change-dir.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  providers: [ChangeDirService]
})
export class AppComponent {
  title = 'forman-app';
  changeLangService = inject(ChangeDirService);
  ngOnInit() {
    this.changeLangService.setDefaultLang();
  }
}
