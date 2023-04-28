import { DID, CastorError} from "domain/index.js";
import { PrismDIDMethodId } from "./PrismDIDMethodId.js";

export class LongFormPrismDID {
  private prismMethodId: PrismDIDMethodId;
  public readonly stateHash: string;
  public readonly encodedState: string;

  constructor(public readonly did: DID) {
    const methodId = new PrismDIDMethodId(did.methodId);

    if (methodId.sections.length !== 2) {
      throw new CastorError.InvalidLongFormDID();
    }

    const stateHash = methodId.sections[0];
    const encodedState = methodId.sections[1];

    this.prismMethodId = methodId;
    this.stateHash = stateHash;
    this.encodedState = encodedState;
  }
}
