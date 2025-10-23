import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface GeometricShapeProps {
  completionRate: number;
}

function GeometricShape({ completionRate }: GeometricShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      meshRef.current.scale.setScalar(0.8 + completionRate * 0.3);
    }
  });

  const color = new THREE.Color().setHSL(completionRate * 0.3, 0.7, 0.6);

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color={color} 
        wireframe={false}
        metalness={0.3}
        roughness={0.4}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

export function TaskWidget3D({ completedTasks, totalTasks }: { completedTasks: number; totalTasks: number }) {
  const completionRate = totalTasks > 0 ? completedTasks / totalTasks : 0;

  return (
    <div className="w-32 h-32 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        <GeometricShape completionRate={completionRate} />
      </Canvas>
    </div>
  );
}