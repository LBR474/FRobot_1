import { useLoader } from "@react-three/fiber";
//import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Vector3 } from "three";

import { useEffect } from "react";
import { useAnimations } from "@react-three/drei";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

interface LTokyoProps {
  scale: Vector3;
  className?: string; // Add className prop
}

function LTokyo({ scale }: LTokyoProps) {
 
  const gltf = useLoader(GLTFLoader, "LittlestTokyo.glb", (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/node_modules/three/examples/jsm/libs/draco/");
    loader.setDRACOLoader(dracoLoader);
  });

  const { actions, names } = useAnimations(gltf.animations, gltf.scene);

  useEffect(() => {
    actions[names[0]]?.play();
  });

  return <primitive object={gltf.scene} position={[0, 0, 0]} scale={scale} />;
}

export default LTokyo;
