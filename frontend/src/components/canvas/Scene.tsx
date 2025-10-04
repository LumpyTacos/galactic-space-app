import { Physics } from '@react-three/rapier';
import { Suspense } from 'react';
import { Ground } from './Ground';
import { Player } from './Player';

export function Scene() {
  return (
    <>
      {/* Set a background color for the scene */}
      <color attach="background" args={['#171720']} />

      {/* Basic lighting for the scene */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]} // Higher resolution shadows
      />

      {/* The Physics component enables the physics simulation */}
      <Physics gravity={[0, -9.81, 0]}>
        {/* Suspense is a React feature that lets you show a fallback while components are loading */}
        <Suspense fallback={null}>
          <Player />
        </Suspense>
        <Ground />
      </Physics>
    </>
  );
}