import { useEffect, useState } from "react";
import { Interactable, Image } from "spacesvr";

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
  const [userAddress, setUserAddress] = useState();

  const connectMetaMask = async () => {
    if (window.ethereum) {
      //check if Metamask is installed
      try {
        const address = await window.ethereum.enable(); //connect Metamask
        setUserAddress(address);
        console.log(address);
      } catch (error) {
        return {
          connectedStatus: false,
          status: "🦊 Connect to Metamask using the button on the top right.",
        };
      }
    } else {
      return {
        connectedStatus: false,
        status:
          "🦊 You must install Metamask into your browser: https://metamask.io/download.html",
      };
    }
  };

  const checkOwner = () => {
    const requestOptions = {
      method: "POST",
      headers: { "x-api-key": "LqnBbRoa566Tty7jUND9t9yKjvdJCAbx1ltWWjsS" },
    };

    fetch(
      "https://6pwq50at99.execute-api.us-east-2.amazonaws.com/partyGate?address=0x2769B116e44fB9eA698ea3B026B91C5103C37E80&nftAddress=0x4baceed4951f29537559d8e203f95ac673f6d8e2&chain=eth",
      requestOptions
    )
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    // setIsOwner(true);
  };

  useEffect(() => setOwner(isOwner), [isOwner]);

  useEffect(() => userAddress && checkOwner(), [userAddress]);

  return (
    <group name="nft-checker">
      {!isOwner && (
        <group name="wallets">
          <Interactable onClick={() => connectMetaMask()}>
            <Image
              src={METAMASK_IMG}
              framed
              position={[0, 0, 0.05]}
              scale={0.25}
            />
          </Interactable>
        </group>
      )}

      {!isOwner && <Image src={media} framed scale={1.5} />}
    </group>
  );
}
