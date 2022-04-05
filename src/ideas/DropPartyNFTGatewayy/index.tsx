import { useState } from "react";
import NFTChecker from "./components/NFTChecker";
import Centrify from "./components/Centrify";
import { GroupProps } from "@react-three/fiber";
import Wall from "./components/Wall";
import "moralis";

export type NFTGatewayProps = {
  enabled?: boolean;
  address?: string;
  chain?: string;
  wallOrSphere?: boolean;
  barrierSize?: number;
  background?: string;
} & GroupProps;

export default function DropPartyNFTGateway(props: NFTGatewayProps) {
  const {
    enabled = true,
    address = "0xc92ceddfb8dd984a89fb494c376f9a48b999aafc",
    chain = "ETH",
    wallOrSphere = false,
    barrierSize = 6,
    background = "https://t3.ftcdn.net/jpg/02/88/89/90/360_F_288899075_TV8KKBLTOnG0Dby3IC61UCUeNiBK0puK.jpg",
    ...rest
  } = props;

  const [owner, setOwner] = useState(false);

  const IS_WALL = !wallOrSphere;
  const IS_SPHERE = wallOrSphere;

  return (
    <group name="drop-party-nft-gateway" {...rest} scale={1}>
        <NFTChecker
          address={address}
          chain={chain}
          media={background}
          setOwner={setOwner}
        />
      {enabled && IS_SPHERE && (
        <Centrify enabled={!owner} distance={barrierSize} />
      )}
      {enabled && IS_WALL && <Wall enabled={!owner} size={barrierSize} />}
    </group>
  );
}
