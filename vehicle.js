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

    currentSpeed = 0;
    angle = 0;
    power = 0.2;
    maxSpeed = 0.2
    movingGroup;
    rotatingGroup;
    threeGroup;

    constructor() {
    }

    AddToScene(scene) {
        //this.movingGroup = new THREE.Group();
        //scene.add(this.movingGroup);
        scene.add(this.threeGroup);
        //this.movingGroup.add(this.rotatingGroup);
    }

    Wheel() {
        const geometry = new THREE.BoxGeometry(33, 12, 12);
        const material = new THREE.MeshLambertMaterial({ color: 0x333333 });
        const wheel = new THREE.Mesh(geometry, material);
        return wheel;
    }

    SteerLeft() {
        this.angle += Math.PI / 45;
    }

    SteerRight() {
        this.angle -= Math.PI / 45;
    }

    Accelerate() {
        const accelerateCalc = (speed) => speed + Math.abs(speed) * this.power;

        this.currentSpeed = this.currentSpeed > -0.01 && this.currentSpeed < 0.01
            ? 0.01 
            : accelerateCalc(this.currentSpeed) > this.maxSpeed
                ? this.maxSpeed
                : accelerateCalc(this.currentSpeed);

        //console.log(this.currentSpeed);
    }

    Decelerate(){
        const decelerateCalc = (speed) => speed - Math.abs(speed) * this.power;

        this.currentSpeed = this.currentSpeed > -0.01 && this.currentSpeed < 0.01
            ? -0.01
            : Math.abs(decelerateCalc(this.currentSpeed)) > this.maxSpeed
                ? -this.maxSpeed
                : decelerateCalc(this.currentSpeed);

        //console.log(this.currentSpeed);
    }

    Move(timeDelta) {
        const distance = this.currentSpeed * timeDelta;
        this.threeGroup.rotation.y = this.angle;
        this.threeGroup.position.x +=Math.sin(this.angle)*distance;
        this.threeGroup.position.z +=Math.cos(this.angle)*distance;
        console.log(this.angle)
    }
}