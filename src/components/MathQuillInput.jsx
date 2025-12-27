import { useEffect, useRef, useState } from 'react';
import { useStore } from '../store';
import { validateExpression } from '../utils/functionMath';
import { Eye, EyeOff, Trash2, Calculator } from 'lucide-react';
import clsx from 'clsx';

// Symbol buttons for mobile/quick access
const symbols = [
  { label: 'x²', insert: 'x^2' },
  { label: '√', insert: 'sqrt(' },
  { label: 'sin', insert: 'sin(' },
  { label: 'cos', insert: 'cos(' },
  { label: 'π', insert: 'pi' },
  { label: 'e', insert: 'e' },
  { label: '×', insert: '*' },
  { label: '÷', insert: '/' },
];

export default function MathQuillInput({ functionData }) {
  const { updateFunction, toggleFunctionVisibility } = useStore();
  const [localExpression, setLocalExpression] = useState(functionData.expression);
  const [validation, setValidation] = useState({ valid: true });
  const [showSymbols, setShowSymbols] = useState(false);
  const inputRef = useRef(null);
  
  useEffect(() => {
    setLocalExpression(functionData.expression);
  }, [functionData.expression]);
  
  const handleChange = (e) => {
    const value = e.target.value;
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
  
  const handleSymbolClick = (symbolText) => {
    const input = inputRef.current;
    if (!input) return;
    
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const before = localExpression.substring(0, start);
    const after = localExpression.substring(end);
    
    const newExpression = before + symbolText + after;
    setLocalExpression(newExpression);
    
    // Focus and set cursor position
    setTimeout(() => {
      input.focus();
      const cursorPos = start + symbolText.length;
      input.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  };
  
  const handleOpacityChange = (e) => {
    updateFunction(functionData.id, { opacity: parseFloat(e.target.value) });
  };
  
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {/* Color indicator */}
        <div 
          className="w-4 h-4 rounded border-2 border-gray-600 flex-shrink-0"
          style={{ backgroundColor: functionData.color }}
        />
        
        {/* Function label */}
        <span className="text-xs font-mono text-gray-400 flex-shrink-0">
          f{functionData.id}(x,y) =
        </span>
        
        {/* Expression input */}
        <div className="flex-1 relative min-w-0">
          <input
            ref={inputRef}
            type="text"
            value={localExpression}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            placeholder="x^2 + y^2"
            className={clsx(
              "w-full px-3 py-2 pr-20 bg-gray-800 border rounded text-sm font-mono",
              validation.valid 
                ? "border-gray-700 focus:border-primary" 
                : "border-red-500 focus:border-red-400"
            )}
          />
          
          {/* Symbol toggle button */}
          <button
            onClick={() => setShowSymbols(!showSymbols)}
            className="absolute right-10 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-700 rounded"
            title="Insert symbols"
          >
            <Calculator className="w-3 h-3 text-gray-500" />
          </button>
          
          {/* Clear button */}
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
            "p-2 rounded transition-colors flex-shrink-0",
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
      
      {/* Symbol buttons */}
      {showSymbols && (
        <div className="ml-6 pl-2 flex flex-wrap gap-1">
          {symbols.map((symbol) => (
            <button
              key={symbol.label}
              onClick={() => handleSymbolClick(symbol.insert)}
              className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded"
            >
              {symbol.label}
            </button>
          ))}
        </div>
      )}
      
      {/* Opacity slider */}
      {functionData.expression && functionData.visible && (
        <div className="flex items-center gap-2 ml-6 pl-2">
          <span className="text-xs text-gray-500 flex-shrink-0">Opacity:</span>
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
          <span className="text-xs text-gray-400 w-8 flex-shrink-0">
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