export declare enum VerificationMaterialFormatPeerDID {
    JWK = "jwk"
}
export interface VerificationMethodTypePeerDID {
    value: string;
}
export declare class VerificationMethodType implements VerificationMethodTypePeerDID {
    value: string;
    constructor(value: string);
}
export declare enum Numalgo2Prefix {
    authentication = "V",
    keyAgreement = "E",
    service = "S"
}
export type OctetPublicKey = {
    kty: "OKP";
    crv: string;
    x: string;
};
export declare class VerificationMethodTypeAgreement extends VerificationMethodType {
    static JSON_WEB_KEY_2020: VerificationMethodTypeAgreement;
    static X25519_KEY_AGREEMENT_KEY_2019: VerificationMethodTypeAgreement;
    static X25519_KEY_AGREEMENT_KEY_2020: VerificationMethodTypeAgreement;
}
export declare class VerificationMethodTypeAuthentication extends VerificationMethodType {
    static JSON_WEB_KEY_2020: VerificationMethodTypeAuthentication;
    static ED25519_KEY_AGREEMENT_KEY_2018: VerificationMethodTypeAuthentication;
    static ED25519_KEY_AGREEMENT_KEY_2020: VerificationMethodTypeAuthentication;
}
export interface VerificationMethodTypePeerDIDWithAgreement extends VerificationMethodTypePeerDID {
    agreement: VerificationMethodTypeAgreement;
}
export interface VerificationMethodTypePeerDIDWithAuthentication extends VerificationMethodTypePeerDID {
    authentication: VerificationMethodTypeAuthentication;
}
export type VerificationMaterialPeerDIDType = 1;
export interface VerificationMaterialPeerDID {
    keyType: VerificationMethodTypePeerDID;
    value: string;
}
export declare class VerificationMaterialPeerDIDWithAgreement implements VerificationMaterialPeerDID {
    keyType: VerificationMethodTypePeerDID;
    value: string;
    agreement: VerificationMaterialAgreement;
    constructor(keyType: VerificationMethodTypePeerDID, value: string, agreement: VerificationMaterialAgreement);
}
export declare class VerificationMaterialPeerDIDWithAuthentication implements VerificationMaterialPeerDID {
    keyType: VerificationMethodTypePeerDID;
    value: string;
    authentication: VerificationMaterialAuthentication;
    constructor(keyType: VerificationMethodTypePeerDID, value: string, authentication: VerificationMaterialAuthentication);
}
export declare class VerificationMaterialAgreement implements VerificationMaterialPeerDIDWithAgreement {
    readonly format: VerificationMaterialFormatPeerDID;
    readonly value: string;
    readonly type: VerificationMethodTypeAgreement;
    constructor(value: string, type: VerificationMethodTypeAgreement, format: VerificationMaterialFormatPeerDID);
    get keyType(): VerificationMethodTypePeerDID;
    get agreement(): VerificationMaterialAgreement;
}
export declare class VerificationMaterialAuthentication implements VerificationMaterialPeerDIDWithAuthentication {
    readonly format: VerificationMaterialFormatPeerDID;
    readonly value: string;
    readonly type: VerificationMethodTypeAuthentication;
    constructor(value: string, type: VerificationMethodTypeAuthentication, format: VerificationMaterialFormatPeerDID);
    get keyType(): VerificationMethodTypePeerDID;
    get authentication(): VerificationMaterialAuthentication;
}
