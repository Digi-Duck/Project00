// 要先引入three到檔案裏面
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const gui = new GUI();

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-1'),
});

renderer.setSize(450, 400);
console.log(renderer);
// 下列這一串代碼是將模型導入至html的body裡面
document.body.appendChild(renderer.domElement);

var gradientMaterial = new THREE.ShaderMaterial({
    uniforms: {
        color1: { value: new THREE.Color(0x0000ff) },
        color2: { value: new THREE.Color(0x00ff00) }
    },
    vertexShader: document.getElementById('gradient-vertex').textContent,
    fragmentShader: document.getElementById('gradient-fragment').textContent
});

const axesHelper = new THREE.AxesHelper(5);
const color = new THREE.Color(0x0000ff);
const gltfLoader = new GLTFLoader();
// 聲明模型樣式及大小
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 聲明材質
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 聲明方塊模型
const cube = new THREE.Mesh(geometry, material);


const pointLight = new THREE.PointLight( 0xffffff );
pointLight.position.set( 5, 5, 5 );

gltfLoader.load(
    "../model/1019-test-bake-3.glb",

    (gltf) => {
        const object = gltf.scene;
        scene.add(object);
        const houseFolder = gui.addFolder("大樓");
        console.log(object);
        houseFolder.add(object.position, "x", -10, 10);
        houseFolder.add(object.position, "y", -10, 10);
        houseFolder.add(object.position, "z", -10, 10);
        houseFolder.add(object.rotation, "x", 0, Math.PI * 2);
        houseFolder.add(object.rotation, "y", 0, Math.PI * 2);
        houseFolder.add(object.rotation, "z", 0, Math.PI * 2);
        houseFolder.add(object.scale, "x", -10, 10);
        houseFolder.add(object.scale, "y", -10, 10);
        houseFolder.add(object.scale, "z", -10, 10);

        object.rotation.y = 5.9;
    }
);

const cameraFolder = gui.addFolder("攝影機");
cameraFolder.add(cube.position, "x", -20, 20);
cameraFolder.add(cube.position, "y", -20, 20);
cameraFolder.add(cube.position, "z", -20, 20);
cameraFolder.add(cube.rotation, "x", 0, Math.PI * 2);
cameraFolder.add(cube.rotation, "y", 0, Math.PI * 2);
cameraFolder.add(cube.rotation, "z", 0, Math.PI * 2);

console.log(camera);

scene.background = gradientMaterial;
scene.add(axesHelper);
scene.add(pointLight);
// 將聲明的方塊模型增加到場景
scene.add(cube);
cube.add(camera)

camera.position.set(0, 0, 0);
cube.position.set(-15, 5, 10);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

const controls = new OrbitControls(camera, renderer.domElement);
