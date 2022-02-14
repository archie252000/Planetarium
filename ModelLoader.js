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

''

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

    if (planetNames[i] == "saturn") {
        loader.load(
            path,
            function(glb) {

                glb.scene.scale.set(0.00045, 0.00045, 0.00045)

                scene.add(glb.scene);

            },
            undefined,
            function(error) {
                console.error(error);
            }
        );
    } else {

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
    }
    controls.update();

    function animate() {

        requestAnimationFrame(animate);
        renderer.render(scene, camera);

    }
    animate();

}


window.addEventListener("resize", (event) => {


    const planetContainersArray = Object.values(planetContainers)


    var newHeight = 0;
    var newWidth = 0;

    for (var i = 0; i < planetContainersArray.length; i++) {
        var currHeight = planetContainers[i].offsetHeight;
        var currWidth = planetContainers[i].offsetWidth;

        if (!isNaN(currHeight)) {
            newHeight = Math.max(newHeight, currHeight);
        }
        if (!isNaN(currWidth)) {
            newWidth = Math.max(newWidth, currWidth);
        }

    }

    for (var i = 0; i < planetContainers.length; i++) {
        renderers[i].setSize(newWidth, newHeight);
        cameras[i].aspect = newWidth / newHeight;
        cameras[i].updateProjectionMatrix();


    }

})