import { DID } from "./index";
import { PrivateKey } from "./PrivateKey";

export class PeerDID {
  constructor(
    public readonly did: DID,
    public readonly privateKeys: Array<PrivateKey>
  ){}
}
