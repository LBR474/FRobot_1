

import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Vector3 } from "three";




interface ParrotProps {
  scale: Vector3;
}

function Parrot({ scale }: ParrotProps) {

  
  let mixer: THREE.AnimationMixer | null = null;
  const { scene, animations } = useLoader(
    GLTFLoader,
   'Parrot.glb'
  );
  // console.log(scene);
  mixer = new THREE.AnimationMixer(scene);
  void mixer.clipAction(animations[0]).play();

  useFrame((_state, delta) => {
    mixer!.update(delta);
    // console.log(ca);
  });
  return <primitive object={scene} position={[0, 0, 0]} scale={scale} />;
}

export default Parrot;
