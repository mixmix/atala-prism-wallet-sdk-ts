import { DID, DIDPair, Pluto} from "domain/index.js";
import { ConnectionsManager } from "prism-agent/types/index.js";
import { OutOfBandInvitation } from "../invitation/v2/OutOfBandInvitation.js";
import { HandshakeRequest } from "./HandshakeRequest.js";

export class DIDCommConnectionRunner {
  constructor(
    public invitationMessage: OutOfBandInvitation,
    public pluto: Pluto,
    public ownDID: DID,
    public connection: ConnectionsManager
  ) {}

  async run(): Promise<DIDPair> {
    const request = HandshakeRequest.fromOutOfBand(
      this.invitationMessage,
      this.ownDID
    );

    try {
      await this.connection.sendMessage(request.makeMessage());
      return new DIDPair(this.ownDID, request.to, `Connection${request.id}`);
    } catch (err) {
      return new DIDPair(this.ownDID, request.to, `Connection${request.id}`);
    }
  }
}
