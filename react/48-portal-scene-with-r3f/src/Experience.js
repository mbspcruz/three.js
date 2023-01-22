import {
  shaderMaterial,
  Center,
  useTexture,
  useGLTF,
  OrbitControls,
  Sparkles,
  MeshDistortMaterial,
  GradientTexture,
} from "@react-three/drei";
import portalVertexShader from "./shaders/portal/vertex.js";
import portalFragmentShader from "./shaders/portal/fragment.js";
import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useControls } from "leva";

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uTest: 0.2,
    uColorStart: new THREE.Color(0x380015),
    uColorEnd: new THREE.Color(0xada8a5),
  },
  portalVertexShader,
  portalFragmentShader
);
extend({ PortalMaterial });

export default function Experience() {
  const { bgLight, bgDark, portalLightIn, portalLightOut } = useControls({
    bgLight: "#ffffff",
    bgDark: "#6f4e4e",
    portalLightIn: "#380015",
    portalLightOut: "#ada8a5",
  });

  const portalMaterial = useRef();
  const { nodes } = useGLTF("./model/portalSceneup.glb");
  console.log(portalMaterial);
  const bakedTexture = useTexture("./model/bake.jpg");
  bakedTexture.flipY = false;
  useFrame((state, delta) => {
    portalMaterial.current.uTime += delta;
  });

  const eventHandler = () => {
    portalMaterial.current.uniforms.uColorStart.value = new THREE.Color(
      "hsl(	265.3, 33.1%, 49.2%)"
    );
    portalMaterial.current.uniforms.uColorEnd.value = new THREE.Color(
      "hsl(185, 99%, 71%)"
    );
    portalMaterial.current.uniforms.uTest.value = 2.0;
  };

  const outsideHandler = () => {
    portalMaterial.current.uniforms.uColorStart.value = [
      0.2196078431372549, 0, 0.08235294117647059,
    ];

    portalMaterial.current.uniforms.uColorEnd.value = [
      0.6784313725490196, 0.6588235294117647, 0.6470588235294118,
    ];

    portalMaterial.current.uniforms.uTest.value = 0.2;
  };

  return (
    <>
      <GradientTexture
        attach="background"
        stops={[0, 1]} // As many stops as you want
        colors={[bgDark, bgLight]} // Colors need to match the number of stops
        size={1024}
      />
      {/* <color args={["#3D3D3D"]} attach="background" /> */}
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
          onPointerEnter={eventHandler}
          onPointerOut={outsideHandler}
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
