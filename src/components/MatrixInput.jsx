import { useState, useEffect } from 'react';
import { useStore, LIMITS } from '../store';

export default function MatrixInput() {
  const { matrix, setMatrixValue } = useStore();
  const [localValues, setLocalValues] = useState(matrix.map(row => row.map(v => v.toString())));

  useEffect(() => {
    setLocalValues(matrix.map(row => row.map(v => v.toFixed(2))));
  }, [matrix]);

  const handleChange = (row, col, value) => {
    const newLocalValues = localValues.map((r, i) =>
      r.map((v, j) => (i === row && j === col ? value : v))
    );
    setLocalValues(newLocalValues);
  };

  const handleBlur = (row, col, value) => {
    const numValue = parseFloat(value) || 0;
    setMatrixValue(row, col, numValue);
  };

  const handleKeyDown = (e, row, col) => {
    if (e.key === 'Enter') {
      const numValue = parseFloat(localValues[row][col]) || 0;
      setMatrixValue(row, col, numValue);
      e.target.blur();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-300">Current Matrix (3×3)</h3>
        <span className="text-xs text-gray-500">
          Range: [{LIMITS.MATRIX_RANGE[0]}, {LIMITS.MATRIX_RANGE[1]}]
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {localValues.map((row, i) =>
          row.map((value, j) => (
            <input
              key={`${i}-${j}`}
              type="text"
              value={value}
              onChange={(e) => handleChange(i, j, e.target.value)}
              onBlur={(e) => handleBlur(i, j, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, i, j)}
              className="w-full"
            />
          ))
        )}
      </div>

      <div className="text-xs text-gray-500 space-y-1">
        <p className="flex items-center gap-2">
          <span className="text-red-400">Row 1</span> → where <span className="text-red-400">i</span> (1,0,0) goes
        </p>
        <p className="flex items-center gap-2">
          <span className="text-green-400">Row 2</span> → where <span className="text-green-400">j</span> (0,1,0) goes
        </p>
        <p className="flex items-center gap-2">
          <span className="text-blue-400">Row 3</span> → where <span className="text-blue-400">k</span> (0,0,1) goes
        </p>
      </div>
    </div>
  );
}
