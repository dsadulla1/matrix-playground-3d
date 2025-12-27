import { create } from 'zustand';

const LIMITS = {
  MATRIX_RANGE: [-10, 10],
  MAX_MORPH_DURATION: 2000,
};

const identity = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1]
];

export const useStore = create((set, get) => ({
  // Matrix state
  matrix: identity,
  targetMatrix: null,
  isAnimating: false,
  animationProgress: 0,
  animationSpeed: 1,

  // Visualization toggles
  showOriginal: true,
  showAxes: true,
  showGrid: true,
  showBasisVectors: true,
  showEigenvectors: false,
  showUnitCube: false,

  // Model selection
  currentModel: 'bunny',
  
  // UI state
  selectedPreset: 'identity',
  isMobileDrawerOpen: false,
  activeTab: 'matrix',

  // Actions
  setMatrix: (matrix) => {
    // Validate and clamp values
    const clampedMatrix = matrix.map(row =>
      row.map(val => {
        const num = parseFloat(val);
        if (isNaN(num)) return 0;
        return Math.max(LIMITS.MATRIX_RANGE[0], Math.min(LIMITS.MATRIX_RANGE[1], num));
      })
    );
    set({ matrix: clampedMatrix, selectedPreset: 'custom' });
  },

  setMatrixValue: (row, col, value) => {
    const { matrix } = get();
    const newMatrix = matrix.map((r, i) =>
      r.map((v, j) => (i === row && j === col ? parseFloat(value) || 0 : v))
    );
    get().setMatrix(newMatrix);
  },

  resetMatrix: () => set({ matrix: identity, selectedPreset: 'identity' }),

  startMorph: (targetMatrix, presetName = 'custom') => {
    set({
      targetMatrix,
      isAnimating: true,
      animationProgress: 0,
      selectedPreset: presetName,
    });
  },

  updateAnimation: (progress) => {
    const { targetMatrix, matrix: startMatrix } = get();
    if (!targetMatrix) return;

    if (progress >= 1) {
      set({
        matrix: targetMatrix,
        isAnimating: false,
        animationProgress: 0,
        targetMatrix: null,
      });
    } else {
      set({ animationProgress: progress });
    }
  },

  stopAnimation: () => set({
    isAnimating: false,
    animationProgress: 0,
    targetMatrix: null,
  }),

  toggleVisualization: (key) => set((state) => ({ [key]: !state[key] })),

  setModel: (model) => set({ currentModel: model }),

  setActiveTab: (tab) => set({ activeTab: tab }),

  toggleMobileDrawer: () => set((state) => ({ 
    isMobileDrawerOpen: !state.isMobileDrawerOpen 
  })),

  setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
}));

export { LIMITS };
