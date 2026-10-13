import { useCallback, useState } from "react";
import Cursor from "./components/Cursor.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/sections/Hero.jsx";
import Stats from "./components/sections/Stats.jsx";
import Services from "./components/sections/Services.jsx";
import About from "./components/sections/About.jsx";
import Projects from "./components/sections/Projects.jsx";
import WhyUs from "./components/sections/WhyUs.jsx";
import Testimonials from "./components/sections/Testimonials.jsx";
import Marquee from "./components/sections/Marquee.jsx";
import CTA from "./components/sections/CTA.jsx";
import Footer from "./components/sections/Footer.jsx";
import QuoteModal from "./components/sections/QuoteModal.jsx";

const Ribbon = () => <div className="section-connector-ribbon" aria-hidden="true" />;

export default function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const openQuote = useCallback(() => setQuoteOpen(true), []);
  const closeQuote = useCallback(() => setQuoteOpen(false), []);

  return (
    <div className="relative">
      <Cursor />

      {/* Soft pastel ambient glow orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="ambient-glow-light w-[650px] h-[650px] bg-sky-200/40 top-[-80px] left-1/2 -translate-x-1/2" />
        <div className="ambient-glow-light w-[500px] h-[500px] bg-red-100/50 top-[600px] right-[-100px]" />
        <div className="ambient-glow-light w-[600px] h-[600px] bg-blue-100/50 top-[1500px] left-[-150px]" />
      </div>

      <Navbar onQuote={openQuote} />
      <main>
        <Hero onQuote={openQuote} />
        <Ribbon />
        <Stats />
        <Ribbon />
        <Services />
        <Ribbon />
        <About />
        <Ribbon />
        <Projects />
        <Ribbon />
        <WhyUs />
        <Testimonials />
        <Marquee />
        <CTA onQuote={openQuote} />
      </main>
      <Footer />
      <QuoteModal open={quoteOpen} onClose={closeQuote} />
    </div>
  );
}
