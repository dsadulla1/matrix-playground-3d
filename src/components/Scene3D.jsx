import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import TransformableObject from './TransformableObject';
import CoordinateAxes from './CoordinateAxes';
import GridPlanes from './GridPlanes';
import BasisVectors from './BasisVectors';
import { useStore } from '../store';

export default function Scene3D() {
  const { showAxes, showGrid, showBasisVectors } = useStore();

  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        {/* Camera */}
        <PerspectiveCamera makeDefault position={[4, 3, 4]} fov={50} />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={20}
          maxPolarAngle={Math.PI * 0.9}
        />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.3} />
        <hemisphereLight args={['#ffffff', '#60a5fa', 0.3]} />

        {/* Background stars for depth */}
        <Stars radius={100} depth={50} count={1000} factor={2} fade speed={0.5} />

        {/* Scene elements */}
        {showGrid && <GridPlanes />}
        {showAxes && <CoordinateAxes />}
        {showBasisVectors && <BasisVectors />}
        
        <TransformableObject />

        {/* Ground plane for shadow */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -2, 0]}
          receiveShadow
        >
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.2} />
        </mesh>
      </Canvas>
    </div>
  );
}
