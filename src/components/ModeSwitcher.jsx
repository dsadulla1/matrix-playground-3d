import { useStore } from '../store';
import { Box, TrendingUp, Sigma, Grid3x3 } from 'lucide-react';
import clsx from 'clsx';

const modes = [
  { 
    id: 'matrix', 
    icon: Box, 
    label: 'Matrix',
    shortLabel: 'Matrix',
    description: 'Transform 3D objects with matrices',
    color: '#8b5cf6',
    available: true,
  },
  { 
    id: 'functions', 
    icon: TrendingUp, 
    label: 'Functions',
    shortLabel: 'Functions',
    description: 'Plot and explore mathematical functions',
    color: '#3b82f6',
    available: false, // Coming soon
  },
  { 
    id: 'calculus', 
    icon: Sigma, 
    label: 'Calculus',
    shortLabel: 'Calculus',
    description: 'Visualize derivatives and integrals',
    color: '#22c55e',
    available: false, // Coming soon
  },
  { 
    id: 'systems', 
    icon: Grid3x3, 
    label: 'Systems',
    shortLabel: 'Systems',
    description: 'Linear systems and plane intersections',
    color: '#f97316',
    available: false, // Coming soon
  },
];

export default function ModeSwitcher() {
  const { currentMode, setMode } = useStore();

  return (
    <div className="p-4 border-b border-gray-800 bg-gray-950">
      {/* Desktop view - horizontal tabs */}
      <div className="hidden md:flex gap-2">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = currentMode === mode.id;
          
          return (
            <button
              key={mode.id}
              onClick={() => mode.available && setMode(mode.id)}
              disabled={!mode.available}
              className={clsx(
                'flex-1 flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all',
                isActive && 'border-opacity-100 scale-[1.02]',
                !isActive && 'border-opacity-30',
                mode.available 
                  ? 'hover:scale-105 active:scale-95 cursor-pointer'
                  : 'opacity-50 cursor-not-allowed',
              )}
              style={{ 
                borderColor: mode.color,
                backgroundColor: isActive ? `${mode.color}20` : 'transparent',
              }}
              title={mode.description}
            >
              <Icon 
                className="w-6 h-6" 
                style={{ color: mode.color }}
              />
              <span className="text-xs font-medium text-gray-200">
                {mode.label}
              </span>
              {!mode.available && (
                <span className="text-xs text-gray-500">Coming soon</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile view - compact horizontal */}
      <div className="md:hidden flex gap-1 overflow-x-auto">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isActive = currentMode === mode.id;
          
          return (
            <button
              key={mode.id}
              onClick={() => mode.available && setMode(mode.id)}
              disabled={!mode.available}
              className={clsx(
                'flex flex-col items-center gap-1 px-4 py-2 rounded-lg border-2 transition-all whitespace-nowrap',
                isActive && 'border-opacity-100',
                !isActive && 'border-opacity-30',
                mode.available 
                  ? 'active:scale-95 cursor-pointer'
                  : 'opacity-50 cursor-not-allowed',
              )}
              style={{ 
                borderColor: mode.color,
                backgroundColor: isActive ? `${mode.color}20` : 'transparent',
              }}
            >
              <Icon 
                className="w-5 h-5" 
                style={{ color: mode.color }}
              />
              <span className="text-xs font-medium text-gray-200">
                {mode.shortLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
