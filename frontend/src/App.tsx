import { KeyboardControls } from '@react-three/drei';
import type { KeyboardControlsEntry } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useMemo } from 'react';
import { Scene } from './components/canvas/Scene';
import './index.css';

// Define the actions and the keys that trigger them
type Controls = 'forward' | 'back' | 'left' | 'right' | 'brake';

const Controls = {
  forward: 'forward' as Controls,
  back: 'back' as Controls,
  left: 'left' as Controls,
  right: 'right' as Controls,
  brake: 'brake' as Controls,
};

function App() {
  // This mapping connects keyboard keys to our named actions
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(() => [
    { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
    { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
    { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
    { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
    { name: Controls.brake, keys: ['Space'] },
  ], []);

  return (
    // KeyboardControls provides a context for reading keyboard input anywhere in the app
    <KeyboardControls map={map}>
      {/* Start the camera higher and more top-down (y increased, x/z adjusted) */}
      <Canvas shadows camera={{ position: [0, 18, 8], fov: 55 }}>
        <Scene />
      </Canvas>
    </KeyboardControls>
  );
}

export default App;