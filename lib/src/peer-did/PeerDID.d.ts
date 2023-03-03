import { DID } from "../domain/models/DID";
export interface PeerDIDEncoded {
    t: string;
    s: string;
    r: string[];
    a: string[];
}
export declare class PeerDIDService {
    readonly type: string;
    readonly serviceEndpoint: string;
    readonly routingKeys: string[];
    readonly accept: string[];
    constructor(type: string, serviceEndpoint: string, routingKeys: string[], accept: string[]);
    static readonly DIDCommMessagingKey = "DIDCommMessaging";
    static readonly DIDCommMessagingEncodedKey = "dm";
    static readonly CodingKeys: {
        type: string;
        serviceEndpoint: string;
        routingKeys: string;
        accept: string;
    };
    encode(): PeerDIDEncoded;
    static decode(encoded: PeerDIDEncoded): PeerDIDService;
}
export declare class PeerDID {
    readonly did: DID;
    constructor(did: DID);
}
