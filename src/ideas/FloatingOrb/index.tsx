import { Spinning, Interactable } from "spacesvr";
import { DoubleSide } from "three";
import React, { useState } from "react";

type FloatingOrbProps = { primaryColor?: string, secondaryColor?: string };

export default function FloatingOrb(props: FloatingOrbProps) {
  const { primaryColor = "red", secondaryColor = "yellow" } = props;
  const [orbpacity, setOrbpacity] = useState(0.8);

  return (
    <group name="floating-orb">
      <Interactable
        onHover={() => setOrbpacity(0.6)}
        onUnHover={() => setOrbpacity(0.8)}
      >
        <Spinning xSpeed={0.2} ySpeed={0.4} zSpeed={0.3}>
          <mesh>
            <sphereBufferGeometry args={[0.2, 30, 30]} />
            <meshStandardMaterial color={primaryColor} transparent opacity={orbpacity} side={DoubleSide} />
          </mesh>
        </Spinning>
        <Spinning xSpeed={0.2} ySpeed={0.4} zSpeed={0.3}>
          <mesh>
            <boxBufferGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color={secondaryColor} />
          </mesh>
        </Spinning>
      </Interactable>
    </group>
  );
}
