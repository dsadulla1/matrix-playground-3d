import { useStore } from '../store';
import { models } from '../utils/models';
import clsx from 'clsx';

export default function ModelSelector() {
  const { currentModel, setModel } = useStore();

  const modelEntries = Object.entries(models);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-300">Choose Shape</h3>

      <div className="grid grid-cols-3 gap-2">
        {modelEntries.map(([key, model]) => (
          <button
            key={key}
            onClick={() => setModel(key)}
            className={clsx(
              'flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all',
              'hover:scale-105 active:scale-95',
              currentModel === key
                ? 'border-primary bg-primary/20'
                : 'border-gray-700 bg-gray-800 hover:border-gray-600'
            )}
          >
            <span className="text-3xl">{model.icon}</span>
            <span className="text-xs font-medium">{model.name}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
        <p className="text-xs text-gray-400">
          💡 Different shapes help visualize different aspects of transformations
        </p>
      </div>
    </div>
  );
}
