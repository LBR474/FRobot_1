import { Suspense, useState } from "react";

import { Canvas } from "@react-three/fiber";


import Flamingo from "./Flamingo";
import { Vector3 } from "three";


export default function App() {
 const [scale, setScale] = useState(new Vector3(0.1, 0.1, 0.1));
  return (
    <>
      <Canvas camera={{ position: [0, 0, 55] }}>
        <ambientLight intensity={2} />
        <pointLight position={[40, 40, 40]} />
        <Suspense fallback={null}>
          <Flamingo scale={scale} />
        </Suspense>
      </Canvas>
    </>
  );
}
