import { expect } from "chai";
import { Message, Mercury, AgentError } from "domain/index.js";

import { DIDCommInvitationRunner } from "prism-agent/protocols/invitation/v2/DIDCommInvitationRunner.js";
import { MercuryStub } from "../../../mocks/MercuryMock.js";

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

let mercury: Mercury;
chai.use(chaiAsPromised);

describe("DIDCommInvitationRunner Tests", () => {
  beforeEach(() => {
    mercury = new MercuryStub();
  });
  it("Should throw an error if invalid invitationType is provided", () => {
    async function run() {
      const exampleMessage = new Message("{}", undefined, "Something wrong");
      const queryString = await mercury.packMessage(exampleMessage);
      const exampleURL = `localhost:8080?_oob=${queryString}`;
      const invitation = new DIDCommInvitationRunner(new URL(exampleURL));
      return invitation.run();
    }

    expect(run()).to.eventually.be.rejectedWith(
      AgentError.UnknownInvitationTypeError
    );
  });
});
