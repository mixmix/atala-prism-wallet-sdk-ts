import { DID } from "./DID.js";

export interface Mediator {
  hostDID: DID;
  routingDID: DID;
  mediatorDID: DID;
}
