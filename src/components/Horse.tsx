import { useLoader } from "@react-three/fiber";
//import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Vector3 } from "three";

import { useEffect } from "react";
import { useAnimations } from "@react-three/drei";

interface HorseProps {
  scale: Vector3;
  className?: string; // Add className prop
}

function Horse({ scale }: HorseProps) {
  
  const { scene, animations } = useLoader(GLTFLoader, "Horse.glb");

  const { actions, names } = useAnimations(animations, scene);

  useEffect(() => {
    actions[names[0]]?.play();
  });

  return <primitive object={scene} position={[0, 0, 0]} scale={scale} />;
}

export default Horse;
