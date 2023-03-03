import { DID } from "../../../domain/models";
export declare class LongFormPrismDID {
    readonly did: DID;
    private prismMethodId;
    readonly stateHash: string;
    readonly encodedState: string;
    constructor(did: DID);
}
