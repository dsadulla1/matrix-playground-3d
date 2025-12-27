import { useEffect, useRef, useState } from 'react';
import { addStyles, EditableMathField } from 'react-mathquill';
import { useStore } from '../store';
import { validateExpression } from '../utils/functionMath';
import { latexToMathJS } from '../utils/latexConverter';
import { Eye, EyeOff, Trash2 } from 'lucide-react';
import clsx from 'clsx';

// Add MathQuill styles once globally
addStyles();

export default function MathQuillEditor({ functionData }) {
  const { updateFunction, toggleFunctionVisibility, plotMode } = useStore();
  const [latex, setLatex] = useState('');
  const [validation, setValidation] = useState({ valid: true });
  const mathFieldRef = useRef(null);
  
  useEffect(() => {
    // Initialize from expression if exists
    if (functionData.expression && !latex) {
      setLatex(functionData.expression);
    }
  }, [functionData.expression]);
  
  const handleMathFieldChange = (mathField) => {
    const newLatex = mathField.latex();
    setLatex(newLatex);
    
    // Convert LaTeX to math.js and validate
    const mathJSExpr = latexToMathJS(newLatex);
    
    if (!mathJSExpr || mathJSExpr.trim() === '') {
      updateFunction(functionData.id, { expression: '' });
      setValidation({ valid: true });
      return;
    }
    
    const result = validateExpression(mathJSExpr);
    setValidation(result);
    
    if (result.valid) {
      updateFunction(functionData.id, { expression: mathJSExpr });
    }
  };
  
  const handleClear = () => {
    setLatex('');
    updateFunction(functionData.id, { expression: '' });
    setValidation({ valid: true });
    if (mathFieldRef.current) {
      mathFieldRef.current.latex('');
    }
  };
  
  const handleContainerClick = () => {
    // Focus the MathField when container is clicked
    if (mathFieldRef.current) {
      mathFieldRef.current.focus();
    }
  };
  
  const handleOpacityChange = (e) => {
    updateFunction(functionData.id, { opacity: parseFloat(e.target.value) });
  };
  
  const handleThicknessChange = (e) => {
    updateFunction(functionData.id, { thickness: parseFloat(e.target.value) });
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
          {plotMode === '2d' ? `f${functionData.id}(x) =` : `f${functionData.id}(x,y) =`}
        </span>
        
        {/* MathQuill Editor */}
        <div className="flex-1 relative min-w-0">
          <div 
            className={clsx(
              "mathquill-container px-3 py-2 bg-gray-800 border rounded min-h-[40px] cursor-text",
              validation.valid 
                ? "border-gray-700 focus-within:border-primary" 
                : "border-red-500 focus-within:border-red-400"
            )}
            onClick={handleContainerClick}
          >
            <EditableMathField
              key={`mathfield-${functionData.id}`}
              latex={latex}
              onChange={handleMathFieldChange}
              mathquillDidMount={(mathField) => {
                mathFieldRef.current = mathField;
              }}
              config={{
                spaceBehavesLikeTab: true,
                autoCommands: 'pi theta sqrt sum',
                autoOperatorNames: 'sin cos tan sec csc cot log ln exp',
              }}
            />
          </div>
          
          {/* Clear button */}
          {latex && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-700 rounded z-10"
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
      
      {/* Controls */}
      {functionData.expression && functionData.visible && (
        <div className="ml-6 pl-2 space-y-2">
          {/* Opacity slider for 3D */}
          {plotMode === '3d' && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 flex-shrink-0 w-16">Opacity:</span>
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
          
          {/* Thickness slider for 2D */}
          {/* {plotMode === '2d' && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 flex-shrink-0 w-16">Thickness:</span>
              <input
                type="range"
                min="0.02"
                max="0.2"
                step="0.02"
                value={functionData.thickness || 0.05}
                onChange={handleThicknessChange}
                className="flex-1 h-1 bg-gray-700 rounded appearance-none cursor-pointer
                         [&::-webkit-slider-thumb]:appearance-none
                         [&::-webkit-slider-thumb]:w-3
                         [&::-webkit-slider-thumb]:h-3
                         [&::-webkit-slider-thumb]:rounded-full
                         [&::-webkit-slider-thumb]:bg-primary"
              />
              <span className="text-xs text-gray-400 w-8 flex-shrink-0">
                {Math.round((functionData.thickness || 0.05) * 100)}
              </span>
            </div>
          )} */}
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