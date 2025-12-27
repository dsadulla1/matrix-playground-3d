import { useStore } from '../store';
import MathQuillInput from './MathQuillInput';
import { domainPresets } from '../utils/functionMath';
import { Settings, Zap, Info } from 'lucide-react';
import { useState } from 'react';

export default function FunctionPlotter() {
  const { 
    functions, 
    functionResolution, 
    setFunctionResolution,
    functionDomain,
    setFunctionDomain,
    autoPlot,
    toggleAutoPlot,
  } = useStore();
  
  const [showSettings, setShowSettings] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('standard');
  
  const handlePresetChange = (presetKey) => {
    setSelectedPreset(presetKey);
    setFunctionDomain(domainPresets[presetKey]);
  };
  
  const handleResolutionChange = (e) => {
    setFunctionResolution(parseInt(e.target.value));
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-300">Functions</h3>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded hover:bg-gray-800 transition-colors"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
      
      {/* Function inputs */}
      <div className="space-y-3">
        {functions.map((func) => (
          <MathQuillInput key={func.id} functionData={func} />
        ))}
      </div>
      
      {/* Settings panel */}
      {showSettings && (
        <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 space-y-4">
          <h4 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Plot Settings
          </h4>
          
          {/* Domain preset */}
          <div className="space-y-2">
            <label className="text-xs text-gray-400">Domain Preset</label>
            <select
              value={selectedPreset}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-sm
                       focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {Object.entries(domainPresets).map(([key, preset]) => (
                <option key={key} value={key}>
                  {preset.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Custom domain */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-gray-400">X Min</label>
              <input
                type="number"
                value={functionDomain.xMin}
                onChange={(e) => setFunctionDomain({ ...functionDomain, xMin: parseFloat(e.target.value) })}
                className="w-full px-2 py-1 bg-gray-900 border border-gray-700 rounded text-sm"
                step="0.5"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">X Max</label>
              <input
                type="number"
                value={functionDomain.xMax}
                onChange={(e) => setFunctionDomain({ ...functionDomain, xMax: parseFloat(e.target.value) })}
                className="w-full px-2 py-1 bg-gray-900 border border-gray-700 rounded text-sm"
                step="0.5"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">Y Min</label>
              <input
                type="number"
                value={functionDomain.yMin}
                onChange={(e) => setFunctionDomain({ ...functionDomain, yMin: parseFloat(e.target.value) })}
                className="w-full px-2 py-1 bg-gray-900 border border-gray-700 rounded text-sm"
                step="0.5"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">Y Max</label>
              <input
                type="number"
                value={functionDomain.yMax}
                onChange={(e) => setFunctionDomain({ ...functionDomain, yMax: parseFloat(e.target.value) })}
                className="w-full px-2 py-1 bg-gray-900 border border-gray-700 rounded text-sm"
                step="0.5"
              />
            </div>
          </div>
          
          {/* Resolution slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs text-gray-400">Resolution</label>
              <span className="text-xs text-gray-500">
                {functionResolution}×{functionResolution} ({functionResolution * functionResolution} points)
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              step="10"
              value={functionResolution}
              onChange={handleResolutionChange}
              className="w-full h-2 bg-gray-700 rounded appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-4
                       [&::-webkit-slider-thumb]:h-4
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-primary"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Fast</span>
              <span>Smooth</span>
            </div>
          </div>
          
          {/* Auto-plot toggle */}
          <div className="flex items-center justify-between p-3 bg-gray-900 rounded">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-gray-300">Auto-plot</span>
            </div>
            <button
              onClick={toggleAutoPlot}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                autoPlot ? 'bg-primary' : 'bg-gray-700'
              }`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                autoPlot ? 'translate-x-5' : ''
              }`} />
            </button>
          </div>
        </div>
      )}
      
      {/* Help info */}
      <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div className="text-xs text-gray-400 space-y-1">
            <p><strong>Syntax:</strong> Use x and y as variables</p>
            <p><strong>Examples:</strong></p>
            <ul className="list-disc list-inside pl-2 space-y-0.5">
              <li><code className="text-primary">x^2 + y^2</code> - Paraboloid</li>
              <li><code className="text-primary">sin(x) * cos(y)</code> - Wave</li>
              <li><code className="text-primary">sqrt(x^2 + y^2)</code> - Cone</li>
              <li><code className="text-primary">x*y</code> - Saddle</li>
              <li><code className="text-primary">cos(sqrt(x^2 + y^2))</code> - Ripple</li>
            </ul>
            <p className="pt-1"><strong>Functions:</strong> sin, cos, tan, sqrt, abs, log, exp, etc.</p>
          </div>
        </div>
      </div>
    </div>
  );
}