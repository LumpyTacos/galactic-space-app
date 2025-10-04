import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import { Scene } from './components/canvas/Scene';
import { InfoPanel } from './components/ui/InfoPanel';

function App() {
  // State to control the visibility of the UI panel
  const [activeStation, setActiveStation] = useState<string | null>(null);

  return (
    <>
      {/* 2D UI Layer */}
      {activeStation && (
        <InfoPanel
          title={activeStation}
          onClose={() => setActiveStation(null)}
        />
      )}

      {/* 3D Canvas Layer */}
      <Canvas
        camera={{
          fov: 75,
          position: [0, 0, 10],
        }}
      >
        <Scene />
        {/* Example of a clickable object to test the UI */}
        <mesh position={[-3, 0, 0]} onClick={() => setActiveStation('Biology Station')}>
          <boxGeometry />
          <meshStandardMaterial color="royalblue" />
        </mesh>
      </Canvas>
    </>
  );
}

export default App;