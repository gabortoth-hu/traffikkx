// do not create helper class, they said, so it is not a helper

import * as THREE from "three";
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import {TextGeometry} from 'three/addons/geometries/TextGeometry.js' 

// to get font js, download from google fonts, and convert with https://gero3.github.io/facetype.js/

export default class NotHelper {

    static AxisLegend(scene, size, legend, x, y, z) {
        const loader = new FontLoader();
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

        loader.load('fonts/Montserrat Medium_Regular.json', function (font) {
            var textGeometry = new TextGeometry(legend, {
                font: font, 
                size: size/10,
                height: size/100
            });
            
            var textMesh = new THREE.Mesh(textGeometry, textMaterial);
    
            textMesh.position.set(x, y, z);
    
            scene.add(textMesh);
        });
    }

    static ShowAxes(size, scene) {

        this.AxisLegend(scene, size, "X", size, 0, 0);
        this.AxisLegend(scene, size, "Y", 0, size, 0);
        this.AxisLegend(scene, size, "Z", 0, 0, size);

        const hlp = new THREE.AxesHelper(size);
        scene.add(hlp);
    }

    static PickRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
}