import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, RigidBody, vec3 } from '@react-three/rapier';
import { useRef } from 'react';
import * as THREE from 'three';

export function Player() {
  const playerRef = useRef<RapierRigidBody>(null!);
  const [subscribe, getControls] = useKeyboardControls();

  // This is the main game loop, running on every frame
  useFrame((state, delta) => {
    if (!playerRef.current) return;

    // 1. GET KEYBOARD INPUT
    const { forward, back, left, right, brake } = getControls();

    // 2. DEFINE FORCES AND TORQUES
    const impulse = new THREE.Vector3();
    const torque = new THREE.Vector3();

  // Reduced strengths so the player moves and turns more gently
  const impulseStrength = 120 * delta; // Force for moving forward/backward (reduced)
  const torqueStrength = 40 * delta; // Force for turning (reduced)

    if (forward) {
      impulse.z -= impulseStrength;
    }
    if (back) {
      impulse.z += impulseStrength;
    }
    if (left) {
      torque.y += torqueStrength;
    }
    if (right) {
      torque.y -= torqueStrength;
    }

    // 3. APPLY FORCES TO THE CUBE
    // We apply the impulse relative to the cube's current rotation
    const worldImpulse = impulse.applyQuaternion(playerRef.current.rotation());
    playerRef.current.applyImpulse(worldImpulse, true);
    playerRef.current.applyTorqueImpulse(torque, true);

    // 4. BRAKE LOGIC (Apply damping)
    if (brake) {
      playerRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      playerRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
    
    // 5. CAMERA FOLLOW LOGIC
    const bodyPosition = vec3(playerRef.current.translation());
    
    // The camera should be more top-down: higher Y, smaller forward/back offset
    const cameraOffset = new THREE.Vector3(0, 14, 6).applyQuaternion(playerRef.current.rotation());
    const cameraPosition = new THREE.Vector3().copy(bodyPosition).add(cameraOffset);

    // Smoothly move the camera to its target position (slightly smoother)
    state.camera.position.lerp(cameraPosition, delta * 3);
    state.camera.lookAt(bodyPosition);
  });

  return (
    // Increase damping to reduce sliding and fast angular spinning
    <RigidBody ref={playerRef} colliders="cuboid" linearDamping={1} angularDamping={2} position={[0, 1, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1, 1, 2]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </RigidBody>
  );
}