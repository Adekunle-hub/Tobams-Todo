"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface TaskCubeProps {
  completedTasks: number;
  totalTasks: number;
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

const TaskCube: React.FC<TaskCubeProps> = ({ completedTasks, totalTasks }) => {
 const progress = completedTasks; 

  let color = "#FFA048"; 
  const scale = 2;
  if (progress === 0) {
    color = "#FFA048"; 
  } else if (progress > 0 && progress < 100) {
    color = "#FF7979";
  } else if (progress === 100) {
    color = "#78D700"; 
  }

  return (
    <Canvas style={{ width: 40, height: 40, display: "inline-block" }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <RotatingCube color={color} scale={scale} />
    </Canvas>
  );
};

export default TaskCube;
