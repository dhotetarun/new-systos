import { motion, useReducedMotion } from "framer-motion";
import { PILLARS, TONES } from "../../data/content.js";
import AboutGlobe from "../scenes/AboutGlobe.jsx";
import Eyebrow from "../ui/Eyebrow.jsx";
import Reveal from "../ui/Reveal.jsx";
import TiltCard from "../ui/TiltCard.jsx";

export default function About() {
  const reduce = useReducedMotion();
  return (
    <section id="about" className="relative z-10 section-py bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* New Professional & Dedicated Section */}
        {/* <div className="lg:col-span-12 mb-16 text-center">
          <h2 className="section-heading">
            We Are <span className="gradient-text-red">Professional &amp; Dedicated</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto">
            Our team blends expertise with passion, delivering top‑tier solutions that
            empower your business to thrive in a digital world.
          </p>
        </div> */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-6 relative h-[420px] sm:h-[480px] order-2 lg:order-1">
            <TiltCard max={4} className="w-full h-full shadow-md">
              <AboutGlobe />
            </TiltCard>
            <motion.div
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-6 left-6 glass-card-light px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-3"
            >
              <span className="status-beacon" />
              <div className="text-xs">
                <span className="font-bold text-slate-900 font-display">Indore, India HQ</span>
                <span className="text-systos-navy block text-[10px] font-mono">Serving Clients Across 20+ Countries</span>
              </div>
            </motion.div>
          </Reveal>

          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <Reveal delay={0.1}>
              <Eyebrow>Who We Are</Eyebrow>
              <h2 className="section-heading mt-4">
                We Are <span className="gradient-text-red">Professional</span> &amp; Dedicated
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="max-w-xl">
                SyStos Technology is a full-service web design, software development, and digital marketing agency based in
                Indore. Guided by our motto{" "}
                <span className="text-systos-navy font-bold">&ldquo;You Think We Do&rdquo;</span>, we convert your
                ambitions into high-performing digital realities.
              </p>
            </Reveal>
            <div className="space-y-4 pt-2">
              {PILLARS.map((p, i) => (
                <Reveal key={p.title} delay={0.25 + i * 0.1}>
                  <motion.div
                    whileHover={reduce ? undefined : { x: 6 }}
                    className={`flex items-start gap-4 p-4 rounded-2xl glass-card-light ${TONES[p.tone].hoverBorder}`}
                  >
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 text-lg ${TONES[p.tone].chip}`}>
                      <i className={`fa-solid ${p.aboutIcon}`} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="section-subheading !text-sm">{p.title}</h3>
                      <p className="mt-0.5">{p.text}</p>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
