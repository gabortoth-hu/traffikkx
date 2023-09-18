
import * as THREE from "three";
import Vehicle from "./vehicle";
import NotHelper from "./not_helper"

export default class Truck extends Vehicle {

  getTruckFrontTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext("2d");
  
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 32, 32);
  
    context.fillStyle = "#666666";
    context.fillRect(0, 5, 32, 10);
  
    return new THREE.CanvasTexture(canvas);
  }
  
  getTruckSideTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext("2d");
  
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, 32, 32);
  
    context.fillStyle = "#666666";
    context.fillRect(17, 5, 15, 10);
  
    return new THREE.CanvasTexture(canvas);
  }
  
  constructor(offsetX = 0, offsetY=0, offsetZ=0) {
    super(offsetX, offsetY, offsetZ);
    const truck = new THREE.Group();
    const color = NotHelper.PickRandom(this.VEHICLE_COLORS());
    
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(100, 5, 25),
      new THREE.MeshLambertMaterial({ color: 0xb4c6fc })
    );
    base.position.x = offsetX;
    base.position.y = 10 + offsetY;
    base.position.z = offsetZ;
    truck.add(base);

    const cargo = new THREE.Mesh(
      new THREE.BoxGeometry(75, 40, 35),
      new THREE.MeshLambertMaterial({ color: 0xffffff }) // 0xb4c6fc
    );
    cargo.position.x = -15;
    cargo.position.y = 30;
    cargo.castShadow = true;
    cargo.receiveShadow = true;
    truck.add(cargo);

    const truckFrontTexture = this.getTruckFrontTexture();
    truckFrontTexture.center = new THREE.Vector2(0.5, 0.5);
    truckFrontTexture.flipY = false;
    truckFrontTexture.rotation = Math.PI;
    
  
    const truckLeftTexture = this.getTruckSideTexture();
    truckLeftTexture.center = new THREE.Vector2(0.5, 0.5);
    truckLeftTexture.rotation = Math.PI;
    truckLeftTexture.flipY = false;
    //truckFrontTexture.rotation = Math.PI;
    const truckRightTexture = this.getTruckSideTexture();
  
  
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(25, 30, 30), [
      new THREE.MeshLambertMaterial({ color, map: truckFrontTexture }),
      new THREE.MeshLambertMaterial({ color }), // back 
      new THREE.MeshLambertMaterial({ color }),  
      new THREE.MeshLambertMaterial({ color }), // bottom
      new THREE.MeshLambertMaterial({ color , map: truckRightTexture}), // right
      new THREE.MeshLambertMaterial({ color , map: truckLeftTexture}) // left
    ]);
    cabin.position.x = 40;
    cabin.position.y = 20;
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    truck.add(cabin);
    
    const backWheel = this.Wheel();
    backWheel.position.x = -30 + offsetX;
    backWheel.position.y = 6 + offsetY;
    truck.add(backWheel);
  
    const middleWheel = this.Wheel();
    middleWheel.position.x = 10 + offsetX;
    middleWheel.position.y = 6; + offsetY; 
    truck.add(middleWheel);
  
    const frontWheel = this.Wheel();
    frontWheel.position.x = 38 + offsetX;
    frontWheel.position.y = 6; + offsetY  
    truck.add(frontWheel);
    /*
    if (config.showHitZones) {
      truck.userData.hitZone1 = HitZone();
      truck.userData.hitZone2 = HitZone();
      truck.userData.hitZone3 = HitZone();
    }
    */
    return truck;
  }
}