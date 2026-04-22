import { Component, signal, ChangeDetectionStrategy, OnInit, OnDestroy, PLATFORM_ID, inject, ElementRef, viewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PortfolioItem } from '../../models/portfolio-item';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="portfolio"
      class="py-24 md:py-32 px-6"
      style="background: var(--color-surface);"
    >
      <div class="max-w-7xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16 reveal" #sectionHeader>
          <span class="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                style="background: rgba(245,197,24,0.15); color: var(--color-banana-dark);">
            Nossos Trabalhos
          </span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black mb-4"
              style="font-family: var(--font-display);">
            Portfólio
          </h2>
          <p class="text-lg max-w-2xl mx-auto"
             style="color: var(--color-text-muted);">
            Cada peça é impressa com resina de resolução 9K, garantindo detalhes que surpreendem. Confira alguns dos nossos trabalhos.
          </p>
        </div>

        <!-- Portfolio Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (item of portfolioItems(); track item.id) {
            <article
              class="group rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-2 reveal"
              style="background: white; box-shadow: var(--shadow-card);"
              [style.transition-delay.ms]="$index * 100"
            >
              <div class="relative overflow-hidden" style="aspect-ratio: 4/3;">
                <img
                  [src]="item.imageUrl"
                  [alt]="item.title + ' - Impressão 3D Banana3D'"
                  class="w-full h-full object-cover transition-transform group-hover:scale-110"
                  style="transition-duration: 500ms;"
                  loading="lazy"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                  <span class="text-white font-display font-bold text-sm uppercase tracking-wider">{{ item.category }}</span>
                </div>
              </div>
              <div class="p-6">
                <h3 class="font-display font-bold text-lg mb-2 text-text-primary" style="color: var(--color-deep-black);">{{ item.title }}</h3>
                <p class="text-sm leading-relaxed" style="color: var(--color-deep-black-light);">{{ item.description }}</p>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .font-display { font-family: var(--font-display); }
  `]
})
export class PortfolioComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  /**
   * Portfolio items — adicione novos itens aqui.
   * Basta adicionar um novo objeto ao array para que ele apareça automaticamente no grid.
   */
  portfolioItems = signal<PortfolioItem[]>([
    {
      id: '1',
      title: 'Miniatura Dragão Medieval',
      description: 'Miniatura de RPG com detalhes ultra-finos impressa em resina 9K. Escamas, garras e asas com textura realista.',
      imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&q=80',
      category: 'Miniaturas'
    },
    {
      id: '2',
      title: 'Protótipo Arquitetônico',
      description: 'Maquete de residência moderna com detalhamento de janelas, portas e paisagismo em escala.',
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
      category: 'Arquitetura'
    },
    {
      id: '3',
      title: 'Joias Personalizadas',
      description: 'Anéis e pingentes com design exclusivo, prontos para fundição em metal precioso.',
      imageUrl: 'https://images.unsplash.com/photo-1515562141589-67f0d93e45fa?w=600&q=80',
      category: 'Joalheria'
    },
    {
      id: '4',
      title: 'Peças Mecânicas',
      description: 'Engrenagens e componentes mecânicos de precisão para prototipagem funcional.',
      imageUrl: 'https://images.unsplash.com/photo-1570275239925-4af0aa93a758?w=600&q=80',
      category: 'Engenharia'
    },
    {
      id: '5',
      title: 'Personagens Colecionáveis',
      description: 'Figuras de ação e personagens com acabamento premium e pintura artística.',
      imageUrl: 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=600&q=80',
      category: 'Colecionáveis'
    },
    {
      id: '6',
      title: 'Aplicações Odontológicas',
      description: 'Modelos dentários e guias cirúrgicos com precisão micrométrica para uso profissional.',
      imageUrl: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600&q=80',
      category: 'Odontologia'
    },
  ]);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupRevealObserver();
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private setupRevealObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    setTimeout(() => {
      const elements = document.querySelectorAll('#portfolio .reveal');
      elements.forEach(el => this.observer?.observe(el));
    }, 100);
  }
}
