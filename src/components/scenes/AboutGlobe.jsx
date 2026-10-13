import * as THREE from "three";
import useThreeScene, { disposeScene } from "../../hooks/useThreeScene.js";

function build({ renderer, width, height }) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
  camera.position.z = 16;
  const globe = new THREE.Group();
  scene.add(globe);

  globe.add(new THREE.Mesh(
    new THREE.SphereGeometry(6, 36, 36),
    new THREE.MeshBasicMaterial({ color: 0x1b2a78, wireframe: true, transparent: true, opacity: 0.35 }),
  ));
  globe.add(new THREE.Mesh(
    new THREE.SphereGeometry(5.85, 24, 24),
    new THREE.MeshBasicMaterial({ color: 0xf1f5f9, transparent: true, opacity: 0.85 }),
  ));
  for (let i = -4; i <= 4; i += 2) {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(5.95, 6.02, 64),
      new THREE.MeshBasicMaterial({ color: 0x2fb3e8, side: THREE.DoubleSide, transparent: true, opacity: 0.4 }),
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = i * 1.2;
    const s = Math.cos((i * 1.2) / 6);
    ring.scale.set(s, s, s);
    globe.add(ring);
  }
  const beacon = new THREE.Mesh(
    new THREE.SphereGeometry(0.38, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xe31b23, transparent: true, opacity: 0.95 }),
  );
  beacon.position.set(4.2, 2.5, 3.4); // Indore HQ marker
  globe.add(beacon);

  globe.rotation.x = 0.2;
  return {
    render(t) {
      globe.rotation.y += 0.003;
      beacon.scale.setScalar(1 + Math.sin(t * 3) * 0.12);
      renderer.render(scene, camera);
    },
    resize(w, h) { camera.aspect = w / h; camera.updateProjectionMatrix(); },
    dispose() { disposeScene(scene); },
  };
}

export default function AboutGlobe() {
  const ref = useThreeScene(build);
  return <canvas ref={ref} className="w-full h-full block" role="img" aria-label="Rotating globe showing global reach" />;
}
