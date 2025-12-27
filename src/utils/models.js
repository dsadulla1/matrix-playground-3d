// 3D Model geometry generators
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export const models = {
  cube: {
    name: 'Cube',
    icon: '🧊',
    equation: 'max(|x|, |y|, |z|) = 1',
    description: 'All points where the maximum of x, y, z coordinates equals 1',
    generate: () => new THREE.BoxGeometry(2, 2, 2),
  },
  sphere: {
    name: 'Sphere',
    icon: '⚽',
    equation: 'x² + y² + z² = r²',
    description: 'All points at distance r from origin',
    generate: () => new THREE.SphereGeometry(1.2, 32, 32),
  },
  cone: {
    name: 'Cone',
    icon: '🎪',
    equation: 'x² + z² = (1-y)²',
    description: 'Circular base tapering to a point',
    generate: () => new THREE.ConeGeometry(1, 2, 32),
  },
  torus: {
    name: 'Torus',
    icon: '🍩',
    equation: '(√(x²+y²) - R)² + z² = r²',
    description: 'Donut shape: tube of radius r around circle of radius R',
    generate: () => new THREE.TorusGeometry(1, 0.4, 16, 32),
  },
  cylinder: {
    name: 'Cylinder',
    icon: '🥫',
    equation: 'x² + z² = r², -h ≤ y ≤ h',
    description: 'Circular cross-section with constant radius',
    generate: () => new THREE.CylinderGeometry(0.8, 0.8, 2, 32),
  },
  bunny: {
    name: 'Bunny',
    icon: '🐰',
    equation: 'Deformed sphere',
    description: 'Artistic deformation of sphere into bunny shape',
    generate: () => {
      const geometry = new THREE.SphereGeometry(1, 16, 16);
      const positions = geometry.attributes.position;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);
        
        let scale = 1;
        
        if (y > 0.3) {
          scale *= 0.7;
          positions.setY(i, y * 1.2);
        }
        
        if (y > 0.8) {
          if (Math.abs(x) > 0.2) {
            positions.setY(i, y * 1.5);
            positions.setX(i, x * 1.2);
            scale *= 0.3;
          }
        }
        
        if (y < -0.5) {
          scale *= 1.2;
        }
        
        positions.setX(i, x * scale);
        positions.setZ(i, z * scale);
      }
      
      geometry.computeVertexNormals();
      return geometry;
    },
  },
  teapot: {
    name: 'Teapot',
    icon: '🫖',
    equation: 'Composite shape',
    description: 'Utah teapot: sphere body + cylinder spout + torus handle',
    generate: () => {
      const group = new THREE.Group();
      
      const body = new THREE.SphereGeometry(1, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.7);
      const bodyMesh = new THREE.Mesh(body);
      bodyMesh.scale.set(1, 0.8, 1);
      
      const spout = new THREE.CylinderGeometry(0.1, 0.15, 0.8, 16);
      const spoutMesh = new THREE.Mesh(spout);
      spoutMesh.position.set(0.9, 0, 0);
      spoutMesh.rotation.z = -Math.PI / 6;
      
      const handle = new THREE.TorusGeometry(0.35, 0.08, 16, 32, Math.PI);
      const handleMesh = new THREE.Mesh(handle);
      handleMesh.position.set(-0.7, 0.2, 0);
      handleMesh.rotation.y = Math.PI / 2;
      
      const lid = new THREE.CylinderGeometry(0.5, 0.55, 0.3, 32);
      const lidMesh = new THREE.Mesh(lid);
      lidMesh.position.y = 0.9;
      
      const knob = new THREE.SphereGeometry(0.15, 16, 16);
      const knobMesh = new THREE.Mesh(knob);
      knobMesh.position.y = 1.15;
      
      group.add(bodyMesh, spoutMesh, handleMesh, lidMesh, knobMesh);
      
      const geometries = [];
      
      group.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const geo = child.geometry.clone();
          geo.applyMatrix4(child.matrixWorld);
          geometries.push(geo);
        }
      });
      
      return mergeGeometries(geometries);
    },
  },
  octahedron: {
    name: 'Octahedron',
    icon: '💎',
    equation: '|x| + |y| + |z| = 1',
    description: '8 triangular faces, dual of cube',
    generate: () => new THREE.OctahedronGeometry(1.3, 0),
  },
  star: {
    name: 'Star',
    icon: '⭐',
    equation: 'Extruded 5-point star',
    description: '5 outer points alternating with 5 inner points, extruded',
    generate: () => {
      const shape = new THREE.Shape();
      const points = 5;
      const outerRadius = 1.2;
      const innerRadius = 0.5;
      
      for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / points;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        if (i === 0) {
          shape.moveTo(x, y);
        } else {
          shape.lineTo(x, y);
        }
      }
      
      const extrudeSettings = {
        depth: 0.4,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.1,
        bevelSegments: 2,
      };
      
      return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    },
  },
  pyramid: {
    name: 'Pyramid',
    icon: '🔺',
    equation: '|x| + |z| ≤ 1-y',
    description: 'Square base tapering to apex',
    generate: () => new THREE.ConeGeometry(1.2, 2, 4),
  },
  dodecahedron: {
    name: 'Dodecahedron',
    icon: '⬢',
    equation: 'Regular 12-sided polyhedron',
    description: '12 pentagonal faces',
    generate: () => new THREE.DodecahedronGeometry(1.1, 0),
  },
  icosahedron: {
    name: 'Icosahedron',
    icon: '◇',
    equation: 'Regular 20-sided polyhedron',
    description: '20 triangular faces',
    generate: () => new THREE.IcosahedronGeometry(1.2, 0),
  },
  torusKnot: {
    name: 'Torus Knot',
    icon: '🪢',
    equation: 'Parametric knot curve',
    description: 'Tube following (2,3) torus knot path',
    generate: () => new THREE.TorusKnotGeometry(0.8, 0.25, 64, 8, 2, 3),
  },
  capsule: {
    name: 'Capsule',
    icon: '💊',
    equation: 'Cylinder with hemisphere caps',
    description: 'Cylinder capped with two hemispheres',
    generate: () => {
      const group = new THREE.Group();
      
      const cylinder = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32);
      const cylinderMesh = new THREE.Mesh(cylinder);
      
      const topCap = new THREE.SphereGeometry(0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
      const topCapMesh = new THREE.Mesh(topCap);
      topCapMesh.position.y = 0.75;
      
      const bottomCap = new THREE.SphereGeometry(0.5, 32, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
      const bottomCapMesh = new THREE.Mesh(bottomCap);
      bottomCapMesh.position.y = -0.75;
      
      group.add(cylinderMesh, topCapMesh, bottomCapMesh);
      
      const geometries = [];
      group.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const geo = child.geometry.clone();
          geo.applyMatrix4(child.matrixWorld);
          geometries.push(geo);
        }
      });
      
      return mergeGeometries(geometries);
    },
  },
  tetrahedron: {
    name: 'Tetrahedron',
    icon: '▲',
    equation: 'Regular 4-sided polyhedron',
    description: '4 triangular faces (simplest polyhedron)',
    generate: () => new THREE.TetrahedronGeometry(1.3, 0),
  },
};

export function getModelGeometry(modelName) {
  const model = models[modelName];
  if (!model) {
    console.warn(`Model "${modelName}" not found, using cube`);
    return models.cube.generate();
  }
  return model.generate();
}

export function getModelNames() {
  return Object.keys(models);
}
