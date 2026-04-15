import { Component, signal, ChangeDetectionStrategy, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TeamMember } from '../../models/team-member';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="sobre"
      class="py-24 md:py-32 px-6 relative overflow-hidden"
      style="background: var(--color-deep-black);"
    >
      <!-- Decorative -->
      <div class="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none" aria-hidden="true"
           style="background: radial-gradient(circle, var(--color-banana) 0%, transparent 70%); transform: translate(30%, -30%);"></div>

      <div class="max-w-7xl mx-auto relative z-10">
        <!-- Section Header -->
        <div class="text-center mb-20 reveal">
          <span class="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                style="background: rgba(245,197,24,0.15); color: var(--color-banana);">
            Quem Somos
          </span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black mb-6"
              style="font-family: var(--font-display); color: var(--color-text-light);">
            Sobre Nós
          </h2>
          <p class="text-lg max-w-3xl mx-auto leading-relaxed"
             style="color: rgba(248,249,250,0.7);">
            Somos a <strong class="text-banana">Banana3D</strong>, uma equipe apaixonada por tecnologia
            e impressão 3D. Com impressoras de resina de resolução 8K, entregamos peças com
            nível de detalhe que desafia os limites do possível. Desde miniaturas para jogos
            até protótipos industriais, nossa missão é transformar ideias em objetos reais
            com qualidade premium.
          </p>
        </div>

        <!-- Team Header -->
        <div class="text-center mb-12 reveal">
          <h3 class="text-2xl font-bold mb-2"
              style="font-family: var(--font-display); color: var(--color-text-light);">
            Nossa Equipe
          </h3>
          <p style="color: rgba(248,249,250,0.5);">As pessoas por trás da Banana3D</p>
        </div>

        <!-- Team Cards Grid -->
        <div class="flex flex-wrap justify-center gap-6 lg:gap-8">
          @for (member of teamMembers(); track member.id) {
            <!-- Reveal wrapper — delay only affects the reveal animation -->
            <div class="team-card-wrapper reveal" [style.transition-delay.ms]="$index * 100">
              <!-- Gradient border wrapper -->
              <div class="team-card group rounded-2xl p-[2px] cursor-default">
                <!-- Card inner -->
                <div class="rounded-2xl overflow-hidden h-full flex flex-col"
                     style="background: var(--color-surface-card);">

                  <!-- Avatar Area -->
                  <div class="relative w-full pt-[85%] overflow-hidden"
                       style="background: linear-gradient(160deg, rgba(245,197,24,0.12) 0%, rgba(233,69,96,0.08) 100%);">
                    <div class="absolute inset-0 flex items-center justify-center">
                      <span class="text-5xl sm:text-6xl font-black select-none"
                            style="font-family: var(--font-display); color: var(--color-banana); opacity: 0.85;">
                        {{ getInitials(member.name) }}
                      </span>
                    </div>
                    <!-- Decorative subtle grid pattern -->
                    <div class="absolute inset-0 opacity-[0.03] pointer-events-none"
                         style="background-image: radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px); background-size: 20px 20px;"></div>
                  </div>

                  <!-- Info Area -->
                  <div class="p-5 flex-1 flex flex-col gap-2">
                    <h4 class="font-bold text-lg leading-tight"
                        style="font-family: var(--font-display); color: var(--color-text-light);">
                      {{ member.name }}
                    </h4>
                    <span class="text-sm font-semibold tracking-wide uppercase"
                          style="color: var(--color-banana); font-size: 0.7rem; letter-spacing: 0.08em;">
                      {{ member.role }}
                    </span>
                    <p class="text-sm italic leading-relaxed mt-auto"
                       style="color: rgba(248,249,250,0.45); font-family: var(--font-body);">
                      "{{ member.quote }}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .font-display { font-family: var(--font-display); }

    .team-card-wrapper {
      width: 100%;
    }

    @media (min-width: 640px) {
      .team-card-wrapper {
        width: calc(50% - 0.75rem);
      }
    }

    @media (min-width: 1024px) {
      .team-card-wrapper {
        width: calc(33.333% - 1.34rem);
      }
    }

    @media (min-width: 1280px) {
      .team-card-wrapper {
        width: calc(25% - 1.5rem);
      }
    }

    .team-card {
      background: rgba(255, 255, 255, 0.06);
      transition: transform var(--duration-normal) var(--ease-out-expo),
                  box-shadow var(--duration-normal) var(--ease-out-expo),
                  background-color var(--duration-normal) var(--ease-out-expo);
    }

    .team-card:hover {
      transform: translateY(-6px);
      background: linear-gradient(135deg, var(--color-banana), var(--color-coral), var(--color-banana), var(--color-coral));
      background-size: 300% 300%;
      animation: gradient-flow 12s ease infinite;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4),
                  var(--shadow-glow-banana);
    }

    @keyframes gradient-flow {
      0% { background-position: 0% 0%; }
      50% { background-position: 100% 100%; }
      100% { background-position: 0% 0%; }
    }

    @media (prefers-reduced-motion: reduce) {
      .team-card:hover {
        animation: none;
      }
    }
  `]
})
export class AboutComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  /**
   * Membros da equipe — altere os nomes, cargos e frases aqui.
   */
  teamMembers = signal<TeamMember[]>([
    { id: '1', name: 'Alisson Pokrywiecki', role: 'Desenvolvedor', avatarUrl: '', quote: 'Essa miniatura é sua ou é impressão minha?' },
    { id: '2', name: 'Alice Martins', role: 'Pintora & Social media', avatarUrl: '', quote: 'Soooomebody once tolde me the world...' },
    { id: '3', name: 'Vinícius Setti', role: 'Especialista Técnico', avatarUrl: '', quote: 'Eu comprei a impressora, logo, meu jeito.' },
    { id: '4', name: 'Natália Will', role: 'Social Media', avatarUrl: '', quote: 'Jimin, Jungkook, V, Suga, Rapmonster, BTS.' },
    { id: '5', name: 'Rodrigo Faistauer', role: 'Pintor', avatarUrl: '', quote: 'Cuidado com a mistura de miniaturas e cleptomaníacos...' },
    { id: '6', name: 'Miguel Angel', role: 'Pintor', avatarUrl: '', quote: 'Sleeptoken, Corinthians, basquete e coisarada.' },
    { id: '7', name: 'Thomaz Bianchini', role: 'Pintor', avatarUrl: '', quote: 'TUTUTUTU... MAX VERSTAPPEN, TUTUTUTU...' },
  ]);

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

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
      const elements = document.querySelectorAll('#sobre .reveal');
      elements.forEach(el => this.observer?.observe(el));
    }, 100);
  }
}

