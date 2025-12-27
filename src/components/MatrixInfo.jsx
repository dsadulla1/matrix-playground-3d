import { useStore } from '../store';
import { determinant, trace, isOrthogonal, classifyTransformation, formatNumber } from '../utils/matrixMath';
import { Info } from 'lucide-react';

export default function MatrixInfo() {
  const { matrix } = useStore();

  const det = determinant(matrix);
  const tr = trace(matrix);
  const ortho = isOrthogonal(matrix);
  const classification = classifyTransformation(matrix);

  const rank = Math.abs(det) < 0.001 ? '< 3' : '3';

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-300">Matrix Analysis</h3>

      {/* Classification */}
      <div className="p-4 rounded-lg border-2 transition-colors"
           style={{ borderColor: classification.color, backgroundColor: `${classification.color}15` }}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{classification.emoji}</span>
          <div>
            <div className="font-bold text-lg" style={{ color: classification.color }}>
              {classification.type}
            </div>
            <div className="text-xs text-gray-400">Transformation type</div>
          </div>
        </div>
      </div>

      {/* Properties */}
      <div className="grid grid-cols-2 gap-3">
        <div className="info-badge flex-col items-start">
          <div className="text-gray-500 text-xs">Determinant</div>
          <div className="text-lg font-bold text-primary">{formatNumber(det, 3)}</div>
          <div className="text-xs text-gray-500">Volume scaling</div>
        </div>

        <div className="info-badge flex-col items-start">
          <div className="text-gray-500 text-xs">Trace</div>
          <div className="text-lg font-bold text-secondary">{formatNumber(tr, 3)}</div>
          <div className="text-xs text-gray-500">Sum of diagonal</div>
        </div>

        <div className="info-badge flex-col items-start">
          <div className="text-gray-500 text-xs">Rank</div>
          <div className="text-lg font-bold text-green-400">{rank}</div>
          <div className="text-xs text-gray-500">Dimensions</div>
        </div>

        <div className="info-badge flex-col items-start">
          <div className="text-gray-500 text-xs">Orthogonal</div>
          <div className="text-lg font-bold text-blue-400">{ortho ? 'Yes' : 'No'}</div>
          <div className="text-xs text-gray-500">Preserves angles</div>
        </div>
      </div>

      {/* Educational explanations */}
      <div className="space-y-2">
        <details className="bg-gray-800 rounded-lg p-3 cursor-pointer">
          <summary className="text-sm font-medium flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" />
            What does determinant mean?
          </summary>
          <p className="mt-2 text-xs text-gray-400">
            The determinant tells you how much the transformation scales volumes. 
            A determinant of 2 means volumes are doubled, 0.5 means halved. 
            Negative values indicate the transformation "flips" space (changes orientation).
            A determinant of 0 means the transformation collapses space to a lower dimension.
          </p>
        </details>

        <details className="bg-gray-800 rounded-lg p-3 cursor-pointer">
          <summary className="text-sm font-medium flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" />
            What makes it orthogonal?
          </summary>
          <p className="mt-2 text-xs text-gray-400">
            An orthogonal matrix preserves lengths and angles. It represents pure rotations 
            and reflections without any stretching or shearing. The columns (and rows) are 
            perpendicular unit vectors.
          </p>
        </details>

        {classification.type === 'Projection' && (
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
            <p className="text-xs text-orange-300">
              ⚠️ This is a projection! It collapses 3D space down to a plane or line. 
              The determinant is 0 because volumes become flat (zero volume).
            </p>
          </div>
        )}

        {Math.abs(det) > 5 && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
            <p className="text-xs text-yellow-300">
              💡 Large determinant! Volumes are being scaled by {formatNumber(Math.abs(det))}×
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
