import { Component, ChangeDetectionStrategy, OnInit, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="home"
      class="relative min-h-screen flex items-center overflow-hidden"
      style="background: linear-gradient(135deg, var(--color-deep-black) 0%, var(--color-deep-black-light) 50%, #1a1a3e 100%);"
    >
      <!-- Decorative Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div class="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20"
             style="background: radial-gradient(circle, var(--color-banana) 0%, transparent 70%);"></div>
        <div class="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-10"
             style="background: radial-gradient(circle, var(--color-coral) 0%, transparent 70%);"></div>
        <!-- Grid pattern overlay -->
        <div class="absolute inset-0 opacity-5"
             style="background-image: linear-gradient(rgba(245,197,24,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,197,24,0.3) 1px, transparent 1px); background-size: 60px 60px;"></div>
      </div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 py-32 md:py-20 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Text Content -->
          <div class="reveal" [class.revealed]="revealed()">
            <span class="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                  style="background: rgba(245,197,24,0.15); color: var(--color-banana);">
              Alta qualidade
            </span>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6"
                style="font-family: var(--font-display); color: var(--color-text-light);">
              Impressão 3D com
              <span class="relative inline-block">
                <span class="text-banana">precisão</span>
                <svg class="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none" aria-hidden="true">
                  <path d="M1 5.5C40 2 80 1 100 3C120 5 160 6.5 199 3.5" stroke="#F5C518" stroke-width="3" stroke-linecap="round"/>
                </svg>
              </span>
            </h1>
            <p class="text-lg sm:text-xl mb-10 max-w-lg leading-relaxed"
               style="color: rgba(248,249,250,0.7);">
              Transformamos suas ideias em realidade com impressoras de resina de resolução 8K.
              Miniaturas, protótipos, peças customizadas e mais!
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-wrap gap-4 mb-12">
              <a href="#portfolio" class="btn-primary text-base" (click)="scrollTo($event, 'portfolio')">
                Ver Portfólio
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </a>
              <a href="#contato" class="btn-secondary text-base" (click)="scrollTo($event, 'contato')">
                Fale Conosco
              </a>
            </div>

            <!-- Social Media -->
            <div class="flex items-center gap-4">
              <span class="text-sm font-semibold uppercase tracking-wider"
                    style="color: rgba(248,249,250,0.4);">Siga-nos</span>
              <div class="flex gap-3">
                <!-- Instagram -->
                <a href="#" target="_blank" rel="noopener noreferrer"
                   class="w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer transition-all hover:scale-110"
                   style="background: rgba(245,197,24,0.1); color: var(--color-banana);"
                   aria-label="Instagram da Banana3D"
                   title="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <!-- TikTok -->
                <a href="#" target="_blank" rel="noopener noreferrer"
                   class="w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer transition-all hover:scale-110"
                   style="background: rgba(245,197,24,0.1); color: var(--color-banana);"
                   aria-label="TikTok da Banana3D"
                   title="TikTok">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.78a8.18 8.18 0 004.76 1.52V6.85a4.84 4.84 0 01-1-.16z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Hero Image -->
          <div class="relative reveal" [class.revealed]="revealed()" style="transition-delay: 200ms;">
            <div class="relative rounded-3xl overflow-hidden shadow-2xl"
                 style="aspect-ratio: 4/3;">
              <img
                src="https://images.unsplash.com/photo-1636108783889-b tried?w=800&q=80"
                alt="Impressora 3D de resina criando peça detalhada com resolução 8K"
                class="w-full h-full object-cover"
                loading="eager"
                onerror="this.style.background='linear-gradient(135deg, #1a1a2e, #16213e)'; this.style.minHeight='300px'; this.alt='Imagem da impressora 3D'"
              >
              <!-- Fallback gradient overlay -->
              <div class="absolute inset-0" style="background: linear-gradient(135deg, rgba(26,26,46,0.3), rgba(245,197,24,0.1));"></div>
            </div>
            <!-- Floating badge -->
            <div class="absolute -bottom-4 -left-4 px-5 py-3 rounded-2xl shadow-lg"
                 style="background: var(--color-banana); color: var(--color-deep-black);">
              <span class="font-display font-bold text-sm">Resolução 8K</span>
            </div>
            <!-- Floating stats -->
            <div class="absolute -top-4 -right-4 px-5 py-3 rounded-2xl glass shadow-lg">
              <span class="font-display font-bold text-sm">+500 peças impressas</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50" aria-hidden="true">
        <span class="text-xs uppercase tracking-widest" style="color: rgba(248,249,250,0.5);">Scroll</span>
        <div class="w-6 h-10 rounded-full border-2 flex justify-center pt-2" style="border-color: rgba(248,249,250,0.3);">
          <div class="w-1.5 h-1.5 rounded-full bg-banana animate-bounce"></div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .font-display { font-family: var(--font-display); }
  `]
})
export class HeroComponent implements OnInit {
  revealed = signal(false);
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.revealed.set(true), 100);
    }
  }

  scrollTo(event: Event, sectionId: string) {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
