# 🎨 Matrix Playground 3D

An interactive, educational 3D visualization tool for exploring linear transformations using matrices. Built with React Three Fiber.

## ✨ Features

### 🎯 Core Functionality
- **Real-time 3D matrix transformations** - See how matrices transform objects in 3D space
- **Smooth animations** - Watch transformations morph smoothly from one state to another
- **Multiple 3D models** - Choose from cube, sphere, bunny, teapot, torus, and more
- **Interactive camera** - Orbit, pan, and zoom to view from any angle

### 📐 Transformation Presets
Organized into 6 categories with 25+ presets:
- **Basic**: Identity, Collapse
- **Scale**: Uniform/non-uniform scaling, stretch, squash
- **Rotate**: 90°, 180°, 45° rotations around X, Y, Z axes
- **Reflect**: Mirror transformations across XY, XZ, YZ planes
- **Shear**: Various shearing transformations
- **Project**: Flatten 3D space to 2D planes
- **Fun**: Spiral, twist, kaleidoscope, random transformations

### 🎓 Educational Features
- **Live matrix analysis**:
  - Determinant (volume scaling factor)
  - Trace (sum of diagonal)
  - Rank (dimensionality)
  - Orthogonality check
- **Automatic classification** - Identifies transformation type (rotation, reflection, shear, etc.)
- **Interactive tooltips** - Explains concepts like determinant, eigenvalues
- **Visual aids**:
  - Coordinate axes (X, Y, Z)
  - Grid planes for reference
  - Basis vectors showing where i, j, k go
  - Ghost view of original shape

### 📱 Responsive Design
- **Desktop**: Full sidebar with all controls
- **Mobile**: Bottom drawer with swipeable tabs
- **Touch-friendly**: Optimized for mobile gestures

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will open at `http://localhost:3000`

## 🎮 How to Use

### Desktop
1. Use the sidebar tabs to navigate between controls
2. **Matrix tab**: Directly edit matrix values
3. **Presets tab**: Click any preset to see the transformation
4. **Shapes tab**: Choose different 3D models
5. **View tab**: Toggle visual aids on/off
6. **Animate tab**: Control playback speed and replay
7. **Info tab**: See detailed analysis of current matrix

### Mobile
1. Tap the floating button (bottom right) to open controls
2. Swipe through tabs at the top
3. Tap anywhere outside to close the drawer

### Controls
- **Drag**: Rotate camera
- **Scroll/Pinch**: Zoom in/out
- **Right-click drag** (desktop): Pan camera
- **Double-tap** (mobile): Reset camera

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Scene3D.jsx              # Main 3D canvas
│   ├── TransformableObject.jsx  # Object with matrix transformation
│   ├── CoordinateAxes.jsx       # X, Y, Z axes
│   ├── GridPlanes.jsx           # Reference grids
│   ├── BasisVectors.jsx         # i, j, k vector visualization
│   ├── MatrixInput.jsx          # 3x3 matrix editor
│   ├── PresetButtons.jsx        # Preset transformations
│   ├── VisualizationToggles.jsx # Show/hide controls
│   ├── AnimationControls.jsx    # Playback controls
│   ├── ModelSelector.jsx        # Shape picker
│   ├── MatrixInfo.jsx           # Educational analysis
│   └── ControlPanel.jsx         # Responsive layout wrapper
├── utils/
│   ├── matrixMath.js            # Matrix operations & analysis
│   ├── presets.js               # All transformation presets
│   └── models.js                # 3D geometry generators
├── store.js                     # Zustand state management
├── App.jsx                      # Main app component
└── main.jsx                     # Entry point
```

## 🧮 Matrix Math

The app uses standard 3×3 matrices for linear transformations:

```
[ a  b  c ]   [ x ]   [ ax + by + cz ]
[ d  e  f ] × [ y ] = [ dx + ey + fz ]
[ g  h  i ]   [ z ]   [ gx + hy + iz ]
```

Each row represents where the basis vectors go:
- **Row 1**: Where i (1,0,0) is transformed
- **Row 2**: Where j (0,1,0) is transformed  
- **Row 3**: Where k (0,0,1) is transformed

## 🎨 Tech Stack

- **React 18** - UI framework
- **React Three Fiber** - React renderer for Three.js
- **Three.js** - 3D graphics library
- **@react-three/drei** - Useful helpers for R3F
- **Zustand** - Lightweight state management
- **Tailwind CSS** - Utility-first styling
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library

## 🔒 Constraints & Limits

The app enforces sensible limits for performance:
- Matrix values: -10 to 10
- Model complexity: ~10,000 vertices max
- Animation duration: 5 seconds max
- Target: 60 FPS

## 🎓 Learning Concepts

This tool helps visualize:
- **Linear transformations** - How matrices move points in space
- **Determinants** - Volume scaling and orientation
- **Orthogonal matrices** - Rotations and reflections
- **Projections** - Dimensionality reduction
- **Shearing** - Non-rigid transformations
- **Composition** - Combining multiple transformations

## 🌟 Fun Things to Try

1. **Start with Identity** → Apply "Rotate Y 90°" → See how the shape spins
2. **Try "Squash"** → Notice how determinant changes
3. **Apply "Project XY"** → Watch 3D collapse to 2D (det = 0!)
4. **Enable "Basis Vectors"** → See exactly where i, j, k go
5. **Use "Random Rotation"** → Get surprised!
6. **Combine transformations** → Edit matrix after a preset

## 📝 Development Notes

### Adding New Models
Edit `src/utils/models.js`:
```javascript
export const models = {
  myModel: {
    name: 'My Model',
    icon: '🎯',
    generate: () => new THREE.BoxGeometry(1, 1, 1),
  },
};
```

### Adding New Presets
Edit `src/utils/presets.js`:
```javascript
{
  id: 'my-transform',
  name: 'My Transform',
  hint: 'Does something cool',
  matrix: [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ]
}
```

## 🐛 Troubleshooting

**Performance issues?**
- Try simpler models (cube, sphere)
- Disable grid and basis vectors
- Check browser supports WebGL 2

**Animations choppy?**
- Lower animation speed
- Close other browser tabs
- Update graphics drivers

## 📄 License

MIT - Feel free to use for learning and education!

## 🙏 Credits

Inspired by the original 2D matrix transformation tool by trkern.
Built with love for linear algebra students everywhere.

---

**Made with React Three Fiber** ♥️
