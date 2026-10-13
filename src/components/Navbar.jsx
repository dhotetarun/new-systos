import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { NAV_LINKS } from "../data/content.js";
import useActiveSection from "../hooks/useActiveSection.js";
import Button from "./ui/Button.jsx";
import { LOGO_SRC } from "../data/content.js";

export default function Navbar({ onQuote }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV_LINKS.map((l) => l.id));
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed top-0 inset-x-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-systos-navy via-systos-cyan to-systos-red"
      />
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 py-4 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${scrolled ? "navbar-scrolled" : ""}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="glass-card-light rounded-2xl px-5 sm:px-6 py-3.5 flex items-center justify-between shadow-sm">
            <a href="#home" className="flex items-center gap-3.5 group" aria-label="SyStos Technology Home">
              <span className="relative w-40 h-20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_4px_10px_rgba(227,27,35,0.25)]">
                <img src={LOGO_SRC} alt="SyStos Technology" className="w-40 h-14 object-contain" />
              </span>

            </a>

            <nav aria-label="Primary" className="hidden lg:flex items-center space-x-7 text-xs uppercase tracking-wider font-display">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  aria-current={active === l.id ? "true" : undefined}
                  className={`transition-colors hover:text-systos-red ${active === l.id ? "text-systos-red font-bold" : "text-slate-700 font-semibold"}`}
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="hidden sm:flex items-center gap-4">
              <Button size="sm" onClick={onQuote} className="gap-2">
                <i className="fa-solid fa-paper-plane text-xs" aria-hidden="true" />
                <span>Get a Quote</span>
              </Button>
            </div>

            <button
              type="button"
              className="lg:hidden text-slate-800 hover:text-systos-red p-2 rounded-lg bg-slate-100 border border-slate-200"
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <i className={`fa-solid ${open ? "fa-xmark" : "fa-bars-staggered"} text-lg`} aria-hidden="true" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden max-w-7xl mx-auto px-2 mt-3"
            >
              <div className="glass-card-light rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
                <div className="pb-2 border-b border-slate-200 flex justify-between items-center">
                  <span className="text-xs font-mono font-bold text-systos-navy tracking-widest uppercase">You Think We Do</span>
                  <span className="status-beacon" />
                </div>
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.id}
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`text-sm tracking-wider uppercase font-display hover:text-systos-red ${active === l.id ? "text-systos-red font-bold" : "text-slate-700 font-semibold"}`}
                  >
                    {l.label}
                  </a>
                ))}
                <Button
                  size="sm"
                  className="mt-2 w-full gap-2"
                  onClick={() => { setOpen(false); onQuote(); }}
                >
                  <i className="fa-solid fa-paper-plane" aria-hidden="true" />
                  <span>Request Consultation</span>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
