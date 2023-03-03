import { DID } from "./index";
import { PrivateKey } from "./PrivateKey";
export declare class PeerDID {
    readonly did: DID;
    readonly privateKeys: Array<PrivateKey>;
    constructor(did: DID, privateKeys: Array<PrivateKey>);
}
