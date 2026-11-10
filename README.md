# Intikhab Alam — Creative Developer Portfolio

An Awwwards-inspired, high-performance developer portfolio engineered with **React 18**, **Vite**, **Tailwind CSS**, **Framer Motion**, and **GSAP**. Built with a deep obsidian dark aesthetic, glassmorphic UI cards, fluid micro-interactions, responsive typography, and full accessibility compliance.

---

## 🚀 Key Highlights & Architectural Features

- **Obsidian Dark Aesthetic:** Custom-tailored design system using Obsidian Black (`#08090D`), Electric Purple (`#8B5CF6`), and Vibrant Blue (`#3B82F6`) with multi-layered glassmorphism (`backdrop-blur-xl`).
- **Interactive Chrome:**
  - **Letter-by-Letter Preloader:** Staggered entrance animation for `INTIKHAB ALAM` with cubic ease-out counter (`0%` to `100%`) and smooth curtain-lift exit.
  - **Spring Physics Custom Cursor:** Desktop dual-ring cursor with magnetic hover expansion over interactive targets, disabled automatically on touch devices and `prefers-reduced-motion`.
  - **Scroll Progress & Ambient Spotlight:** Top gradient scroll indicator with mouse-tracking radial spotlight glow and floating canvas particles.
- **Section-Aware Navbar:** Sticky glassmorphism header powered by `IntersectionObserver` scroll-spy with animated `layoutId` pill underline and mobile drawer.
- **Hero & Interactive IDE:** macOS-style VS Code terminal card with line-by-line typing animation and syntax-highlighted `developer.js` file.
- **Interactive Skills Matrix:** Categorized filter tabs (`All`, `Frontend`, `Backend`, `Languages & DB`, `Version Control`, `Microsoft Office`) with 17 authentic brand icons and mouse-tracking spotlight borders (zero fake percentages).
- **Academic Timeline:** Scroll-activated vertical line linking DIT 2nd Year coursework cards and self-directed engineering callouts.
- **Featured Projects Showcase:**
  - 5 real projects with 3D perspective mouse tilt.
  - Bespoke code/browser preview mockups (no generic screenshots).
  - Modal details drawer and toast notifications for honest URL handling.
- **GitHub Live Showcase:** Integrated GitHub profile card with live API data fetch, loading skeletons, and interactive 28x7 activity heatmap grid.
- **Honest Contact Pipeline:** Validated contact form with direct 1-click WhatsApp prefilled message dispatch (`https://wa.me/923299599805`), email fallback, and optional Formspree support.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Framework & Build** | [React 18](https://react.dev/), [Vite 5](https://vitejs.dev/) |
| **Styling & Design System** | [Tailwind CSS v3](https://tailwindcss.com/), PostCSS, Autoprefixer |
| **Animation & Motion** | [Framer Motion v11](https://www.framer.com/motion/), [GSAP](https://greensock.com/) |
| **Icons & Brand Assets** | [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/) |
| **Typography** | Space Grotesk, Inter, JetBrains Mono (via Google Fonts) |

---

## 📁 Project Structure

```
my Portfolio/
├── index.html                  # HTML entry point with Google Fonts preconnect
├── package.json                # Project dependencies and scripts
├── vite.config.js              # Vite configuration (port 3000)
├── tailwind.config.js          # Design tokens, color palette, custom keyframes
├── postcss.config.js           # PostCSS configuration
├── src/
│   ├── main.jsx                # React DOM root mounting
│   ├── App.jsx                 # Main application layout & section orchestration
│   ├── index.css               # Base styles, dark scrollbar, accessibility outlines
│   ├── assets/                 # Profile images & portraits
│   │   └── README.md
│   ├── hooks/
│   │   ├── useScrollSpy.js     # IntersectionObserver section tracker
│   │   └── index.js
│   ├── data/
│   │   ├── portfolioData.js    # Personal bio, education, contact, and focus specs
│   │   ├── skills.js           # 17 categorized skills with descriptions & icon keys
│   │   └── projects.js         # 5 featured projects with categories & highlights
│   └── components/
│       ├── Preloader.jsx       # Staggered letter reveal + progress counter
│       ├── CustomCursor.jsx    # Dual-ring mouse cursor with spring lag
│       ├── ScrollProgress.jsx  # Top fixed scroll completion bar
│       ├── InteractiveBackground.jsx # Canvas particles, grid & mouse spotlight
│       ├── Navbar.jsx          # Top sticky navigation + mobile drawer
│       ├── Hero.jsx            # Hero banner, role switcher, VS Code terminal card
│       ├── About.jsx           # Bio paragraphs, JSON inspector spec card, focus grid
│       ├── Skills.jsx          # Filterable skills tabs with brand icons
│       ├── Education.jsx       # Vertical timeline & DIT academic coursework
│       ├── Projects.jsx        # 3D tilt cards, bespoke UI mockups, details modal
│       ├── GithubShowcase.jsx  # Live GitHub API banner & 28x7 heatmap
│       ├── Contact.jsx         # Direct WhatsApp pipeline & validated form
│       ├── Footer.jsx          # Quick links, copyright & back-to-top button
│       └── index.js            # Clean barrel export
```

---

## ⚡ Getting Started Locally

### 1. Prerequisites
- **Node.js**: v18.0.0 or later (Node v20+ recommended)
- **npm**: v9.0.0 or later

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The application will launch at `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
```
Build output is generated inside the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## ⚙️ Configuration & Customization

### 1. Adding a Profile Portrait
1. Place your portrait file (`portrait.jpg` or `portrait.png`) into `src/assets/`.
2. Open `src/components/Hero.jsx` and import the image:
   ```javascript
   import profileImg from '../assets/portrait.jpg';
   ```
3. Replace `<MonogramAvatar />` with your image tag:
   ```jsx
   <img
     src={profileImg}
     alt="Intikhab Alam"
     className="w-24 h-24 rounded-full object-cover border-2 border-purple-500/40 shadow-glow-purple mx-auto mb-5"
   />
   ```

### 2. Updating Project Live Demos & Repositories
Open [`src/data/projects.js`](./src/data/projects.js) and update the `liveUrl` and `repoUrl` fields:
```javascript
{
  id: "responsive-business-website",
  title: "Responsive Business Website",
  // ...
  liveUrl: "https://your-live-deployment.vercel.app", // add your real URL here
  repoUrl: "https://github.com/intikhab-alam-12/your-repo-name",
}
```

### 3. Connecting Formspree (Optional)
To send contact form submissions directly to an email service, create a `.env` file in the root:
```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```
*(If left unconfigured, the form provides instant 1-click WhatsApp message prefill and email client dispatch).*

---

## ♿ Accessibility & Motion Standards

- **Semantic HTML:** Correct hierarchy (`header`, `nav`, `main`, `section`, `footer`, `h1`-`h4`).
- **Screen Reader Support:** Explicit `aria-label`, `aria-live`, and `aria-expanded` attributes on all dynamic toggles and buttons.
- **Keyboard Navigation:** High-contrast purple focus rings on `:focus-visible` elements.
- **Motion Sensitivity:** All spring physics, floating particles, and entrance animations respect the system-level `prefers-reduced-motion: reduce` preference.

---

## 📄 License & Credits

Developed with ❤️ by **Intikhab Alam**. All Rights Reserved © 2026.

