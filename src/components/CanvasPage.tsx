import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";

import { OrbitControls } from "@react-three/drei";

import { Scene } from "./Scene";

export default function App() {
  const [selectedItem, setSelectedItem] = useState("");
  const FlamingoRef = useRef<THREE.Group>(null);
  const ParrotRef = useRef<THREE.Group>(null);
  const HorseRef = useRef<THREE.Group>(null);
  const LTokyoRef = useRef<THREE.Group>(null);
  const PIonRef = useRef<THREE.Group>(null);

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
        <option value="LTokyo">Littlest Tokyo</option>
        <option value="flamingo">Flamingo</option>
        <option value="parrot">Parrot</option>
        <option value="horse">Horse</option>
        <option value="pion">Primary Ion Drive</option>
      </select>{" "}
      <Suspense fallback={<div>Loading...</div>}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Scene
            FlamingoRef={FlamingoRef}
            ParrotRef={ParrotRef}
            HorseRef={HorseRef}
            LTokyoRef={LTokyoRef}
            PIonRef={PIonRef}
            selectedItem={selectedItem}
          />
          <OrbitControls />
        </Canvas>
      </Suspense>
    </>
  );
}
