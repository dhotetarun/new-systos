import { BRANDS, BRAND_HOVER } from "../../data/content.js";
import Reveal from "../ui/Reveal.jsx";

function Group({ hidden }) {
  return (
    <ul className="flex items-center gap-12 pr-12 shrink-0" aria-hidden={hidden || undefined}>
      {BRANDS.map((b, i) => (
        <li key={b} className={`text-xl font-extrabold font-display text-slate-400 transition-colors ${BRAND_HOVER[i]}`}>{b}</li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <section id="clients" aria-label="Brands we work with" className="relative z-10 py-16 overflow-hidden bg-slate-50/60 border-y border-slate-200">
      <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        <span className="badge-eyebrow text-slate-500 block">Pleasure to work with global brands</span>
      </Reveal>
      <div className="overflow-hidden">
        <div className="marquee-track">
          <Group />
          <Group hidden />
        </div>
      </div>
    </section>
  );
}
