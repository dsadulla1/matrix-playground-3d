import { Eye, EyeOff } from 'lucide-react';
import { useStore } from '../store';
import clsx from 'clsx';

const toggles = [
  { key: 'showOriginal', label: 'Original Model', icon: '👻', hint: 'Ghost of untransformed shape' },
  { key: 'showAxes', label: 'Coordinate Axes', icon: '📍', hint: 'X, Y, Z axes' },
  { key: 'showGrid', label: 'Grid Planes', icon: '📐', hint: 'Reference grids' },
  { key: 'showBasisVectors', label: 'Basis Vectors', icon: '➡️', hint: 'Where i, j, k go' },
  { key: 'showUnitCube', label: 'Unit Cube', icon: '🧊', hint: 'Unit cube → parallelepiped' },
];

export default function VisualizationToggles() {
  const store = useStore();

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-300">Visualization</h3>

      <div className="space-y-2">
        {toggles.map((toggle) => {
          const isActive = store[toggle.key];
          
          return (
            <button
              key={toggle.key}
              onClick={() => store.toggleVisualization(toggle.key)}
              className={clsx('toggle-btn w-full', isActive && 'active')}
              title={toggle.hint}
            >
              <span className="text-lg">{toggle.icon}</span>
              <span className="flex-1 text-left text-sm">{toggle.label}</span>
              {isActive ? (
                <Eye className="w-4 h-4 text-primary" />
              ) : (
                <EyeOff className="w-4 h-4 text-gray-600" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
        <p className="text-xs text-gray-400">
          💡 Toggle different visual aids to better understand how the matrix transforms space
        </p>
      </div>
    </div>
  );
}
