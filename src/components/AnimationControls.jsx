import { Play, Pause, RotateCcw, Zap } from 'lucide-react';
import { useStore } from '../store';

export default function AnimationControls() {
  const { 
    isAnimating, 
    animationSpeed, 
    setAnimationSpeed,
    stopAnimation,
    resetMatrix,
    startMorph,
    matrix,
  } = useStore();

  const handleSpeedChange = (e) => {
    setAnimationSpeed(parseFloat(e.target.value));
  };

  const handleReset = () => {
    stopAnimation();
    resetMatrix();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-300">Animation</h3>

      {/* Playback controls */}
      <div className="flex gap-2">
        {isAnimating ? (
          <button
            onClick={stopAnimation}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg
                     bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors"
          >
            <Pause className="w-5 h-5" />
            Pause
          </button>
        ) : (
          <button
            onClick={() => startMorph(matrix)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg
                     bg-primary hover:bg-primary/90 text-white font-medium transition-colors"
          >
            <Play className="w-5 h-5" />
            Replay
          </button>
        )}

        <button
          onClick={handleReset}
          className="px-4 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 
                   transition-colors flex items-center justify-center"
          title="Reset to identity"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Speed control */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-400 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Animation Speed
          </label>
          <span className="text-sm font-mono text-primary">{animationSpeed.toFixed(1)}×</span>
        </div>
        
        <input
          type="range"
          min="0.25"
          max="3"
          step="0.25"
          value={animationSpeed}
          onChange={handleSpeedChange}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer
                   [&::-webkit-slider-thumb]:appearance-none
                   [&::-webkit-slider-thumb]:w-4
                   [&::-webkit-slider-thumb]:h-4
                   [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:bg-primary
                   [&::-webkit-slider-thumb]:cursor-pointer
                   [&::-moz-range-thumb]:w-4
                   [&::-moz-range-thumb]:h-4
                   [&::-moz-range-thumb]:rounded-full
                   [&::-moz-range-thumb]:bg-primary
                   [&::-moz-range-thumb]:border-0
                   [&::-moz-range-thumb]:cursor-pointer"
        />
        
        <div className="flex justify-between text-xs text-gray-500">
          <span>Slow</span>
          <span>Fast</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
        <p className="text-xs text-gray-400">
          💡 Watch how the transformation smoothly morphs your shape from its original position
        </p>
      </div>
    </div>
  );
}
