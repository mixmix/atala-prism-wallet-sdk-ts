import { DID } from "./DID.js";

export class DIDPair {
  constructor(
    public readonly host: DID,
    public readonly receiver: DID,
    public readonly name: string
  ) {}
}
