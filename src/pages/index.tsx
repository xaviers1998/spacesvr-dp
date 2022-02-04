import dynamic from "next/dynamic";

const Starter = dynamic(import("worlds/Starter"), { ssr: false });

export default function StarterPage() {
  return (
    <Starter />
  );
};