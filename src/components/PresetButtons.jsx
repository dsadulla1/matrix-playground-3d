import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useStore } from '../store';
import { presetCategories, getPresetMatrix } from '../utils/presets';
import clsx from 'clsx';

export default function PresetButtons() {
  const { startMorph, selectedPreset } = useStore();
  const [expandedCategories, setExpandedCategories] = useState(['Basic', 'Scale', 'Rotate']);

  const toggleCategory = (categoryName) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handlePresetClick = (presetId) => {
    const matrix = getPresetMatrix(presetId);
    if (matrix) {
      startMorph(matrix, presetId);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-300 mb-3">Transformations</h3>
      
      {presetCategories.map((category) => {
        const isExpanded = expandedCategories.includes(category.name);
        
        return (
          <div key={category.name} className="space-y-1">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category.name)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg
                       bg-gray-800 hover:bg-gray-700 border border-gray-700
                       transition-colors text-sm font-medium"
            >
              <span className="flex items-center gap-2">
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </span>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {/* Preset Buttons */}
            {isExpanded && (
              <div className="grid grid-cols-2 gap-2 pl-2">
                {category.presets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetClick(preset.id)}
                    className={clsx(
                      'preset-btn text-left',
                      selectedPreset === preset.id && 'active'
                    )}
                    title={preset.hint}
                  >
                    <div className="font-medium text-xs">{preset.name}</div>
                    {preset.hint && (
                      <div className="text-xs text-gray-500 mt-0.5">{preset.hint}</div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
        <p className="text-xs text-gray-400">
          💡 Click any preset to see the transformation animate smoothly!
        </p>
      </div>
    </div>
  );
}
