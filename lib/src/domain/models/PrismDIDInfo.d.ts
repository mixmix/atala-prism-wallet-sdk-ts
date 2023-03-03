import { DID } from "./index";
export declare class PrismDIDInfo {
    readonly did: DID;
    readonly keyPathIndex: number;
    readonly alias?: string | undefined;
    constructor(did: DID, keyPathIndex?: number, alias?: string | undefined);
}
