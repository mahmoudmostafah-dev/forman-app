import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaqsComponent } from "./pages/faqs/faqs.component";
import { FooterComponent } from "./pages/footer/footer.component";
import { GuildBookComponent } from "./pages/guild-book/guild-book.component";
import { HeaderComponent } from './pages/header/header.component';
import { SocialComponent } from './pages/social/social.component';
import { TransformationsComponent } from "./pages/transformations/transformations.component";
import { CardComponent } from './shared/components/card/card.component';
import { ChangeDirService } from './shared/service/change-dir.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, CommonModule, CardComponent, GuildBookComponent, SocialComponent, FaqsComponent, TransformationsComponent, FooterComponent],
  providers: [ChangeDirService]
})
export class AppComponent {
  title = 'forman-app';
  changeLangService = inject(ChangeDirService);
  ngOnInit() {
    this.changeLangService.setDefaultLang();
  }
}
