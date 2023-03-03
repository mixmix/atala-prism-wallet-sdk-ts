import Apollo from "../../../domain/buildingBlocks/Apollo";
import { PublicKey } from "../../../domain/models";
import * as Protos from "../../protos/node_models";
export declare enum Usage {
    MASTER_KEY = "masterKey",
    ISSUING_KEY = "issuingKey",
    AUTHENTICATION_KEY = "authenticationKey",
    REVOCATION_KEY = "revocationKey",
    CAPABILITY_DELEGATION_KEY = "capabilityDelegationKey",
    CAPABILITY_INVOCATION_KEY = "capabilityInvocationKey",
    KEY_AGREEMENT_KEY = "keyAgreementKey",
    UNKNOWN_KEY = "unknownKey"
}
export declare function getProtosUsage(usage: Usage): Protos.io.iohk.atala.prism.protos.KeyUsage;
export declare function getUsageId(index: Usage): string;
export declare function getUsage(protosUsage: Protos.io.iohk.atala.prism.protos.KeyUsage): Usage;
export declare class PrismDIDPublicKey {
    private apollo;
    id: string;
    usage: Usage;
    keyData: PublicKey;
    constructor(apollo: Apollo, id: string, usage: Usage, keyData: PublicKey);
    static fromProto(apollo: Apollo, proto: Protos.io.iohk.atala.prism.protos.PublicKey): PrismDIDPublicKey;
    toProto(): Protos.io.iohk.atala.prism.protos.PublicKey;
}
