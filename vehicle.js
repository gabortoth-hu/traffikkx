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

    constructor(offsetX = 0, offsetY=0, offsetZ=0) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.offsetZ = offsetZ;
    }

    Wheel() {
        const geometry = new THREE.BoxGeometry(12, 12, 33);
        const material = new THREE.MeshLambertMaterial({ color: 0x333333 });
        const wheel = new THREE.Mesh(geometry, material);
        return wheel;
    }


}