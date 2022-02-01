import React from "react";
import { Spinning, Floating, StandardEnvironment, Image, Interactable } from "spacesvr";
import TransparentFloor from "../ideas/TransparentFloor";
import CloudySky from "../ideas/CloudySky";
import Builder12 from "../ideas/Builder12";
import { useMoralis } from "react-moralis";


const Starter = () => {
  const { authenticate, isAuthenticated, user } = useMoralis();

  return (
    <StandardEnvironment>
      <ambientLight />
      <group position={[0, 0, -4]}>
        <Floating>
          <Spinning xSpeed={0.2} ySpeed={0.4} zSpeed={0.3}>
            <mesh>
              <torusKnotBufferGeometry args={[1, 0.2]} />
              <meshStandardMaterial color="blue" />
            </mesh>
          </Spinning>
        </Floating>
      </group>
      {!isAuthenticated && <Interactable
        onClick={() => authenticate()}
      >
        <Image
          src="https://dwvo2npct47gg.cloudfront.net/gallery/bladi/IMG_8334.jpg"
          size={3}
          position={[-2, 1, 6.4]}
          rotation={[0, Math.PI, 0]}
          framed
        />
      </Interactable>}
      <Builder12 />
      <CloudySky color="white" />
      <TransparentFloor opacity={0.7} />
    </StandardEnvironment>
  );
}

export default Starter;
