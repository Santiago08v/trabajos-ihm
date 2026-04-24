import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xd0e7f9); 

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const light = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(light);
const dLight = new THREE.DirectionalLight(0xffffff, 1);
dLight.position.set(5, 15, 5);
scene.add(dLight);


const matNieve = new THREE.MeshPhongMaterial({ color: 0xffffff });
const matHielo = new THREE.MeshPhysicalMaterial({ color: 0x99ccff, transmission: 0.5, roughness: 0.05 });
const matPino = new THREE.MeshToonMaterial({ color: 0x0a3d0a });
const matTroncoEscarchado = new THREE.MeshToonMaterial({ color: 0x3d2b1f });
const matNubeSombria = new THREE.MeshMatcapMaterial({ color: 0xeeeeee });


const cubo = new THREE.BoxGeometry(1, 1, 1);
const esfera = new THREE.SphereGeometry(0.8, 12, 12);


const sueloBase = new THREE.Mesh(new THREE.BoxGeometry(20, 1, 20), matNieve);
sueloBase.position.y = -0.5;
scene.add(sueloBase);

for (let i = 0; i < 15; i++) {
    const montañita = new THREE.Mesh(cubo, matNieve);
    montañita.position.set(
        Math.floor(Math.random() * 14 - 7),
        0.5, 
        Math.floor(Math.random() * 14 - 7)
    );
    scene.add(montañita);
}


const lago = new THREE.Mesh(new THREE.BoxGeometry(6, 0.2, 4), matHielo);
lago.position.set(-3, 0.1, -2);
scene.add(lago);


function crearPino(x, z) {
    
    const tronco = new THREE.Mesh(cubo, matTroncoEscarchado);
    tronco.scale.set(0.3, 2, 0.3);
    tronco.position.set(x, 1, z);
    scene.add(tronco);

    
    for (let i = 0; i < 3; i++) {
        const hojas = new THREE.Mesh(cubo, matPino);
        const escala = 1.5 - (i * 0.4);
        hojas.scale.set(escala, 0.8, escala);
        hojas.position.set(x, 2 + i, z);
        scene.add(hojas);
    }
}

crearPino(4, 4);
crearPino(-5, 5);
crearPino(2, -5);


for(let i = 0; i < 8; i++) {
    const nube = new THREE.Mesh(esfera, matNubeSombria);
    nube.position.set(Math.random()*30-15, 10, Math.random()*30-15);
    nube.scale.set(4, 0.6, 2);
    scene.add(nube);
}

camera.position.set(15, 12, 15);
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});