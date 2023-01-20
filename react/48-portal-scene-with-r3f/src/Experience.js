import {
  shaderMaterial,
  Center,
  useTexture,
  useGLTF,
  OrbitControls,
  Sparkles,
} from "@react-three/drei";
import portalVertexShader from "./shaders/portal/vertex.js";
import portalFragmentShader from "./shaders/portal/fragment.js";
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#ffffff"),
    uColorEnd: new THREE.Color("#000000"),
  },
  portalVertexShader,
  portalFragmentShader
);
extend({ PortalMaterial });

export default function Experience() {
  const { nodes } = useGLTF("./model/portalSceneup.glb");
  const bakedTexture = useTexture("./model/bake.jpg");
  bakedTexture.flipY = false;
  const portalMaterial = useRef();
  useFrame((state, delta) => {
    portalMaterial.current.uTime += delta;
  });

  return (
    <>
      <color args={["#201919"]} attach="background" />
      <OrbitControls makeDefault />
      <Center>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>
        <mesh
          geometry={nodes.poleLigh1.geometry}
          position={[
            nodes.poleLigh1.position.x + 0.02,
            nodes.poleLigh1.position.y - 0.84,
            nodes.poleLigh1.position.z - 1.563,
          ]}
        >
          <meshBasicMaterial color={"#ffffe5"} />
        </mesh>
        <mesh
          geometry={nodes.poleLight2.geometry}
          position={[
            nodes.poleLight2.position.x + 0.02,
            nodes.poleLight2.position.y - 0.84,
            nodes.poleLight2.position.z - 1.563,
          ]}
        >
          <meshBasicMaterial color={"#ffffe5"} />
        </mesh>
        <mesh
          geometry={nodes.Circle.geometry}
          position={[
            nodes.Circle.position.x + 0.02,
            nodes.Circle.position.y - 0.84,
            nodes.Circle.position.z - 1.563,
          ]}
        >
          <portalMaterial ref={portalMaterial} />
        </mesh>
        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-z={-1.5}
          speed={0.2}
          count={40}
        />
      </Center>
    </>
  );
}
