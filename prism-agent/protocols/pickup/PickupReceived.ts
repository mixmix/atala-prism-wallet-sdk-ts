import { DID, Message } from "domain/index.js";
import { ProtocolType } from "../ProtocolTypes.js";
import { PickupReceivedBody } from "../types.js";

export class PickupReceived {
  public static type = ProtocolType.PickupReceived;

  constructor(
    public body: PickupReceivedBody,
    public from: DID,
    public to: DID
  ) {}

  makeMessage(): Message {
    const body = JSON.stringify({
      message_id_list: this.body.messageIdList || [],
    });
    return new Message(
      body,
      undefined,
      PickupReceived.type,
      this.from,
      this.to
    );
  }
}
