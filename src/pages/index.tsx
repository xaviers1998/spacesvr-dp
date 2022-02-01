import dynamic from "next/dynamic";
import { MoralisProvider } from "react-moralis";

const Starter = dynamic(import("worlds/Starter"), { ssr: false });

export default function StarterPage() {
  return (
  <MoralisProvider appId="GXQZy7vn40XUUm3QLvaO8Zzk4rXdm0HXMyZFstlH" serverUrl="https://hfsfolrhv6wl.usemoralis.com:2053/server">
    <Starter />
  </MoralisProvider>
  );
};