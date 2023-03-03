import { KeyPair, Service as DIDDocumentService } from "../domain/models";
import { PeerDID } from "./PeerDID";
export declare class PeerDIDCreate {
    createPeerDID(keyPairs: KeyPair[], services: DIDDocumentService[]): PeerDID;
    private createMultibaseEncnumbasis;
    private encodeService;
    private validateRawKeyLength;
    private keyAgreementFromKeyPair;
    private authenticationFromKeyPair;
    private octetPublicKey;
}
