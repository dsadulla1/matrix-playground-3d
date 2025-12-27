import Scene3D from './components/Scene3D';
import ControlPanel from './components/ControlPanel';

export default function App() {
  return (
    <div className="w-screen h-screen flex overflow-hidden bg-gray-950">
      {/* 3D Canvas */}
      <div className="flex-1 relative">
        <Scene3D />
        
        {/* Overlay info */}
        <div className="absolute top-4 left-4 pointer-events-none">
          <div className="bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-800">
            <p className="text-sm text-gray-300">
              🎨 <span className="font-semibold">Matrix Playground</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Drag to rotate • Scroll to zoom
            </p>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <ControlPanel />
    </div>
  );
}
