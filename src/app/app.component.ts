import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    PortfolioComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-navbar />
    <main>
      <app-hero />
      <app-portfolio />
      <app-about />
      <app-contact />
    </main>
    <app-footer />
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {}
