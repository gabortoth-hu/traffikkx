import * as THREE from "three";

export default class Map {

    trackColor = "#546E90";
    mapWidth = 0;
    mapHeight = 0;

    constructor(mapWidth, mapHeight) {
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
    }


    Render() {
        const lineMarkingsTexture = this.LineMarkings();

        const planeGeometry = new THREE.PlaneGeometry(this.mapWidth, this.mapHeight);
        const planeMaterial = new THREE.MeshLambertMaterial({
            //map: lineMarkingsTexture,
            //side: THREE.DoubleSide
            color: this.trackColor
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        //plane.matrixAutoUpdate = false;
        plane.rotation.x = -Math.PI / 2; 

        return plane;
    }

    LineMarkings() {
        const canvas = document.createElement("canvas");
        canvas.width = this.mapWidth;
        canvas.height = this.mapHeight;
        const context = canvas.getContext("2d");

        context.fillStyle = this.trackColor;
        context.fillRect(0, 0, this.mapWidth, this.mapHeight);

        context.lineWidth = 2;
        context.strokeStyle = "#E0FFFF";
        context.setLineDash([10, 14]);

        return new THREE.CanvasTexture(canvas);
    }

}