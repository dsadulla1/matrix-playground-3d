// Function math utilities using math.js
import * as math from 'mathjs';

// Parse a math expression string
export function parseExpression(exprString) {
  if (!exprString || exprString.trim() === '') {
    return null;
  }
  
  try {
    const node = math.parse(exprString);
    return node;
  } catch (error) {
    console.error('Parse error:', error);
    return null;
  }
}

// Evaluate function at a point
export function evaluateFunction(exprString, x, y) {
  const node = parseExpression(exprString);
  if (!node) return null;
  
  try {
    const result = node.evaluate({ x, y });
    
    // Handle complex numbers, infinities, NaN
    if (typeof result === 'number') {
      if (isNaN(result) || !isFinite(result)) {
        return null;
      }
      return result;
    }
    
    // If result is complex number
    if (result && typeof result === 'object' && 're' in result) {
      return null; // Don't plot complex numbers
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

// Generate surface data for a function
export function generateSurfaceData(exprString, domain, resolution) {
  const { xMin, xMax, yMin, yMax } = domain;
  const positions = [];
  const indices = [];
  const normals = [];
  
  const xStep = (xMax - xMin) / (resolution - 1);
  const yStep = (yMax - yMin) / (resolution - 1);
  
  let validPoints = 0;
  let totalPoints = 0;
  let minZ = Infinity;
  let maxZ = -Infinity;
  
  // First pass: find Z range
  const zValues = [];
  for (let i = 0; i < resolution; i++) {
    zValues[i] = [];
    for (let j = 0; j < resolution; j++) {
      const x = xMin + i * xStep;
      const y = yMin + j * yStep;
      const z = evaluateFunction(exprString, x, y);
      
      zValues[i][j] = z;
      
      if (z !== null) {
        minZ = Math.min(minZ, z);
        maxZ = Math.max(maxZ, z);
      }
    }
  }
  
  // Clamp Z range to reasonable bounds
  const zRange = maxZ - minZ;
  const maxAllowedRange = 10;
  
  let zScale = 1;
  if (zRange > maxAllowedRange) {
    zScale = maxAllowedRange / zRange;
  }
  
  // Scale XY to fit in scene (default scene is about -5 to 5)
  const xRange = xMax - xMin;
  const yRange = yMax - yMin;
  const maxXYRange = Math.max(xRange, yRange);
  const xyScale = maxXYRange > 8 ? 8 / maxXYRange : 1;
  
  // Second pass: generate vertices with scaling
  for (let i = 0; i < resolution; i++) {
    for (let j = 0; j < resolution; j++) {
      const x = xMin + i * xStep;
      const y = yMin + j * yStep;
      const z = zValues[i][j];
      
      totalPoints++;
      
      if (z !== null && isFinite(z)) {
        validPoints++;
        // Clamp extreme Z values
        const clampedZ = Math.max(minZ, Math.min(maxZ, z));
        const scaledZ = (clampedZ - minZ) * zScale - (maxZ - minZ) * zScale / 2;
        
        positions.push(x * xyScale, scaledZ, y * xyScale);
      } else {
        positions.push(x * xyScale, 0, y * xyScale);
      }
    }
  }
  
  // Generate indices for triangles
  for (let i = 0; i < resolution - 1; i++) {
    for (let j = 0; j < resolution - 1; j++) {
      const a = i * resolution + j;
      const b = i * resolution + j + 1;
      const c = (i + 1) * resolution + j;
      const d = (i + 1) * resolution + j + 1;
      
      // Check if vertices are valid
      const za = zValues[i][j];
      const zb = zValues[i][j + 1];
      const zc = zValues[i + 1] ? zValues[i + 1][j] : null;
      const zd = zValues[i + 1] ? zValues[i + 1][j + 1] : null;
      
      if (za !== null && zb !== null && zc !== null) {
        indices.push(a, b, c);
      }
      if (zb !== null && zd !== null && zc !== null) {
        indices.push(b, d, c);
      }
    }
  }
  
  return {
    positions: new Float32Array(positions),
    indices: new Uint16Array(indices),
    validPoints,
    totalPoints,
    isValid: validPoints > 0,
    zRange: { min: minZ, max: maxZ },
  };
}

// Validate expression
export function validateExpression(exprString) {
  if (!exprString || exprString.trim() === '') {
    return { valid: false, error: 'Expression is empty' };
  }
  
  const node = parseExpression(exprString);
  if (!node) {
    return { valid: false, error: 'Invalid expression syntax' };
  }
  
  // Check if expression only uses x and y (plus allowed functions)
  try {
    // Test evaluation at a few points
    const testPoints = [[0, 0], [1, 1], [-1, -1], [0.5, 0.5]];
    let hasValidPoint = false;
    
    for (const [x, y] of testPoints) {
      const result = evaluateFunction(exprString, x, y);
      if (result !== null && isFinite(result)) {
        hasValidPoint = true;
        break;
      }
    }
    
    if (!hasValidPoint) {
      return { 
        valid: true, 
        warning: 'Expression may have undefined points in the domain' 
      };
    }
    
    return { valid: true };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

// Domain presets
export const domainPresets = {
  standard: { xMin: -3, xMax: 3, yMin: -3, yMax: 3, label: 'Standard (-3 to 3)' },
  unit: { xMin: 0, xMax: 1, yMin: 0, yMax: 1, label: 'Unit (0 to 1)' },
  trigonometric: { 
    xMin: -Math.PI, 
    xMax: Math.PI, 
    yMin: -Math.PI, 
    yMax: Math.PI, 
    label: 'Trigonometric (-π to π)' 
  },
  wide: { xMin: -5, xMax: 5, yMin: -5, yMax: 5, label: 'Wide (-5 to 5)' },
  narrow: { xMin: -1, xMax: 1, yMin: -1, yMax: 1, label: 'Narrow (-1 to 1)' },
};
