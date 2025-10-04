import { OrbitControls, Stars } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export function Scene() {
  const { scene } = useThree();

  useEffect(() => {
    // Set a deep space background color
    scene.background = new THREE.Color('#040720');
  }, [scene]);

  return (
    <>
      {/* Allows you to move the camera with the mouse */}
      <OrbitControls />

      {/* Basic lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      {/* Starfield background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
    </>
  );
}
