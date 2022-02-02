import { Spinning, Floating } from "spacesvr";
import { DoubleSide } from "three";

type DomeProps = { opacity?: number, primaryColor?: string };

export default function Dome(props: DomeProps) {
  const { opacity = 0.6, primaryColor = "blue" } = props;

  return (
    <group name="dome">
      <Floating>
          {/* <Spinning xSpeed={0.2} ySpeed={0.4} zSpeed={0.3}>0 */}
            <mesh>
              <sphereBufferGeometry args={[4, 30, 30]} />
              <meshStandardMaterial color={primaryColor} transparent opacity={opacity} side={DoubleSide} wireframe />
            </mesh>
            <mesh>
              <sphereBufferGeometry args={[3.9, 30, 30]} />
              <meshStandardMaterial color="black" transparent opacity={opacity} side={DoubleSide} />
            </mesh>
          {/* </Spinning> */}
        </Floating>
    </group>
  );
}
