

import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Vector3 } from "three";
import { useState } from "react";




interface FlamingoProps {
  scale: Vector3;
}

function Flamingo({ scale }: FlamingoProps) {
let [localFScaler, setlocalFScaler] = useState(
  new Vector3(scale.x * 0.2, scale.y * 0.2, scale.z * 0.2)
);
  
  let mixer: THREE.AnimationMixer | null = null;
  const { scene, animations } = useLoader(
    GLTFLoader,
   'Flamingo.glb'
  );
  // console.log(scene);
  mixer = new THREE.AnimationMixer(scene);
  void mixer.clipAction(animations[0]).play();

  useFrame((_state, delta) => {
    mixer!.update(delta);
    // console.log(ca);
  });
  return <primitive object={scene} position={[0, 0, 0]} scale={localFScaler} />;
}

export default Flamingo;
