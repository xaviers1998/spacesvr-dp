import { useEffect, useState } from "react";
import { Interactable, Image } from "spacesvr";
import { Text } from "@react-three/drei";

const METAMASK_IMG =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png";

const FONT_FILE =
  "https://d27rt3a60hh1lx.cloudfront.net/fonts/Quicksand_Bold.otf";

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
  const [errorMessage, setErrorMessage] = useState("");

  const connectMetaMask = async () => {
    if (window.ethereum) {
      //check if Metamask is installed
      try {
        const address = await window.ethereum.enable(); //connect Metamask
        setUserAddress(address);
        console.log(address);
      } catch (error) {
        setErrorMessage(
          "🦊 Connect to Metamask using the button on the top right."
        );
      }
    } else {
      setErrorMessage(
        "🦊 You must install Metamask into your browser: https://metamask.io/download.html"
      );
    }
  };

  const checkOwner = () => {
    const requestOptions = {
      method: "GET",
      headers: { "x-api-key": "LqnBbRoa566Tty7jUND9t9yKjvdJCAbx1ltWWjsS" },
    };

    fetch(
      `https://6pwq50at99.execute-api.us-east-2.amazonaws.com/partyGate?address=${userAddress}&nftAddress=${address}&chain=${chain}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => setIsOwner(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => setOwner(isOwner), [isOwner]);

  // Once user address is retrieved
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
      {!isOwner && errorMessage && (
        <Text font={FONT_FILE} fontSize={0.1} color="red" position-z={0.001}>
          {errorMessage}
        </Text>
      )}
    </group>
  );
}
