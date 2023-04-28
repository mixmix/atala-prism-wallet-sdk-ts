import { JsonString } from "../../../domain/index.js";
import { AgentError } from "../../../domain/models/Errors.js";
import { ProtocolType } from "../ProtocolTypes.js";
import { PrismOnboardingInvitationBody } from "../types.js";

export class PrismOnboardingInvitation {
  public body: PrismOnboardingInvitationBody;

  constructor(jsonString: JsonString) {
    const body = JSON.parse(jsonString);
    if (!this.isPrismOnboardingBody(body)) {
      throw new AgentError.InvitationIsInvalidError();
    }
    if (body.type !== ProtocolType.PrismOnboarding) {
      throw new AgentError.UnknownPrismOnboardingTypeError();
    }
    this.body = body;
  }

  private isPrismOnboardingBody(
    body: any
  ): body is PrismOnboardingInvitationBody {
    return (
      body.type !== undefined &&
      body.onboardingEndpoint !== undefined &&
      body.from !== undefined &&
      typeof body.type === "string" &&
      typeof body.onboardingEndpoint === "string" &&
      typeof body.from === "string"
    );
  }
}
