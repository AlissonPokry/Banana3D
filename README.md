# 🍌 Banana3D — Landing Page

Landing page moderna e responsiva para a **Banana3D**, uma loja especializada em impressão 3D com resina de resolução 8K.

---

## 📋 Sobre o Projeto

A Banana3D é uma aplicação web monopágina (SPA) que serve como landing page para uma loja de impressão 3D. O site apresenta os serviços, portfólio de trabalhos, equipe e formas de contato da empresa.

### Funcionalidades

- **Navbar flutuante** com glassmorphism e menu hamburger para mobile
- **Home (Hero)** com animações de revelação, botões CTA e links para redes sociais
- **Portfólio** com grid responsivo e hover effects — fácil de expandir
- **Sobre Nós** com descrição da empresa e cards para os 7 membros da equipe
- **Contato** com formulário validado, WhatsApp e e-mail
- **Footer** com navegação, redes sociais e copyright dinâmico
- **Scroll suave** entre seções com destaque do item ativo na navbar
- **Animações de revelação** baseadas em IntersectionObserver
- **100% responsivo** — desktop, tablet e celular

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| **Angular** | 19 | Framework principal (Standalone Components, Signals, Zoneless) |
| **Tailwind CSS** | 4 | Estilização utility-first com `@theme` design tokens |
| **TypeScript** | 5.6+ | Tipagem estática |
| **PostCSS** | 8 | Processamento CSS via `@tailwindcss/postcss` |

### Padrões Utilizados

- **Standalone Components** — sem NgModules
- **Signals** — reatividade moderna sem zone.js
- **Zoneless Change Detection** — melhor performance
- **OnPush Change Detection** — em todos os componentes
- **CSS-first** — design tokens via `@theme` no CSS
- **Mobile-first** — estilos base para mobile, overrides para desktop
- **Semantic HTML** — tags `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`
- **SEO otimizado** — meta tags, Open Graph, heading hierarchy

---

## 🚀 Como Rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) v20.x+
- npm (incluído com Node.js)

### Instalação

```bash
# Clone ou navegue até o diretório do projeto
cd Banana3D

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npx ng serve

# Ou com abertura automática do browser
npx ng serve --open
```

O servidor estará disponível em `http://localhost:4200/`.

### Build para Produção

```bash
npx ng build --configuration=production
```

Os arquivos de produção serão gerados em `dist/banana3d/browser/`.

---

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── app.component.ts          # Componente raiz — compõe todas as seções
│   ├── app.config.ts             # Configuração (zoneless, router)
│   ├── app.routes.ts             # Rotas (vazio — SPA com âncoras)
│   ├── components/
│   │   ├── navbar/               # Navbar fixa com glassmorphism
│   │   │   └── navbar.component.ts
│   │   ├── hero/                 # Seção Home com CTA e redes sociais
│   │   │   └── hero.component.ts
│   │   ├── portfolio/            # Grid de portfólio dinâmico
│   │   │   └── portfolio.component.ts
│   │   ├── about/                # Sobre nós + equipe
│   │   │   └── about.component.ts
│   │   ├── contact/              # Formulário + WhatsApp + Email
│   │   │   └── contact.component.ts
│   │   └── footer/               # Footer com navegação e redes
│   │       └── footer.component.ts
│   └── models/
│       ├── portfolio-item.ts     # Interface PortfolioItem
│       └── team-member.ts        # Interface TeamMember
├── styles.css                    # Design tokens + estilos globais
└── index.html                    # Meta tags SEO + Google Fonts
```

---

## ✏️ Como Personalizar

### Adicionar itens ao Portfólio

Edite o array `portfolioItems` em `src/app/components/portfolio/portfolio.component.ts`:

```typescript
portfolioItems = signal<PortfolioItem[]>([
  // Itens existentes...
  {
    id: '7',                              // ID único
    title: 'Novo Projeto',                // Título do item
    description: 'Descrição do projeto.', // Descrição curta
    imageUrl: 'caminho/para/imagem.jpg',  // URL da imagem
    category: 'Categoria'                 // Categoria para badge
  },
]);
```

### Alterar Membros da Equipe

Edite o array `teamMembers` em `src/app/components/about/about.component.ts`:

```typescript
teamMembers = signal<TeamMember[]>([
  { id: '1', name: 'Nome Completo', role: 'Cargo', avatarUrl: '' },
  // ... adicione ou remova membros
]);
```

### Configurar Link da Loja

No arquivo `src/app/components/navbar/navbar.component.ts`, altere o `href` do item "Loja":

```typescript
navItems = [
  // ...
  { id: 'loja', label: 'Loja', href: 'https://sua-loja.com', external: true },
];
```

### Configurar Links de Redes Sociais

Os links de redes sociais estão nos seguintes arquivos:

| Rede | Arquivo |
|---|---|
| Instagram, TikTok, Mercado Livre | `hero.component.ts` e `footer.component.ts` |
| WhatsApp | `contact.component.ts` |
| E-mail | `contact.component.ts` |

Procure por `href="#"` e substitua pelo link real.

### Alterar Cores da Marca

Edite os design tokens em `src/styles.css` dentro do bloco `@theme`:

```css
@theme {
  --color-banana: #F5C518;        /* Cor primária */
  --color-banana-light: #FDE68A;  /* Variante clara */
  --color-banana-dark: #D4A017;   /* Variante escura */
  --color-deep-black: #1A1A2E;    /* Background escuro */
  --color-coral: #E94560;         /* Cor de destaque */
}
```

---

## 🎨 Design System

### Paleta de Cores

| Nome | Hex | Uso |
|---|---|---|
| Banana (Primary) | `#F5C518` | Botões, destaques, CTA |
| Deep Black | `#1A1A2E` | Backgrounds escuros, navbar |
| Coral (Accent) | `#E94560` | Alertas, badges, validação |
| Surface | `#F8F9FA` | Backgrounds de seções claras |
| Text Primary | `#0F0F1A` | Textos principais |
| Text Muted | `#6B7280` | Textos secundários |

### Tipografia

| Função | Fonte | Motivo |
|---|---|---|
| Display / Headings | **Rubik** (700, 900) | Bold, geométrica, industrial |
| Body / Textos | **Nunito Sans** (400, 600) | Alta legibilidade, moderna |

### Breakpoints

| Tamanho | Largura | Target |
|---|---|---|
| Mobile (base) | 0px+ | Celulares |
| `sm` | 640px+ | Celulares grandes |
| `md` | 768px+ | Tablets |
| `lg` | 1024px+ | Laptops |
| `xl` | 1280px+ | Desktops |

---

## 📱 Responsividade

O site é totalmente responsivo com as seguintes adaptações:

- **Mobile (< 768px)**: Layout empilhado, menu hamburger, grid de 1 coluna
- **Tablet (768px–1024px)**: Grid de 2 colunas, navbar expandida
- **Desktop (> 1024px)**: Layout completo com grid de 3+ colunas

---

## 🔍 SEO

O site inclui:

- Meta tags de título e descrição
- Open Graph tags para compartilhamento em redes sociais
- Atributo `lang="pt-BR"`
- Heading hierarchy (`<h1>` → `<h2>` → `<h3>` → `<h4>`)
- Alt texts em todas as imagens
- Semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`)
- `aria-label` em elementos interativos
- `prefers-reduced-motion` respeitado

---

## 📜 Scripts Disponíveis

| Script | Comando | Descrição |
|---|---|---|
| Dev Server | `npx ng serve` | Servidor de desenvolvimento com HMR |
| Build | `npx ng build` | Build de produção |
| Test | `npx ng test` | Executar testes unitários |
| Lint | `npx ng lint` | Linting do código |

---

## 📄 Licença

Este projeto é privado e de propriedade da Banana3D.
