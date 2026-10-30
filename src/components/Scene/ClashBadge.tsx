import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { ClashResult } from '../../utils/clashDetection';
import { useStore } from '../../store';

interface ClashBadgeProps {
  clash: ClashResult;
}

export const ClashBadge: React.FC<ClashBadgeProps> = ({ clash }) => {
  const { exploded } = useStore();
  const meshRef = useRef<THREE.Mesh>(null);

  // Pulse animation: 0.9 <-> 1.1 scale
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const s = 1.0 + Math.sin(clock.getElapsedTime() * 6.0) * 0.15;
      meshRef.current.scale.set(s, s, s);
    }
  });

  if (!exploded) return null;

  return (
    <group position={clash.position}>
      {/* Pulsing Red Torus */}
      <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.12, 12, 24]} />
        <meshBasicMaterial color="#dc0000" wireframe={false} />
      </mesh>

      {/* Sphere Indicator Core */}
      <mesh>
        <sphereGeometry args={[0.25, 12, 12]} />
        <meshBasicMaterial color="#ff3300" />
      </mesh>

      {/* Technical HUD Tag */}
      <Html position={[0, 0.9, 0]} center distanceFactor={22}>
        <div className="bg-[#dc0000] text-white border border-black px-2 py-1 font-mono text-[10px] font-bold hard-shadow whitespace-nowrap pointer-events-none select-none">
          <div>⚠ CLASH — {clash.distance}m</div>
          <div className="text-[9px] font-normal text-white/90">
            {clash.newType} × {clash.existingAgency} (REQ: {clash.safetyThreshold}m)
          </div>
        </div>
      </Html>
    </group>
  );
};
