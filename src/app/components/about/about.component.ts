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
            e impressão 3D. Com impressoras de resina de resolução 9K, entregamos peças com
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
              <div class="team-card group rounded-2xl p-[2px] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-banana/50 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                   tabindex="0"
                   role="button"
                   [attr.aria-expanded]="expandedMemberId() === member.id"
                   (click)="toggleExpand(member.id)"
                   (keydown.enter)="toggleExpand(member.id)"
                   (keydown.space)="toggleExpand(member.id); $event.preventDefault()"
                   [class.ring-1]="expandedMemberId() === member.id"
                   style="--tw-ring-color: var(--color-banana);">
                <!-- Card inner -->
                <div class="rounded-2xl overflow-hidden h-full flex flex-col transition-colors duration-500"
                     [style.background]="expandedMemberId() === member.id ? 'var(--color-surface)' : 'var(--color-surface-card)'">

                  <!-- Avatar Area -->
                  <div class="relative w-full overflow-hidden transition-all duration-500"
                       [class.pt-[85%]]="expandedMemberId() !== member.id"
                       [class.pt-[60%]]="expandedMemberId() === member.id"
                       style="background: linear-gradient(160deg, rgba(245,197,24,0.12) 0%, rgba(233,69,96,0.08) 100%);">
                    <div class="absolute inset-0 flex items-center justify-center transition-transform duration-500"
                         [class.scale-90]="expandedMemberId() === member.id">
                      <span class="text-5xl sm:text-6xl font-black select-none transition-all duration-500"
                            [class.text-4xl]="expandedMemberId() === member.id"
                            style="font-family: var(--font-display); color: var(--color-banana); opacity: 0.85;">
                        {{ getInitials(member.name) }}
                      </span>
                    </div>
                    <!-- Decorative subtle grid pattern -->
                    <div class="absolute inset-0 opacity-[0.03] pointer-events-none"
                         style="background-image: radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px); background-size: 20px 20px;"></div>
                    
                    <!-- Chevron icon overlaid on avatar area to hint at expansion -->
                    <div class="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm border border-white/5 flex items-center justify-center text-white/70 transition-transform duration-500"
                         [class.rotate-180]="expandedMemberId() === member.id"
                         [class.bg-banana]="expandedMemberId() === member.id"
                         [class.text-black]="expandedMemberId() === member.id">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>

                  <!-- Info Area -->
                  <div class="p-5 flex-1 flex flex-col gap-2 relative">
                    <h4 class="font-bold text-lg leading-tight transition-colors duration-300"
                        [class.text-banana]="expandedMemberId() === member.id"
                        style="font-family: var(--font-display); color: var(--color-text-light);">
                      {{ member.name }}
                    </h4>
                    <span class="text-sm font-semibold tracking-wide uppercase"
                          style="color: var(--color-banana); font-size: 0.7rem; letter-spacing: 0.08em;">
                      {{ member.role }}
                    </span>
                    <div class="mt-auto grid transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                         [style.grid-template-rows]="expandedMemberId() === member.id ? '0fr' : '1fr'"
                         [class.opacity-0]="expandedMemberId() === member.id"
                         [class.opacity-100]="expandedMemberId() !== member.id">
                      <div class="overflow-hidden">
                        <p class="text-sm italic leading-relaxed"
                           style="color: rgba(248,249,250,0.45); font-family: var(--font-body);">
                          "{{ member.quote }}"
                        </p>
                      </div>
                    </div>
                    
                    <!-- Expanded Bio Area -->
                    <div class="grid transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                         [style.grid-template-rows]="expandedMemberId() === member.id ? '1fr' : '0fr'"
                         [class.opacity-0]="expandedMemberId() !== member.id"
                         [class.opacity-100]="expandedMemberId() === member.id"
                         [class.mt-4]="expandedMemberId() === member.id">
                      <div class="overflow-hidden">
                        <div class="pt-4 border-t border-white/10 relative">
                          <!-- Decorative quote icon -->
                          <div class="absolute top-0 right-0 transform -translate-y-1/2 opacity-10">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                            </svg>
                          </div>
                          <p class="text-sm leading-relaxed" style="color: rgba(248,249,250,0.85); font-family: var(--font-body);">
                            {{ member.bio }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- ════════════════════════════════════════════════ -->
        <!-- TECH SPECS SUB-SECTION                          -->
        <!-- ════════════════════════════════════════════════ -->
        <div class="mt-32 reveal">
          <!-- Sub-section Header -->
          <div class="text-center mb-14">
            <span class="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                  style="background: rgba(245,197,24,0.15); color: var(--color-banana);">
              Tecnologia
            </span>
            <h3 class="text-2xl sm:text-3xl font-bold mb-3"
                style="font-family: var(--font-display); color: var(--color-text-light);">
              Especificações Técnicas
            </h3>
            <p class="max-w-2xl mx-auto" style="color: rgba(248,249,250,0.5);">
              Para você que é nerd como a gente
            </p>
          </div>

          <!-- Specs Grid -->
          <div class="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            @for (spec of printerSpecs(); track spec.label) {
              <div class="spec-card group reveal rounded-2xl p-[2px] w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                <div class="spec-card-inner rounded-2xl p-6 h-full flex flex-col gap-3 relative overflow-hidden">
                  <!-- Decorative corner accent -->
                  <div class="absolute top-0 right-0 w-20 h-20 opacity-[0.06] pointer-events-none"
                       style="background: radial-gradient(circle at top right, var(--color-banana) 0%, transparent 70%);"></div>

                  <!-- Label (Yellow title) -->
                  <span class="text-xs font-bold uppercase tracking-widest"
                        style="color: var(--color-banana); letter-spacing: 0.1em;">
                    {{ spec.label }}
                  </span>

                  <!-- Value -->
                  <p class="text-lg font-bold leading-snug"
                     style="font-family: var(--font-display); color: var(--color-text-light);">
                    {{ spec.value }}
                  </p>

                  <!-- Secondary value (e.g. cm equivalent) -->
                  @if (spec.secondary) {
                    <span class="text-sm" style="color: rgba(248,249,250,0.45); margin-top: -0.25rem;">
                      {{ spec.secondary }}
                    </span>
                  }
                </div>
              </div>
            }
          </div>

          <!-- Bottom Note -->
          <div class="text-center mt-10">
            <p class="text-sm italic" style="color: rgba(248,249,250,0.35);">
              * Especificações sujeitas à atualização conforme melhorias de equipamento.
            </p>
          </div>
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

    /* ===== SPEC CARDS ===== */
    .spec-card {
      background: rgba(255, 255, 255, 0.06);
      transition: transform var(--duration-normal) var(--ease-out-expo),
                  box-shadow var(--duration-normal) var(--ease-out-expo),
                  background-color var(--duration-normal) var(--ease-out-expo);
    }

    .spec-card:hover {
      transform: translateY(-6px);
      background: linear-gradient(135deg, var(--color-banana), var(--color-coral), var(--color-banana), var(--color-coral));
      background-size: 300% 300%;
      animation: gradient-flow 12s ease infinite;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4),
                  var(--shadow-glow-banana);
    }

    @media (prefers-reduced-motion: reduce) {
      .spec-card:hover {
        animation: none;
      }
    }

    .spec-card-inner {
      background: var(--color-surface-card);
      transition: background var(--duration-normal) var(--ease-out-expo);
    }

    .spec-card:hover .spec-card-inner {
      background: var(--color-surface-card-hover);
    }
  `]
})
export class AboutComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  expandedMemberId = signal<string | null>(null);

  /**
   * Especificações técnicas da impressão 3D
   */
  printerSpecs = signal([
    {
      label: 'Resina',
      value: 'ABS-like',
      secondary: 'Alta resistência e acabamento premium'
    },
    {
      label: 'Resolução',
      value: '9K',
      secondary: '8520 × 4320 voxels'
    },
    {
      label: 'Resolução XY',
      value: '18 µm',
      secondary: 'Precisão ultra-fina por pixel'
    },
    {
      label: 'Uniformidade de Luz',
      value: '92%',
      secondary: 'Cura homogênea em toda a área'
    },
    {
      label: 'Volume de Impressão',
      value: 'Até 153,36 × 77,76 × 165 mm',
      secondary: '≈ 15,3 × 7,8 × 16,5 cm (C × L × A)'
    }
  ]);

  toggleExpand(id: string) {
    this.expandedMemberId.update(current => current === id ? null : id);
  }

  /**
   * Membros da equipe — altere os nomes, cargos e frases aqui.
   */
  teamMembers = signal<TeamMember[]>([
    { 
      id: '1', name: 'Alisson Pokrywiecki', role: 'Desenvolvedor', avatarUrl: '', 
      quote: 'Essa miniatura é sua ou é impressão minha?',
      bio: 'Apaixonado por dar vida ao código e solucionar problemas com criatividade. Cada linha digitada se transforma magicamente em projetos interativos que impressionam. Focado em alinhar tecnologia com as melhores experiências do usuário.'
    },
    { 
      id: '2', name: 'Alice Traple', role: 'Pintora & Social media', avatarUrl: '', 
      quote: 'Soooomebody once told me the world...',
      bio: 'Especialista em cores e conexões online. Ela sabe como dar alma aos modelos 3D com paciência e habilidade. Conecta os clientes à nossa comunidade com empatia, mostrando ao mundo nossa arte de forma vibrante e acolhedora.'
    },
    { 
      id: '3', name: 'Vinícius Setti', role: 'Especialista Técnico', avatarUrl: '', 
      quote: 'Eu comprei a impressora, logo, meu jeito.',
      bio: 'Nosso mestre das máquinas e entusiasta da precisão. Cuidando da calibração fina e extraindo cada detalhe oculto da resina 9K, Vinícius é a razão pela qual nossos limites de resolução são incomparáveis no mundo da mágica em 3D.'
    },
    { 
      id: '4', name: 'Natália Will', role: 'Social Media', avatarUrl: '', 
      quote: 'I walk through the valley of the shadow of death...',
      bio: 'A mente criativa por trás das nossas redes de comunicação. Transformando o processo técnico de impressão em narrativas digitais autênticas, Natália conecta, engaja e inspira milhares de jogadores e artistas por todo o Brasil.'
    },
    { 
      id: '5', name: 'Rodrigo Faistauer', role: 'Pintor', avatarUrl: '', 
      quote: 'Cuidado com a mistura de miniaturas e cleptomaníacos...',
      bio: 'Com pincéis diminutos em mãos, Rodrigo traz precisão lendária a criaturas de RPG e projetos complexos. Ele lida com cada miniatura não apenas como um trabalho sob medida, mas como um novo personagem prestes a ganhar fôlego.'
    },
    { 
      id: '6', name: 'Miguel Angel', role: 'Pintor', avatarUrl: '', 
      quote: 'Sleeptoken, Corinthians, basquete e coisarada.',
      bio: 'Focado genuinamente na harmonia e na criação de composições dinâmicas. Miguel possui o dom inegável de explorar os sombreados e atmosferas únicas que trazem grande profundidade emocional até mesmo para as menores figuras.'
    },
    { 
      id: '7', name: 'Thomaz Bianchini', role: 'Pintor', avatarUrl: '', 
      quote: 'TUTUTUTU... MAX VERSTAPPEN, TUTUTUTU...',
      bio: 'Veloz na criatividade e com ritmo intenso para pinceladas precisas. Sua paixão inabalável pela excelência ao conceber os micro-detalhes cria resultados visuais que hipnotizam qualquer fanático ou colecionador de altíssimo nível.'
    },
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

