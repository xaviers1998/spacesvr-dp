import React, { useEffect } from "react";
import { Text, Interactable } from "spacesvr";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";

import Media from "ideas/MediaIdea";

const NFTChecker = (props: { address: string; chain: string; media: string; }) => {
  const address = props.address;
  const chain = props.chain;
  const media = props.media;

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

  useEffect(() => {
    fetch();
  }, [user, props, fetch]);

  return (
    <group name="nft-gateway">
      {!isAuthenticated && !isAuthenticating && (
        <group>
          <Interactable onClick={() => authenticate()}>
            <Media
              media="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png"
              framed={true}
              frameColor="black"
              position={[-0.15, 0, 0.05]}
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
            <Media
              media="https://i.imgur.com/6W0yKmv.png"
              framed={true}
              frameColor="black"
              position={[0.15, 0, 0.05]}
              scale={0.25}
              collision={false}
            />
          </Interactable>
        </group>
      )}
      {isOwner !== 2 && (
        <Media
          media={media}
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
          size={1}
          color="red"
        />
      )}

      {/* Debug Tools */}
      {!isAuthenticating && isAuthenticated && true && (
        <Interactable onClick={() => logout()}>
          <Media
              media="https://i.imgur.com/Z22YaYG.jpg"
              framed={true}
              frameColor="black"
              position={[0, 0, 0.05]}
              scale={0.25}
              collision={false}
            />
        </Interactable>
      )}
    </group>
  );
};

export default NFTChecker;
