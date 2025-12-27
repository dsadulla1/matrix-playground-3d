import { useState, useEffect } from 'react';
import { useStore } from '../store';
import { validateExpression } from '../utils/functionMath';
import { Eye, EyeOff, Trash2 } from 'lucide-react';
import clsx from 'clsx';

export default function FunctionInput({ functionData }) {
  const { updateFunction, toggleFunctionVisibility } = useStore();
  const [localExpression, setLocalExpression] = useState(functionData.expression);
  const [validation, setValidation] = useState({ valid: true });
  
  useEffect(() => {
    setLocalExpression(functionData.expression);
  }, [functionData.expression]);
  
  const handleChange = (value) => {
    setLocalExpression(value);
  };
  
  const handleBlur = () => {
    const trimmed = localExpression.trim();
    
    if (trimmed === '') {
      updateFunction(functionData.id, { expression: '' });
      setValidation({ valid: true });
      return;
    }
    
    const result = validateExpression(trimmed);
    setValidation(result);
    
    if (result.valid) {
      updateFunction(functionData.id, { expression: trimmed });
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };
  
  const handleClear = () => {
    setLocalExpression('');
    updateFunction(functionData.id, { expression: '' });
    setValidation({ valid: true });
  };
  
  const handleOpacityChange = (e) => {
    updateFunction(functionData.id, { opacity: parseFloat(e.target.value) });
  };
  
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {/* Color indicator */}
        <div 
          className="w-4 h-4 rounded border-2 border-gray-600"
          style={{ backgroundColor: functionData.color }}
        />
        
        {/* Function label */}
        <span className="text-xs font-mono text-gray-400">
          f{functionData.id}(x,y) =
        </span>
        
        {/* Expression input */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={localExpression}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder="e.g., x^2 + y^2, sin(x)*cos(y)"
            className={clsx(
              "w-full px-3 py-2 bg-gray-800 border rounded text-sm font-mono",
              validation.valid 
                ? "border-gray-700 focus:border-primary" 
                : "border-red-500 focus:border-red-400"
            )}
          />
          
          {localExpression && (
            <button
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-700 rounded"
              title="Clear"
            >
              <Trash2 className="w-3 h-3 text-gray-500" />
            </button>
          )}
        </div>
        
        {/* Visibility toggle */}
        <button
          onClick={() => toggleFunctionVisibility(functionData.id)}
          className={clsx(
            "p-2 rounded transition-colors",
            functionData.visible 
              ? "bg-primary/20 text-primary hover:bg-primary/30" 
              : "bg-gray-800 text-gray-600 hover:bg-gray-700"
          )}
          disabled={!functionData.expression}
          title={functionData.visible ? "Hide" : "Show"}
        >
          {functionData.visible ? (
            <Eye className="w-4 h-4" />
          ) : (
            <EyeOff className="w-4 h-4" />
          )}
        </button>
      </div>
      
      {/* Opacity slider */}
      {functionData.expression && functionData.visible && (
        <div className="flex items-center gap-2 ml-6 pl-2">
          <span className="text-xs text-gray-500">Opacity:</span>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={functionData.opacity}
            onChange={handleOpacityChange}
            className="flex-1 h-1 bg-gray-700 rounded appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-3
                     [&::-webkit-slider-thumb]:h-3
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-primary"
          />
          <span className="text-xs text-gray-400 w-8">
            {Math.round(functionData.opacity * 100)}%
          </span>
        </div>
      )}
      
      {/* Validation message */}
      {!validation.valid && (
        <div className="text-xs text-red-400 ml-6 pl-2">
          ⚠️ {validation.error}
        </div>
      )}
      
      {validation.warning && validation.valid && (
        <div className="text-xs text-yellow-400 ml-6 pl-2">
          ⚠️ {validation.warning}
        </div>
      )}
    </div>
  );
}
