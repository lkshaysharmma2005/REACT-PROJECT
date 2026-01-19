import React from "react";
import * as Three from "three"
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls , useTexture } from "@react-three/drei";

const Dog = () => {
  const model = useGLTF("/models/dog.drc.glb");

  useThree(({camera,scene,gl})=>{
    camera.position.z = 0.4
    gl.toneMapping = Three.ReinhardToneMapping
    gl.outputColorSpace = Three.SRGBColorSpace
  })

    const [normalMap, sampleMatCap] = useTexture(["/dog_normals.jpg","/matcap/mat-2.png",]).map((texture) => {
    texture.flipY = false;
    texture.colorSpace = Three.SRGBColorSpace;
    return texture;
  });

  const dogMaterial = new Three.MeshMatcapMaterial({
        normalMap:normalMap,
        matcap:sampleMatCap
        }) 

  model.scene.traverse((child)=>{
    if(child.name.includes("DOG")){
      child.material = dogMaterial
        
    }
  })

  return (
    <>
      <primitive object={model.scene} position={[0.15, -0.6, 0]} rotation={[0,Math.PI/5.3,0]} />
      <directionalLight position={[0, 5, 5]} color={0xffffff} intensity={10} />
      <OrbitControls />/
    </>
  );
};

export default Dog;