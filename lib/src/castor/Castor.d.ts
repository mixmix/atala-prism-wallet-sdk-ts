import Apollo from "../domain/buildingBlocks/Apollo";
import { default as CastorInterface } from "../domain/buildingBlocks/Castor";
import { DID, PublicKey, Service, KeyPair, DIDDocument } from "../domain/models";
export default class Castor implements CastorInterface {
    private apollo;
    private resolvers;
    constructor(apollo: Apollo);
    parseDID(did: string): DID;
    createPrismDID(masterPublicKey: PublicKey, services?: Service[] | undefined): Promise<DID>;
    createPeerDID(keyPairs: KeyPair[], services: Service[]): Promise<DID>;
    resolveDID(did: string): Promise<DIDDocument>;
    verifySignature(did: DID, challenge: Uint8Array, signature: Uint8Array): Promise<boolean>;
}
