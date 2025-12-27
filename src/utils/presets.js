// Transformation presets organized by category

const { cos, sin, PI } = Math;

export const presetCategories = [
  {
    name: 'Basic',
    icon: '🎯',
    presets: [
      {
        id: 'identity',
        name: 'Identity',
        hint: 'No change',
        matrix: [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 1]
        ]
      },
      {
        id: 'zero',
        name: 'Collapse',
        hint: 'Crush to origin',
        matrix: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ]
      },
    ]
  },
  {
    name: 'Scale',
    icon: '📏',
    presets: [
      {
        id: 'scale2x',
        name: 'Double Size',
        hint: '2× bigger',
        matrix: [
          [2, 0, 0],
          [0, 2, 0],
          [0, 0, 2]
        ]
      },
      {
        id: 'scale-half',
        name: 'Half Size',
        hint: '0.5× smaller',
        matrix: [
          [0.5, 0, 0],
          [0, 0.5, 0],
          [0, 0, 0.5]
        ]
      },
      {
        id: 'scale-x',
        name: 'Stretch X',
        hint: 'Wider',
        matrix: [
          [2, 0, 0],
          [0, 1, 0],
          [0, 0, 1]
        ]
      },
      {
        id: 'scale-y',
        name: 'Stretch Y',
        hint: 'Taller',
        matrix: [
          [1, 0, 0],
          [0, 2, 0],
          [0, 0, 1]
        ]
      },
      {
        id: 'scale-z',
        name: 'Stretch Z',
        hint: 'Deeper',
        matrix: [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 2]
        ]
      },
      {
        id: 'squash',
        name: 'Squash',
        hint: 'Flatten vertically',
        matrix: [
          [1.5, 0, 0],
          [0, 0.5, 0],
          [0, 0, 1]
        ]
      },
    ]
  },
  {
    name: 'Rotate',
    icon: '🔄',
    presets: [
      {
        id: 'rot-x-90',
        name: 'Rotate X 90°',
        hint: 'Quarter turn around X',
        matrix: [
          [1, 0, 0],
          [0, cos(PI/2), -sin(PI/2)],
          [0, sin(PI/2), cos(PI/2)]
        ]
      },
      {
        id: 'rot-y-90',
        name: 'Rotate Y 90°',
        hint: 'Quarter turn around Y',
        matrix: [
          [cos(PI/2), 0, sin(PI/2)],
          [0, 1, 0],
          [-sin(PI/2), 0, cos(PI/2)]
        ]
      },
      {
        id: 'rot-z-90',
        name: 'Rotate Z 90°',
        hint: 'Quarter turn around Z',
        matrix: [
          [cos(PI/2), -sin(PI/2), 0],
          [sin(PI/2), cos(PI/2), 0],
          [0, 0, 1]
        ]
      },
      {
        id: 'rot-x-180',
        name: 'Rotate X 180°',
        hint: 'Flip around X',
        matrix: [
          [1, 0, 0],
          [0, -1, 0],
          [0, 0, -1]
        ]
      },
      {
        id: 'rot-y-45',
        name: 'Rotate Y 45°',
        hint: 'Slight rotation',
        matrix: [
          [cos(PI/4), 0, sin(PI/4)],
          [0, 1, 0],
          [-sin(PI/4), 0, cos(PI/4)]
        ]
      },
    ]
  },
  {
    name: 'Reflect',
    icon: '🪞',
    presets: [
      {
        id: 'reflect-xy',
        name: 'Reflect XY',
        hint: 'Mirror across XY plane',
        matrix: [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, -1]
        ]
      },
      {
        id: 'reflect-xz',
        name: 'Reflect XZ',
        hint: 'Mirror across XZ plane',
        matrix: [
          [1, 0, 0],
          [0, -1, 0],
          [0, 0, 1]
        ]
      },
      {
        id: 'reflect-yz',
        name: 'Reflect YZ',
        hint: 'Mirror across YZ plane',
        matrix: [
          [-1, 0, 0],
          [0, 1, 0],
          [0, 0, 1]
        ]
      },
    ]
  },
  {
    name: 'Shear',
    icon: '📐',
    presets: [
      {
        id: 'shear-xy',
        name: 'Shear X by Y',
        hint: 'Slant along X',
        matrix: [
          [1, 0.5, 0],
          [0, 1, 0],
          [0, 0, 1]
        ]
      },
      {
        id: 'shear-xz',
        name: 'Shear X by Z',
        hint: 'Slant along X',
        matrix: [
          [1, 0, 0.5],
          [0, 1, 0],
          [0, 0, 1]
        ]
      },
      {
        id: 'shear-yx',
        name: 'Shear Y by X',
        hint: 'Slant along Y',
        matrix: [
          [1, 0, 0],
          [0.5, 1, 0],
          [0, 0, 1]
        ]
      },
    ]
  },
  {
    name: 'Project',
    icon: '📽️',
    presets: [
      {
        id: 'project-xy',
        name: 'Project XY',
        hint: 'Flatten to XY plane',
        matrix: [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 0]
        ]
      },
      {
        id: 'project-xz',
        name: 'Project XZ',
        hint: 'Flatten to XZ plane',
        matrix: [
          [1, 0, 0],
          [0, 0, 0],
          [0, 0, 1]
        ]
      },
      {
        id: 'project-yz',
        name: 'Project YZ',
        hint: 'Flatten to YZ plane',
        matrix: [
          [0, 0, 0],
          [0, 1, 0],
          [0, 0, 1]
        ]
      },
    ]
  },
  {
    name: 'Fun',
    icon: '🎨',
    presets: [
      {
        id: 'spiral',
        name: 'Spiral',
        hint: 'Rotate + shrink',
        matrix: [
          [0.7 * cos(PI/6), -0.7 * sin(PI/6), 0],
          [0.7 * sin(PI/6), 0.7 * cos(PI/6), 0],
          [0, 0, 0.8]
        ]
      },
      {
        id: 'twist',
        name: 'Twist',
        hint: 'Helical rotation',
        matrix: [
          [cos(PI/4), -sin(PI/4), 0.3],
          [sin(PI/4), cos(PI/4), 0.2],
          [0, 0, 1.2]
        ]
      },
      {
        id: 'squish',
        name: 'Squish',
        hint: 'Extreme squash',
        matrix: [
          [0.3, 0, 0],
          [0, 2, 0],
          [0, 0, 0.3]
        ]
      },
      {
        id: 'kaleidoscope',
        name: 'Kaleidoscope',
        hint: 'Multiple reflections',
        matrix: [
          [-0.5, 0.866, 0],
          [0.866, 0.5, 0],
          [0, 0, 1]
        ]
      },
      {
        id: 'random',
        name: '🎲 Random',
        hint: 'Surprise!',
        matrix: () => {
          return Array(3).fill(0).map(() =>
            Array(3).fill(0).map(() => (Math.random() - 0.5) * 4)
          );
        }
      },
      {
        id: 'random-rotation',
        name: '🎲 Random Rotation',
        hint: 'Random spin',
        matrix: () => {
          // Generate random rotation using Euler angles
          const rx = Math.random() * 2 * PI;
          const ry = Math.random() * 2 * PI;
          const rz = Math.random() * 2 * PI;
          
          const Rx = [
            [1, 0, 0],
            [0, cos(rx), -sin(rx)],
            [0, sin(rx), cos(rx)]
          ];
          const Ry = [
            [cos(ry), 0, sin(ry)],
            [0, 1, 0],
            [-sin(ry), 0, cos(ry)]
          ];
          const Rz = [
            [cos(rz), -sin(rz), 0],
            [sin(rz), cos(rz), 0],
            [0, 0, 1]
          ];
          
          // Multiply matrices
          const multiplyMatrices = (a, b) => {
            const result = Array(3).fill(0).map(() => Array(3).fill(0));
            for (let i = 0; i < 3; i++) {
              for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                  result[i][j] += a[i][k] * b[k][j];
                }
              }
            }
            return result;
          };
          
          return multiplyMatrices(multiplyMatrices(Rz, Ry), Rx);
        }
      },
    ]
  },
];

export function getPresetMatrix(presetId) {
  for (const category of presetCategories) {
    const preset = category.presets.find(p => p.id === presetId);
    if (preset) {
      // If matrix is a function, call it to get the matrix
      return typeof preset.matrix === 'function' ? preset.matrix() : preset.matrix;
    }
  }
  return null;
}

export function getAllPresets() {
  return presetCategories.flatMap(cat => cat.presets);
}
