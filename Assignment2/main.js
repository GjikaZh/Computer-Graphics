// Computer Graphics: Homework 2
// Author: 130919
// Campus 3D Scene 
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import GUI from 'lil-gui';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1d24) 

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(16, 24, 44); 
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Animation helper
const streetLights = []; // store SpotLights here for pulsing
const clock = new THREE.Clock(); // this gives us elapsed time

// Gui 
const gui = new GUI();
const lightControls = {
  streetLights: true
};
gui.add(lightControls, 'streetLights').name('Street Lights');

// Click interaction helpers
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const clickableBuildings = [];

// Texture Loader
const textureLoader = new THREE.TextureLoader();
function makeRepeat(tex, repeatX, repeatY) {
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  return tex;
}
// Textures
const grassTex = makeRepeat(textureLoader.load('textures/grass3.jpg'), 8, 8);
const roadTex = makeRepeat(textureLoader.load('textures/road2.jpg'), 2, 10);
const wall1Tex = makeRepeat(textureLoader.load('textures/wall4.jpg'), 2, 2);
const wall2Tex = makeRepeat(textureLoader.load('textures/brick2.jpg'), 2, 2);
const wall3Tex = makeRepeat(textureLoader.load('textures/wall1.jpg'), 2, 2);
const wall4Tex = makeRepeat(textureLoader.load('textures/wall5.jpg'), 2, 2);
const concreteTex = makeRepeat(textureLoader.load('textures/concrete1.jpg'), 2, 2);
const seatTex = makeRepeat(textureLoader.load('textures/woodchair.jpg'), 1, 1);
const roofTex = makeRepeat(textureLoader.load('textures/roof.jpg'), 1, 1);
// Interaction textures 
const interaction1Tex = makeRepeat(textureLoader.load('textures/interaction1.jpg'), 2, 2);
const interaction2Tex = makeRepeat(textureLoader.load('textures/interaction2.jpg'), 2, 2);
const interaction3Tex = makeRepeat(textureLoader.load('textures/interaction3.jpg'), 2, 2);
const interaction4Tex = makeRepeat(textureLoader.load('textures/interaction4.jpg'), 2, 2);

// Resize Handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Ambient Light 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.28)
scene.add(ambientLight)

// Ground (grass)
const planeGeometry = new THREE.PlaneGeometry(50, 50)
const planeMaterial = new THREE.MeshStandardMaterial({
  map: grassTex,
  roughness: 1,
  metalness: 0
});
const ground = new THREE.Mesh(planeGeometry, planeMaterial)
ground.rotation.x = -Math.PI / 2
ground.position.y = 0
scene.add(ground)

// Straight road on the right 
const roadRGeometry = new THREE.BoxGeometry(5, 0.5, 50); 
const roadRMaterial = new THREE.MeshStandardMaterial({
  map: roadTex,
  roughness: 1,
  metalness: 0
});
const rightRoad = new THREE.Mesh(roadRGeometry, roadRMaterial);

rightRoad.position.set(16, 0.25, 0);
scene.add(rightRoad);

// Straight road on the left
const roadLGeometry = new THREE.BoxGeometry(5, 0.5, 30); 
const roadLMaterial = new THREE.MeshStandardMaterial({
  map: roadTex,
  roughness: 1,
  metalness: 0
});
const leftRoad = new THREE.Mesh(roadLGeometry, roadLMaterial);

leftRoad.position.set(-5, 0.25, 10);
scene.add(leftRoad);

// Diagonal bent road
const diagGeometry = new THREE.BoxGeometry(5, 0.5, 29); 
const diagMaterial = new THREE.MeshStandardMaterial({
  map: roadTex,
  roughness: 1,
  metalness: 0
});
const diagonalRoad = new THREE.Mesh(diagGeometry, diagMaterial);

diagonalRoad.position.set(6, 0.25, -13);
diagonalRoad.rotation.y = -Math.PI / 3.8; // bent angle
scene.add(diagonalRoad);

// Model Load
const gltfLoader = new GLTFLoader();

// 1) Flowerpot model
gltfLoader.load(
  'models/FLOWERPOT.glb',
  (gltf) => {
    const flowerPot1 = gltf.scene;
    flowerPot1.scale.set(0.8, 0.8, 0.8);
    flowerPot1.position.set(12.78, 0.72, -4.75);
    scene.add(flowerPot1);

    // 2nd flower pot (clone)
    const flowerPot2 = flowerPot1.clone(true);
    flowerPot2.position.set(12.78, 0.72, 12.20);
    scene.add(flowerPot2);
  },
  undefined,
  (error) => {
    console.error('Error loading FLOWERPOT:', error);
  }
);
// 2) Chair model
gltfLoader.load(
  'models/uploads_files_2890454_cadeira.glb',
  (gltf) => {
    const chair1 = gltf.scene;
    chair1.scale.set(0.8, 0.8, 0.8);
    chair1.position.set(13.3, -0.4, -0.5);
    chair1.rotation.y = Math.PI / 2;
    scene.add(chair1);

    // 2nd chair (clone)
    const chair2 = chair1.clone(true);
    chair2.position.set(13.3, -0.4, 16.65);
    scene.add(chair2);
  },
  undefined,
  (error) => {
    console.error('Error loading CHAIR:', error);
  }
);

//roof material
const roofMat = new THREE.MeshStandardMaterial({
  map: roofTex,
  roughness: 1,
  metalness: 0
});

// Purple Building 1 top right
const purpleBuildingGeo = new THREE.BoxGeometry(8, 6, 10); 
const purpleBuilding1Mat = new THREE.MeshStandardMaterial
({
   map: wall1Tex, 
   roughness: 0.6, 
   metalness: 0.15
}); 
const purpleBuilding1 = new THREE.Mesh(purpleBuildingGeo, purpleBuilding1Mat);
purpleBuilding1.position.set(8, 3, -2); 
scene.add(purpleBuilding1);
purpleBuilding1.userData.originalMap = purpleBuilding1.material.map;
purpleBuilding1.userData.newMap = interaction1Tex;
purpleBuilding1.userData.isSwapped = false;
clickableBuildings.push(purpleBuilding1);

const roofPurple1Geo = new THREE.BoxGeometry(9, 0.35, 10.2);
const roofPurple1 = new THREE.Mesh(roofPurple1Geo, roofMat);
roofPurple1.position.set(8, 6.125, -2);
scene.add(roofPurple1);

// Purple Building 2 bottom righ
const purpleBuilding2Mat = new THREE.MeshStandardMaterial
({
   map: wall4Tex, 
   roughness: 0.6, 
   metalness: 0.15
}); 
const purpleBuilding2 = new THREE.Mesh(purpleBuildingGeo, purpleBuilding2Mat);
purpleBuilding2.position.set(8, 3, 15); 
scene.add(purpleBuilding2);
purpleBuilding2.userData.originalMap = purpleBuilding2.material.map;
purpleBuilding2.userData.newMap = interaction2Tex;
purpleBuilding2.userData.isSwapped = false;
clickableBuildings.push(purpleBuilding2);

const roofPurple2Geo = new THREE.BoxGeometry(9, 0.35, 10.2);
const roofPurple2 = new THREE.Mesh(roofPurple2Geo, roofMat);
roofPurple2.position.set(8, 6.125, 15);
scene.add(roofPurple2);

// Orange Building
const orangeBuildingGeo = new THREE.BoxGeometry(8, 4, 12); 
const orangeBuildingMat = new THREE.MeshStandardMaterial
({
   map: wall2Tex, 
   roughness: 0.6, 
   metalness: 0.15
}); 
const orangeBuilding = new THREE.Mesh(orangeBuildingGeo, orangeBuildingMat);

orangeBuilding.position.set(-14, 2, 1); 
scene.add(orangeBuilding);
orangeBuilding.userData.originalMap = orangeBuilding.material.map;
orangeBuilding.userData.newMap = interaction3Tex;
orangeBuilding.userData.isSwapped = false;
clickableBuildings.push(orangeBuilding);

const roofOrangeGeo = new THREE.BoxGeometry(9, 0.35, 12.2);
const roofOrange = new THREE.Mesh(roofOrangeGeo, roofMat);
roofOrange.position.set(-14, 4.125, 1);
scene.add(roofOrange);

// Glass material
const glassMat = new THREE.MeshStandardMaterial({
  color: 0x99ccff,
  transparent: true,
  opacity: 0.35,
  roughness: 0.1,
  metalness: 0,
  depthWrite: false,
  side: THREE.DoubleSide
});

// Base wall material 
const blueWallMat = new THREE.MeshStandardMaterial({
  map: wall3Tex,
  roughness: 0.6,
  metalness: 0.15
});

// Invisible material for the FRONT face
const blueFrontInvisibleMat = new THREE.MeshStandardMaterial({
  transparent: true,
  opacity: 0
});

// BoxGeometry face order: [right, left, top, bottom, front, back]
const blueBuildingMats = [
  blueWallMat,            
  blueWallMat,            
  blueWallMat,            
  blueWallMat,            
  blueFrontInvisibleMat,  
  blueWallMat             
];

// Blue Building
const blueBuildingGeo = new THREE.BoxGeometry(11, 7, 12); 
const blueBuilding = new THREE.Mesh(blueBuildingGeo, blueBuildingMats);
blueBuilding.position.set(-15.5, 3.5, 18);
scene.add(blueBuilding);
blueBuilding.userData.originalMaps = blueBuilding.material.map((m) => m.map);
blueBuilding.userData.newMap = interaction4Tex;
blueBuilding.userData.isSwapped = false;
clickableBuildings.push(blueBuilding);

// Roof
const roofBlueGeo = new THREE.BoxGeometry(11.8, 0.35, 12.2);
const roofBlue = new THREE.Mesh(roofBlueGeo, roofMat);
roofBlue.position.set(-15.5, 7.125, 18);
scene.add(roofBlue);

// Window frame (4 pieces)
const frameMat = blueWallMat;

const frontZ = 24.02;      
const frameDepth = 0.25;

const winW = 6;
const winH = 3;

const bW = 11;
const bH = 7;

const sideW = (bW - winW) / 2;
const topH  = (bH - winH) / 2; 

// Left frame
const frameLeft = new THREE.Mesh(
  new THREE.BoxGeometry(sideW, winH, frameDepth),
  frameMat
);
frameLeft.position.set(-15.5 - (winW/2 + sideW/2), 3.5, frontZ);
scene.add(frameLeft);

// Right frame
const frameRight = new THREE.Mesh(
  new THREE.BoxGeometry(sideW, winH, frameDepth),
  frameMat
);
frameRight.position.set(-15.5 + (winW/2 + sideW/2), 3.5, frontZ);
scene.add(frameRight);

// Top frame
const frameTop = new THREE.Mesh(
  new THREE.BoxGeometry(bW, topH, frameDepth),
  frameMat
);
frameTop.position.set(-15.5, 3.5 + (winH/2 + topH/2), frontZ);
scene.add(frameTop);

// Bottom frame
const frameBottom = new THREE.Mesh(
  new THREE.BoxGeometry(bW, topH, frameDepth),
  frameMat
);
frameBottom.position.set(-15.5, 3.5 - (winH/2 + topH/2), frontZ);
scene.add(frameBottom);

// Glass panel
const blueGlassGeo = new THREE.BoxGeometry(6, 3, 0.1);
const blueGlass = new THREE.Mesh(blueGlassGeo, glassMat);
blueGlass.position.set(-15.5, 3.5, 24.06);
blueGlass.renderOrder = 10;
scene.add(blueGlass);

// Interior object 
const insideObj = new THREE.Mesh(
  new THREE.BoxGeometry(1.2, 1.2, 1.2),
  new THREE.MeshStandardMaterial({ color: 0xff0000 })
);
insideObj.position.set(-15.5, 3.2, 21.5); // inside the building
scene.add(insideObj);

// Interior light 
const insideLight = new THREE.PointLight(0xffffff, 1, 15);
insideLight.position.set(-15.5, 4.5, 21.5);
scene.add(insideLight);

// Simple interior room 
const roomMat = new THREE.MeshStandardMaterial({
  color: 0xdddddd,
  side: THREE.DoubleSide,
  roughness: 0.9,
  metalness: 0
});

// Interior sizes (a bit smaller than building)
const roomW = 10.5;
const roomH = 6.5;
const roomD = 11.5;

// Building center
const bx = -15.5;
const by = 3.5;
const bz = 18;

// Back wall (inside)
const backWall = new THREE.Mesh(new THREE.PlaneGeometry(roomW, roomH), roomMat);
backWall.position.set(bx, by, bz - (roomD / 2));
backWall.rotation.y = Math.PI; // face toward window
scene.add(backWall);

// Left wall
const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(roomD, roomH), roomMat);
leftWall.position.set(bx - (roomW / 2), by, bz);
leftWall.rotation.y = Math.PI / 2;
scene.add(leftWall);

// Right wall
const rightWallIn = new THREE.Mesh(new THREE.PlaneGeometry(roomD, roomH), roomMat);
rightWallIn.position.set(bx + (roomW / 2), by, bz);
rightWallIn.rotation.y = -Math.PI / 2;
scene.add(rightWallIn);

// Floor
const floorIn = new THREE.Mesh(new THREE.PlaneGeometry(roomW, roomD), roomMat);
floorIn.position.set(bx, by - (roomH / 2), bz);
floorIn.rotation.x = -Math.PI / 2;
scene.add(floorIn);

// Ceiling
const ceilingIn = new THREE.Mesh(new THREE.PlaneGeometry(roomW, roomD), roomMat);
ceilingIn.position.set(bx, by + (roomH / 2), bz);
ceilingIn.rotation.x = Math.PI / 2;
scene.add(ceilingIn);

// Sidewalk of left side buildings
const sidewalkGeometry = new THREE.BoxGeometry(2.5, 0.70, 10); 
const sidewalkMaterial = new THREE.MeshStandardMaterial({
  map: concreteTex,
  roughness: 1,
  metalness: 0
});
const sidewalk1 = new THREE.Mesh(sidewalkGeometry, sidewalkMaterial);
sidewalk1.position.set(-8.75, 0.35, 1);
scene.add(sidewalk1);

const sidewalk2 = new THREE.Mesh(sidewalkGeometry, sidewalkMaterial);
sidewalk2.position.set(-8.75, 0.35, 18);
scene.add(sidewalk2);

function Bench(x, z) {
  // Seat
  const seatGeo = new THREE.BoxGeometry(2, 0.2, 0.6);
  const seatMat = new THREE.MeshStandardMaterial
({
   map: seatTex, 
   roughness: 0.6, 
   metalness: 0.15
}); 
  const seat = new THREE.Mesh(seatGeo, seatMat);
  seat.position.set(x, 1.2, z);
  seat.rotation.y = Math.PI / 2; 
  scene.add(seat);

  // Legs of the seat 
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

// Sidewalk of right side buildings
const sidewalkRGeometry = new THREE.BoxGeometry(1.5, 0.70, 8); 
const sidewalkRMaterial = new THREE.MeshStandardMaterial({
  map: concreteTex,
  roughness: 1,
  metalness: 0
});
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

  // Leaves
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

// tTe trees on the diagonal road
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

// Adding the trees on the right road
Tree2(21, -15);
Tree2(21, 0); 
Tree2(21, 15);   

// Bush/hedge wall along the edges of the right road
const bushR1Geo = new THREE.BoxGeometry(1, 1.5, 50); 
const bushR1Mat =new THREE.MeshLambertMaterial({ color: 0x2e7d32 });

const right1Bush = new THREE.Mesh(bushR1Geo, bushR1Mat);
right1Bush.position.set(19, 0.75, 0);
scene.add(right1Bush);

const bushR2Geo = new THREE.BoxGeometry(1, 1.5, 10);
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
const bushL1Geo = new THREE.BoxGeometry(1, 1.5, 28);
const bushL1Mat = new THREE.MeshLambertMaterial({ color: 0x2e7d32 });

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
  streetLights.push(light);

  // visible bulb so the pulse is obvious
  const bulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 16, 16),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 1
    })
  );
bulb.position.set(x - 1, 6.8, z);
scene.add(bulb);
light.userData.bulb = bulb;

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

const moonLight = new THREE.DirectionalLight(0xddeeff, 0.2); 
moonLight.position.set(-20, 50, -10);
scene.add(moonLight);

function swapBuildingTexture(building) {
  // Blue building: material is an array
  if (Array.isArray(building.material)) {
    const swapped = building.userData.isSwapped;

    for (let i = 0; i < building.material.length; i++) {
      if (i === 4) continue;

      building.material[i].map = swapped
        ? building.userData.originalMaps[i]
        : building.userData.newMap;

      building.material[i].needsUpdate = true;
    }

    building.userData.isSwapped = !swapped;
    return;
  }

  const swapped = building.userData.isSwapped;

  building.material.map = swapped
    ? building.userData.originalMap
    : building.userData.newMap;

  building.material.needsUpdate = true;
  building.userData.isSwapped = !swapped;
}

window.addEventListener('pointerdown', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const hits = raycaster.intersectObjects(clickableBuildings, true);
  if (hits.length === 0) return;

  let obj = hits[0].object;
  while (obj && !clickableBuildings.includes(obj)) obj = obj.parent;

  if (obj) swapBuildingTexture(obj);
});

// Render Loop
function animate() {
  requestAnimationFrame(animate);

  const t = clock.getElapsedTime();

  // Street light pulse animation
  for (const light of streetLights) {
    if (!lightControls.streetLights) {
      light.intensity = 0;
      if (light.userData.bulb) {
        light.userData.bulb.material.emissiveIntensity = 0;
      }
      continue;
  }
  const pulse = 0.5 + 0.5 * Math.sin(t * 2.0);
  light.intensity = 1.2 + pulse * 4.0;

  if (light.userData.bulb) {
    light.userData.bulb.material.emissiveIntensity = 0.5 + pulse * 4.0;
    }
  }
  controls.update();
  renderer.render(scene, camera);
}
animate();