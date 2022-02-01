//Three loader
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
const planetContainer = document.getElementsByClassName("planet-model")[0];

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    planetContainer.offsetWidth / planetContainer.offsetHeight,
    0.01,
    1000
);
const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(planetContainer.offsetWidth, planetContainer.offsetHeight);
const controls = new OrbitControls(camera, renderer.domElement);
planetContainer.appendChild(renderer.domElement);

var loader = new GLTFLoader();

var obj;
loader.load(
    "./Assets/planets/earth.glb",
    function(glb) {

        obj = glb.scene;
        glb.scene.scale.set(0.001, 0.001, 0.001)
        scene.add(glb.scene);


    },
    undefined,
    function(error) {
        console.error(error);
    }
);

// var light = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
var light = new THREE.AmbientLight(0xffffff, 5);
scene.add(light)
camera.position.set(0, 0, 1);

controls.update()

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();