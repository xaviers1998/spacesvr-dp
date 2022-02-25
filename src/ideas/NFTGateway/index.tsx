import { MoralisProvider } from "react-moralis";
import NFTChecker from "./components/NFTChecker";

export type NFTGatewayProps = {
    address: string;
    chain: string;
    media: string;
  };

export default function NFTGateway(props: NFTGatewayProps) {
    const {
        address = "0xda05ce4a985d2aa058382877e08fb38bd649fb60",
        chain = "ETH",
        media = "https://t3.ftcdn.net/jpg/02/88/89/90/360_F_288899075_TV8KKBLTOnG0Dby3IC61UCUeNiBK0puK.jpg"
      } = props;
      
  return (
    <MoralisProvider appId="lDDXYagREnknCf9WxDm994rB9YcHiEfk767ehbna" serverUrl="https://ckb11ejzq8dp.grandmoralis.com:2053/server" initializeOnMount>
        <NFTChecker address={address} chain={chain} media={media} />
    </MoralisProvider>
  );
}
