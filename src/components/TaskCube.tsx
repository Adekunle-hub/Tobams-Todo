"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface TaskCubeProps {
  completedTasks: number; // 0–100
}

const RotatingCube = ({ color, scale }: { color: string; scale: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} scale={[scale, scale, scale]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export const TaskCube: React.FC<TaskCubeProps> = ({ completedTasks }) => {

  const progress = Math.max(0, Math.min(100, completedTasks));

  // Determine color based on progress
  let color = "#FFA048"; // todo (0%)
  if (progress > 0 && progress < 100) color = "#FF7979"; // in-progress
  else if (progress === 100) color = "#78D700"; // completed

  // Optional: scale smaller if completed
  const scale = progress === 100 ? 1.2 : 1.5;

  return (
    <Canvas
      style={{ width: 40, height: 40 }}
      camera={{ position: [3, 3, 5], fov: 45 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      <RotatingCube color={color} scale={scale} />
    </Canvas>
  );
};
