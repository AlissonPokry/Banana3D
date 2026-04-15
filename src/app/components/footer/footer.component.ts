import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer
      class="py-16 px-6"
      style="background: var(--color-deep-black); border-top: 1px solid rgba(255,255,255,0.08);"
      role="contentinfo"
    >
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <!-- Brand -->
          <div>
            <span class="text-2xl font-extrabold tracking-tight block mb-4"
                  style="font-family: var(--font-display);">
              <span class="text-banana">Banana</span><span style="color: var(--color-text-light);">3D</span>
            </span>
            <p class="text-sm leading-relaxed max-w-xs"
               style="color: rgba(248,249,250,0.5);">
              Impressão 3D em resina de resolução 8K. Precisão, qualidade e acabamento profissional para seus projetos.
            </p>
          </div>

          <!-- Navigation -->
          <div>
            <h4 class="font-display font-bold text-sm uppercase tracking-wider mb-4"
                style="color: var(--color-banana);">
              Navegação
            </h4>
            <ul class="space-y-3 list-none m-0 p-0">
              @for (link of navLinks; track link.id) {
                <li>
                  <a
                    [href]="'#' + link.id"
                    class="text-sm cursor-pointer transition-colors hover:text-banana"
                    style="color: rgba(248,249,250,0.6);"
                    (click)="scrollTo($event, link.id)"
                  >
                    {{ link.label }}
                  </a>
                </li>
              }
            </ul>
          </div>

          <!-- Social Media -->
          <div>
            <h4 class="font-display font-bold text-sm uppercase tracking-wider mb-4"
                style="color: var(--color-banana);">
              Redes Sociais
            </h4>
            <div class="flex gap-3">
              <!-- Instagram -->
              <a href="#" target="_blank" rel="noopener noreferrer"
                 class="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all hover:scale-110"
                 style="background: rgba(245,197,24,0.1); color: var(--color-banana);"
                 aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <!-- TikTok -->
              <a href="#" target="_blank" rel="noopener noreferrer"
                 class="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all hover:scale-110"
                 style="background: rgba(245,197,24,0.1); color: var(--color-banana);"
                 aria-label="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.78a8.18 8.18 0 004.76 1.52V6.85a4.84 4.84 0 01-1-.16z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="border-t pt-8" style="border-color: rgba(255,255,255,0.08);">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p class="text-xs" style="color: rgba(248,249,250,0.4);">
              &copy; {{ currentYear }} Banana3D. Todos os direitos reservados.
            </p>
            <p class="text-xs" style="color: rgba(248,249,250,0.3);">
              Impressão 3D em Resina 8K
            </p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host { display: block; }
    .font-display { font-family: var(--font-display); }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'portfolio', label: 'Portfólio' },
    { id: 'sobre', label: 'Sobre Nós' },
    { id: 'contato', label: 'Contato' },
  ];

  scrollTo(event: Event, sectionId: string) {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
