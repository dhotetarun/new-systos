import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { STATS } from "../../data/content.js";
import Reveal from "../ui/Reveal.jsx";

function Counter({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduce) { setN(to); return undefined; }
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.floor(v)),
      onComplete: () => setN(to),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return <span ref={ref}>{n}</span>;
}

export default function Stats() {
  return (
    <section id="stats" className="relative z-10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="glass-card-light rounded-3xl p-8 sm:p-10 shadow-lg grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {STATS.map((s, i) => (
            <div key={s.label} className={`flex flex-col items-center text-center p-2 group ${i > 0 ? "pt-6 md:pt-2" : ""}`}>
              <span className={`text-4xl sm:text-5xl font-extrabold font-display tracking-tight flex items-center group-hover:scale-105 transition-transform ${s.color}`}>
                <Counter to={s.target} />
                <span className={`text-2xl ml-1 ${s.suffixColor}`}>{s.suffix}</span>
              </span>
              <span className="badge-eyebrow text-slate-800 mt-2">{s.label}</span>
              <p className="mt-1 max-w-[170px] leading-snug">{s.text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
