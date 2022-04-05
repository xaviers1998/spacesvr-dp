import { useEffect, useState } from "react";
import { Text } from "@react-three/drei";
import { Interactable, Image } from "spacesvr";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";
import MetaMaskOnboarding from "@metamask/onboarding"; 

const METAMASK_IMG =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png";

type NFTCheckerProps = {
  address: string;
  chain: string;
  media: string;
  setOwner: (a: boolean) => void;
};

export default function NFTChecker(props: NFTCheckerProps) {
  const { address, chain, media, setOwner } = props;

  const [isOwner, setIsOwner] = useState(false);

  const checkIfOwner = async() => {
    if (window.ethereum) { //check if Metamask is installed
      try {
          const address = await window.eth_requestAccounts; //connect Metamask
          const obj = {
                  connectedStatus: true,
                  status: "",
                  address: address
              }
              return obj;
           
      } catch (error) {
          return {
              connectedStatus: false,
              status: "🦊 Connect to Metamask using the button on the top right."
          }
      }
      
} else {
      return {
          connectedStatus: false,
          status: "🦊 You must install Metamask into your browser: https://metamask.io/download.html"
      }
    } 
  }

  // 2 means that the user is the owner
  useEffect(() => setOwner(isOwner), [isOwner]);

  return (
    <group name="nft-checker">
      {!isOwner && (
        <group name="wallets">
          <Interactable onClick={() => checkIfOwner()}>
            <Image
              src={METAMASK_IMG}
              framed
              position={[-0.15, 0, 0.05]}
              scale={0.25}
            />
          </Interactable>
          {/* <Interactable
            onClick={() =>
              authenticate({
                provider: "walletconnect",
                signingMessage: "Sign in to DropParty",
              })
            }
          >
            <Image
              src={WALLETCONNECT_IMAGE}
              framed
              position={[0.15, 0, 0.05]}
              scale={0.25}
            />
          </Interactable> */}
        </group>
      )}

      {!isOwner && <Image src={media} framed scale={1.5} />}
    </group>
  );
}
