import { useState } from 'react';
import { useStore } from '../store';
import { models } from '../utils/models';
import clsx from 'clsx';
import { Info } from 'lucide-react';

export default function ModelSelector() {
  const { currentModel, setModel } = useStore();
  const [showEquation, setShowEquation] = useState(null);

  const modelEntries = Object.entries(models);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-300">Choose Shape</h3>

      <div className="grid grid-cols-3 gap-2">
        {modelEntries.map(([key, model]) => (
          <div key={key} className="relative">
            <button
              onClick={() => setModel(key)}
              className={clsx(
                'w-full flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all',
                'hover:scale-105 active:scale-95',
                currentModel === key
                  ? 'border-primary bg-primary/20'
                  : 'border-gray-700 bg-gray-800 hover:border-gray-600'
              )}
            >
              <span className="text-3xl">{model.icon}</span>
              <span className="text-xs font-medium text-center">{model.name}</span>
            </button>
            <button
              onClick={() => setShowEquation(showEquation === key ? null : key)}
              className="absolute -top-2 -right-2 p-1 rounded-full bg-gray-700 hover:bg-gray-600 border border-gray-600"
              title="Show equation"
            >
              <Info className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Equation display */}
      {showEquation && models[showEquation] && (
        <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{models[showEquation].icon}</span>
            <h4 className="font-semibold text-gray-200">{models[showEquation].name}</h4>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-mono text-primary bg-gray-900 p-2 rounded">
              {models[showEquation].equation}
            </div>
            <p className="text-xs text-gray-400">
              {models[showEquation].description}
            </p>
          </div>
        </div>
      )}

      <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
        <p className="text-xs text-gray-400">
          💡 Click <Info className="w-3 h-3 inline" /> to see the mathematical equation. Different shapes help visualize different aspects of transformations.
        </p>
      </div>
    </div>
  );
}
