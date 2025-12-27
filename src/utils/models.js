// 3D Model geometry generators
import * as THREE from 'three';

export const models = {
  cube: {
    name: 'Cube',
    icon: '🧊',
    generate: () => new THREE.BoxGeometry(2, 2, 2),
  },
  sphere: {
    name: 'Sphere',
    icon: '⚽',
    generate: () => new THREE.SphereGeometry(1.2, 32, 32),
  },
  cone: {
    name: 'Cone',
    icon: '🎪',
    generate: () => new THREE.ConeGeometry(1, 2, 32),
  },
  torus: {
    name: 'Torus',
    icon: '🍩',
    generate: () => new THREE.TorusGeometry(1, 0.4, 16, 32),
  },
  cylinder: {
    name: 'Cylinder',
    icon: '🥫',
    generate: () => new THREE.CylinderGeometry(0.8, 0.8, 2, 32),
  },
  bunny: {
    name: 'Bunny',
    icon: '🐰',
    generate: () => {
      // Low-poly bunny approximation
      const geometry = new THREE.SphereGeometry(1, 16, 16);
      const positions = geometry.attributes.position;
      
      // Deform sphere into bunny shape
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);
        
        // Body (main sphere)
        let scale = 1;
        
        // Head (smaller sphere on top)
        if (y > 0.3) {
          scale *= 0.7;
          positions.setY(i, y * 1.2);
        }
        
        // Ears
        if (y > 0.8) {
          if (Math.abs(x) > 0.2) {
            positions.setY(i, y * 1.5);
            positions.setX(i, x * 1.2);
            scale *= 0.3;
          }
        }
        
        // Bottom (feet)
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
    generate: () => {
      // Simplified teapot using primitives
      const group = new THREE.Group();
      
      // Body
      const body = new THREE.SphereGeometry(1, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.7);
      const bodyMesh = new THREE.Mesh(body);
      bodyMesh.scale.set(1, 0.8, 1);
      
      // Spout
      const spout = new THREE.CylinderGeometry(0.1, 0.15, 0.8, 16);
      const spoutMesh = new THREE.Mesh(spout);
      spoutMesh.position.set(0.9, 0, 0);
      spoutMesh.rotation.z = -Math.PI / 6;
      
      // Handle
      const handle = new THREE.TorusGeometry(0.35, 0.08, 16, 32, Math.PI);
      const handleMesh = new THREE.Mesh(handle);
      handleMesh.position.set(-0.7, 0.2, 0);
      handleMesh.rotation.y = Math.PI / 2;
      
      // Lid
      const lid = new THREE.CylinderGeometry(0.5, 0.55, 0.3, 32);
      const lidMesh = new THREE.Mesh(lid);
      lidMesh.position.y = 0.9;
      
      // Knob
      const knob = new THREE.SphereGeometry(0.15, 16, 16);
      const knobMesh = new THREE.Mesh(knob);
      knobMesh.position.y = 1.15;
      
      group.add(bodyMesh, spoutMesh, handleMesh, lidMesh, knobMesh);
      
      // Merge geometries
      const mergedGeometry = new THREE.BufferGeometry();
      const geometries = [];
      
      group.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const geo = child.geometry.clone();
          geo.applyMatrix4(child.matrixWorld);
          geometries.push(geo);
        }
      });
      
      return THREE.BufferGeometryUtils ? 
        THREE.BufferGeometryUtils.mergeGeometries(geometries) :
        geometries[0]; // Fallback if utils not available
    },
  },
  octahedron: {
    name: 'Octahedron',
    icon: '💎',
    generate: () => new THREE.OctahedronGeometry(1.3, 0),
  },
  star: {
    name: 'Star',
    icon: '⭐',
    generate: () => {
      // Create a star shape by extruding
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
