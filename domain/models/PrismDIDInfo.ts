import { DID } from "./index.js";

export class PrismDIDInfo {
  constructor(
    public readonly did: DID,
    public readonly keyPathIndex: number = 0,
    public readonly alias?: string
  ) {}
}
