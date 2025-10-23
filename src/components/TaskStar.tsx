"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

interface TaskStarProps {
  completedTasks: number;
}

const AnimatedStar = ({ progress }: { progress: number }) => {
  const starRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  const starShape = useMemo(() => {
    const shape = new THREE.Shape();
    const outerRadius = 1;
    const innerRadius = 0.4;
    const points = 5;

    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / points;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }
    shape.closePath();

    const extrudeSettings = {
      depth: 0.2,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 3,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  useFrame(() => {
    if (!starRef.current || !glowRef.current) return;

    timeRef.current += 0.02;
    const time = timeRef.current;
    const normalizedProgress = progress / 100;

    if (progress === 100) {
      const bounce = Math.abs(Math.sin(time * 3)) * 0.15 + 1;
      starRef.current.scale.set(bounce, bounce, bounce);

      const rotation = time * 2;
      starRef.current.rotation.z = rotation;

      const glowPulse = Math.sin(time * 4) * 0.3 + 1.3;
      glowRef.current.scale.set(glowPulse, glowPulse, glowPulse);
    } else if (progress > 0) {
      const pulse = Math.sin(time * 2) * 0.1 * normalizedProgress + 0.95;
      starRef.current.scale.set(pulse, pulse, pulse);

      starRef.current.rotation.z = time * 0.5;

      const glowPulse = 0.5 + normalizedProgress * 0.5;
      glowRef.current.scale.set(glowPulse, glowPulse, glowPulse);
    } else {
      starRef.current.scale.set(0.9, 0.9, 0.9);
      starRef.current.rotation.z = time * 0.3;
      glowRef.current.scale.set(0, 0, 0);
    }

    starRef.current.rotation.y = Math.sin(time * 0.5) * 0.3;
  });

  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  let color = "#FFA048";
  let emissive = "#000000";
  let emissiveIntensity = 0;

  if (progress === 0) {
    color = "#FFA048";
    emissive = "#000000";
    emissiveIntensity = 0;
  } else if (progress < 100) {
    color = "#FF7979";
    emissive = "#FF4444";
    emissiveIntensity = 0.3;
  } else {
    color = isDarkMode ? "#78D700" : "#4A9B00";
    emissive = isDarkMode ? "#78D700" : "#4A9B00";
    emissiveIntensity = 0.8;
  }

  return (
    <group>
      <mesh ref={glowRef} position={[0, 0, -0.15]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={progress === 100 ? 0.3 : 0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh ref={starRef} geometry={starShape} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>

      {progress === 100 && <Sparkles />}
    </group>
  );
};

const Sparkles = () => {
  const sparklesRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const { positions, scales, delays } = useMemo(() => {
    const count = 20;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const delays = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 1.8 + Math.random() * 0.5;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;

      scales[i] = Math.random() * 0.5 + 0.5;
      delays[i] = Math.random() * Math.PI * 2;
    }

    return { positions, scales, delays };
  }, []);

  useFrame(() => {
    if (!sparklesRef.current) return;

    timeRef.current += 0.05;
    const time = timeRef.current;

    const posArray = sparklesRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < 20; i++) {
      const i3 = i * 3;
      const angle = (i / 20) * Math.PI * 2;
      const delay = delays[i];
      const twinkle = Math.abs(Math.sin(time * 3 + delay));
      const radius = 1.8 + twinkle * 0.3;

      posArray[i3] = Math.cos(angle + time * 0.5) * radius;
      posArray[i3 + 1] = Math.sin(angle + time * 0.5) * radius;
      posArray[i3 + 2] = Math.sin(time * 2 + delay) * 0.5;
    }

    sparklesRef.current.geometry.attributes.position.needsUpdate = true;
    sparklesRef.current.rotation.z = time * 0.2;
  });

  return (
    <points ref={sparklesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#FFFF00"
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  );
};

const TaskStar: React.FC<TaskStarProps> = ({ completedTasks }) => {
  const progress = Math.max(0, Math.min(100, completedTasks));

  return (
    <Canvas
      style={{ width: 40, height: 40 }}
      camera={{ position: [0, 0, 4.5], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -5, 3]} intensity={0.5} color="#4488ff" />
      <spotLight
        position={[0, 0, 5]}
        angle={0.6}
        penumbra={1}
        intensity={0.8}
        color="#ffffff"
      />
      <AnimatedStar progress={progress} />
    </Canvas>
  );
};

export default TaskStar;
