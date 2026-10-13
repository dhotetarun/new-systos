import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PROJECTS, TONES } from "../../data/content.js";
import Eyebrow from "../ui/Eyebrow.jsx";
import Reveal, { EASE } from "../ui/Reveal.jsx";
import TiltCard from "../ui/TiltCard.jsx";

const TABS = ["All", ...PROJECTS.map((p) => p.category)];

export default function Projects() {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState("All");
  const items = tab === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === tab);

  const onKeyDown = (e) => {
    const i = TABS.indexOf(tab);
    if (e.key === "ArrowRight") setTab(TABS[(i + 1) % TABS.length]);
    if (e.key === "ArrowLeft") setTab(TABS[(i - 1 + TABS.length) % TABS.length]);
  };

  return (
    <section id="projects" className="relative z-10 section-py bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <Eyebrow tone="navy">Portfolio Showcase</Eyebrow>
            <h2 className="section-heading mt-4">
              Recent <span className="gradient-text-blue">Creative Work</span>
            </h2>
          </div>
          <p className="max-w-md">
            Real enterprise case studies engineered with relentless attention to speed, aesthetics, and business growth.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div role="tablist" aria-label="Project categories" onKeyDown={onKeyDown} className="inline-flex flex-wrap gap-1 p-1.5 mb-10 rounded-2xl bg-white border border-slate-200 shadow-sm">
            {TABS.map((t) => (
              <button
                key={t}
                role="tab"
                type="button"
                id={`tab-${t}`}
                aria-selected={tab === t}
                aria-controls="projects-panel"
                tabIndex={tab === t ? 0 : -1}
                onClick={() => setTab(t)}
                className={`relative px-5 py-2.5 rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-colors ${tab === t ? "text-white" : "text-slate-600 hover:text-systos-navy"}`}
              >
                {tab === t && (
                  <motion.span
                    layoutId="project-tab-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-systos-navy to-systos-red shadow-md"
                  />
                )}
                <span className="relative">{t}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div
          layout={!reduce}
          id="projects-panel"
          role="tabpanel"
          aria-labelledby={`tab-${tab}`}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {items.map((p, i) => {
              const tone = TONES[p.tone];
              return (
                <motion.div
                  key={p.id}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                >
                  <TiltCard className="group h-full">
                    <div className={`h-56 bg-gradient-to-tr from-slate-100 ${tone.wash} flex items-center justify-center relative p-6 border-b border-slate-200`}>
                      <div className={`w-16 h-16 rounded-2xl bg-white shadow-md text-3xl flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 ${tone.text}`}>
                        <i className={`fa-solid ${p.icon}`} aria-hidden="true" />
                      </div>
                      <span className="absolute top-4 right-4 text-caption px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700">
                        {p.category}
                      </span>
                    </div>
                    <div className="p-6 flex items-center justify-between bg-white">
                      <div>
                        <span className={`text-caption font-bold tracking-wider ${tone.text}`}>{p.tag}</span>
                        <h3 className="section-subheading !text-base group-hover:text-systos-navy transition-colors mt-0.5">{p.title}</h3>
                      </div>
                      <div className={`w-10 h-10 rounded-xl bg-slate-100 group-hover:text-white text-slate-600 flex items-center justify-center transition-all ${tone.arrow}`}>
                        <i className="fa-solid fa-arrow-up-right-from-square text-xs" aria-hidden="true" />
                      </div>
                    </div>
                    <span aria-hidden="true" className={`absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 ${tone.bar}`} />
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
