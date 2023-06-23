import Flamingo from "./Flamingo";
import Parrot from "./Parrot";
import Horse from "./Horse";
import LTokyo from "./LTokyo";
import PIon from "./PIonDrive";
import { Box3, Vector3 } from "three";
import gsap from "gsap";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";

interface SceneProps {
  FlamingoRef: React.RefObject<THREE.Group>;
  ParrotRef: React.RefObject<THREE.Group>;
  HorseRef: React.RefObject<THREE.Group>;
  LTokyoRef: React.RefObject<THREE.Group>;
  PIonRef: React.RefObject<THREE.Group>;
  selectedItem: string;
}

export const Scene: React.FC<SceneProps> = ({
  FlamingoRef,
  ParrotRef,
  HorseRef,
  LTokyoRef,
  PIonRef,
  selectedItem,
}) => {
  // camera position reset area begins
  const cameraRef = useRef<THREE.Camera>();

  useFrame(({ camera }) => {
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

  // calculate model size area begins
  const [modelBounds, setModelBounds] = useState<{
    [key: string]: Box3 | undefined;
  }>({});

  useEffect(() => {
    const calculateModelBounds = (
      ref: React.RefObject<THREE.Group>,
      _modelName: string
    ) => {
      if (ref.current) {
        const box = new Box3().setFromObject(ref.current);
        return box; // Return the calculated box
      }
      return undefined; // Return undefined if unable to calculate bounds
    };

    // Calculate the model bounds for each model
    const flamingoBounds = calculateModelBounds(FlamingoRef, "flamingo");
    const parrotBounds = calculateModelBounds(ParrotRef, "parrot");
    const horseBounds = calculateModelBounds(HorseRef, "horse");
    const lTokyoBounds = calculateModelBounds(LTokyoRef, "LTokyo");
    const pIonBounds = calculateModelBounds(PIonRef, "pion");

    setModelBounds({
      flamingo: flamingoBounds,
      parrot: parrotBounds,
      horse: horseBounds,
      LTokyo: lTokyoBounds,
      pion: pIonBounds,
    });
  }, [selectedItem]);

  const [depthG] = useState(0.5);
  const [widthG] = useState(0.5);
  const [heightG] = useState(0.5);

  useEffect(() => {
    if (modelBounds[selectedItem]) {
      //const box = modelBounds[selectedItem];
      // const width = box!.max.x - box!.min.x;
      // const height = box!.max.y - box!.min.y;
      // const depth = box!.max.z - box!.min.z;
      // setDepthG(1);
      // setWidthG(1);
      // setHeightG(1);

      // Apply scale factor to all models
      FlamingoRef.current?.scale.set(widthG, heightG, depthG);
      ParrotRef.current?.scale.set(widthG, heightG, depthG);
      HorseRef.current?.scale.set(widthG, heightG, depthG);
      LTokyoRef.current?.scale.set(widthG, heightG, depthG);
      PIonRef.current?.scale.set(widthG, heightG, depthG);
    }
  }, [modelBounds]);

  // move models across screen area begins
  useEffect(() => {
    const moveModels = (
      ref: React.RefObject<THREE.Group>,
      startPosition: Vector3,
      endPosition: Vector3,
      scale: Vector3
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
            onStart: () => {
              ref.current?.scale.copy(scale);
            },
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
    const scale = new Vector3(0.05, 0.05, 0.05);

    if (selectedItem === "parrot") {
      moveModels(ParrotRef, startPosition, endPosition, scale);
    } else if (selectedItem === "horse") {
      moveModels(HorseRef, startPosition, endPosition, scale);
    } else if (selectedItem === "flamingo") {
      moveModels(FlamingoRef, startPosition, endPosition, scale);
    } else if (selectedItem === "LTokyo") {
      const startPosition = new Vector3(0, 0, 0);
      const endPosition = new Vector3(0, 0, 0);
      moveModels(LTokyoRef, startPosition, endPosition, scale);
    } else if (selectedItem === "pion") {
      const startPosition = new Vector3(0, 0, 0);
      const endPosition = new Vector3(0, 0, 0);
      moveModels(PIonRef, startPosition, endPosition, scale);
    }
  }, [selectedItem, ParrotRef, HorseRef, FlamingoRef, LTokyoRef, PIonRef]);

  return (
    <>
      <ambientLight intensity={2} />
      <pointLight position={[40, 40, 40]} />

      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={"hotpink"} />
      </mesh>
      <group
        ref={LTokyoRef}
        position={selectedItem === "LTokyo" ? [0, 0, 0] : [0, 0, 0]}
      >
        {selectedItem === "LTokyo" && (
          <LTokyo scale={new Vector3(widthG, heightG, depthG)} />
        )}
      </group>
      <group
        ref={PIonRef}
        position={selectedItem === "pion" ? [0, 0, 0] : [0, 0, 0]}
      >
        {selectedItem === "pion" && (
          <PIon scale={new Vector3(widthG, heightG, depthG)} />
        )}
      </group>
      <group
        ref={FlamingoRef}
        position={selectedItem === "flamingo" ? [10, 0, 0] : [10, 0, 0]}
      >
        {selectedItem === "flamingo" && (
          <Flamingo scale={new Vector3(widthG, heightG, depthG)} />
        )}
      </group>
      <group
        ref={ParrotRef}
        position={selectedItem === "parrot" ? [10, 0, 0] : [10, 0, 0]}
      >
        {selectedItem === "parrot" && (
          <Parrot scale={new Vector3(widthG, heightG, depthG)} />
        )}
      </group>
      <group
        ref={HorseRef}
        position={selectedItem === "horse" ? [10, 0, 0] : [10, 0, 0]}
      >
        {selectedItem === "horse" && (
          <Horse scale={new Vector3(widthG, heightG, depthG)} />
        )}
      </group>

      <OrbitControls enableZoom={false} />
    </>
  );
};
