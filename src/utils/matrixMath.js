// Matrix math utilities

export function multiplyMatrices(a, b) {
  const result = Array(3).fill(0).map(() => Array(3).fill(0));
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return result;
}

export function determinant(m) {
  return (
    m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
    m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
    m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0])
  );
}

export function trace(m) {
  return m[0][0] + m[1][1] + m[2][2];
}

export function transpose(m) {
  return m[0].map((_, i) => m.map(row => row[i]));
}

export function matrixNorm(m) {
  let sum = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      sum += m[i][j] * m[i][j];
    }
  }
  return Math.sqrt(sum);
}

export function isOrthogonal(m, tolerance = 0.001) {
  const mT = transpose(m);
  const product = multiplyMatrices(m, mT);
  
  // Check if M * M^T = I
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const expected = i === j ? 1 : 0;
      if (Math.abs(product[i][j] - expected) > tolerance) {
        return false;
      }
    }
  }
  return true;
}

export function eigenvalues(m) {
  // Simplified eigenvalue calculation for 3x3 (characteristic polynomial)
  // This is approximate and works best for symmetric matrices
  const a = m[0][0], b = m[0][1], c = m[0][2];
  const d = m[1][0], e = m[1][1], f = m[1][2];
  const g = m[2][0], h = m[2][1], i = m[2][2];
  
  // Characteristic polynomial: det(M - λI) = 0
  // -λ³ + p₂λ² + p₁λ + p₀ = 0
  const p2 = -(a + e + i);
  const p1 = (a*e + a*i + e*i - b*d - c*g - f*h);
  const p0 = -(a*e*i + b*f*g + c*d*h - c*e*g - b*d*i - a*f*h);
  
  // For simplicity, return approximate values or null
  // A full cubic solver would be needed for exact values
  return null; // We'll skip eigenvalue display for now
}

export function lerp(a, b, t) {
  return a.map((row, i) =>
    row.map((val, j) => val + (b[i][j] - val) * t)
  );
}

// SLERP for rotation matrices (spherical linear interpolation)
export function slerp(m1, m2, t) {
  // Convert to quaternions, interpolate, convert back
  // Simplified: just use lerp for now, proper SLERP is complex
  return lerp(m1, m2, t);
}

export function classifyTransformation(m) {
  const det = determinant(m);
  const isOrtho = isOrthogonal(m);
  const tr = trace(m);
  
  // Zero matrix
  if (Math.abs(det) < 0.001 && matrixNorm(m) < 0.001) {
    return { type: 'Collapse to Point', emoji: '•', color: '#ef4444' };
  }
  
  // Projection (det = 0 but not zero matrix)
  if (Math.abs(det) < 0.001) {
    return { type: 'Projection', emoji: '📐', color: '#f59e0b' };
  }
  
  // Reflection (det = -1 and orthogonal)
  if (Math.abs(det + 1) < 0.001 && isOrtho) {
    return { type: 'Reflection', emoji: '🪞', color: '#3b82f6' };
  }
  
  // Rotation (det = 1 and orthogonal)
  if (Math.abs(det - 1) < 0.001 && isOrtho) {
    if (Math.abs(tr - 3) < 0.001) {
      return { type: 'Identity', emoji: '🎯', color: '#10b981' };
    }
    return { type: 'Rotation', emoji: '🔄', color: '#8b5cf6' };
  }
  
  // Uniform scaling (diagonal matrix)
  const isDiagonal = 
    Math.abs(m[0][1]) < 0.001 && Math.abs(m[0][2]) < 0.001 &&
    Math.abs(m[1][0]) < 0.001 && Math.abs(m[1][2]) < 0.001 &&
    Math.abs(m[2][0]) < 0.001 && Math.abs(m[2][1]) < 0.001;
  
  if (isDiagonal) {
    const scaleX = m[0][0];
    const scaleY = m[1][1];
    const scaleZ = m[2][2];
    
    if (Math.abs(scaleX - scaleY) < 0.001 && Math.abs(scaleY - scaleZ) < 0.001) {
      return { type: 'Uniform Scale', emoji: '📏', color: '#06b6d4' };
    }
    return { type: 'Non-uniform Scale', emoji: '📊', color: '#14b8a6' };
  }
  
  // Shear (det = 1 but not orthogonal)
  if (Math.abs(det - 1) < 0.001 && !isOrtho) {
    return { type: 'Shear', emoji: '📐', color: '#ec4899' };
  }
  
  // Generic transformation
  return { type: 'Mixed Transform', emoji: '🎨', color: '#a855f7' };
}

export function formatNumber(num, decimals = 2) {
  if (Math.abs(num) < 0.001) return '0';
  return num.toFixed(decimals);
}
