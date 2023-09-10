// https://www.freecodecamp.org/news/three-js-tutorial/
// https://www.youtube.com/watch?v=JhgBwJn1bQw&t=1015s

import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Car from "./car.js";
import Map from "./map.js"

const scene = new THREE.Scene();

// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(200,500, 300);
scene.add(directionalLight); 

// Setting up camera
const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 150;
const cameraHeight = cameraWidth / aspectRatio;

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
// const camera = new THREE.OrthographicCamera(
//   cameraWidth / -2, // left
//   cameraWidth / 2, // right
//   cameraHeight / 2, // top
//   cameraHeight / -2, // bottom
//   0, // near plane
//   1000 // far plane
// );
camera.position.set(100, 100, 100);
camera.lookAt(0, 10, 0);


const car = new Car()
scene.add(car)

const map = new Map(cameraWidth*2, cameraHeight*2)
scene.add(map.Render())

// Set up renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

const controls = new OrbitControls( camera, renderer.domElement );

document.body.appendChild(renderer.domElement);
renderer.setAnimationLoop(animation);

function animation(timestamp) {
    controls.update();
    renderer.render(scene, camera);
}

