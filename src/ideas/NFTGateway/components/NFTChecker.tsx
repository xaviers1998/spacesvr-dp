import React, { useEffect, useState } from "react";
import { Text, Interactable, Image, Floating } from "spacesvr";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";

import Dome from "../../Dome";
import FloatingOrb from "../../FloatingOrb";
import Media from "ideas/Media";

export default function NFTChecker(props: NFTCheckerProps) {
  const address = props.address;
  const chain = props.chain;

  const { authenticate, isAuthenticated, user, logout, isAuthenticating } =
    useMoralis();
  const { fetch, data: isOwner } = useMoralisCloudFunction(
    "isNFTOwner",
    {
      address,
      chain,
    },
    { autoFetch: false }
  );

  const [domeClosed, setDomeClosed] = useState(true);

  useEffect(() => {
    fetch();
  }, [user, props]);

  return (
    <group name="nft-gateway">
      {domeClosed && (
        <group>
          <Dome />
        </group>
      )}
      {isOwner && isAuthenticated && (
        <group>
          <Interactable onClick={() => setDomeClosed((prev) => !prev)}>
            <FloatingOrb />
          </Interactable>
        </group>
      )}
      {isAuthenticated && (
        <group>
          <Text
            text={user?.get("ethAddress")}
            vAlign="center" // vertical align relative to the y component
            hAlign="center" // horizontal align relative to the x component
            size={1} // scale
            position={[0, 0.3, -0.05]}
            color="black" // color
          />
        </group>
      )}
      {!isAuthenticating && isAuthenticated && (
        <Interactable onClick={() => logout()}>
          <Text
            text="DISCONNECT"
            vAlign="center" // vertical align relative to the y component
            hAlign="center" // horizontal align relative to the x component
            size={1.1} // scale
            position={[-0.9, 0, -0.05]}
            color="red" // color
          />
        </Interactable>
      )}
      {!isAuthenticated && !isAuthenticating && (
        <group>
          <Floating height={0.05} speed={1.5}>
          <Interactable onClick={() => authenticate()}>
            <Text
              text="METAMASK"
              vAlign="center" // vertical align relative to the y component
              hAlign="center" // horizontal align relative to the x component
              size={0.6} // scale
              position={[-0.9, 0, 0.01]}
              color="white" // color
            />
            <Media
              media="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png"
              framed={true}
              position={[-0.9, 0, 0.05]}
              scale={0.5}
            />
          </Interactable>
          <Interactable
            onClick={() =>
              authenticate({
                provider: "walletconnect",
                signingMessage: "Sign in to DropParty",
              })
            }
          >
            <Text
              text="WALLETCONNECT"
              vAlign="center" // vertical align relative to the y component
              hAlign="center" // horizontal align relative to the x component
              size={0.6} // scale
              position={[0.7, 0, 0.03]}
              color="black" // color
            />
            <Media
              media="https://i.imgur.com/6W0yKmv.png"
              framed={true}
              position={[0.7, 0, 0.05]}
              scale={0.5}
            />
          </Interactable>
          </Floating>
        </group>
      )}
      {isAuthenticating && (
        <Text
          text="Please wait..."
          vAlign="center" // vertical align relative to the y component
          hAlign="center" // horizontal align relative to the x component
          size={1.1} // scale
          position={[0, 0, -0.05]}
          color="red" // color
        />
      )}
      {isAuthenticated && (
        <group>
          <Text
            text={"Owns NFT:"}
            vAlign="center" // vertical align relative to the y component
            hAlign="center" // horizontal align relative to the x component
            size={1} // scale
            position={[0, -0.3, -0.05]}
            color="black" // color
          />
          <Text
            text={isOwner ? "Yes" : "No"}
            vAlign="center" // vertical align relative to the y component
            hAlign="center" // horizontal align relative to the x component
            size={1} // scale
            position={[0, -0.42, -0.05]}
            color="yellow" // color
          />
        </group>
      )}
      {isAuthenticated && <Image
        src="https://t3.ftcdn.net/jpg/02/88/89/90/360_F_288899075_TV8KKBLTOnG0Dby3IC61UCUeNiBK0puK.jpg"
        size={3}
        framed
      />}
    </group>
  );
}
