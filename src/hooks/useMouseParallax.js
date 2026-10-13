import { useEffect } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/** Returns spring-smoothed x/y motion values that follow the pointer inside `ref`. */
export default function useMouseParallax(ref, strength = 14) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 80, damping: 16 });
  const sy = useSpring(y, { stiffness: 80, damping: 16 });

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || window.matchMedia("(hover: none)").matches) return undefined;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      x.set(((e.clientX - r.left) / r.width - 0.5) * strength);
      y.set(((e.clientY - r.top) / r.height - 0.5) * strength);
    };
    const leave = () => { x.set(0); y.set(0); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [ref, reduce, strength, x, y]);

  return { x: sx, y: sy };
}
