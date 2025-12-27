import { Line, Text } from '@react-three/drei';

export default function CoordinateAxes() {
  const axisLength = 3;
  const arrowSize = 0.15;

  return (
    <group>
      {/* X Axis - Red */}
      <group>
        <Line
          points={[[0, 0, 0], [axisLength, 0, 0]]}
          color="#ef4444"
          lineWidth={2}
        />
        <mesh position={[axisLength, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[arrowSize, arrowSize * 2, 8]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
        <Text
          position={[axisLength + 0.3, 0, 0]}
          fontSize={0.3}
          color="#ef4444"
          anchorX="center"
          anchorY="middle"
        >
          X
        </Text>
      </group>

      {/* Y Axis - Green */}
      <group>
        <Line
          points={[[0, 0, 0], [0, axisLength, 0]]}
          color="#22c55e"
          lineWidth={2}
        />
        <mesh position={[0, axisLength, 0]}>
          <coneGeometry args={[arrowSize, arrowSize * 2, 8]} />
          <meshBasicMaterial color="#22c55e" />
        </mesh>
        <Text
          position={[0, axisLength + 0.3, 0]}
          fontSize={0.3}
          color="#22c55e"
          anchorX="center"
          anchorY="middle"
        >
          Y
        </Text>
      </group>

      {/* Z Axis - Blue */}
      <group>
        <Line
          points={[[0, 0, 0], [0, 0, axisLength]]}
          color="#3b82f6"
          lineWidth={2}
        />
        <mesh position={[0, 0, axisLength]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[arrowSize, arrowSize * 2, 8]} />
          <meshBasicMaterial color="#3b82f6" />
        </mesh>
        <Text
          position={[0, 0, axisLength + 0.3]}
          fontSize={0.3}
          color="#3b82f6"
          anchorX="center"
          anchorY="middle"
        >
          Z
        </Text>
      </group>
    </group>
  );
}
