import dynamic from "next/dynamic";
import { MoralisProvider } from "react-moralis";

const Starter = dynamic(import("worlds/Starter"), { ssr: false });

export default function StarterPage() {
  return (
  <MoralisProvider appId="lDDXYagREnknCf9WxDm994rB9YcHiEfk767ehbna" serverUrl="https://ckb11ejzq8dp.grandmoralis.com:2053/server">
    <Starter />
  </MoralisProvider>
  );
};