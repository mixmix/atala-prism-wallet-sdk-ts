import { DID } from "../../../domain";
import { Pluto } from "../../../domain/buildingBlocks/Pluto";
import { DIDPair } from "../../../domain/models/DIDPair";
import { ConnectionsManager } from "../../types";
import { OutOfBandInvitation } from "../invitation/v2/OutOfBandInvitation";
import { HandshakeRequest } from "./HandshakeRequest";

export class DIDCommConnectionRunner {
  constructor(
    public invitationMessage: OutOfBandInvitation,
    public pluto: Pluto,
    public ownDID: DID,
    public connection: ConnectionsManager,
    public alias: string = "OOBConn"
  ) { }

  async run(): Promise<DIDPair> {
    // NOTE: 2. a) the invitation is transformed into a message
    const request = HandshakeRequest.fromOutOfBand(
      this.invitationMessage,
      this.ownDID
    );
    // NOTE: 2. b) the request is sent as a message
    await this.connection.sendMessage(request.makeMessage());
    // NOTE: 2. c) a "pair" ownDID-remoteDID is created, and incorporated the request.id
    // QUESTION: how unique is this "pair", is it acually a triplet!
    return new DIDPair(this.ownDID, request.to, this.alias);
  }
}
