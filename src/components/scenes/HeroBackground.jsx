import * as THREE from "three";
import useThreeScene, { disposeScene } from "../../hooks/useThreeScene.js";

function build({ renderer, width, height }) {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xf8fafc, 0.018);
  const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
  camera.position.set(0, 14, 32);
  camera.lookAt(0, 0, -15);

  const geo = new THREE.PlaneGeometry(140, 120, 54, 46);
  geo.rotateX(-Math.PI / 2.3);
  geo.translate(0, -6, -20);
  const orig = new Float32Array(geo.attributes.position.array);
  scene.add(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x1b2a78, wireframe: true, transparent: true, opacity: 0.15 })));

  const count = geo.attributes.position.count;
  const ptsPos = new Float32Array(orig);
  const ptsCol = new Float32Array(count * 3);
  const cyan = new THREE.Color(0x2fb3e8), red = new THREE.Color(0xe31b23), navy = new THREE.Color(0x1b2a78);
  for (let i = 0; i < count; i++) {
    const r = Math.random();
    const c = r < 0.5 ? cyan : r < 0.75 ? navy : red;
    ptsCol[i * 3] = c.r; ptsCol[i * 3 + 1] = c.g; ptsCol[i * 3 + 2] = c.b;
  }
  const ptsGeo = new THREE.BufferGeometry();
  ptsGeo.setAttribute("position", new THREE.BufferAttribute(ptsPos, 3));
  ptsGeo.setAttribute("color", new THREE.BufferAttribute(ptsCol, 3));
  scene.add(new THREE.Points(ptsGeo, new THREE.PointsMaterial({ size: 0.36, vertexColors: true, transparent: true, opacity: 0.75 })));

  const stars = 110;
  const sPos = new Float32Array(stars * 3);
  const sCol = new Float32Array(stars * 3);
  for (let i = 0; i < stars * 3; i += 3) {
    sPos[i] = (Math.random() - 0.5) * 80;
    sPos[i + 1] = Math.random() * 30 + 2;
    sPos[i + 2] = (Math.random() - 0.5) * 50 - 10;
    const c = Math.random() > 0.4 ? cyan : navy;
    sCol[i] = c.r; sCol[i + 1] = c.g; sCol[i + 2] = c.b;
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
  starGeo.setAttribute("color", new THREE.BufferAttribute(sCol, 3));
  const starField = new THREE.Points(starGeo, new THREE.PointsMaterial({ size: 0.4, vertexColors: true, transparent: true, opacity: 0.6 }));
  scene.add(starField);

  let mx = 0, my = 0, scrollSmooth = 0, lastScroll = 0, clock = 0;
  const onMove = (e) => {
    mx = (e.clientX / window.innerWidth) * 2 - 1;
    my = -(e.clientY / window.innerHeight) * 2 + 1;
  };
  window.addEventListener("pointermove", onMove);

  return {
    render() {
      scrollSmooth += (window.scrollY - scrollSmooth) * 0.08;
      const speed = Math.abs(scrollSmooth - lastScroll);
      lastScroll = scrollSmooth;
      clock += 0.015 + speed * 0.002;

      const depth = Math.min(scrollSmooth / 900, 1.2);
      camera.position.x += (mx * 10 - camera.position.x) * 0.05;
      camera.position.y += (14 + my * 5 - depth * 10 - camera.position.y) * 0.05;
      camera.position.z += (32 - depth * 22 - camera.position.z) * 0.05;
      camera.lookAt(mx * 2, -2 - depth * 4, -20);

      const arr = geo.attributes.position.array;
      const mwx = mx * 35;
      const mwz = -my * 25;
      for (let i = 0; i < count; i++) {
        const ox = orig[i * 3];
        const oy = orig[i * 3 + 1];
        let w = Math.sin(ox * 0.12 + clock * 1.5) * 2.2 + Math.cos(oy * 0.14 + clock * 1.2) * 1.8 + Math.sin((ox + oy) * 0.08 + clock);
        const dx = ox - mwx;
        const dy = oy - mwz;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 28) w += Math.sin(d * 0.45 - clock * 4) * Math.exp(-d * 0.09) * 2.8;
        arr[i * 3 + 1] = oy + w;
        ptsPos[i * 3 + 1] = oy + w;
      }
      geo.attributes.position.needsUpdate = true;
      ptsGeo.attributes.position.needsUpdate = true;
      starField.rotation.y += 0.0008;
      renderer.render(scene, camera);
    },
    resize(w, h) { camera.aspect = w / h; camera.updateProjectionMatrix(); },
    dispose() { window.removeEventListener("pointermove", onMove); disposeScene(scene); },
  };
}

export default function HeroBackground() {
  const ref = useThreeScene(build);
  return <canvas ref={ref} className="section-canvas" aria-hidden="true" />;
}
