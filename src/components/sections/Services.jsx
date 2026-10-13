import { motion, useReducedMotion } from "framer-motion";
import { SERVICES } from "../../data/content.js";
import Eyebrow from "../ui/Eyebrow.jsx";
import Reveal, { EASE } from "../ui/Reveal.jsx";

export default function Services() {
  const reduce = useReducedMotion();
  return (
    <section id="services" className="relative z-10 section-py bg-slate-50/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-14">
          <Eyebrow>Our Services</Eyebrow>
          <h2 className="section-heading mt-4">
            Quality Services You Will Get At <span className="gradient-text-red">SyStos</span>
          </h2>
        </Reveal>
        <div className="sx-ind">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              className="sx-card"
              tabIndex={0}
              data-cursor
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
            >
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
