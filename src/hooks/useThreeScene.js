import { useEffect, useRef } from "react";
import * as THREE from "three";

export function disposeScene(scene) {
  scene.traverse((o) => {
    if (o.geometry) o.geometry.dispose();
    if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
  });
}

/**
 * Mounts a WebGL scene on a <canvas>. `build` receives { renderer, canvas, width, height }
 * and returns { render(timeSeconds), resize(w, h), dispose() }.
 * The loop pauses while off-screen and only renders once for reduced-motion users.
 */
export default function useThreeScene(build) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch (err) {
      return undefined; // WebGL unavailable: the page still works without the visual
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const size = () => [canvas.clientWidth || 1, canvas.clientHeight || 1];
    const [w, h] = size();
    renderer.setSize(w, h, false);

    const api = build({ renderer, canvas, width: w, height: h });
    let raf = 0;
    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      api.render(now / 1000);
    };
    const start = () => { if (!raf && !reduce) raf = requestAnimationFrame(frame); };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    api.render(0);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      const [nw, nh] = size();
      renderer.setSize(nw, nh, false);
      api.resize(nw, nh);
      api.render(performance.now() / 1000);
    });
    ro.observe(canvas);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      if (api.dispose) api.dispose();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return canvasRef;
}
