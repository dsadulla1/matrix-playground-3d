# 🚀 Quick Start Guide

Get up and running in 60 seconds!

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Start Dev Server
```bash
npm run dev
```

## Step 3: Open Browser
Navigate to `http://localhost:3000`

That's it! 🎉

## First Time User?

Here's what to do first:

1. **Look at the 3D scene** - You'll see a bunny (or whatever model is selected)
2. **Open controls** - On mobile, tap the floating button. On desktop, use the sidebar
3. **Try a preset** - Go to "Presets" tab and click "Rotate Y 90°"
4. **Watch it transform!** - The shape will smoothly rotate

## Recommended First Explorations

### 1. See Different Transformations
- Go to Presets tab
- Try: "Double Size", "Squash", "Reflect XY", "Spiral"

### 2. Understand Basis Vectors
- Go to View tab
- Enable "Basis Vectors"
- Try different presets and watch the colored arrows move!

### 3. Play with Different Shapes
- Go to Shapes tab
- Try the teapot, torus, or star
- Different shapes reveal different aspects of transformations

### 4. Learn from Analysis
- Go to Info tab
- See how determinant and other properties change
- Read the explanations

## Keyboard Tips (Desktop)
- Hold `Shift` while dragging to pan
- Use arrow keys to adjust matrix values
- Press `Space` to replay animation

## Mobile Tips
- One finger to rotate camera
- Two fingers to pinch/zoom
- Swipe through tabs at the top of the drawer

## Understanding the Display

### Colors
- 🔴 **Red** = X axis / i vector
- 🟢 **Green** = Y axis / j vector  
- 🔵 **Blue** = Z axis / k vector
- 👻 **Gray ghost** = Original shape (before transformation)
- 💜 **Purple** = Transformed shape

### Matrix Layout
```
[ a  b  c ]
[ d  e  f ]
[ g  h  i ]
```
- **Column 1** (a,d,g): Where X-axis goes
- **Column 2** (b,e,h): Where Y-axis goes
- **Column 3** (c,f,i): Where Z-axis goes

## Common Questions

**Q: Why doesn't my shape look different?**
A: You might be viewing the Identity transformation (no change). Try a preset!

**Q: My shape disappeared!**
A: You might have applied a projection (determinant = 0). Click Reset or choose Identity.

**Q: Can I make my own transformation?**
A: Yes! Go to Matrix tab and edit the numbers directly.

**Q: What's the determinant mean?**
A: It tells you how much volumes are scaled. Check the Info tab for details!

## Troubleshooting

**Can't see anything?**
- Check your browser supports WebGL
- Try refreshing the page
- Open browser console (F12) for errors

**Running slow?**
- Switch to a simpler model (Cube or Sphere)
- Turn off Grid and Basis Vectors
- Lower animation speed

## Next Steps

Once comfortable with basics:
1. Try editing matrix values directly
2. Experiment with "Random" presets
3. Read the educational tooltips in Info tab
4. Try combining multiple transformations

---

**Need more help?** Check out the full README.md

**Having fun?** Share it with friends learning linear algebra! 🎓
