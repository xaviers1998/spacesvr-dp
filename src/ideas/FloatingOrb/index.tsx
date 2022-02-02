import { Spinning, Floating } from "spacesvr";
import { DoubleSide } from "three";

type FloatingOrbProps = { opacity?: number, primaryColor?: string, secondaryColor?: string };

export default function FloatingOrb(props: FloatingOrbProps) {
  const { opacity = 0.6, primaryColor = "red", secondaryColor = "yellow" } = props;

  return (
    <group name="floating-orb">
      <Floating>
          <Spinning xSpeed={0.2} ySpeed={0.4} zSpeed={0.3}>
            <mesh>
              <sphereBufferGeometry args={[0.3, 30, 30]} />
              <meshStandardMaterial color={primaryColor} transparent opacity={opacity} side={DoubleSide} />
            </mesh>
          </Spinning>
          <Spinning xSpeed={0.2} ySpeed={0.4} zSpeed={0.3}>
            <mesh>
              <boxBufferGeometry args={[0.1, 0.1, 0.1]} />
              <meshStandardMaterial color={secondaryColor} />
            </mesh>
          </Spinning>
        </Floating>
    </group>
  );
}
