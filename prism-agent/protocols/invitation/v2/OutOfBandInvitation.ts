import { uuid } from "@stablelib/uuid";
import { JsonString, AgentError } from "domain/index.js";
import { PrismOnboardingInvitation } from "prism-agent/types/index.js";

import { ProtocolType } from "../../ProtocolTypes.js";
import { OutOfBandInvitationBody } from "prism-agent/protocols/types.js";

export class OutOfBandInvitation {
  public type = ProtocolType.Didcomminvitation;

  constructor(
    public body: OutOfBandInvitationBody,
    public from: string,
    public id: string = uuid()
  ) {}

  static parsePrismOnboardingInvitationFromJson(
    json: JsonString
  ): PrismOnboardingInvitation {
    const jsonObject = JSON.parse(json);
    if (!jsonObject.onboardEndpoint) {
      throw new AgentError.InvitationIsInvalidError(
        "Undefined PrismOnboardingInvitation onboardEndpoint"
      );
    }
    if (!jsonObject.type) {
      throw new AgentError.InvitationIsInvalidError(
        "Undefined PrismOnboardingInvitation type"
      );
    }
    const onboardingEndpoint = jsonObject.onboardEndpoint;
    const type = jsonObject.type;
    const from = jsonObject.from;

    return new PrismOnboardingInvitation(onboardingEndpoint, from, type);
  }

  static parseOutOfBandInvitationFromJson(
    json: JsonString
  ): OutOfBandInvitation {
    const jsonObject = JSON.parse(json);
    if (!jsonObject.onboardEndpoint) {
      throw new AgentError.InvitationIsInvalidError(
        "Undefined PrismOnboardingInvitation onboardEndpoint"
      );
    }
    if (!jsonObject.type) {
      throw new AgentError.InvitationIsInvalidError(
        "Undefined PrismOnboardingInvitation type"
      );
    }
    const id = jsonObject.id;
    const body = jsonObject.body;

    return new OutOfBandInvitation(body, jsonObject.from, id);
  }
}
