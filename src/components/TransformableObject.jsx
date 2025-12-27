import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../store';
import { getModelGeometry } from '../utils/models';
import { lerp } from '../utils/matrixMath';

export default function TransformableObject() {
  const meshRef = useRef();
  const originalMeshRef = useRef();
  
  const {
    matrix,
    targetMatrix,
    isAnimating,
    animationProgress,
    updateAnimation,
    currentModel,
    showOriginal,
    animationSpeed,
  } = useStore();

  // Generate geometry based on selected model
  const geometry = useMemo(() => getModelGeometry(currentModel), [currentModel]);

  // Apply matrix transformation
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    let currentMatrix = matrix;

    // Handle animation
    if (isAnimating && targetMatrix) {
      const progress = Math.min(animationProgress + (delta * animationSpeed) / 2, 1);
      updateAnimation(progress);
      
      // Interpolate between current and target matrix
      currentMatrix = lerp(matrix, targetMatrix, easeInOutCubic(progress));
    }

    // Convert 2D array to THREE.Matrix4
    const m4 = new THREE.Matrix4();
    m4.set(
      currentMatrix[0][0], currentMatrix[0][1], currentMatrix[0][2], 0,
      currentMatrix[1][0], currentMatrix[1][1], currentMatrix[1][2], 0,
      currentMatrix[2][0], currentMatrix[2][1], currentMatrix[2][2], 0,
      0, 0, 0, 1
    );

    meshRef.current.matrix.copy(m4);
    meshRef.current.matrixAutoUpdate = false;
  });

  return (
    <group>
      {/* Original model (ghosted) */}
      {showOriginal && (
        <mesh ref={originalMeshRef} geometry={geometry}>
          <meshStandardMaterial
            color="#4b5563"
            transparent
            opacity={0.15}
            wireframe
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Transformed model */}
      <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          color="#8b5cf6"
          metalness={0.3}
          roughness={0.4}
          emissive="#8b5cf6"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  );
}

// Easing function for smooth animation
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
