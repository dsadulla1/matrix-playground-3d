import { useStore, LIMITS } from '../store';

export default function MatrixInput() {
  const { matrix, setMatrixValue } = useStore();

  const handleChange = (row, col, value) => {
    setMatrixValue(row, col, value);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-300">Matrix (3×3)</h3>
        <span className="text-xs text-gray-500">
          Range: [{LIMITS.MATRIX_RANGE[0]}, {LIMITS.MATRIX_RANGE[1]}]
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {matrix.map((row, i) =>
          row.map((value, j) => (
            <input
              key={`${i}-${j}`}
              type="number"
              value={value.toFixed(2)}
              onChange={(e) => handleChange(i, j, e.target.value)}
              step="0.1"
              min={LIMITS.MATRIX_RANGE[0]}
              max={LIMITS.MATRIX_RANGE[1]}
              className="w-full"
            />
          ))
        )}
      </div>

      <div className="text-xs text-gray-500 space-y-1">
        <p>💡 Tip: Each row transforms a basis vector</p>
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
