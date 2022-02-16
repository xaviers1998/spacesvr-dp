import React, { useEffect } from "react";
import { Text, Interactable, Image, Floating } from "spacesvr";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";

import Media from "ideas/MediaIdea";

const NFTChecker = (props: { address: any; chain: any }) => {
  const address = props.address;
  const chain = props.chain;
  const email = "ryan@dropparty.io";
  const Debugging = true;

  const { authenticate, isAuthenticated, user, logout, isAuthenticating } =
    useMoralis();
  const { fetch, data: isOwner } = useMoralisCloudFunction(
    "isNFTOwner",
    {
      address,
      chain,
      email,
    },
    { autoFetch: false }
  );

  // isOwner Values
  // 1 --- Subscription: ACTIVE | NFT Owner: NO
  // 2 --- Subscription: ACTIVE | NFT Owner: YES
  // 3 --- Subscription: INACTIVE | NFT Owner: YES

  useEffect(() => {
    fetch();
  }, [user, props]);

  return (
    <group name="nft-gateway">
      {!isAuthenticated && !isAuthenticating && (
        <group>
          <Interactable onClick={() => authenticate()}>
            <Text
              text="METAMASK"
              vAlign="center"
              hAlign="center"
              size={0.35}
              position={[-0.4, 0, 0.04]}
              color="white"
            />
            <Media
              media="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png"
              framed={true}
              frameColor="black"
              position={[-0.4, 0, 0.05]}
              scale={0.25}
              collision={false}
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
              vAlign="center"
              hAlign="center"
              size={0.35} // scale
              position={[0.4, 0, 0.03]}
              color="black" // color
            />
            <Media
              media="https://i.imgur.com/6W0yKmv.png"
              framed={true}
              frameColor="black"
              position={[0.4, 0, 0.05]}
              scale={0.25}
              collision={false}
            />
          </Interactable>
        </group>
      )}
      {(isAuthenticating || !isAuthenticated) && (
        <Media
          media="https://t3.ftcdn.net/jpg/02/88/89/90/360_F_288899075_TV8KKBLTOnG0Dby3IC61UCUeNiBK0puK.jpg"
          framed
          frameColor="black"
          collision
          scale={1.5}
        />
      )}
      {isAuthenticating && (
        <Text
          text="Please wait..."
          vAlign="center"
          hAlign="center"
          size={1.1}
          position={[0, 0, -0.05]}
          color="red"
        />
      )}

      {/* Debug Tools */}
      {!isAuthenticating && isAuthenticated && Debugging && (
        <Interactable onClick={() => logout()}>
          <Text
            text="DISCONNECT"
            vAlign="center"
            hAlign="center"
            size={1.1}
            position={[-0.9, 0, -0.05]}
            color="red"
          />
        </Interactable>
      )}
    </group>
  );
};

export default NFTChecker;
