import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { HERO_BADGES } from "../../data/content.js";
import HeroBackground from "../scenes/HeroBackground.jsx";
import HeroCube from "../scenes/HeroCube.jsx";
import Button from "../ui/Button.jsx";
import { EASE } from "../ui/Reveal.jsx";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } };
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export default function Hero({ onQuote }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const leftY = useTransform(scrollY, [0, 1200], [0, 216]);
  const leftOpacity = useTransform(scrollY, [0, 700], [1, 0]);
  const cubeY = useTransform(scrollY, [0, 1200], [0, 108]);

  return (
    <section id="home" className="relative z-10 min-h-[90vh] pt-36 sm:pt-40 lg:pt-48 pb-24 sm:pb-28 lg:pb-32 flex items-center overflow-hidden cyber-grid-light">
      <HeroBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <motion.div
            variants={container}
            initial={reduce ? false : "hidden"}
            animate="show"
            style={reduce ? undefined : { y: leftY, opacity: leftOpacity }}
            className="lg:col-span-6 space-y-7 sm:space-y-8 text-center lg:text-left"
          >
            <motion.div variants={item} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-50 border border-systos-red/30 badge-eyebrow text-systos-red shadow-sm">
              <span className="status-beacon" />
              Professional IT Solutions • You Think We Do
            </motion.div>

            <motion.h1 variants={item} className="hero-heading">
              Technology That Moves Your <br className="hidden sm:inline" />
              <span className="gradient-text-red">Business Forward</span>
            </motion.h1>

            <motion.p variants={item} className="max-w-2xl mx-auto lg:mx-0">
              SyStos Technology helps visionary businesses globally engineer scalable digital experiences through custom
              enterprise software, high-conversion web platforms, and intelligent digital ecosystems.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3 sm:pt-4">
              <Button onClick={onQuote} className="w-full sm:w-auto group">
                <span>Talk to Our Experts</span>
                <i className="fa-solid fa-arrow-right group-hover:translate-x-1.5 transition-transform" aria-hidden="true" />
              </Button>
              <Button variant="secondary" href="#services" className="w-full sm:w-auto group">
                <span>Explore Solutions</span>
                <i className="fa-solid fa-compass text-systos-navy group-hover:rotate-45 transition-transform" aria-hidden="true" />
              </Button>
            </motion.div>

            <motion.ul variants={item} className="pt-8 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-semibold text-slate-600 font-sans">
              {HERO_BADGES.map((b) => (
                <li key={b.label} className="flex items-center gap-2">
                  <i className={`fa-solid ${b.icon} ${b.color}`} aria-hidden="true" />
                  {b.label}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
            style={reduce ? undefined : { y: cubeY }}
            className="lg:col-span-6 relative flex justify-center items-center h-[420px] sm:h-[520px]"
          >
            <div className="w-full h-full relative rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing" title="Interactive 3D Technology Cube — Drag to rotate">
              <HeroCube className="absolute inset-0 w-full h-full" />
            </div>

            <div className="absolute top-4 left-2 sm:left-4 glass-card-light px-4 py-2.5 rounded-2xl shadow-md flex items-center gap-3 animate-float-slow pointer-events-none">
              <div className="w-9 h-9 rounded-xl bg-red-50 border border-systos-red/30 flex items-center justify-center text-systos-red">
                <i className="fa-solid fa-laptop-code text-sm" aria-hidden="true" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 font-display">Web &amp; App Dev</div>
                <div className="text-[10px] text-systos-navy font-mono">Scalable Architecture</div>
              </div>
            </div>
            <div className="absolute bottom-6 right-2 sm:right-4 glass-card-light px-4 py-2.5 rounded-2xl shadow-md flex items-center gap-3 animate-float-delayed pointer-events-none">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-systos-navy/30 flex items-center justify-center text-systos-navy">
                <i className="fa-solid fa-chart-line text-sm" aria-hidden="true" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 font-display">Digital Growth</div>
                <div className="text-[10px] text-slate-500 font-mono">Data-Driven Results</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <a href="#stats" aria-label="Scroll down to statistics" className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center text-slate-400 hover:text-systos-red transition-colors z-20 group">
        <span className="text-[9px] font-bold font-mono uppercase tracking-[0.25em] mb-1">Explore</span>
        <i className="fa-solid fa-chevron-down animate-bounce text-xs" aria-hidden="true" />
      </a>
    </section>
  );
}
