// 要先引入three到檔案裏面
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const gui = new GUI();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
// 下列這一串代碼是將模型導入至html的body裡面
document.body.appendChild( renderer.domElement );

const axesHelper = new THREE.AxesHelper( 5 );
const color = new THREE.Color( 0x76c5fb );
const gltfLoader = new GLTFLoader();

gltfLoader.load( 
    '../model/1019-test-bake-3.glb',
    
    ( gltf ) => {
        const object = gltf.scene
        scene.add( object );
        const houseFolder = gui.addFolder( '大樓' );
        console.log(object);
        houseFolder.add( object.position, 'x', -10, 10 );
        houseFolder.add( object.position, 'y', -10, 10 );
        houseFolder.add( object.position, 'z', -10, 10 );
        houseFolder.add( object.rotation, 'x', 0, Math.PI * 2 );
        houseFolder.add( object.rotation, 'y', 0, Math.PI * 2 );
        houseFolder.add( object.rotation, 'z', 0, Math.PI * 2 );

        object.rotation.y = 1.4;
    }
    
);

const cameraFolder = gui.addFolder('攝影機');
cameraFolder.add(camera.position, 'x', -20, 20);
cameraFolder.add(camera.position, 'y', -20, 20);
cameraFolder.add(camera.position, 'z', -20, 20);

scene.background = color;
scene.add( axesHelper );


camera.position.set(10, 7, 10);

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();

const controls = new OrbitControls(camera, renderer.domElement);
