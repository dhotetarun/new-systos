import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TESTIMONIALS } from "../../data/content.js";
import useMouseParallax from "../../hooks/useMouseParallax.js";
import { EASE } from "../ui/Reveal.jsx";

const HEART = "M12 21s-7.5-4.6-9.6-9.3C.9 8.2 3 4.5 6.6 4.5c2 0 3.5 1 4.4 2.5.9-1.5 2.4-2.5 4.4-2.5 3.6 0 5.7 3.7 4.2 7.2C19.5 16.4 12 21 12 21z";
const STAR = "M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7L2 9.2l7.1-.6z";
const QUOTE = "M3 21V12.5C3 7.5 6 4.3 10.5 3.5l.6 2.1C8.6 6.4 7.5 8 7.5 10H11v11H3zm10 0V12.5c0-5 3-8.2 7.5-9l.6 2.1c-2.5.8-3.6 2.4-3.6 4.4H21v11h-8z";

function FloatIcon({ className, tile, path, rotate, delay, px, py, reduce }) {
  return (
    <motion.div className={`tm-float ${className}`} style={{ x: px, y: py }} aria-hidden="true">
      <motion.div
        className={`tm-ico ${tile}`}
        style={{ rotate }}
        animate={reduce ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
      >
        <svg viewBox="0 0 24 24"><path d={path} /></svg>
      </motion.div>
    </motion.div>
  );
}

export default function Testimonials() {
  const reduce = useReducedMotion();
  const n = TESTIMONIALS.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const stage = useRef(null);
  const touchX = useRef(null);
  const parallaxA = useMouseParallax(stage, -18);
  const parallaxB = useMouseParallax(stage, 26);

  const go = useCallback((k) => setI(((k % n) + n) % n), [n]);

  useEffect(() => {
    if (reduce || paused) return undefined;
    const t = setInterval(() => setI((v) => (v + 1) % n), 6500);
    return () => clearInterval(t);
  }, [reduce, paused, n, i]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") go(i - 1);
    if (e.key === "ArrowRight") go(i + 1);
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const d = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(d) > 40) go(i + (d < 0 ? 1 : -1));
    touchX.current = null;
  };

  return (
    <section
      id="testimonials"
      className="tm"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={onKeyDown}
    >
      <div className="tm-blob tm-b1" />
      <div className="tm-blob tm-b2" />
      <motion.div
        className="tm-head"
        initial={reduce ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <small>Hear it from the people we build for</small>
        <h2 className="section-heading">What our <b>clients</b> say</h2>
      </motion.div>

      <div className="tm-stage" ref={stage}>
        <FloatIcon className="tm-i1" tile="" path={HEART} rotate={-12} delay={0} px={parallaxA.x} py={parallaxA.y} reduce={reduce} />
        <FloatIcon className="tm-i2" tile="tm-ico--soft" path={HEART} rotate={18} delay={-2} px={parallaxB.x} py={parallaxB.y} reduce={reduce} />
        <FloatIcon className="tm-i3" tile="tm-ico--red" path={STAR} rotate={10} delay={-4} px={parallaxA.x} py={parallaxB.y} reduce={reduce} />

        <div className="tm-bubble">
          <div className="tm-badge" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d={QUOTE} /></svg>
          </div>
          <div
            className="tm-view"
            aria-live={paused ? "polite" : "off"}
            onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={onTouchEnd}
          >
            <motion.div
              className="tm-track"
              animate={{ x: `${-100 * i}%` }}
              transition={reduce ? { duration: 0 } : { duration: 0.8, ease: EASE }}
            >
              {TESTIMONIALS.map((t, k) => (
                <motion.figure
                  key={`${t.name}-${k}`}
                  className="tm-slide"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${k + 1} of ${n}`}
                  aria-hidden={k !== i}
                  animate={{ opacity: k === i ? 1 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.6 }}
                >
                  <p>&ldquo;{t.quote}&rdquo;</p>
                  <figcaption className="tm-by">
                    <span className="tm-av" aria-hidden="true">{t.initials}</span>
                    <div>
                      <strong>{t.name}</strong>
                      <span className="tm-role">{t.role}</span>
                    </div>
                  </figcaption>
                </motion.figure>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="tm-ctl">
        <button type="button" className="tm-btn" aria-label="Previous testimonial" onClick={() => go(i - 1)}>
          <svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <div className="tm-dots">
          {TESTIMONIALS.map((t, k) => (
            <button
              key={`${t.name}-dot-${k}`}
              type="button"
              className="tm-dot"
              aria-label={`Go to testimonial ${k + 1}`}
              aria-current={k === i}
              onClick={() => go(k)}
            />
          ))}
        </div>
        <button type="button" className="tm-btn" aria-label="Next testimonial" onClick={() => go(i + 1)}>
          <svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </section>
  );
}
