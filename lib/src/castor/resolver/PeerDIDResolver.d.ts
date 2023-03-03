import { Codec } from "../../peer-did/helpers/Multicodec";
import { VerificationMaterialFormatPeerDID, VerificationMaterialAuthentication, VerificationMaterialAgreement, VerificationMaterialPeerDID } from "../../peer-did/types";
import { DID, DIDDocument, DIDResolver, VerificationMethod, Service as DIDDocumentService } from "../../domain/models";
export declare class PeerDIDResolver implements DIDResolver {
    method: string;
    resolve(didString: string): Promise<DIDDocument>;
    private buildDIDDocumentAlgo2;
    decodeMultibaseEncnumbasisAuth(multibase: string, format: VerificationMaterialFormatPeerDID): [string, VerificationMaterialAuthentication];
    decodeMultibaseEcnumbasisAgreement(multibase: string, format: VerificationMaterialFormatPeerDID): [string, VerificationMaterialAgreement];
    decodeMultibaseEncnumbasis(multibase: string, format: VerificationMaterialFormatPeerDID, defaultCodec: Codec): [string, VerificationMaterialPeerDID];
    fromBase58Multibase(multibase: string): [string, Uint8Array];
    getVerificationMethod(did: DID, decodedEncnumbasis: [string, VerificationMaterialPeerDID]): VerificationMethod;
    decodeService(did: DID, encodedString: string): DIDDocumentService[];
    validateRawKeyLength(key: Uint8Array): void;
}
