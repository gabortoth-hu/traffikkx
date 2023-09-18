import * as THREE from "three";

export default class Vehicle {
    
    // static const ¯\_(ツ)_/¯
    VEHICLE_COLORS() {
        return [
            0xa52523,
            0xef2d56,
            0x0ad3ff,
            0xff9f1c,
            0xa52523,
            0xbdb638,
            0x78b14b
            ]; 
    }

    offsetX = 0;
    offsetY = 0;
    offsetZ = 0;
    speed = 0;
    power = 1.2;
    threeObject;

    constructor(offsetX = 0, offsetY=0, offsetZ=0) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.offsetZ = offsetZ;
    }

    AddToScene(scene) {
        scene.add(this.threeObject);
    }

    Wheel() {
        const geometry = new THREE.BoxGeometry(12, 12, 33);
        const material = new THREE.MeshLambertMaterial({ color: 0x333333 });
        const wheel = new THREE.Mesh(geometry, material);
        return wheel;
    }

    Accelerate() {
        this.speed = this.speed == 0 ? 0.1 : this.speed * this.power;
        console.log('Speed: '+this.speed);
    }

    Decelerate(){
        this.speed = this.speed == 0 ? -0.1 : this.speed * this.power;
    }

    Move(timeDelta) {
        this.threeObject.position.x += this.speed * timeDelta;
    }
}