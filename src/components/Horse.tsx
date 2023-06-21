

import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Vector3 } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useState } from "react";





interface HorseProps {
  scale: Vector3;
  className?: string; // Add className prop
}

function Horse({ scale }: HorseProps) {

  let [localHScaler] = useState(
    new Vector3(scale.x * 0.1, scale.y * 0.1, scale.z * 0.1)
  );

  
  let mixer: THREE.AnimationMixer | null = null;

  
  const gltf = useLoader(GLTFLoader, "Horse.glb", (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/node_modules/three/examples/jsm/libs/draco/");
    loader.setDRACOLoader(dracoLoader);
  });
  // console.log(scene);
  mixer = new THREE.AnimationMixer(gltf.scene);
  void mixer.clipAction(gltf.animations[0]).play();

  useFrame((_state, delta) => {
    mixer!.update(delta);
    // console.log(ca);
  });
  return <primitive object={gltf.scene} position={[0, 0, 0]} scale={localHScaler} />;
}

export default Horse;
