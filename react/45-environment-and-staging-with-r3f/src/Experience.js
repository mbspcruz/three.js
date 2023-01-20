import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import {
  Stage,
  Lightformer,
  Environment,
  Sky,
  AccumulativeShadows,
  BakeShadows,
  OrbitControls,
  softShadows,
  RandomizedLight,
  ContactShadows,
} from "@react-three/drei";
import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";

// softShadows({
//   frustum: 3.75,
//   size: 0.005,
//   near: 9.5,
//   samples: 17,
//   rings: 11,
// });

export default function Experience() {
  const directionalLight = useRef();
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

  const cube = useRef();

  useFrame((state, delta) => {
    // const time = state.clock.elapsedTime;
    // cube.current.position.x = 2 + Math.sin(time);
    cube.current.rotation.y += delta * 0.2;
  });

  const { color, opacity, blur } = useControls("contact shadows", {
    color: "#000000",
    opacity: { value: 0.4, min: 0, max: 1 },
    blur: { value: 2.8, min: 0, max: 10 },
  });
  const { sunPosition } = useControls("sky", {
    sunPosition: { value: [1, 2, 3] },
  });

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
    useControls("environment map", {
      envMapIntensity: { value: 1, min: 0, max: 12 },
      envMapHeight: { value: 7, min: 0, max: 100 },
      envMapRadius: { value: 28, min: 10, max: 1000 },
      envMapScale: { value: 100, min: 10, max: 1000 },
    });

  return (
    <>
      {/* <Environment
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
        background
        preset="sunset"
        resolution={32}
        // files={"./environmentMaps/the_sky_is_on_fire_2k.hdr"}
      > */}
      {/* <color args={["blue"]} attach="background" />
        <Lightformer
          position={-5}
          scale={10}
          color="red"
          intensity={10}
          form="ring"
        /> */}
      {/* <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color={[10, 0, 0]} />
        </mesh> */}
      {/* </Environment>

      <Perf position="top-left" />

      <OrbitControls makeDefault /> */}
      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color="#316d39"
        opacity={0.8}
        frames={Infinity}
        temporal
        blend={100}
      >
        <RandomizedLight
          position={[1, 2, 3]}
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={1}
          bias={0.001}
        ></RandomizedLight>
      </AccumulativeShadows> */}
      {/* <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        resolution={128}
        far={5}
        color={color}
        opacity={opacity}
        blur={blur}
        frames={1}
      /> */}

      {/* <directionalLight
        ref={directionalLight}
        position={sunPosition}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
        intensity={1.5}
      />
      <ambientLight intensity={0.5} />
      <Sky sunPosition={sunPosition} /> */}

      <mesh castShadow position-x={-2} position-y={1}>
        <sphereGeometry />
        <meshStandardMaterial
          color="orange"
          envMapIntensity={envMapIntensity}
        />
      </mesh>

      <mesh castShadow ref={cube} position-x={2} position-y={1} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial
          color="mediumpurple"
          envMapIntensity={envMapIntensity}
        />
      </mesh>

      {/* <mesh position-y={0} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial
          color="greenyellow"
          envMapIntensity={envMapIntensity}
        /> */}
      {/* </mesh> */}
    </>
  );
}
