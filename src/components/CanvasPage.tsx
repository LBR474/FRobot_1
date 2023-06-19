import { Suspense, useEffect, useState } from "react";

import { Canvas } from "@react-three/fiber";

import Flamingo from "./Flamingo";
import Parrot from "./Parrot";
import Horse from "./Horse";
import { Vector3 } from "three";

import { OrbitControls } from "@react-three/drei";

export default function App() {
  const [scale] = useState(new Vector3(0.1, 0.1, 0.1));
  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    // Initial state
    setSelectedItem('');
  }, []);

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedItem(event.target.value);
  };

  return (
    <>
      <select value={selectedItem} onChange={handleDropdownChange}>
        <option value="">Select an item</option>
        <option value="flamingo">Flamingo</option>
        <option value="parrot">Parrot</option>
        {/* <option value="tokyo">Tokyo</option> */}
        <option value="horse">Horse</option>
      </select>{" "}
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={2} />
        <pointLight position={[40, 40, 40]} />

        <Suspense fallback={null}>
          <mesh position={[0, -1, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color={"hotpink"} />
          </mesh>

          {selectedItem === "flamingo" ? <Flamingo scale={scale} /> : null}
          {selectedItem === "parrot" ? <Parrot scale={scale} /> : null}
          {selectedItem === "horse" ? <Horse scale={scale} /> : null}
        </Suspense>
        <OrbitControls />
      </Canvas>
    </>
  );
}
