import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';

const SCENE = new THREE.Scene();
const CAMERA = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const TEXTURELOADER = new THREE.TextureLoader();

let renderer: any;
let orbitControls: any;
let dragControls: any;

// Fixed point for Sun/Moon rotation
const fixPoint = new THREE.Object3D();

// SUN OBJECT
const sunGeometry = new THREE.SphereGeometry(3.2, 30, 30);
const sunMaterial = new THREE.MeshBasicMaterial({
    //color: 0x00ff00,
    map: TEXTURELOADER.load("./textures/sun.jpeg")
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.castShadow = false;
//

// MOON OBJECT
const moonGeometry = new THREE.SphereGeometry(1.8, 30, 30);
const moonMaterial = new THREE.MeshBasicMaterial({
    //color: 0x00ff00,
    map: TEXTURELOADER.load("./textures/moon.jpg")
});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.castShadow = false;
//

// LIGHT
const sunLight = new THREE.PointLight(0xF4E99B, 1.5, 0, 2); //sunlight
sunLight.castShadow = true;

const moonLight = new THREE.PointLight(0xF6EED5, 0.7, 0, 2); //moonlight
moonLight.castShadow = false;

const ambientLight = new THREE.AmbientLight(0x404040, 0.4); // soft white light
SCENE.add(ambientLight);

// HELPERS
//const gridHelper = new THREE.GridHelper(200, 200);
//SCENE.add(gridHelper);
//const sunLightHelper = new THREE.PointLightHelper(sunLight);
//SCENE.add(sunLightHelper);

// PLANE
let planeGeometry = new THREE.PlaneBufferGeometry(75, 75, 8, 8);
let planeMaterial = new THREE.MeshStandardMaterial({
    //color: 0x000000,
    map: TEXTURELOADER.load("./textures/grass.jpg"),
    side: THREE.DoubleSide
});
let plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.castShadow = false;
plane.receiveShadow = true;
plane.rotateX(- Math.PI / 2);
SCENE.add(plane);
//

//scene.add(cube);
fixPoint.add(sun, moon);
sun.add(sunLight);
moon.add(moonLight);
SCENE.add(fixPoint);
sun.position.x = 90;
sun.position.z = -90;
sun.position.y = 180;

moon.position.x = -90;
moon.position.z = 90;
moon.position.y = -180;

// DEFAULT CAMERA POSITION
CAMERA.position.x = 0;
CAMERA.position.y = 10;
CAMERA.position.z = 0;
//

//
// https://r105.threejsfundamentals.org/threejs/lessons/threejs-custom-buffergeometry.html
// NOT A GOOD EXAMPLE OF HOW TO MAKE A CUBE!
// Only trying to make it clear most vertices are unique
const vertices = [
    // front
    { pos: [0, 0, 1], norm: [1, 1, 1], uv: [0, 1], }, // 0
    { pos: [1, 0, 1], norm: [1, 1, 1], uv: [1, 1], }, // 1
    { pos: [0, 1, 1], norm: [1, 1, 1], uv: [0, 0], }, // 2
    { pos: [1, 1, 1], norm: [1, 1, 1], uv: [1, 0], }, // 3
    // right
    { pos: [1, 0, 1], norm: [1, 1, 1], uv: [0, 1], }, // 4
    { pos: [1, 0, 0], norm: [1, 1, 1], uv: [1, 1], }, // 5
    { pos: [1, 1, 1], norm: [1, 1, 1], uv: [0, 0], }, // 6
    { pos: [1, 1, 0], norm: [1, 1, 1], uv: [1, 0], }, // 7
    // back
    { pos: [1, 0, 0], norm: [1, 1, 0], uv: [0, 1], }, // 8
    { pos: [0, 0, 0], norm: [1, 1, 0], uv: [1, 1], }, // 9
    { pos: [1, 1, 0], norm: [1, 1, 0], uv: [0, 0], }, // 10
    { pos: [0, 1, 0], norm: [1, 1, 0], uv: [1, 0], }, // 11
    // left
    { pos: [0, 0, 0], norm: [0, 1, 1], uv: [0, 1], }, // 12
    { pos: [0, 0, 1], norm: [0, 1, 1], uv: [1, 1], }, // 13
    { pos: [0, 1, 0], norm: [0, 1, 1], uv: [0, 0], }, // 14
    { pos: [0, 1, 1], norm: [0, 1, 1], uv: [1, 0], }, // 15
    // top
    { pos: [1, 1, 0], norm: [1, 1, 1], uv: [0, 1], }, // 16
    { pos: [0, 1, 0], norm: [1, 1, 1], uv: [1, 1], }, // 17
    { pos: [1, 1, 1], norm: [1, 1, 1], uv: [0, 0], }, // 18
    { pos: [0, 1, 1], norm: [1, 1, 1], uv: [1, 0], }, // 19
    // bottom
    { pos: [1, 0, 1], norm: [1, 0, 1], uv: [0, 1], }, // 20
    { pos: [0, 0, 1], norm: [1, 0, 1], uv: [1, 1], }, // 21
    { pos: [1, 0, 0], norm: [1, 0, 1], uv: [0, 0], }, // 22
    { pos: [0, 0, 0], norm: [1, 0, 1], uv: [1, 0], }, // 23
];
const positions = [];
const normals = [];
const uvs = [];

for (const vertex of vertices) {
    positions.push(...vertex.pos);
    normals.push(...vertex.norm);
    uvs.push(...vertex.uv);
};

const geometry = new THREE.BufferGeometry();
const positionNumComponents = 3;
const normalNumComponents = 3;
const uvNumComponents = 2;
geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents));
geometry.setAttribute(
    'normal',
    new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents));
geometry.setAttribute(
    'uv',
    new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents));

geometry.setIndex([
    0, 1, 2, 2, 1, 3,
    4, 5, 6, 6, 5, 7,
    8, 9, 10, 10, 9, 11,
    12, 13, 14, 14, 13, 15,
    16, 17, 18, 18, 17, 19,
    20, 21, 22, 22, 21, 23,
]);

const material = new THREE.MeshBasicMaterial({
    color: 0xFEC009
});

let cube = new THREE.Mesh(geometry, material);
cube.castShadow = false;
SCENE.add(cube);
cube.position.set(-5, 0.02, -3);

console.log(cube);
////////////
export const changeWidth = (width: number): void => {
    let temparr: number[] = [];
    //console.log(cube.geometry.attributes);

    cube.geometry.attributes.position.array.forEach(element => {
        //console.log(element);
        temparr.push(element);
    });

    //front
    temparr[3] = width;
    temparr[9] = width;
    //back
    temparr[24] = width;
    temparr[30] = width;
    //right
    temparr[12] = width;
    temparr[15] = width;
    temparr[18] = width;
    temparr[21] = width;
    //top
    temparr[48] = width;
    temparr[54] = width;
    //bottom
    temparr[60] = width;
    temparr[66] = width;

    //cube.geometry.attributes.position.array = new Float32Array(temparr);

    //cube.geometry = new THREE.BoxGeometry(width, length, depth);
    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(temparr), positionNumComponents)
    );

    cube = new THREE.Mesh(geometry, material);

    console.log(cube);

    //cube.geometry.attributes.position.array = temparr;
}
////////////

export const changeLength = (length: number): void => {
    let temparr = [];
    //console.log(cube.geometry.attributes);

    cube.geometry.attributes.position.array.forEach(element => {
        //console.log(element);
        temparr.push(element);
    });

    //front
    temparr[2] = length;
    temparr[5] = length;
    temparr[8] = length;
    temparr[11] = length;
    //left
    temparr[41] = length;
    temparr[47] = length;
    //top
    temparr[56] = length;
    temparr[59] = length;
    //bottom
    temparr[62] = length;
    temparr[65] = length;
    //right
    temparr[14] = length;
    temparr[20] = length;

    //cube.geometry.attributes.position.array = new Float32Array(temparr);

    //cube.geometry = new THREE.BoxGeometry(width, length, depth);
    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(temparr), positionNumComponents)
    );

    cube = new THREE.Mesh(geometry, material);

    console.log(cube);

    //cube.geometry.attributes.position.array = temparr;
}
////////////

////////////
export const changeLeftRidge = (value: number): void => {
    let temparr = [];
    let checkVal = value * 1000;

    cube.geometry.attributes.position.array.forEach(element => {
        temparr.push(element);
    });

    if (checkVal > 0) {
        console.log('val is positive', value);
        //back
        temparr[33] = temparr[33] + value;
        temparr[30] = temparr[30] - value;
        temparr[27] = temparr[27] + value;
        temparr[24] = temparr[24] - value;
        //left
        temparr[36] = temparr[36] + value;
        temparr[42] = temparr[42] + value;
        //right
        //temparr[21] = temparr[21] - value;
        //temparr[15] = temparr[15] - value;
        //top
        //temparr[48] = temparr[48] - value;
        temparr[51] = temparr[51] + value;
    } else {
        console.log('val is negative', value);
        value = value * -1;
        //back
        temparr[33] = temparr[33] - value;
        temparr[30] = temparr[30] + value;
        temparr[27] = temparr[27] - value;
        temparr[24] = temparr[24] + value;
        //left
        temparr[36] = temparr[36] - value;
        temparr[42] = temparr[42] - value;
        //right
        //temparr[21] = temparr[21] + value;
        //temparr[15] = temparr[15] + value;
        //top
        //temparr[48] = temparr[48] + value;
        temparr[51] = temparr[51] - value;
    };


    //cube.geometry.attributes.position.array = new Float32Array(temparr);

    //cube.geometry = new THREE.BoxGeometry(width, length, depth);
    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(temparr), positionNumComponents)
    );

    cube = new THREE.Mesh(geometry, material);

    console.log(cube);

    //cube.geometry.attributes.position.array = temparr;
}
////////////

////////////
export const changeRightRidge = (value: number): void => {
    let temparr = [];
    let checkVal = value * 1000;

    cube.geometry.attributes.position.array.forEach(element => {
        temparr.push(element);
    });

    if (checkVal > 0) {
        console.log('val is positive', value);
        //back
        temparr[33] = temparr[33] + value;
        temparr[30] = temparr[30] - value;
        temparr[27] = temparr[27] + value;
        temparr[24] = temparr[24] - value;
        //left
        //temparr[36] = temparr[36] + value;
        //temparr[42] = temparr[42] + value;
        //right
        temparr[21] = temparr[21] - value;
        temparr[15] = temparr[15] - value;
        //top
        temparr[48] = temparr[48] - value;
        //temparr[51] = temparr[51] + value;
    } else {
        console.log('val is negative', value);
        value = value * -1;
        //back
        temparr[33] = temparr[33] - value;
        temparr[30] = temparr[30] + value;
        temparr[27] = temparr[27] - value;
        temparr[24] = temparr[24] + value;
        //left
        //temparr[36] = temparr[36] - value;
        //temparr[42] = temparr[42] - value;
        //right
        temparr[21] = temparr[21] + value;
        temparr[15] = temparr[15] + value;
        //top
        temparr[48] = temparr[48] + value;
        //temparr[51] = temparr[51] - value;
    };


    //cube.geometry.attributes.position.array = new Float32Array(temparr);

    //cube.geometry = new THREE.BoxGeometry(width, length, depth);
    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(temparr), positionNumComponents)
    );

    cube = new THREE.Mesh(geometry, material);

    console.log(cube);

    //cube.geometry.attributes.position.array = temparr;
}
////////////

const backgroundTexture = TEXTURELOADER.load("./textures/sky.jpg");

let orbitSpeed: number = 0.0004;
const animate = (): void => {
    requestAnimationFrame(animate);
    sun.rotateY(0.004);
    moon.rotateY(0.004);
    fixPoint.rotateZ(orbitSpeed);
    fixPoint.rotateX(orbitSpeed);

    orbitControls.update();

    renderer.render(SCENE, CAMERA);
};

const resize = (): void => {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    CAMERA.aspect = window.innerWidth / window.innerHeight;
    CAMERA.updateProjectionMatrix();
};

export const createScene = (el: object): void => {
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    orbitControls = new OrbitControls(CAMERA, renderer.domElement);
    dragControls = new DragControls(solarPanels, CAMERA, renderer.domElement);
    dragControls.addEventListener('dragstart', function () { orbitControls.enabled = false; });

    // lock solar panel vertical axis
    dragControls.addEventListener('drag', function (event) {
        event.object.position.y = cube.position.y + 1;
    })

    dragControls.addEventListener('dragend', function () { orbitControls.enabled = true; });
    //

    SCENE.background = backgroundTexture;
    resize();
    animate();
}

export const camera2D = (): void => {
    console.log('Camera 2D');
    CAMERA.position.x = 0;
    CAMERA.position.y = 10;
    CAMERA.position.z = 0;
}

export const camera3D = (): void => {
    console.log('Camera 3D');
    CAMERA.position.x = 30;
    CAMERA.position.y = 30;
    CAMERA.position.z = 45;
}

export const decreaseOrbitSpeed = (): void => {
    orbitSpeed = orbitSpeed - 0.0005;
    console.log('Orbit speed set to: ', orbitSpeed);
}

export const increaseOrbitSpeed = (): void => {
    orbitSpeed = orbitSpeed + 0.0005;
    console.log('Orbit speed set to: ', orbitSpeed);
}

interface SolarMaterial {
    material: object
}

let solarPanels: SolarMaterial[] = [];

export const addSolarPanel = (width: number, length: number): void => {
    console.log("Solar panel added!");

    const panelGeometry = new THREE.BoxGeometry(width, 0.1, length);
    const panelMaterial = new THREE.MeshBasicMaterial({
        map: TEXTURELOADER.load("./textures/panel.jpeg")
    });
    const solarPanel = new THREE.Mesh(panelGeometry, panelMaterial);
    solarPanel.position.set(0, 1, 0);
    solarPanel.castShadow = false;
    solarPanel.receiveShadow = true;

    solarPanels.push(solarPanel);

    SCENE.add(solarPanel);
}

/*
export const toggleShadows = (): void => {

    if (cube.material[2].type == 'MeshBasicMaterial') {
        console.log("Toggle Shadows: ON");

        cubeMaterialArray[2] = new THREE.MeshStandardMaterial({
            color: 0xFEC009
        });

        cube.material = cubeMaterialArray;

        if (solarPanels.length > 0) {
            for (let i = 0; i < solarPanels.length; i++) {

                solarPanels[i].material = new THREE.MeshStandardMaterial({
                    map: TEXTURELOADER.load("./textures/panel.jpeg")
                });
            }
        }

    } else {
        console.log("Toggle Roof Shadows: OFF");
        cubeMaterialArray[2] = new THREE.MeshBasicMaterial({
            color: 0xFEC009
        });

        if (solarPanels.length > 0) {
            for (let i = 0; i < solarPanels.length; i++) {
                solarPanels[i].material = new THREE.MeshBasicMaterial({
                    map: TEXTURELOADER.load("./textures/panel.jpeg")
                });
            }
        }
    }
}
*/

window.addEventListener('resize', resize);