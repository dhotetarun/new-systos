# SyStos Technology — React site

React 18 + Vite + Tailwind 3 + Framer Motion + Three.js (r128, pinned to match the original look).

## Run

    npm install
    npm run dev        # http://localhost:5173
    npm run build      # production build in /dist
    npm run preview

## Structure

    src/
      App.jsx                      page assembly + quote modal state
      main.jsx                     entry
      data/content.js              ALL copy, links and lists (edit text here)
      hooks/                       useThreeScene, useActiveSection, useMouseParallax
      components/
        Cursor.jsx  Navbar.jsx
        ui/        Reveal, TiltCard, Button, Eyebrow, SectionHead, LogoMark
        scenes/    HeroCube, HeroBackground, AboutGlobe, GyroBackground, ParticleBackground
        sections/  Hero, Stats, Services, About, Projects, WhyUs, Testimonials,
                   Marquee, CTA, Footer, QuoteModal
      styles/      index.css (tokens, glass, buttons) · sections.css · footer.css
