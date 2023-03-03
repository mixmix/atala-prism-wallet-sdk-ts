import { VerificationMaterialAgreement, VerificationMaterialAuthentication, VerificationMethodTypePeerDID } from "../types";
export type VerificationMaterial = VerificationMaterialAgreement | VerificationMaterialAuthentication;
export declare class JWKHelper {
    static fromJWKAgreement(material: VerificationMaterialAgreement): Uint8Array;
    static fromJWKAuthentication(material: VerificationMaterialAuthentication): Uint8Array;
    static toJWK(publicKey: Uint8Array, material: VerificationMethodTypePeerDID): string;
}
