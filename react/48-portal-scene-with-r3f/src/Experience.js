import { Center, useTexture, useGLTF, OrbitControls } from "@react-three/drei";

export default function Experience() {
  const { nodes } = useGLTF("./model/portalSceneup.glb");
  const bakedTexture = useTexture("./model/bake.jpg");
  bakedTexture.flipY = false;

  console.log(nodes);

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
          position={nodes.poleLigh1.position}
        />
        <mesh
          geometry={nodes.poleLight2.geometry}
          position={nodes.poleLight2.position}
        />
      </Center>
    </>
  );
}
