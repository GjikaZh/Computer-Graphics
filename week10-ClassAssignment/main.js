import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('textures/Stylized_Stone_Floor_010_normal.png'); 

const material = new THREE.MeshBasicMaterial({
  map: texture
});

const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.3, 150, 20),
    material
);
scene.add(torusKnot);

function animate() {
    requestAnimationFrame(animate);
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();
