import React, { useMemo } from 'react';
import * as THREE from 'three';

interface PipeElbowProps {
  corner: [number, number, number];
  inDir: [number, number, number];
  outDir: [number, number, number];
  radius: number;
  color: string;
}

export const PipeElbow: React.FC<PipeElbowProps> = ({
  corner,
  inDir,
  outDir,
  radius,
  color,
}) => {
  const { tubeGeo, cornerVec } = useMemo(() => {
    const c = new THREE.Vector3(...corner);
    const inV = new THREE.Vector3(...inDir).normalize().multiplyScalar(radius * 1.5);
    const outV = new THREE.Vector3(...outDir).normalize().multiplyScalar(radius * 1.5);

    const p0 = new THREE.Vector3().copy(c).add(inV);
    const p1 = new THREE.Vector3().copy(c);
    const p2 = new THREE.Vector3().copy(c).add(outV);

    const curve = new THREE.CatmullRomCurve3([p0, p1, p2]);
    const geo = new THREE.TubeGeometry(curve, 24, radius, 12, false);
    return { tubeGeo: geo, cornerVec: c };
  }, [corner, inDir, outDir, radius]);

  return (
    <group>
      {/* Curved elbow tube */}
      <mesh geometry={tubeGeo} castShadow receiveShadow>
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.35}
        />
      </mesh>

      {/* Joint sleeve at corner */}
      <mesh position={corner} castShadow receiveShadow>
        <sphereGeometry args={[radius * 1.35, 12, 12]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
};
