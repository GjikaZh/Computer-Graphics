// Computer Graphics: Homework 1
// Author: 130919
// Campus 3D Scene 
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1d24) 

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 28, 40); 
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Resize Handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Ambient Light 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
scene.add(ambientLight)

// Ground (grass)
const planeGeometry = new THREE.PlaneGeometry(50, 50)
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x2ecc71 })
const ground = new THREE.Mesh(planeGeometry, planeMaterial)
ground.rotation.x = -Math.PI / 2
ground.position.y = 0
scene.add(ground)

// Straight road on the right 
const roadRGeometry = new THREE.BoxGeometry(5, 0.5, 50); // width, height, length 
const roadRMaterial = new THREE.MeshLambertMaterial({ color: 0x7f8c8d });
const rightRoad = new THREE.Mesh(roadRGeometry, roadRMaterial);

rightRoad.position.set(16, 0.25, 0);
scene.add(rightRoad);

// Straight road on the left
const roadLGeometry = new THREE.BoxGeometry(5, 0.5, 30); // width, height, length 
const roadLMaterial = new THREE.MeshLambertMaterial({ color: 0x7f8c8d });
const leftRoad = new THREE.Mesh(roadLGeometry, roadLMaterial);

leftRoad.position.set(-5, 0.25, 10);
scene.add(leftRoad);

// Diagonal bent road
const diagGeometry = new THREE.BoxGeometry(5, 0.5, 29); 
const diagMaterial = new THREE.MeshLambertMaterial({ color: 0x7f8c8d });
const diagonalRoad = new THREE.Mesh(diagGeometry, diagMaterial);

diagonalRoad.position.set(6, 0.25, -13);
diagonalRoad.rotation.y = -Math.PI / 3.8; // bent angle
scene.add(diagonalRoad);

// Purple Building 1 top right
const purpleBuildingGeo = new THREE.BoxGeometry(8, 6, 10); // width, height, depth
const purpleBuildingMat = new THREE.MeshStandardMaterial({ color: 0x9b59b6, roughness: 0.6, metalness: 0.15}); 
const purpleBuilding1 = new THREE.Mesh(purpleBuildingGeo, purpleBuildingMat);
purpleBuilding1.position.set(8, 3, -2); // X, Y = (half of height), Z
scene.add(purpleBuilding1);

// Purple Building 2 bottom righ
const purpleBuilding2 = new THREE.Mesh(purpleBuildingGeo, purpleBuildingMat);
purpleBuilding2.position.set(8, 3, 15); 
scene.add(purpleBuilding2);

// Orange Building
const orangeBuildingGeo = new THREE.BoxGeometry(8, 4, 12); // width, height, depth
const orangeBuildingMat = new THREE.MeshPhongMaterial({ color: 0xf39c12 }); 
const orangeBuilding = new THREE.Mesh(orangeBuildingGeo, orangeBuildingMat);

orangeBuilding.position.set(-14, 2, 1); // (Y = half of height)
scene.add(orangeBuilding);

// Blue Building
const blueBuildingGeo = new THREE.BoxGeometry(11, 7, 12); // width, height, depth
const blueBuildingMat = new THREE.MeshPhongMaterial({ color: 0x3498db }); 
const blueBuilding = new THREE.Mesh(blueBuildingGeo, blueBuildingMat);

blueBuilding.position.set(-15.5, 3.5, 18);
scene.add(blueBuilding);

// sidewalk of left side buildings
const sidewalkGeometry = new THREE.BoxGeometry(2.5, 0.70, 10); 
const sidewalkMaterial = new THREE.MeshStandardMaterial({ color: 0xbfbfbf }); // light gray

const sidewalk1 = new THREE.Mesh(sidewalkGeometry, sidewalkMaterial);
sidewalk1.position.set(-8.75, 0.35, 1);
scene.add(sidewalk1);

const sidewalk2 = new THREE.Mesh(sidewalkGeometry, sidewalkMaterial);
sidewalk2.position.set(-8.75, 0.35, 18);
scene.add(sidewalk2);

function Bench(x, z) {
  // SEAT
  const seatGeo = new THREE.BoxGeometry(2, 0.2, 0.6);
  const seatMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b });
  const seat = new THREE.Mesh(seatGeo, seatMat);
  seat.position.set(x, 1.2, z);
  seat.rotation.y = Math.PI / 2; 
  scene.add(seat);

  // LEGS 
  const legGeo = new THREE.BoxGeometry(0.15, 0.6, 0.4);
  const legMat = new THREE.MeshStandardMaterial({ color: 0x3a3a3a });

  const leg1 = new THREE.Mesh(legGeo, legMat);
  leg1.position.set(x, 0.8, z - 0.8); 
  leg1.rotation.y= Math.PI /2;
  scene.add(leg1);

  const leg2 = new THREE.Mesh(legGeo, legMat);
  leg2.position.set(x, 0.8, z + 0.8);
  leg2.rotation.y= Math.PI /2; 
  scene.add(leg2);
}
Bench(-8.25, -2);
Bench(-8.25, 2);
Bench(-8.25, 15);
Bench(-8.25, 19);

// sidewalk of right side buildings
const sidewalkRGeometry = new THREE.BoxGeometry(1.5, 0.70, 8); 
const sidewalkRMaterial = new THREE.MeshStandardMaterial({ color: 0xbfbfbf }); // light gray

const sidewalkR1 = new THREE.Mesh(sidewalkRGeometry, sidewalkRMaterial);
sidewalkR1.position.set(12.75, 0.35, -2);
scene.add(sidewalkR1);

const sidewalkR2 = new THREE.Mesh(sidewalkRGeometry, sidewalkRMaterial);
sidewalkR2.position.set(12.75, 0.35, 15);
scene.add(sidewalkR2);

// Tree Model
function Tree1(x, z) {
  // trunk
  const trunkGeo = new THREE.CylinderGeometry(0.35, 0.35, 2.7);
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
  const trunk = new THREE.Mesh(trunkGeo, trunkMat);
  trunk.position.set(x, 1.35, z);
  scene.add(trunk);

  // leafes
  const leafGeo = new THREE.SphereGeometry(2.0);
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x3b7d2a });

  const leaf1 = new THREE.Mesh(leafGeo, leafMat);
  leaf1.position.set(x, 4.2, z);
  scene.add(leaf1);

  const leaf2 = new THREE.Mesh(leafGeo, leafMat);
  leaf2.position.set(x + 0.6, 4.8, z + 0.3);
  scene.add(leaf2);

  const leaf3 = new THREE.Mesh(leafGeo, leafMat);
  leaf3.position.set(x - 0.6, 4.6, z - 0.3);
  scene.add(leaf3);

  const leaf4 = new THREE.Mesh(leafGeo, leafMat);
  leaf4.position.set(x, 4.0, z - 0.6);
  scene.add(leaf4);
}
// Cone Tree 
function Tree2(x, z) {
  // trunk 
  const trunkGeo = new THREE.CylinderGeometry(0.25, 0.25, 1.0);
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
  const trunk = new THREE.Mesh(trunkGeo, trunkMat);
  trunk.position.set(x, 0.5, z);
  scene.add(trunk);

  // cone 
  const coneGeo = new THREE.ConeGeometry(1.2, 7, 16); // radius, height, detail
  const coneMat = new THREE.MeshStandardMaterial({ color: 0x2f6e2e }); // dark green
  const cone = new THREE.Mesh(coneGeo, coneMat);
  cone.position.set(x, 4, z); 
  scene.add(cone);
}
// the trees on the diagoanl road
Tree1(8, -20);   
Tree1(2, -15);  
Tree1(-4, -10);  
Tree1(-10, -20);
Tree1(-16, -21);
Tree1(-22, -20.5);
Tree1(-13, -15);
Tree1(-19, -15.5);
Tree1(-22, -10);
Tree1(-16, -10);

// adding the trees on the right road
Tree2(21, -15);
Tree2(21, 0); 
Tree2(21, 15);   

// Bush/hedge wall along the edges of the right road
const bushR1Geo = new THREE.BoxGeometry(1, 1.5, 50); // thickness, height, length
const bushR1Mat = new THREE.MeshLambertMaterial({ color: 0x2e7d32 }); // deep green

const right1Bush = new THREE.Mesh(bushR1Geo, bushR1Mat);
right1Bush.position.set(
  19,                      // road x + half road width + half bush width
  0.75,                      // half the bush height
  0                         // same Z as road
);
scene.add(right1Bush);

const bushR2Geo = new THREE.BoxGeometry(1, 1.5, 10); // thickness, height, length
const bushR2Mat = new THREE.MeshLambertMaterial({ color: 0x2e7d32 });

const leftR1Bush = new THREE.Mesh(bushR2Geo, bushR2Mat);
leftR1Bush.position.set(13, 0.75, -11);
scene.add(leftR1Bush);

const bushR3Geo = new THREE.BoxGeometry(1, 1.5, 9); 
const bushR3Mat = new THREE.MeshLambertMaterial({ color: 0x2e7d32 }); 

const leftR2Bush = new THREE.Mesh(bushR3Geo, bushR3Mat);
leftR2Bush.position.set(13, 0.75, 6.5);
scene.add(leftR2Bush);

const bushR4Geo = new THREE.BoxGeometry(1, 1.5, 6);
const bushR4Mat = new THREE.MeshLambertMaterial({ color: 0x2e7d32 }); 

const leftR3Bush = new THREE.Mesh(bushR4Geo, bushR4Mat);
leftR3Bush.position.set(13, 0.75, 22);
scene.add(leftR3Bush);

const bushR5Geo = new THREE.BoxGeometry(1, 1.5, 2); 
const bushR5Mat = new THREE.MeshLambertMaterial({ color: 0x2e7d32 }); 

const leftR4Bush = new THREE.Mesh(bushR5Geo, bushR5Mat);
leftR4Bush.position.set(13, 0.75, -24);
scene.add(leftR4Bush);

// Bush/hedge wall along the edges of the left road
const bushL1Geo = new THREE.BoxGeometry(1, 1.5, 28); // thickness, height, length
const bushL1Mat = new THREE.MeshLambertMaterial({ color: 0x2e7d32 }); // deep green

const leftL1Bush = new THREE.Mesh(bushL1Geo, bushL1Mat);
leftL1Bush.position.set(-2, 0.75, 11);
scene.add(leftL1Bush);

const bushL2Geo = new THREE.BoxGeometry(1, 1.5, 7); 
const bushL2Mat = new THREE.MeshLambertMaterial({ color: 0x2e7d32 }); 

const leftL2Bush = new THREE.Mesh(bushL2Geo, bushL2Mat);
leftL2Bush.position.set(-8, 0.75, 9.5);
scene.add(leftL2Bush);

const bushL3Geo = new THREE.BoxGeometry(1, 1.5, 2); 
const bushL3Mat = new THREE.MeshLambertMaterial({ color: 0x2e7d32 }); 

const leftL3Bush = new THREE.Mesh(bushL3Geo, bushL3Mat);
leftL3Bush.position.set(-8, 0.75, 24);
scene.add(leftL3Bush);

const bushL4Geo = new THREE.BoxGeometry(1, 1.5, 2); 
const bushL4Mat = new THREE.MeshLambertMaterial({ color: 0x2e7d32 }); 

const leftL4Bush = new THREE.Mesh(bushL4Geo, bushL4Mat);
leftL4Bush.position.set(-8, 0.75, -5);
scene.add(leftL4Bush);

const bushL5Geo = new THREE.BoxGeometry(1, 1.5, 1); 
const bushL5Mat = new THREE.MeshLambertMaterial({ color: 0x2e7d32 }); 

const leftL5Bush = new THREE.Mesh(bushL5Geo, bushL5Mat);
leftL5Bush.position.set(-7, 0.75, -5.5);
scene.add(leftL5Bush);

// Adding the light posts
function LightPost(x, z) {
  const poleGeo = new THREE.CylinderGeometry(0.15, 0.15, 7);
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x3a3a3a });
  const pole = new THREE.Mesh(poleGeo, poleMat);
  pole.position.set(x, 3.5, z); 
  scene.add(pole);

  const armGeo = new THREE.BoxGeometry(2, 0.2, 0.2); 
  const arm = new THREE.Mesh(armGeo, poleMat);
  arm.position.set(x - 1, 6.8, z); 
  scene.add(arm);

  const light = new THREE.SpotLight(0xffffff, 2.5, 20, Math.PI / 4, 0.4, 1);
  light.position.set(x - 1, 6.8, z); 
  light.target.position.set(x - 1, 0, z); 
  scene.add(light);
  scene.add(light.target);
}

// right road
LightPost(19, -7.5);
LightPost(19, 7.5);
LightPost(19, 22);
LightPost(19, -22);
// left road
LightPost(-2, 0);
LightPost(-2, 10);
LightPost(-2, 20);

const moonLight = new THREE.DirectionalLight(0xddeeff, 0.1); 
moonLight.position.set(-20, 50, -10);
scene.add(moonLight);

// Render Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
