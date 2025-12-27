import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';
import { useStore } from '../store';
import { lerp } from '../utils/matrixMath';

export default function BasisVectors() {
  const iVectorRef = useRef();
  const jVectorRef = useRef();
  const kVectorRef = useRef();

  const { matrix, targetMatrix, isAnimating, animationProgress } = useStore();

  useFrame(() => {
    let currentMatrix = matrix;

    if (isAnimating && targetMatrix) {
      currentMatrix = lerp(matrix, targetMatrix, animationProgress);
    }

    // Transform basis vectors
    const iVector = new THREE.Vector3(currentMatrix[0][0], currentMatrix[1][0], currentMatrix[2][0]);
    const jVector = new THREE.Vector3(currentMatrix[0][1], currentMatrix[1][1], currentMatrix[2][1]);
    const kVector = new THREE.Vector3(currentMatrix[0][2], currentMatrix[1][2], currentMatrix[2][2]);

    // Update line positions
    if (iVectorRef.current) {
      iVectorRef.current.geometry.setFromPoints([
        new THREE.Vector3(0, 0, 0),
        iVector,
      ]);
    }
    if (jVectorRef.current) {
      jVectorRef.current.geometry.setFromPoints([
        new THREE.Vector3(0, 0, 0),
        jVector,
      ]);
    }
    if (kVectorRef.current) {
      kVectorRef.current.geometry.setFromPoints([
        new THREE.Vector3(0, 0, 0),
        kVector,
      ]);
    }
  });

  return (
    <group>
      {/* i vector (red) */}
      <line ref={iVectorRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#ef4444" linewidth={3} />
      </line>

      {/* j vector (green) */}
      <line ref={jVectorRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#22c55e" linewidth={3} />
      </line>

      {/* k vector (blue) */}
      <line ref={kVectorRef}>
        <bufferGeometry />
        <lineBasicMaterial color="#3b82f6" linewidth={3} />
      </line>

      {/* Original basis vectors (faded) */}
      <Line points={[[0, 0, 0], [1, 0, 0]]} color="#ef4444" opacity={0.2} transparent lineWidth={1} />
      <Line points={[[0, 0, 0], [0, 1, 0]]} color="#22c55e" opacity={0.2} transparent lineWidth={1} />
      <Line points={[[0, 0, 0], [0, 0, 1]]} color="#3b82f6" opacity={0.2} transparent lineWidth={1} />
    </group>
  );
}
