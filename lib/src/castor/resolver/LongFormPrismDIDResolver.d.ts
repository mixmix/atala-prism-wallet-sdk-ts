import Apollo from "../../domain/buildingBlocks/Apollo";
import { DIDResolver, DIDDocument } from "../../domain/models";
export declare class LongFormPrismDIDResolver implements DIDResolver {
    private apollo;
    method: string;
    constructor(apollo: Apollo);
    resolve(didString: string): Promise<DIDDocument>;
    private decodeState;
}
