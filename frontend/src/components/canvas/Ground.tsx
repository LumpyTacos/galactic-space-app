import { CuboidCollider } from '@react-three/rapier';

export function Ground() {
  return (
    <>
      {/* The visible floor plane */}
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[500, 500]} />
        {/* Simple blue material */}
        <meshStandardMaterial color="#2a4f6d" />
      </mesh>

      {/* The invisible physics collider for the ground */}
      <CuboidCollider 
        args={[250, 0.5, 250]} 
        position={[0, -0.5, 0]} 
        friction={1} // High friction to make driving feel good
      />
    </>
  );
}