import * as THREE from "three";
import useThreeScene, { disposeScene } from "../../hooks/useThreeScene.js";

function build({ renderer, width, height }) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.z = 25;
  const r1 = new THREE.Mesh(new THREE.TorusGeometry(14, 0.08, 16, 100), new THREE.MeshBasicMaterial({ color: 0x2fb3e8, transparent: true, opacity: 0.25 }));
  const r2 = new THREE.Mesh(new THREE.TorusGeometry(18, 0.08, 16, 100), new THREE.MeshBasicMaterial({ color: 0xe31b23, transparent: true, opacity: 0.2 }));
  scene.add(r1, r2);
  return {
    render() {
      r1.rotation.x += 0.003; r1.rotation.y += 0.004;
      r2.rotation.z -= 0.002; r2.rotation.y -= 0.003;
      renderer.render(scene, camera);
    },
    resize(w, h) { camera.aspect = w / h; camera.updateProjectionMatrix(); },
    dispose() { disposeScene(scene); },
  };
}

export default function GyroBackground() {
  const ref = useThreeScene(build);
  return <canvas ref={ref} className="section-canvas" aria-hidden="true" />;
}
