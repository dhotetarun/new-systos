import * as THREE from "three";
import useThreeScene, { disposeScene } from "../../hooks/useThreeScene.js";

function build({ renderer, width, height }) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.z = 25;
  const count = 120;
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const a = new THREE.Color(0x2fb3e8), b = new THREE.Color(0xe31b23);
  for (let i = 0; i < count * 3; i += 3) {
    pos[i] = (Math.random() - 0.5) * 50;
    pos[i + 1] = (Math.random() - 0.5) * 35;
    pos[i + 2] = (Math.random() - 0.5) * 20;
    const c = Math.random() > 0.5 ? a : b;
    col[i] = c.r; col[i + 1] = c.g; col[i + 2] = c.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  const points = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.35, vertexColors: true, transparent: true, opacity: 0.45 }));
  scene.add(points);
  return {
    render() { points.rotation.z += 0.002; points.rotation.y += 0.001; renderer.render(scene, camera); },
    resize(w, h) { camera.aspect = w / h; camera.updateProjectionMatrix(); },
    dispose() { disposeScene(scene); },
  };
}

export default function ParticleBackground({ className = "section-canvas opacity-45" }) {
  const ref = useThreeScene(build);
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
