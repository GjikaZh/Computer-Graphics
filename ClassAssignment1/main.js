import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Axis helper
const axes = new THREE.AxesHelper(10);
scene.add(axes);

// Group
const group = new THREE.Group();
scene.add(group);

// TORUS
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(5, 1.5, 16, 100),
  new THREE.MeshStandardMaterial({ color: 0xFFB6C1 })
);
torus.position.x = -12;
group.add(torus);

// SPHERE
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0xFF0000 })
);
sphere.position.x = 0;
group.add(sphere);

// HEART
const heartShape = new THREE.Shape();
heartShape.moveTo(5, 5);
heartShape.bezierCurveTo(5, 5, 4, 0, 0, 0);
heartShape.bezierCurveTo(-6, 0, -6, 7, -6, 7);
heartShape.bezierCurveTo(-6, 11, -3, 15.4, 5, 19);
heartShape.bezierCurveTo(12, 15.4, 16, 11, 16, 7);
heartShape.bezierCurveTo(16, 7, 16, 0, 10, 0);
heartShape.bezierCurveTo(7, 0, 5, 5, 5, 5);

const heart = new THREE.Mesh(
  new THREE.ShapeGeometry(heartShape),
  new THREE.MeshStandardMaterial({ color: 0x0000FF })
);
heart.scale.set(0.5, 0.5, 0.5);
heart.position.x = 12;
group.add(heart);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 15);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
