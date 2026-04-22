import { Component, signal, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav
      class="fixed top-4 left-4 right-4 z-50 glass rounded-2xl px-6 py-3 transition-all"
      [style.box-shadow]="scrolled() ? 'var(--shadow-navbar)' : 'none'"
      role="navigation"
      aria-label="Navegação principal"
    >
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <!-- Logo -->
        <a
          href="#home"
          class="flex items-center gap-2 cursor-pointer group"
          aria-label="Banana3D - Página inicial"
          (click)="scrollTo($event, 'home')"
        >
          <span class="text-2xl font-extrabold font-display tracking-tight">
            <span class="text-banana">Banana</span><span class="">3D</span>
          </span>
        </a>

        <!-- Desktop Nav -->
        <ul class="hidden md:flex items-center gap-1 list-none m-0 p-0">
          @for (item of navItems; track item.id) {
            @if (item.external) {
              <li class="ml-3">
                <a
                  [href]="item.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="px-4 py-2 rounded-lg font-display font-semibold text-sm cursor-pointer transition-colors inline-block bg-banana text-deep-black hover:bg-banana-dark"
                >
                  {{ item.label }}
                </a>
              </li>
            } @else {
              <li>
                <a
                  [href]="'#' + item.id"
                  (click)="scrollTo($event, item.id)"
                  class="px-4 py-2 rounded-lg font-display font-semibold text-sm cursor-pointer transition-colors inline-block"
                  [ngClass]="{
                    'text-banana bg-banana/10': activeSection() === item.id,
                    'text-text-primary hover:text-banana': activeSection() !== item.id
                  }"
                >
                  {{ item.label }}
                </a>
              </li>
            }
          }
        </ul>

        <!-- Mobile Hamburger -->
        <button
          class="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer bg-transparent border-none"
          (click)="toggleMobile()"
          [attr.aria-expanded]="mobileOpen()"
          aria-label="Menu de navegação"
          aria-controls="mobile-menu"
        >
          <span
            class="block w-6 h-0.5 bg-white transition-all origin-center"
            [class.rotate-45]="mobileOpen()"
            [class.translate-y-2]="mobileOpen()"
          ></span>
          <span
            class="block w-6 h-0.5 bg-white transition-all"
            [class.opacity-0]="mobileOpen()"
          ></span>
          <span
            class="block w-6 h-0.5 bg-white transition-all origin-center"
            [class.-rotate-45]="mobileOpen()"
            [class.-translate-y-2]="mobileOpen()"
          ></span>
        </button>
      </div>

      <!-- Mobile Menu -->
      @if (mobileOpen()) {
        <ul
          id="mobile-menu"
          class="md:hidden flex flex-col gap-1 mt-4 pb-2 list-none m-0 p-0"
          role="menu"
        >
          @for (item of navItems; track item.id) {
            <li role="menuitem">
              @if (item.external) {
                <a
                  [href]="item.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block w-full px-4 py-3 rounded-lg font-display font-semibold text-sm cursor-pointer transition-colors text-center bg-banana text-deep-black"
                  (click)="mobileOpen.set(false)"
                >
                  {{ item.label }}
                </a>
              } @else {
                <a
                  [href]="'#' + item.id"
                  (click)="scrollTo($event, item.id); mobileOpen.set(false)"
                  class="block w-full px-4 py-3 rounded-lg font-display font-semibold text-sm cursor-pointer transition-colors text-center"
                  [ngClass]="{
                    'text-banana bg-banana/10': activeSection() === item.id,
                    'text-text-primary': activeSection() !== item.id
                  }"
                >
                  {{ item.label }}
                </a>
              }
            </li>
          }
        </ul>
      }
    </nav>
  `,
  styles: [`
    :host {
      display: block;
    }
    .font-display {
      font-family: var(--font-display);
    }
  `]
})
export class NavbarComponent {
  scrolled = signal(false);
  mobileOpen = signal(false);
  activeSection = signal('home');

  navItems = [
    { id: 'home', label: 'Home', href: '#home', external: false },
    { id: 'portfolio', label: 'Portfólio', href: '#portfolio', external: false },
    { id: 'sobre', label: 'Sobre Nós', href: '#sobre', external: false },
    { id: 'contato', label: 'Contato', href: '#contato', external: false },
    { id: 'loja', label: 'Loja', href: '#', external: true },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 20);
    this.updateActiveSection();
  }

  scrollTo(event: Event, sectionId: string) {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  toggleMobile() {
    this.mobileOpen.update(v => !v);
  }

  private updateActiveSection() {
    const sections = ['home', 'portfolio', 'sobre', 'contato'];
    for (const section of sections.reverse()) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 150) {
          this.activeSection.set(section);
          return;
        }
      }
    }
    this.activeSection.set('home');
  }
}
