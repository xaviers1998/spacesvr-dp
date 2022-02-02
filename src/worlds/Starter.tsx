import React from "react";
import { Spinning, Floating, StandardEnvironment, Image, Interactable, Text } from "spacesvr";
import TransparentFloor from "../ideas/TransparentFloor";
import CloudySky from "../ideas/CloudySky";
import Builder12 from "../ideas/Builder12";
import { useMoralis } from "react-moralis";


const Starter = () => {
  const { authenticate, isAuthenticated, user, logout, isAuthenticating } = useMoralis();

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
      {!isAuthenticated && !isAuthenticating && <Interactable
        onClick={() => authenticate()}
      >
        <Text
          text="LOGIN"
          vAlign="center" // vertical align relative to the y component
          hAlign="center" // horizontal align relative to the x component
          size={1.1} // scale
          position={[-0.8, 1.1, 4.05]}
          rotation={[0, Math.PI, 0]}
          color="red" // color
        />
      </Interactable>}
      {isAuthenticating && 
        <Text
          text="Please wait..."
          vAlign="center" // vertical align relative to the y component
          hAlign="center" // horizontal align relative to the x component
          size={1.1} // scale
          position={[-0.8, 1.1, 4.05]}
          rotation={[0, Math.PI, 0]}
          color="red" // color
        />}
      {isAuthenticated && <Interactable
        onClick={() => logout()}
      >
        <Text
          text="LOGOUT"
          vAlign="center" // vertical align relative to the y component
          hAlign="center" // horizontal align relative to the x component
          size={1.1} // scale
          position={[-0.8, 1.1, 4.05]}
          rotation={[0, Math.PI, 0]}
          color="red" // color
        />
      </Interactable>}
      <Image
        src="https://t3.ftcdn.net/jpg/02/88/89/90/360_F_288899075_TV8KKBLTOnG0Dby3IC61UCUeNiBK0puK.jpg"
        size={3}
        position={[0, 1, 4]}
        rotation={[0, Math.PI, 0]}
        framed
      />
      {isAuthenticated &&
      <group>
      <Text
        text="Hello"
        vAlign="center" // vertical align relative to the y component
        hAlign="center" // horizontal align relative to the x component
        size={1} // scale
        position={[0, 1.1, 4.05]}
        rotation={[0, Math.PI, 0]}
        color="black" // color
      />
      <Text
        text={user?.get('ethAddress')}
        vAlign="center" // vertical align relative to the y component
        hAlign="center" // horizontal align relative to the x component
        size={1} // scale
        position={[0, 0.9, 4.05]}
        rotation={[0, Math.PI, 0]}
        color="black" // color
      />
      </group>}
      <Builder12 />
      <CloudySky color="white" />
      <TransparentFloor opacity={0.7} />
    </StandardEnvironment>
  );
}

export default Starter;
