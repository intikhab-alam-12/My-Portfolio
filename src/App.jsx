import {
  Preloader,
  CustomCursor,
  ScrollProgress,
  InteractiveBackground,
  Navbar,
  Hero,
  About,
  Skills,
  Education,
  Projects,
  GithubShowcase,
  Contact,
  Footer,
} from './components';

export default function App() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#08090D] text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-purple-500/30 selection:text-purple-600 dark:selection:text-purple-200 overflow-x-hidden">
      {/* Global interactive chrome */}
      <CustomCursor />
      <ScrollProgress />

      {/* Awwwards Letter-by-Letter Staggered Preloader Overlay */}
      <Preloader />

      {/* Architectural Grid & Ambient Spotlight */}
      <InteractiveBackground />

      {/* Glassmorphic Sticky Navigation */}
      <Navbar />

      {/* Core Portfolio Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Education />
        <Projects />
        <GithubShowcase />
        <Contact />
      </main>

      {/* Full Production Footer with Back-to-Top button */}
      <Footer />
    </div>
  );
}
