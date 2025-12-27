import { useMemo } from 'react';
import * as THREE from 'three';
import { useStore } from '../store';
import { evaluateFunction } from '../utils/functionMath';

export default function FunctionCurve({ functionData }) {
  const { functionDomain } = useStore();
  
  // Generate curve geometry
  const geometry = useMemo(() => {
    if (!functionData.expression || !functionData.visible) {
      return null;
    }
    
    const { xMin, xMax } = functionDomain;
    const points = [];
    const numPoints = 200; // High resolution for smooth curves
    const step = (xMax - xMin) / numPoints;
    
    // Generate points along the curve
    for (let i = 0; i <= numPoints; i++) {
      const x = xMin + i * step;
      const y = evaluateFunction(functionData.expression, x, 0); // In 2D mode, y is the output
      
      if (y !== null && isFinite(y)) {
        // Clamp y to reasonable bounds
        const clampedY = Math.max(-10, Math.min(10, y));
        points.push(new THREE.Vector3(x, clampedY, 0));
      }
    }
    
    if (points.length < 2) {
      return null;
    }
    
    // Create a curve from points
    const curve = new THREE.CatmullRomCurve3(points);
    
    // Create tube geometry for thick line
    const thickness = functionData.thickness || 0.05;
    const tubeGeometry = new THREE.TubeGeometry(
      curve,
      points.length * 2, // segments
      thickness, // radius (thickness)
      8, // radial segments
      false // closed
    );
    
    return tubeGeometry;
  }, [functionData.expression, functionData.visible, functionData.thickness, functionDomain]);
  
  if (!geometry || !functionData.visible) {
    return null;
  }
  
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color={functionData.color}
        metalness={0.3}
        roughness={0.4}
        emissive={functionData.color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}
