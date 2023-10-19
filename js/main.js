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

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// 下列這一串代碼是將模型導入至html的body裡面
document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
const color = new THREE.Color(0x76c5fb);
const gltfLoader = new GLTFLoader();
// 聲明模型樣式及大小
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 聲明材質
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 聲明方塊模型
const cube = new THREE.Mesh(geometry, material);


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

        object.rotation.y = 5.9;

        let isDown = false;
        let startX;
        let scrollLeft;

        object.addEventListener("mousedown", (e) => {
            isDown = true;
            startX = e.pageX - object.offsetLeft; //  slider.offsetLeft 現在這東西會是 0
            scrollLeft = object.scrollLeft;
            console.log(e.pageX, slider.offsetLeft, scrollLeft)
        });

        object.addEventListener("mouseleave", () => {
            isDown = false;
        });

        object.addEventListener("mouseup", () => {
            isDown = false;
        });

        object.addEventListener("mousemove", (e) => {
            if (!isDown) return; // stop the fn from running
            e.preventDefault();
            const x = e.pageX - object.offsetLeft;
            console.log(e.pageX, startX);
            const walk = x - startX;
            object.scrollLeft = scrollLeft - walk;
        });
    }
);

const cameraFolder = gui.addFolder("攝影機");
cameraFolder.add(camera.position, "x", -20, 20);
cameraFolder.add(camera.position, "y", -20, 20);
cameraFolder.add(camera.position, "z", -20, 20);
cameraFolder.add(camera.rotation, "x", 0, Math.PI * 2);
cameraFolder.add(camera.rotation, "y", 0, Math.PI * 2);
cameraFolder.add(camera.rotation, "z", 0, Math.PI * 2);

scene.background = color;
scene.add(axesHelper);
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
