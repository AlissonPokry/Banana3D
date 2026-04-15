import { Component, signal, ChangeDetectionStrategy, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      id="contato"
      class="py-24 md:py-32 px-6 relative"
      style="background: var(--color-surface);"
    >
      <div class="max-w-7xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16 reveal">
          <span class="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                style="background: rgba(245,197,24,0.15); color: var(--color-banana-dark);">
            Entre em Contato
          </span>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black mb-4"
              style="font-family: var(--font-display);">
            Contato
          </h2>
          <p class="text-lg max-w-2xl mx-auto"
             style="color: var(--color-text-muted);">
            Tem um projeto em mente? Fale conosco! Estamos prontos para transformar sua ideia em realidade.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <!-- Contact Form -->
          <div class="lg:col-span-3 reveal">
            <form
              [formGroup]="form"
              (ngSubmit)="onSubmit()"
              class="p-8 md:p-10 rounded-3xl"
              style="background: rgba(255,255,255,0.05); box-shadow: var(--shadow-card);"
            >
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <!-- Nome -->
                <div>
                  <label for="contact-name" class="block text-sm font-semibold mb-2"
                         style="font-family: var(--font-display);">
                    Nome *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    formControlName="name"
                    placeholder="Seu nome completo"
                    class="w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors text-base"
                    [style.border-color]="isFieldInvalid('name') ? 'var(--color-coral)' : 'var(--color-text-muted)'"
                    style="font-family: var(--font-body);"
                  >
                  @if (isFieldInvalid('name')) {
                    <span class="text-xs mt-1 block" style="color: var(--color-coral);">
                      Nome é obrigatório (mínimo 2 caracteres)
                    </span>
                  }
                </div>

                <!-- Email -->
                <div>
                  <label for="contact-email" class="block text-sm font-semibold mb-2"
                         style="font-family: var(--font-display);">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    formControlName="email"
                    placeholder="seu@email.com"
                    class="w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors text-base"
                    [style.border-color]="isFieldInvalid('email') ? 'var(--color-coral)' : 'var(--color-text-muted)'"
                    style="font-family: var(--font-body);"
                  >
                  @if (isFieldInvalid('email')) {
                    <span class="text-xs mt-1 block" style="color: var(--color-coral);">
                      Email inválido
                    </span>
                  }
                </div>
              </div>

              <!-- Assunto -->
              <div class="mb-6">
                <label for="contact-subject" class="block text-sm font-semibold mb-2"
                       style="font-family: var(--font-display);">
                  Assunto
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  formControlName="subject"
                  placeholder="Sobre o que deseja falar?"
                  class="w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors text-base"
                  style="border-color: var(--color-text-muted); font-family: var(--font-body);"
                >
              </div>

              <!-- Mensagem -->
              <div class="mb-8">
                <label for="contact-message" class="block text-sm font-semibold mb-2"
                       style="font-family: var(--font-display);">
                  Mensagem *
                </label>
                <textarea
                  id="contact-message"
                  formControlName="message"
                  placeholder="Descreva seu projeto ou dúvida..."
                  rows="5"
                  class="w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors text-base resize-y min-h-32"
                  [style.border-color]="isFieldInvalid('message') ? 'var(--color-coral)' : 'var(--color-text-muted)'"
                  style="font-family: var(--font-body);"
                ></textarea>
                @if (isFieldInvalid('message')) {
                  <span class="text-xs mt-1 block" style="color: var(--color-coral);">
                    Mensagem é obrigatória (mínimo 10 caracteres)
                  </span>
                }
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                [disabled]="form.invalid || submitting()"
                class="btn-primary w-full sm:w-auto justify-center text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                @if (submitting()) {
                  <svg class="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                } @else if (submitted()) {
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  Mensagem Enviada!
                } @else {
                  Enviar Mensagem
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                }
              </button>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="lg:col-span-2 reveal" style="transition-delay: 200ms;">
            <div class="space-y-6">
              <!-- WhatsApp -->
              <a
                href="https://wa.me/5500000000000?text=Olá! Gostaria de saber mais sobre os serviços da Banana3D."
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-5 p-6 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 group"
                style="background: rgba(255,255,255,0.05); box-shadow: var(--shadow-card);"
                aria-label="Fale conosco pelo WhatsApp"
              >
                <div class="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors"
                     style="background: #25D366; color: white;">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-display font-bold text-base mb-1">WhatsApp</h4>
                  <p class="text-sm" style="color: var(--color-text-muted);">Fale conosco diretamente</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor" style="color: var(--color-text-muted);" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </a>

              <!-- Email -->
              <a
                href="mailto:contato@banana3d.com.br"
                class="flex items-center gap-5 p-6 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 group"
                style="background: rgba(255,255,255,0.05); box-shadow: var(--shadow-card);"
                aria-label="Envie um e-mail para nós"
              >
                <div class="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                     style="background: var(--color-banana); color: var(--color-deep-black);">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-display font-bold text-base mb-1">E-mail</h4>
                  <p class="text-sm" style="color: var(--color-text-muted);">contato&#64;banana3d.com.br</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor" style="color: var(--color-text-muted);" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </a>

              <!-- Location -->
              <div class="p-6 rounded-2xl"
                   style="background: rgba(255,255,255,0.05); box-shadow: var(--shadow-card);">
                <div class="flex items-center gap-5">
                  <div class="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                       style="background: rgba(245,197,24,0.15); color: var(--color-banana-dark);">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-display font-bold text-base mb-1">Localização</h4>
                    <p class="text-sm" style="color: var(--color-text-muted);">Itajaí, Santa Catarina - Brasil</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .font-display { font-family: var(--font-display); }
    input:focus, textarea:focus {
      border-color: var(--color-banana) !important;
      box-shadow: 0 0 0 3px rgba(245, 197, 24, 0.15);
    }
  `]
})
export class ContactComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private platformId = inject(PLATFORM_ID);
  private observer: IntersectionObserver | null = null;

  submitting = signal(false);
  submitted = signal(false);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  isFieldInvalid(field: string): boolean {
    const control = this.form.get(field);
    return control ? control.invalid && control.touched : false;
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    // Simula envio — integrar com backend real depois
    await new Promise(resolve => setTimeout(resolve, 1500));

    this.submitting.set(false);
    this.submitted.set(true);
    this.form.reset();

    // Reset submitted state after feedback
    setTimeout(() => this.submitted.set(false), 3000);
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
      const elements = document.querySelectorAll('#contato .reveal');
      elements.forEach(el => this.observer?.observe(el));
    }, 100);
  }
}
