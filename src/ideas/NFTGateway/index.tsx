import { MoralisProvider } from "react-moralis";
import NFTChecker from "./components/NFTChecker";

export type InitializerProps = {
    address: string;
    chain: string;
  };

export default function Initializer(props: InitializerProps) {
    const {
        address = "0xda05ce4a985d2aa058382877e08fb38bd649fb60",
        chain = "ETH",
      } = props;
  return (
    <MoralisProvider appId="lDDXYagREnknCf9WxDm994rB9YcHiEfk767ehbna" serverUrl="https://ckb11ejzq8dp.grandmoralis.com:2053/server" initializeOnMount={false}>
        <NFTChecker address={address} chain={chain} />
    </MoralisProvider>
  );
}
