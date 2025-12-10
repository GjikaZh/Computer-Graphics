import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("scene").appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);
camera.position.set(1, 0, 5);
scene.add(camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const cubes = [];
let lastSelectedCube = null;
let lastSelectedCubeColor = null;

const infoPanel = document.getElementById("infoPanel");

// Animation variables 
let animateCube = null;
let animationStart = 0;

// Create 30 random cubes
for (let i = 0; i < 30; i++) {
    const size = randBetween(0.2, 1);
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({ color: getRandomColor() });
    const cube = new THREE.Mesh(geometry, material);

    cube.position.set(
        randBetween(-4, 4),
        randBetween(-4, 4),
        randBetween(-5, 0)
    );

    cube.userData.size = size;

    scene.add(cube);
    cubes.push(cube);
}

window.addEventListener("click", (event) => {
    const rect = renderer.domElement.getBoundingClientRect();

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(cubes);

    if (intersects.length > 0) {
        const selectedCube = intersects[0].object;

        // Remove highlight from old selected cube
        if (lastSelectedCube && lastSelectedCube !== selectedCube) {
            lastSelectedCube.material.color.set(lastSelectedCubeColor);
        }

        // Only save the original color if selecting a diff cube
        if (lastSelectedCube !== selectedCube) {
            lastSelectedCube = selectedCube;
            lastSelectedCubeColor = selectedCube.material.color.getHex();
        }

        // Highlight selected cube
        selectedCube.material.color.set(0xffffff);

        const p = selectedCube.position;
        const size = selectedCube.userData.size;

        infoPanel.textContent =
            `Cube Selected:
Position → ( ${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)} )
Size → ${size.toFixed(2)} x ${size.toFixed(2)} x ${size.toFixed(2)}`;

        // Start animation
        animateCube = selectedCube;
        animationStart = performance.now();

    } else {
        // Clicked empty space
        if (lastSelectedCube) {
            lastSelectedCube.material.color.set(lastSelectedCubeColor);
            lastSelectedCube = null;
        }
        infoPanel.textContent = "No object selected.";
    }
});

// Resize handling
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

function animate() {
    controls.update();

    // aniamtion
    if (animateCube) {
        const elapsed = performance.now() - animationStart;

        const scale = 1 + Math.sin(elapsed * 0.02) * 0.3;
        animateCube.scale.set(scale, scale, scale);

        if (elapsed > 1000) {
            animateCube.scale.set(1, 1, 1);
            animateCube = null;
        }
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();

// Helper functions
function randBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomColor() {
    return Math.random() * 0xffffff;
}
