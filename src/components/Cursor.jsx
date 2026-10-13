import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, input, select, textarea, [data-cursor]";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return undefined;
    let mx = -100, my = -100, rx = -100, ry = -100, raf = 0;
    const place = (el, x, y) => { el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`; };
    const move = (e) => { mx = e.clientX; my = e.clientY; place(dot.current, mx, my); };
    const over = (e) => ring.current.classList.toggle("active", Boolean(e.target.closest?.(INTERACTIVE)));
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      place(ring.current, rx, ry);
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    document.addEventListener("mouseover", over);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="custom-cursor-dot" aria-hidden="true" />
      <div ref={ring} className="custom-cursor-ring" aria-hidden="true" />
    </>
  );
}
