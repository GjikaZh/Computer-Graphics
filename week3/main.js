import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
//const geometry = new THREE.SphereGeometry(1, 32, 32);
//const geometry = new THREE.CylinderGeometry(1,1 , 2, 32);
//const geometry = new THREE.ConeGeometry(1 , 2, 10);

//const material = new THREE.MeshBasicMaterial({color:0xff0000, wireframe: true});
//const material = new THREE.MeshLambertMaterial({color: 0x8844ff});
// const material = new THREE.MeshStandardMaterial({
//     color: 0x8844ff,      //purple diffuse base
//     metalness: 0.4,       //controls how refletive the surface is
//     roughness: 0.3,       //controls smoothness (lower = more mirror-like)
//     emissive: 0x220044,   //adds a faint self-glow
// });


const material = new THREE.MeshPhongMaterial({
    color: 0x8844ff,    //base color (diffuse color)
    specular:0xffffff,  //highlight color
    shininess:50,       //size/intensity of specular highlight 
});

const object = new THREE.Mesh(geometry,material);
scene.add(object);

// const geometry = new THREE.BoxGeometry(1,1,1);
// const material = new THREE.MeshBasicMaterial({color:0x00ff88});
// const cubeMesh = new THREE.Mesh(geometry,material);
//scene.add(cubeMesh);

// const light = new THREE.DirectionalLight(0xffffff,1);
// light.position.set(2,2,5);
// scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(1,1,5);
scene.add(directionalLight);

const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.5);
scene.add(lightHelper);



function animate(){
    requestAnimationFrame(animate);
    object.rotation.x +=0.01;
    object.rotation.y +=0.01;
    object.rotation.z +=0.01;
    renderer.render(scene,camera);
}

animate();
