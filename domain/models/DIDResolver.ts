import { DIDDocument } from "./DIDDocument.js";

export abstract class DIDResolver {
  abstract method: string;
  abstract resolve(didString: string): Promise<DIDDocument>;
}
