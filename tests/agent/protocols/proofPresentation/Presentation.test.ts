import { expect } from "chai";
import { Message, AgentError } from "domain/index.js";
import { ProtocolHelpers } from "prism-agent/helpers/ProtocolHelpers.js";
import { Presentation } from "prism-agent/protocols/proofPresentation/Presentation.js";
import { ProtocolType } from "prism-agent/protocols/ProtocolTypes.js";
import { PresentationBody } from "prism-agent/protocols/types.js";
import { DIDTest } from "../../helpers/DID.js";

describe("ProofPresentation->Presentation Tests", () => {
  it("Should create a Presentation from a valid PresentationMessage", async () => {
    const fromDID = DIDTest.fromIndex(0);
    const toDID = DIDTest.fromIndex(1);

    const presentationBody = ProtocolHelpers.safeParseBody<PresentationBody>(
      "{}",
      ProtocolType.DidcommPresentation
    );
    const validPresentation = new Presentation(
      presentationBody,
      [],
      fromDID,
      toDID
    );

    const presentationMessage = validPresentation.makeMessage();
    const testPresentation = Presentation.fromMessage(presentationMessage);

    expect(validPresentation).to.deep.equal(testPresentation);
  });
  it("Should throw an error when invalid request message is used to initialise Presentation", () => {
    const invalidPresentation = new Message("{}", undefined, "InvalidType");
    expect(() => {
      Presentation.fromMessage(invalidPresentation);
    }).to.throw(AgentError.InvalidPresentationMessageError);
  });
});
