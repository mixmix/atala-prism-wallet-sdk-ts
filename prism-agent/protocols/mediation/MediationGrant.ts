import { uuid } from "@stablelib/uuid";
import { AgentError, Message } from "domain/index.js";
import { ProtocolHelpers } from "../../helpers/ProtocolHelpers.js";
import { ProtocolType } from "../ProtocolTypes.js";
import { MediationGrantBody } from "../types.js";

export class MediationGrant {
  public static type = ProtocolType.DidcommMediationGrant;

  constructor(public body: MediationGrantBody, public id: string = uuid()) {}

  static fromMessage(fromMessage: Message): MediationGrant {
    if (fromMessage.piuri !== ProtocolType.DidcommMediationGrant) {
      throw new AgentError.InvalidMediationGrantMessageError(
        "Invalid request credential message error."
      );
    }
    const type = fromMessage.piuri as ProtocolType;
    const mediationGrantBody =
      ProtocolHelpers.safeParseBody<MediationGrantBody>(fromMessage.body, type);

    return new MediationGrant(mediationGrantBody, fromMessage.id);
  }
}
