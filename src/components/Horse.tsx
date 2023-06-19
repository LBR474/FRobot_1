

import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Vector3 } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";





interface HorseProps {
  scale: Vector3;
}

function Horse({ scale }: HorseProps) {

  

  
  let mixer: THREE.AnimationMixer | null = null;

  
  const gltf = useLoader(GLTFLoader, "PrimaryIonDrive.glb", (loader) => {
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
  return <primitive object={gltf.scene} position={[0, 0, 0]} scale={scale} />;
}

export default Horse;
