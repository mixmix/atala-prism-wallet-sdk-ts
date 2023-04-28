import { expect, assert } from "chai";
import { AgentError, Message } from "domain/index.js";
import {
  createOfferCredentialBody,
  OfferCredential,
} from "prism-agent/protocols/issueCredential/OfferCredential.js";
import { ProtocolType } from "prism-agent/protocols/ProtocolTypes.js";
import { DIDTest } from "../../helpers/DID.js";

describe("OfferCredential", () => {
  it("Should create a valid OfferCredential from a correct OfferMessage", () => {
    const fromDID = DIDTest.fromIndex(0);
    const toDID = DIDTest.fromIndex(1);
    const validOfferCredential = new OfferCredential(
      createOfferCredentialBody(
        {
          type: ProtocolType.DidcommCredentialPreview,
          attributes: [
            {
              name: "test1",
              value: "test",
              mimeType: "test.x",
            },
          ],
        },
        [
          {
            attach_id: "test1",
            format: "test",
          },
        ]
      ),
      [],
      fromDID,
      toDID,
      "1"
    );

    const offerMessage = validOfferCredential.makeMessage();
    const testOfferCredential = OfferCredential.fromMessage(offerMessage);

    expect(validOfferCredential).to.deep.equal(testOfferCredential);
  });

  it("Should test failure when invalid OfferMessage is provided when Creating an OfferCredential", () => {
    const invalidOfferCredential = new Message(
      '{"body": {}}',
      "id",
      "InvalidType"
    );
    assert.throws(
      () => {
        OfferCredential.fromMessage(invalidOfferCredential);
      },
      AgentError.InvalidOfferCredentialMessageError,
      "Invalid offer credential message error."
    );
  });
});
