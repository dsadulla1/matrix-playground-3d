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
  
  // Generate vertices
  for (let i = 0; i < resolution; i++) {
    for (let j = 0; j < resolution; j++) {
      const x = xMin + i * xStep;
      const y = yMin + j * yStep;
      const z = evaluateFunction(exprString, x, y);
      
      totalPoints++;
      
      if (z !== null) {
        validPoints++;
        positions.push(x, z, y); // Note: z is vertical in Three.js
      } else {
        // Push a placeholder that won't be rendered
        positions.push(x, 0, y);
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
      
      // Check if all vertices are valid
      const za = positions[a * 3 + 1];
      const zb = positions[b * 3 + 1];
      const zc = positions[c * 3 + 1];
      const zd = positions[d * 3 + 1];
      
      if (za !== 0 || zb !== 0 || zc !== 0) {
        indices.push(a, b, c);
      }
      if (zb !== 0 || zd !== 0 || zc !== 0) {
        indices.push(b, d, c);
      }
    }
  }
  
  // Generate normals (simple approach - compute per face)
  for (let i = 0; i < positions.length; i += 3) {
    normals.push(0, 1, 0); // Placeholder, will be computed properly by Three.js
  }
  
  return {
    positions: new Float32Array(positions),
    indices: new Uint16Array(indices),
    normals: new Float32Array(normals),
    validPoints,
    totalPoints,
    isValid: validPoints > 0,
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
  
  // Check if expression only uses x and y
  try {
    const vars = node.filter(node => node.isSymbolNode).map(node => node.name);
    const uniqueVars = [...new Set(vars)];
    const allowedVars = ['x', 'y', 'e', 'pi', 'PI', 'E'];
    const invalidVars = uniqueVars.filter(v => !allowedVars.includes(v));
    
    if (invalidVars.length > 0) {
      return { 
        valid: false, 
        error: `Unknown variables: ${invalidVars.join(', ')}. Use only x and y.` 
      };
    }
    
    // Try to evaluate at a test point
    const testResult = evaluateFunction(exprString, 0, 0);
    if (testResult === null) {
      return { 
        valid: true, 
        warning: 'Expression may have undefined points' 
      };
    }
    
    return { valid: true };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

// Domain presets
export const domainPresets = {
  standard: { xMin: -5, xMax: 5, yMin: -5, yMax: 5, label: 'Standard (-5 to 5)' },
  unit: { xMin: 0, xMax: 1, yMin: 0, yMax: 1, label: 'Unit (0 to 1)' },
  trigonometric: { 
    xMin: -Math.PI, 
    xMax: Math.PI, 
    yMin: -Math.PI, 
    yMax: Math.PI, 
    label: 'Trigonometric (-π to π)' 
  },
  wide: { xMin: -10, xMax: 10, yMin: -10, yMax: 10, label: 'Wide (-10 to 10)' },
  narrow: { xMin: -2, xMax: 2, yMin: -2, yMax: 2, label: 'Narrow (-2 to 2)' },
};
