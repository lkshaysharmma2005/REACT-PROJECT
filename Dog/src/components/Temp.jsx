import React, { useEffect } from "react";
import * as Three from "three";
import { Canvas, useThree } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  useTexture,
  useAnimations,
} from "@react-three/drei";

const Dog = () => {
  const model = useGLTF("/models/dog.drc.glb");

  useThree(({ camera, scene, gl }) => {
    camera.position.z = 0.4;
    gl.toneMapping = Three.ReinhardToneMapping;
    gl.outputColorSpace = Three.SRGBColorSpace;
  });

  const { actions } = useAnimations(model.animations, model.scene);
  useEffect(() => {
    actions["Take 001"].play();
  }, [actions]);

  const [normalMap, sampleMatCap] = useTexture([
    "/models/dog_normals.jpg",
    "/matcap/mat-2.png"
  ]).map((texture) => {
    texture.flipY = false;
    texture.colorSpace = Three.SRGBColorSpace;
    return texture;
  });

  const [branchMap, branchNormalMap] = useTexture([
    "/models/branches_diffuse.jpeg",
    "/models/branches_normals.jpeg"
  ]).map((texture) => {
    texture.flipY = true;
    texture.colorSpace = Three.SRGBColorSpace;
    return texture;
  });

  const dogMaterial = new Three.MeshMatcapMaterial({
    normalMap: normalMap,
    matcap: sampleMatCap,
  });

  const branchMaterial = new Three.MeshMatcapMaterial({
    normalMap: branchNormalMap,
    matcap: branchMap,
  });

  model.scene.traverse((child) => {
    if (child.name.includes("DOG")) {
      child.material = dogMaterial;
    }
    else{
      child.material = branchMaterial;
    }
  });

  return (
    <>
      <primitive
        object={model.scene}
        position={[0.15, -0.6, 0]}
        rotation={[0, Math.PI / 5.3, 0]}
      />
      <directionalLight position={[0, 5, 5]} color={0xffffff} intensity={10} />
    </>
  );
};

export default Dog;
