import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Flamingo from "./Flamingo";
import Parrot from "./Parrot";
import Horse from "./Horse";
import { Vector3 } from "three";
import gsap from "gsap";
import { OrbitControls } from "@react-three/drei";

interface SceneProps {
  FlamingoRef: React.Ref<THREE.Group>;
  selectedItem: string;
}

const Scene: React.FC<SceneProps> = ({ FlamingoRef, selectedItem }) => {
  const cameraRef = useRef<THREE.Camera>();

  useFrame(({ camera }) => {
    console.log("Camera Position:", camera.position);
    cameraRef.current = camera;
  });

  const resetCameraPosition = () => {
    if (cameraRef.current) {
      const newPosition = new Vector3(0, 0, 5);
      gsap.to(cameraRef.current.position, {
        x: newPosition.x,
        y: newPosition.y,
        z: newPosition.z,
        duration: 1,
      });
    }
  };

  useEffect(() => {
    resetCameraPosition();
  }, [selectedItem]);

  

  return (
    <>
      <ambientLight intensity={2} />
      <pointLight position={[40, 40, 40]} />

      <Suspense fallback={null}>
        <mesh position={[0, -1, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={"hotpink"} />
        </mesh>
        <group ref={FlamingoRef} position={[10, 0, 0]}>
          {selectedItem === "flamingo" && (
            <Flamingo scale={new Vector3(0.1, 0.1, 0.1)} />
          )}
          {selectedItem === "parrot" && (
            <Parrot scale={new Vector3(0.1, 0.1, 0.1)} />
          )}
          {selectedItem === "horse" && (
            <Horse scale={new Vector3(0.1, 0.1, 0.1)} />
            
          )}
        </group>
      </Suspense>
      <OrbitControls enableZoom={false} />
    </>
  );
};

export default function App(  ) {
  const [selectedItem, setSelectedItem] = useState("");
  const FlamingoRef = useRef<THREE.Group>(null);
  

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPosition = new Vector3(-10, 0, 0);
    gsap.to(FlamingoRef.current!.position, {
      x: newPosition.x,
      y: newPosition.y,
      z: newPosition.z,
      duration: 5,
      onComplete: () => {
        // Reset newPosition
        newPosition.x = 0;
        newPosition.y = 0;
        newPosition.z = 0;

        
      },
    });
    const value = event.target.value;
    setSelectedItem(value);
  };

  useEffect(() => {
    setSelectedItem("");
  }, []);

  return (
    <>
      <select value={selectedItem} onChange={handleDropdownChange}>
        <option value="">Select an item</option>
        <option value="flamingo">Flamingo</option>
        <option value="parrot">Parrot</option>
        <option value="horse">Horse</option>
      </select>{" "}
      <Canvas camera={{ position: [0, 0, 5] }} >
        <Scene FlamingoRef={FlamingoRef} selectedItem={selectedItem} />
        
      </Canvas>
    </>
  );
}
