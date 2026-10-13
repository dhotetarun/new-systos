import { PILLARS, TONES } from "../../data/content.js";
import GyroBackground from "../scenes/GyroBackground.jsx";
import Reveal from "../ui/Reveal.jsx";
import SectionHead from "../ui/SectionHead.jsx";
import TiltCard from "../ui/TiltCard.jsx";

export default function WhyUs() {
  return (
    <section id="why-us" className="relative z-10 section-py overflow-hidden bg-slate-50/60">
      <GyroBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHead
          tone="navy"
          eyebrow="Why Choose Us"
          title={<>Our Core <span className="gradient-text-blue">Pillars</span></>}
          text="Built on creative excellence, leadership talent, and tangible business acceleration."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.12} className="h-full">
              <TiltCard className="group p-8 text-center h-full">
                <div className={`w-16 h-16 rounded-2xl border mx-auto flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform ${TONES[p.tone].chip}`}>
                  <i className={`fa-solid ${p.icon}`} aria-hidden="true" />
                </div>
                <h3 className="section-subheading mb-3">{p.title}</h3>
                <p>{p.text}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
