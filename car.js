
import * as THREE from "three";
import Vehicle from "./vehicle";
import NotHelper from "./not_helper"

export default class Car extends Vehicle {

    constructor(offsetX = 0, offsetY = 0, offsetZ = 0) {
        super(offsetX, offsetY, offsetZ);

        const car = new THREE.Group();
        this.threeGroup = car;

        const backWheel = this.Wheel();
        backWheel.position.y = 6 + offsetY;
        backWheel.position.x = offsetX;
        backWheel.position.z = -18 + offsetZ;
        car.add(backWheel);

        const frontWheel = this.Wheel();
        frontWheel.position.y = 6; + offsetY
        frontWheel.position.x = offsetX;
        frontWheel.position.z = 18 + offsetZ;
        car.add(frontWheel);

        const main = new THREE.Mesh(
            new THREE.BoxGeometry(30, 15, 60),
            new THREE.MeshLambertMaterial({ color: NotHelper.PickRandom(this.VEHICLE_COLORS()) })
        );
        main.position.x = offsetX;
        main.position.y = 12 + offsetY;
        main.position.z = offsetZ
        car.add(main);

        const carFrontTexture = this.getCarFrontTexture();
        const carBackTexture = this.getCarFrontTexture();
        const carRightSideTexture = this.getCarSideTexture();
        carRightSideTexture.center = new THREE.Vector2(0.5, 0.5);
        carRightSideTexture.rotation = Math.PI;
        carRightSideTexture.flipY = false;

        const carLeftSideTexture = this.getCarSideTexture();

        const cabin = new THREE.Mesh(new THREE.BoxGeometry(24, 12, 33), [
            new THREE.MeshLambertMaterial({ map: carRightSideTexture }),
            new THREE.MeshLambertMaterial({ map: carLeftSideTexture }),
            new THREE.MeshLambertMaterial({ color: 0xffffff }), // top
            new THREE.MeshLambertMaterial({ color: 0xffffff }), // bottom
            new THREE.MeshLambertMaterial({ map: carFrontTexture }),
            new THREE.MeshLambertMaterial({ map: carBackTexture }),
        ]);

        cabin.position.x = offsetX;
        cabin.position.y = 25.5 + offsetY;
        cabin.position.z = -6 + offsetZ;
        car.add(cabin);
    }

    getCarFrontTexture() {
        const canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 32;
        const context = canvas.getContext("2d");

        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, 64, 32);

        context.fillStyle = "#666666";
        context.fillRect(8, 8, 48, 24);

        return new THREE.CanvasTexture(canvas);
    }

    getCarSideTexture() {
        const canvas = document.createElement("canvas");
        canvas.width = 128;
        canvas.height = 32;
        const context = canvas.getContext("2d");

        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, 128, 32);

        context.fillStyle = "#666666";
        context.fillRect(10, 8, 38, 24);
        context.fillRect(58, 8, 60, 24);

        return new THREE.CanvasTexture(canvas);
    }
}

