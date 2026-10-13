import * as THREE from "three";
import useThreeScene, { disposeScene } from "../../hooks/useThreeScene.js";

function build({ renderer, canvas, width, height }) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 4, 18);
  camera.lookAt(0, 0, 0);

  const group = new THREE.Group();
  scene.add(group);

  const charcoalMat = new THREE.MeshPhongMaterial({ color: 0x1a1818, specular: 0x2fb3e8, shininess: 90, flatShading: true });
  const redMat = new THREE.MeshPhongMaterial({ color: 0xe31b23, emissive: 0xd92328, emissiveIntensity: 0.15, specular: 0xffffff, shininess: 100, flatShading: true });
  const edgeMat = new THREE.LineBasicMaterial({ color: 0x2fb3e8, transparent: true, opacity: 0.8 });

  const size = 1.6;
  const gap = 0.15;
  const boxGeo = new THREE.BoxGeometry(size, size, size);
  const wireGeo = new THREE.EdgesGeometry(boxGeo);
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        if (x === 0 && y === 0 && z === 0) continue;
        const mesh = new THREE.Mesh(boxGeo, y === 1 ? charcoalMat : redMat);
        mesh.position.set(x * (size + gap), y * (size + gap), z * (size + gap));
        mesh.add(new THREE.LineSegments(wireGeo, edgeMat));
        group.add(mesh);
      }
    }
  }

  const navyRing = new THREE.Mesh(
    new THREE.TorusGeometry(6.6, 0.09, 16, 100),
    new THREE.MeshBasicMaterial({ color: 0x1b2a78, transparent: true, opacity: 0.9 }),
  );
  navyRing.rotation.x = Math.PI / 3;
  group.add(navyRing);
  const cyanRing = new THREE.Mesh(
    new THREE.TorusGeometry(7.4, 0.09, 16, 100),
    new THREE.MeshBasicMaterial({ color: 0x2fb3e8, transparent: true, opacity: 0.85 }),
  );
  cyanRing.rotation.y = Math.PI / 4;
  group.add(cyanRing);

  // Orbital dust
  const count = 130;
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const palette = [new THREE.Color(0x2fb3e8), new THREE.Color(0xe31b23), new THREE.Color(0x1b2a78)];
  for (let i = 0; i < count * 3; i += 3) {
    const r = 7.5 + Math.random() * 4.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    pos[i] = r * Math.sin(phi) * Math.cos(theta);
    pos[i + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i + 2] = r * Math.cos(phi);
    const rand = Math.random();
    const c = rand < 0.4 ? palette[0] : rand < 0.7 ? palette[1] : palette[2];
    col[i] = c.r; col[i + 1] = c.g; col[i + 2] = c.b;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  dustGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ size: 0.28, vertexColors: true, transparent: true, opacity: 0.85 }));
  group.add(dust);

  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const key = new THREE.DirectionalLight(0xffffff, 1.4); key.position.set(12, 18, 14); scene.add(key);
  const fill = new THREE.DirectionalLight(0x2fb3e8, 0.8); fill.position.set(-10, -5, -10); scene.add(fill);
  const red = new THREE.PointLight(0xe31b23, 1.8, 35); red.position.set(-6, -8, 8); scene.add(red);

  group.rotation.x = 0.45;
  group.rotation.y = -0.65;

  let dragging = false;
  let prev = { x: 0, y: 0 };
  let targetX = 0.45;
  const down = (e) => { dragging = true; prev = { x: e.clientX, y: e.clientY }; };
  const up = () => { dragging = false; };
  const move = (e) => {
    if (dragging) {
      group.rotation.y += (e.clientX - prev.x) * 0.008;
      group.rotation.x += (e.clientY - prev.y) * 0.008;
      prev = { x: e.clientX, y: e.clientY };
    } else {
      const r = canvas.getBoundingClientRect();
      targetX = 0.45 + ((e.clientY - (r.top + r.height / 2)) / r.height) * 0.4;
    }
  };
  canvas.addEventListener("pointerdown", down);
  window.addEventListener("pointerup", up);
  window.addEventListener("pointercancel", up);
  window.addEventListener("pointermove", move);

  return {
    render(t) {
      if (!dragging) {
        group.rotation.y += 0.004;
        group.rotation.x += (targetX - group.rotation.x) * 0.04;
      }
      navyRing.rotation.z += 0.006;
      cyanRing.rotation.z -= 0.005;
      dust.rotation.y -= 0.002;
      group.position.y = Math.sin(t * 1.5) * 0.35;
      renderer.render(scene, camera);
    },
    resize(w, h) { camera.aspect = w / h; camera.updateProjectionMatrix(); },
    dispose() {
      canvas.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      window.removeEventListener("pointermove", move);
      disposeScene(scene);
    },
  };
}

export default function HeroCube({ className = "" }) {
  const ref = useThreeScene(build);
  return <canvas ref={ref} className={className} style={{ touchAction: "pan-y" }} aria-hidden="true" />;
}
