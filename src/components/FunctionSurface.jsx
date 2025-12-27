import { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useStore } from '../store';
import { generateSurfaceData } from '../utils/functionMath';

export default function FunctionSurface({ functionData }) {
  const meshRef = useRef();
  const { functionResolution, functionDomain } = useStore();
  
  // Generate surface geometry
  const geometry = useMemo(() => {
    if (!functionData.expression || !functionData.visible) {
      return null;
    }
    
    const surfaceData = generateSurfaceData(
      functionData.expression,
      functionDomain,
      functionResolution
    );
    
    if (!surfaceData.isValid) {
      return null;
    }
    
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(surfaceData.positions, 3));
    geo.setIndex(new THREE.BufferAttribute(surfaceData.indices, 1));
    geo.computeVertexNormals();
    
    return geo;
  }, [functionData.expression, functionDomain, functionResolution, functionData.visible]);
  
  // Update material opacity
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.material.opacity = functionData.opacity;
    }
  }, [functionData.opacity]);
  
  if (!geometry || !functionData.visible) {
    return null;
  }
  
  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color={functionData.color}
        side={THREE.DoubleSide}
        transparent
        opacity={functionData.opacity}
        metalness={0.2}
        roughness={0.6}
      />
    </mesh>
  );
}
