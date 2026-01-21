import React, { useEffect, useRef } from "react";
import * as Three from "three";
import { Canvas, useThree } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  useTexture,
  useAnimations,
} from "@react-three/drei";
import gsap from "gsap";
import {useGSAP} from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Dog = () => {
  const model = useGLTF("/models/dog.drc.glb");

  gsap.registerPlugin(useGSAP())
  gsap.registerPlugin(ScrollTrigger)

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

  const dogModel = useRef(model) 

  useGSAP(()=>{
    const tl = gsap.timeline({
      scrollTrigger:{
        trigger:"#section-1",
        endTrigger:"#section-3",
        start:"top top",
        end:"bottom bottom",
        scrub:true
      }
      
    })

    tl.to(dogModel.current.scene.position,{
      z:"-=0.75",
      y:"+=0.1"
    })

      .to(dogModel.current.scene.rotation,{
      x:`+=${Math.PI/15}`
    })

      .to(dogModel.current.scene.rotation,{
      y:`-=${Math.PI}`,
      
    },"third")

     .to(dogModel.current.scene.position,{
      x:"-=0.45",
      y:"-0.48",
      z:"+=0.52"
    },"third")

  },[])

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
