export default function GridPlanes() {
  const size = 10;
  const divisions = 10;
  const gridColor = '#374151';
  const centerLineColor = '#4b5563';

  return (
    <group>
      {/* XZ plane (ground) */}
      <gridHelper
        args={[size, divisions, centerLineColor, gridColor]}
        position={[0, 0, 0]}
      />
      
      {/* XY plane (vertical) */}
      <gridHelper
        args={[size, divisions, centerLineColor, gridColor]}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      
      {/* YZ plane (vertical) */}
      <gridHelper
        args={[size, divisions, centerLineColor, gridColor]}
        position={[0, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
      />
    </group>
  );
}
