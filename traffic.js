// https://www.freecodecamp.org/news/three-js-tutorial/
// https://www.youtube.com/watch?v=JhgBwJn1bQw&t=1015s

import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Car from "./car.js";
import Truck from "./truck.js";
import Map from "./map.js"
import NotHelper from "./not_helper.js";

const scene = new THREE.Scene();

// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
directionalLight.position.set(200,500, 300);
scene.add(directionalLight); 

// Setting up camera
const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 150;
const cameraHeight = cameraWidth / aspectRatio;

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight)
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

NotHelper.ShowAxes(100,scene);

const car = new Car(0,0,0)
car.AddToScene(scene);

//const truck = new Truck();
//truck.AddToScene(scene);

const map = new Map(1000, 1000)
const rendered_map = map.Render()
scene.add(rendered_map)

//var sphereGeometry = new THREE.SphereGeometry(3, 32, 32);
//var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); 
//var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
//sphere.position.set(40, 0, 0);
//scene.add(sphere)

// Set up renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

const controls = new OrbitControls( camera, renderer.domElement );

document.body.appendChild(renderer.domElement);
renderer.setAnimationLoop(animation);

let accelerate = false; // Is the player accelerating
let decelerate = false; // Is the player decelerating
let steerright = false; // Is the player steering right
let steerleft = false;  // Is the player steering left

window.addEventListener("keydown", function (event) {
  if (event.key == "ArrowUp") {
    accelerate = true;
    return;
  }
  if (event.key == "ArrowDown") {
    decelerate = true;
    return;
  }
  if (event.key == "ArrowRight") {
    steerright = true;
    return;
  }
  if (event.key == "ArrowLeft") {
    steerleft = true;
    return;
  }
});

window.addEventListener("keyup", function (event) {
  if (event.key == "ArrowUp") {
    accelerate = false;
    return;
  }
  if (event.key == "ArrowDown") {
    decelerate = false;
    return;
  }
  if (event.key == "ArrowRight") {
    steerright = false;
    return;
  }
  if (event.key == "ArrowLeft") {
    steerleft = false;
    return;
  }
});

let lastTimestamp;

function animation(timestamp) {
    
    if (!lastTimestamp) {
        lastTimestamp = timestamp;
        return;
    }

    const timeDelta = timestamp - lastTimestamp;

    if(accelerate)
      car.Accelerate();
    if(decelerate)
      car.Decelerate();
    if(steerleft)
      car.SteerLeft();
    if(steerright)
      car.SteerRight();

    car.Move(timeDelta);

    controls.update();
    renderer.render(scene, camera);

    lastTimestamp = timestamp;
}

