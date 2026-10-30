import React, { useMemo } from 'react';
import * as THREE from 'three';

interface PipeSegmentProps {
  start: [number, number, number];
  end: [number, number, number];
  mid: [number, number, number];
  length: number;
  direction: [number, number, number];
  radius: number;
  color: string;
}

export const PipeSegment: React.FC<PipeSegmentProps> = ({
  mid,
  length,
  direction,
  radius,
  color,
}) => {
  const rotation = useMemo(() => {
    const dirVec = new THREE.Vector3(...direction).normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const quat = new THREE.Quaternion().setFromUnitVectors(up, dirVec);
    const euler = new THREE.Euler().setFromQuaternion(quat);
    return [euler.x, euler.y, euler.z] as [number, number, number];
  }, [direction]);

  const cuffHalfLen = Math.max(0.01, length / 2 - 0.08);

  return (
    <group position={mid} rotation={rotation}>
      {/* Main Cylinder Body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, length, 16]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.35}
        />
      </mesh>

      {/* Joint cuff near end A */}
      <mesh position={[0, cuffHalfLen, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[radius * 1.15, radius * 1.15, 0.16, 16]} />
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Joint cuff near end B */}
      <mesh position={[0, -cuffHalfLen, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[radius * 1.15, radius * 1.15, 0.16, 16]} />
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
};
