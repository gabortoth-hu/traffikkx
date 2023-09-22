import * as THREE from "three";
import * as CANNON from "cannon-es";
import CannonDebugger from "cannon-es-debugger";
import { threeToCannon, ShapeType } from 'three-to-cannon';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Car from "./car.js";
import Truck from "./truck.js";
import Map from "./map.js"
import NotHelper from "./not_helper.js";
import SceneInit from "./SceneInit.js";

const test = new SceneInit('myThreeJsCanvas');
test.initialize();
test.animate();

// part 0 - add axis helper
//const axesHelper = new THREE.AxesHelper(8);
//test.scene.add(axesHelper);
NotHelper.ShowAxes(10,test.scene);

// const boxGeometry = new THREE.BoxGeometry(4, 4, 4);
// const boxMaterial = new THREE.MeshNormalMaterial();
// const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
// test.scene.add(boxMesh);

// part 1 - set up world physics with a few objects
// note - code is from the cannon-es documentation
const physicsWorld = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.82, 0),
});

// create a ground body with a static plane
const groundBody = new CANNON.Body({
    type: CANNON.Body.STATIC,
    // infinte geometric plane
    shape: new CANNON.Plane(),
});
// rotate ground body by 90 degrees
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
physicsWorld.addBody(groundBody);

// create a sphere and set it at y=10
const radius = 1;
const sphereBody = new CANNON.Body({
    mass: 5,
    shape: new CANNON.Sphere(radius),
});
sphereBody.position.set(0, 40, 0);
physicsWorld.addBody(sphereBody);

// run the physics simulation on each animation frame
// const animate = () => {
//   physicsWorld.fixedStep();
//   window.requestAnimationFrame(animate);
// };
// animate();

// part 2 - bind cannon debugger to the three.js scene + physics world
//const cannonDebugger = new CannonDebugger(test.scene, physicsWorld, {
    // color: 0xff0000,
//});

// const animate = () => {
//   physicsWorld.fixedStep();
//   cannonDebugger.update();
//   window.requestAnimationFrame(animate);
// };
// animate();

// part 3 - combine the three.js game world with the physics world
const geometry = new THREE.SphereGeometry(radius);
const material = new THREE.MeshNormalMaterial();
const sphereMesh = new THREE.Mesh(geometry, material);
test.scene.add(sphereMesh);

// const animate = () => {
//   physicsWorld.fixedStep();
//   cannonDebugger.update();
//   sphereMesh.position.copy(sphereBody.position);
//   sphereMesh.quaternion.copy(sphereBody.quaternion);
//   window.requestAnimationFrame(animate);
// };
// animate();

// part 4 - add a box object
const boxBody = new CANNON.Body({
    mass: 5,
    shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
});
boxBody.position.set(-0.3, 15, 0);
physicsWorld.addBody(boxBody);

const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
const boxMaterial = new THREE.MeshNormalMaterial();
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
test.scene.add(boxMesh);

// car
const car = new Car();
car.AddToScene(test.scene);
car.threeGroup.scale.set(0.1,0.1,0.1);
const {shape, offset, quaternion} = threeToCannon(car.threeGroup);
const carBody = new CANNON.Body({
    shape: shape,
    offset: offset,
    quaternion: quaternion,
    mass: 10
});
car.threeGroup.position.set(1,4,0);
carBody.position.set(1, 4, 0);
physicsWorld.addBody(carBody);


const animate = () => {
    physicsWorld.fixedStep();
    //cannonDebugger.update();
    boxMesh.position.copy(boxBody.position);
    boxMesh.quaternion.copy(boxBody.quaternion);
    sphereMesh.position.copy(sphereBody.position);
    sphereMesh.quaternion.copy(sphereBody.quaternion);
    car.threeGroup.position.copy(carBody.position);
    car.threeGroup.quaternion.copy(carBody.quaternion);
    window.requestAnimationFrame(animate);
};
animate();
