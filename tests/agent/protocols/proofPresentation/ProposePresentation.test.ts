import { expect } from "chai";
import { Message, AgentError } from "domain/index.js";
import { ProposePresentation } from "prism-agent/protocols/proofPresentation/ProposePresentation.js";
import { RequestPresentation } from "prism-agent/protocols/proofPresentation/RequestPresentation.js";
import { DIDTest } from "../../helpers/DID.js";

describe("ProofPresentation->ProposePresentation Tests", () => {
  it("Should create a ProposePresentation from a valid ProposePresentationMessage", async () => {
    const fromDID = DIDTest.fromIndex(0);
    const toDID = DIDTest.fromIndex(1);

    const validProposePresentation = new ProposePresentation(
      {
        proofTypes: [{ schema: "testSchema" }],
      },
      [],
      fromDID,
      toDID,
      "1"
    );

    const proposePresentationMessage = validProposePresentation.makeMessage();
    const testProposePresentation = ProposePresentation.fromMessage(
      proposePresentationMessage
    );

    expect(validProposePresentation).to.deep.equal(testProposePresentation);
  });
  it("Should throw an error when invalid propose message is used to initialise ProposePresentation", () => {
    const invalidProposePresentation = new Message(
      "{}",
      undefined,
      "InvalidType"
    );
    expect(() => {
      ProposePresentation.fromMessage(invalidProposePresentation);
    }).to.throw(AgentError.InvalidProposePresentationMessageError);
  });
  it("Should start a ProposePresentation from a valid RequestMessage", () => {
    const fromDID = DIDTest.fromIndex(0);
    const toDID = DIDTest.fromIndex(1);
    const validRequestPresentation = new RequestPresentation(
      {
        proofTypes: [{ schema: "testSchema" }],
      },
      [],
      fromDID,
      toDID,
      "1"
    );

    const requestMessage = validRequestPresentation.makeMessage();
    const testProposePresentation =
      ProposePresentation.makeProposalFromRequest(requestMessage);

    expect(validRequestPresentation.from.toString()).to.equal(
      testProposePresentation.to.toString()
    );

    expect(validRequestPresentation.to.toString()).to.equal(
      testProposePresentation.from.toString()
    );

    expect(validRequestPresentation.attachments).to.deep.equal(
      testProposePresentation.attachments
    );

    expect(validRequestPresentation.id).to.equal(testProposePresentation.thid);
    expect(validRequestPresentation.body.goalCode).to.equal(
      testProposePresentation.body.goalCode
    );

    expect(validRequestPresentation.body.comment).to.equal(
      testProposePresentation.body.comment
    );
  });
});
