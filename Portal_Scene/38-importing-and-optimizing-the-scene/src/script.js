import "./style.css";
import * as dat from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import firefliesVertexShader from "./shaders/fireflies/vertex.glsl";
import firefliesFragmentShader from "./shaders/fireflies/fragment.glsl";
import portalVertexShader from "./shaders/portal/vertex.glsl";
import portalFragmentShader from "./shaders/portal/fragment.glsl";
import { DoubleSide } from "three";

// // spector
// var SPECTOR = require("spectorjs");
// var spector = new SPECTOR.Spector();
// spector.displayUI();

/**
 * Base
 */
// Debug
const debugObject = {};
const gui = new dat.GUI({
  width: 400,
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader();

// Draco loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("draco/");

// GLTF loader
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

// textures
const bakedTexture = textureLoader.load("bake.jpg");
bakedTexture.flipY = false;
bakedTexture.encoding = THREE.sRGBEncoding;
//Materials
//baked
const bakedMaterial = new THREE.MeshBasicMaterial({
  map: bakedTexture,
  side: DoubleSide,
});

//Pole light Material
debugObject.portalColorStart = "#8c1d63";
debugObject.portalColorEnd = "#ffc370";

gui.addColor(debugObject, "portalColorStart").onChange(() => {
  circleLightMaterial.uniforms.uColorStart.value.set(
    debugObject.portalColorStart
  );
});

gui.addColor(debugObject, "portalColorEnd").onChange(() => {
  circleLightMaterial.uniforms.uColorEnd.value.set(debugObject.portalColorEnd);
});

const circleLightMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColorStart: { value: new THREE.Color(0x8c1d63) },
    uColorEnd: { value: new THREE.Color(0xffc370) },
  },
  vertexShader: portalVertexShader,
  fragmentShader: portalFragmentShader,
});

const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xff562f });
// Model
gltfLoader.load("portalSceneup.glb", (gltf) => {
  const bakedMeh = gltf.scene.children.find((child) => child.name === "baked");

  const poleLightAMesh = gltf.scene.children.find(
    (child) => child.name === "poleLigh1"
  );
  const poleLightBMesh = gltf.scene.children.find(
    (child) => child.name === "poleLight2"
  );
  const circleMesh = gltf.scene.children.find(
    (child) => child.name === "Circle"
  );

  bakedMeh.material = bakedMaterial;
  poleLightAMesh.material = poleLightMaterial;
  poleLightBMesh.material = poleLightMaterial;
  circleMesh.material = circleLightMaterial;

  scene.add(gltf.scene);
});

// Fireflies
const firefliesGeometry = new THREE.BufferGeometry();
const firefliesCount = 30;
const positionArray = new Float32Array(firefliesCount * 3);
const scaleArray = new Float32Array(firefliesCount);

for (let i = 0; i < firefliesCount; i++) {
  positionArray[i * 3] = (Math.random() - 0.5) * 4;
  positionArray[i * 3 + 1] = Math.random() * 2;
  positionArray[i * 3 + 2] = (Math.random() - 0.5) * 4;
  scaleArray[i] = Math.random();
}
firefliesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positionArray, 3)
);
firefliesGeometry.setAttribute(
  "aScale",
  new THREE.BufferAttribute(scaleArray, 1)
);

const firefliesMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uSize: { value: 100 },
    uTime: { value: 0 },
  },
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  transparent: true,
  vertexShader: firefliesVertexShader,
  fragmentShader: firefliesFragmentShader,
});

gui
  .add(firefliesMaterial.uniforms.uSize, "value")
  .min(0)
  .max(500)
  .step(1)
  .name("firefly Size");
//Points
const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial);

scene.add(fireflies);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  firefliesMaterial.uniforms.uPixelRatio.value = Math.min(
    window.devicePixelRatio,
    2
  );
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 4;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputEncoding = THREE.sRGBEncoding;

debugObject.clearColor = "#300d0d";
renderer.setClearColor(debugObject.clearColor);
gui.addColor(debugObject, "clearColor").onChange(() => {
  renderer.setClearColor(debugObject.clearColor);
});
/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  circleLightMaterial.uniforms.uTime.value = elapsedTime;
  firefliesMaterial.uniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
