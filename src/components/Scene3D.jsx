import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import TransformableObject from './TransformableObject';
import CoordinateAxes from './CoordinateAxes';
import GridPlanes from './GridPlanes';
import BasisVectors from './BasisVectors';
import FunctionSurface from './FunctionSurface';
import FunctionCurve from './FunctionCurve';
import { useStore } from '../store';

export default function Scene3D() {
  const { showAxes, showGrid, showBasisVectors, currentMode, functions, plotMode } = useStore();

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
        {showBasisVectors && currentMode === 'matrix' && <BasisVectors />}
        
        {/* Matrix mode */}
        {currentMode === 'matrix' && <TransformableObject />}
        
        {/* Function mode - 2D curves */}
        {currentMode === 'functions' && plotMode === '2d' && (
          <>
            {functions.map((func) => (
              <FunctionCurve key={func.id} functionData={func} />
            ))}
          </>
        )}
        
        {/* Function mode - 3D surfaces */}
        {currentMode === 'functions' && plotMode === '3d' && (
          <>
            {functions.map((func) => (
              <FunctionSurface key={func.id} functionData={func} />
            ))}
          </>
        )}

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
