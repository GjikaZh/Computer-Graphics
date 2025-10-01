import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color:0x8B0000});
const cubeMesh = new THREE.Mesh(geometry,material);

// scene.add(cubeMesh);

// cubeMesh.position.x = 0.7;
// cubeMesh.position.y = -0.6;
// cubeMesh.position.z = 1;

//or  cubeMesh.position.set(0.7,-0.6,1);
// console.log("Distance of cube from camera", cubeMesh.position.distanceTo(camera.position));

// Axis helper
const axes = new THREE.AxesHelper(5);
scene.add(axes);

//Scaling object
// cubeMesh.scale.x = 2;
// cubeMesh.scale.y = 0.25;
// cubeMesh.scale.z = 0.5;

//Rotating
// cubeMesh.rotation.x = Math.PI * 0.25;
// cubeMesh.rotation.y = Math.PI * 0.25;

// cubeMesh.position.x = 0.7;
// cubeMesh.position.y = -0.6;
// cubeMesh.position.z = 1;
// cubeMesh.scale.x=2;
// cubeMesh.scale.y=0.25;
// cubeMesh.scale.z=0.5;
// cubeMesh.rotation.x = Math.PI * 0.25;
// cubeMesh.rotation.y = Math.PI * 0.25;

const group = new THREE.Group()
group.scale.y =2
group.scale.x =2
group.rotation.y=0.5
scene.add(group);

//CUBE 1
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:0x8B0000})
)

cube1.position.x = -1.5
group.add(cube1) 

//CUBE 2
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:0x8B0000}),
    cube1.rotation.x=0.25
)
cube2.position.x = 0
group.add(cube2)

//CUBE 3
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color:0x8B0000})
)
cube3.position.x = 1.5
group.add(cube3)



const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(2,2,5);
scene.add(light);

function animate(){
    requestAnimationFrame(animate);
    // cubeMesh.rotation.x +=0.01;
    // cubeMesh.rotation.y +=0.01;
    // cubeMesh.rotation.z +=0.01;
    renderer.render(scene,camera);

}

animate();
