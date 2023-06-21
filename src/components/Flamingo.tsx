import { useLoader } from "@react-three/fiber";
//import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Vector3 } from "three";

import { useEffect } from "react";
import { useAnimations } from "@react-three/drei";

//import gsap from "gsap";

interface FlamingoProps {
  scale: Vector3;
  className?: string; // Add className prop
}

function Flamingo({ scale }: FlamingoProps) {
  //let mixer: THREE.AnimationMixer | null = null;
  const { scene, animations } = useLoader(GLTFLoader, "Flamingo.glb");

  const { actions, names } = useAnimations(animations, scene);
  


  
  useEffect(() => {
    actions[names[0]]?.play();
   
  });

  return <primitive object={scene} position={[0, 0, 0]} scale={scale} />;
}

export default Flamingo;
