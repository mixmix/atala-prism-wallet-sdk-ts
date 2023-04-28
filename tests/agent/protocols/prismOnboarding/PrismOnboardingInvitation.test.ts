import { expect } from "chai";
import { AgentError } from "domain/index.js";
import { PrismOnboardingInvitation } from "prism-agent/protocols/prismOnboarding/PrismOnboardingInvitation.js";
import { ProtocolType } from "prism-agent/protocols/ProtocolTypes.js";
import { PrismOnboardingInvitationBody } from "prism-agent/protocols/types.js";

describe("PrismOnboardingInvitation Tests", () => {
  it("Should create a valid PrismOnboardingInvitation from json", async () => {
    const example: PrismOnboardingInvitationBody = {
      type: ProtocolType.PrismOnboarding,
      onboardingEndpoint: "localhost:8080",
      from: "someone",
    };
    const exampleString: string = JSON.stringify(example);

    const invitation = new PrismOnboardingInvitation(exampleString);
    expect(invitation.body.from).to.equal(example.from);
    expect(invitation.body.onboardingEndpoint).to.equal(
      example.onboardingEndpoint
    );
    expect(invitation.body.type).to.equal(example.type);
  });

  it("Should throw an Error when invalid invitation type is used", () => {
    const example: PrismOnboardingInvitationBody = {
      type: "wrong type",
      onboardingEndpoint: "localhost:8080",
      from: "someone",
    };
    const exampleString: string = JSON.stringify(example);
    expect(() => new PrismOnboardingInvitation(exampleString)).to.throw(
      AgentError.UnknownPrismOnboardingTypeError,
      "Invalid InvitationType received"
    );
  });
});
