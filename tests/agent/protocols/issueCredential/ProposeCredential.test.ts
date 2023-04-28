import { expect, assert } from "chai";
import { Message, AgentError } from "domain/index.js";

import {
  createProposeCredentialBody,
  ProposeCredential,
} from "prism-agent/protocols/issueCredential/ProposeCredential.js";
import { ProtocolType } from "prism-agent/protocols/ProtocolTypes.js";
import { DIDTest } from "../../helpers/DID.js";

describe("ProposeCredential", () => {
  it("Should create a valid ProposeCredential from a correct ProposeMessage", () => {
    const fromDID = DIDTest.fromIndex(0);
    const toDID = DIDTest.fromIndex(1);
    const validProposeCredential = new ProposeCredential(
      createProposeCredentialBody(
        {
          type: ProtocolType.DidcommCredentialPreview,
          attributes: [{ name: "test1", value: "test", mimeType: "test.x" }],
        },
        [{ attach_id: "test1", format: "test" }]
      ),
      [],
      fromDID,
      toDID,
      "1"
    );

    const proposeMessage = validProposeCredential.makeMessage();
    const testProposeCredential = ProposeCredential.fromMessage(proposeMessage);

    expect(validProposeCredential).to.deep.equal(testProposeCredential);
  });

  it("Should test failure when invalid ProposeMessage is provided when Creating an ProposeCredential", () => {
    const invalidProposeCredential = new Message(
      '{"body": {}}',
      "id",
      "InvalidType"
    );
    assert.throws(
      () => {
        ProposeCredential.fromMessage(invalidProposeCredential);
      },
      AgentError.InvalidProposedCredentialMessageError,
      "Invalid proposed credential message error."
    );
  });
});
