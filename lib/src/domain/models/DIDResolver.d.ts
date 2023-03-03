import { DIDDocument } from "./DIDDocument";
export declare abstract class DIDResolver {
    abstract method: string;
    abstract resolve(didString: string): Promise<DIDDocument>;
}
