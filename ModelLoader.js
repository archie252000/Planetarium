//Three loader
import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";

const planetContainers = document.getElementsByClassName("planet-model");
const planetNames = [
    "mercury",
    "venus",
    "earth",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
];


const height = planetContainers[0].offsetHeight;
const width = planetContainers[0].offsetWidth;

const loader = new GLTFLoader();


const renderers = [];
const cameras = [];

for (var i = 0; i < planetContainers.length; i++) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.01,
        1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const light = new THREE.AmbientLight(0xffffff, 2);
    const controls = new OrbitControls(camera, renderer.domElement);
    const path = "./Assets/planets/" + planetNames[i] + ".glb";
    renderers.push(renderer);
    renderer.setSize(width, height);
    planetContainers[i].appendChild(renderer.domElement);
    camera.position.set(0, 0, 1);
    cameras.push(camera);

    scene.add(light);


    loader.load(
        path,
        function(glb) {


            glb.scene.scale.set(0.001, 0.001, 0.001)
            scene.add(glb.scene);

        },
        undefined,
        function(error) {
            console.error(error);
        }
    );
    controls.update();

    function animate() {

        requestAnimationFrame(animate);
        renderer.render(scene, camera);

    }
    animate();

}


const resizeWindow = document.body;
console.log(resizeWindow);
window.addEventListener("resize", (event) => {
    const newHeight = planetContainers[0].offsetHeight;
    const newWidth = planetContainers[0].offsetWidth;

    for (var i = 0; i < planetContainers.length; i++) {
        renderers[i].setSize(newWidth, newHeight);
        cameras[i].aspect = newWidth / newHeight;
        cameras[i].updateProjectionMatrix();
    }

})

// const planetContainer = document.getElementsByClassName("planet-model")[0];
// const planetContainer1 = document.getElementsByClassName("planet-model")[1];


// const scene = new THREE.Scene();
// const scene1 = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(
//     75,
//     planetContainer.offsetWidth / planetContainer.offsetHeight,
//     0.01,
//     1000
// );
// const camera1 = new THREE.PerspectiveCamera(
//     75,
//     planetContainer.offsetWidth / planetContainer.offsetHeight,
//     0.01,
//     1000
// );
// const renderer = new THREE.WebGLRenderer({ alpha: true });
// const renderer1 = new THREE.WebGLRenderer({ alpha: true });


// renderer.setSize(planetContainer.offsetWidth, planetContainer.offsetHeight);
// renderer1.setSize(planetContainer.offsetWidth, planetContainer.offsetHeight);

// const controls = new OrbitControls(camera, renderer.domElement);
// planetContainer.appendChild(renderer.domElement);
// planetContainer1.appendChild(renderer1.domElement)
// var loader = new GLTFLoader();



// var obj;
// loader.load(
//     "./Assets/planets/earth.glb",
//     function(glb) {

//         obj = glb.scene;
//         glb.scene.scale.set(0.001, 0.001, 0.001)
//         scene.add(glb.scene);

//     },
//     undefined,
//     function(error) {
//         console.error(error);
//     }
// );
// loader.load(
//     "./Assets/planets/mercury.glb",
//     function(glb) {

//         obj = glb.scene;
//         glb.scene.scale.set(0.001, 0.001, 0.001)
//         scene1.add(glb.scene);


//     },
//     undefined,
//     function(error) {
//         console.error(error);
//     }
// );

// // var light = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
// var light = new THREE.AmbientLight(0xffffff, 5);
// scene.add(light)
// scene1.add(new THREE.AmbientLight(0xffffff, 5))
// camera.position.set(0, 0, 1);
// camera1.position.set(0, 0, 1);


// controls.update()

// function animate() {

//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
//     renderer1.render(scene1, camera1);
// }
// animate();

// function animate1() {

//     requestAnimationFrame(animate1);

//     renderer1.render(scene1, camera1);
// }
// animate1();