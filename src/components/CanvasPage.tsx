import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Flamingo from "./Flamingo";
import Parrot from "./Parrot";
import Horse from "./Horse";
import { Vector3 } from "three";
import gsap from "gsap";
import { OrbitControls } from "@react-three/drei";

interface SceneProps {
  FlamingoRef: React.RefObject<THREE.Group>;
  ParrotRef: React.RefObject<THREE.Group>;
  HorseRef: React.RefObject<THREE.Group>;
  selectedItem: string;
}

const Scene: React.FC<SceneProps> = ({
  FlamingoRef,
  ParrotRef,
  HorseRef,
  selectedItem,
}) => {
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

  useEffect(() => {
    const moveModels = (
      ref: React.RefObject<THREE.Group>,
      startPosition: Vector3,
      endPosition: Vector3
    ) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current.position,
          {
            x: startPosition.x,
            y: startPosition.y,
            z: startPosition.z,
          },
          {
            x: endPosition.x,
            y: endPosition.y,
            z: endPosition.z,
            duration: 5,
          }
        );
      }
    };

    const startPosition = new Vector3(10, 0, 0);
    const endPosition = new Vector3(-10, 0, 0);

    if (selectedItem === "parrot") {
      moveModels(ParrotRef, startPosition, endPosition);
    } else if (selectedItem === "horse") {
      moveModels(HorseRef, startPosition, endPosition);
    } else if (selectedItem === "flamingo") {
      moveModels(FlamingoRef, startPosition, endPosition);
    }

  }, [selectedItem, ParrotRef, HorseRef, FlamingoRef]);

  return (
    <>
      <ambientLight intensity={2} />
      <pointLight position={[40, 40, 40]} />

      <Suspense fallback={null}>
        <mesh position={[0, -1, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={"hotpink"} />
        </mesh>
        <group
          ref={FlamingoRef}
          position={selectedItem === "flamingo" ? [10, 0, 0] : [10, 0, 0]}
        >
          {selectedItem === "flamingo" && (
            <Flamingo scale={new Vector3(0.02, 0.02, 0.02)} />
          )}
        </group>
        <group
          ref={ParrotRef}
          position={selectedItem === "parrot" ? [10, 0, 0] : [10, 0, 0]}
        >
          {selectedItem === "parrot" && (
            <Parrot scale={new Vector3(0.1, 0.1, 0.1)} />
          )}
        </group>
        <group
          ref={HorseRef}
          position={selectedItem === "horse" ? [10, 0, 0] : [10, 0, 0]}
        >
          {selectedItem === "horse" && (
            <Horse scale={new Vector3(0.1, 0.1, 0.1)} />
          )}
        </group>
      </Suspense>
      <OrbitControls enableZoom={false} />
    </>
  );
};

export default function App() {
  const [selectedItem, setSelectedItem] = useState("");
  const FlamingoRef = useRef<THREE.Group>(null);
  const ParrotRef = useRef<THREE.Group>(null);
  const HorseRef = useRef<THREE.Group>(null);

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
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
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Scene
          FlamingoRef={FlamingoRef}
          ParrotRef={ParrotRef}
          HorseRef={HorseRef}
          selectedItem={selectedItem}
        />
      </Canvas>
    </>
  );
}
