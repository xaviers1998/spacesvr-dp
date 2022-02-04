import { StandardEnvironment } from "spacesvr";
import TransparentFloor from "../ideas/TransparentFloor";
import CloudySky from "../ideas/CloudySky";
import NFTGateway from "../ideas/NFTGateway";



const Starter = () => {
  return (
    <StandardEnvironment>
      <ambientLight />
      <group position={[0, 0.6, -1.5]}>
      <NFTGateway address="0x4baceed4951f29537559d8e203f95ac673f6d8e2" chain="POLY" />
      </group>
      <CloudySky color="white" />
      <TransparentFloor opacity={0.7} />
    </StandardEnvironment>
  );
}

export default Starter;
