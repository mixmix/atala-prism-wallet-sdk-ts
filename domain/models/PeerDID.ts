import { DID } from "./index.js";
import { PrivateKey } from "./PrivateKey.js";

export class PeerDID {
  constructor(
    public readonly did: DID,
    public readonly privateKeys: Array<PrivateKey>
  ){}
}
