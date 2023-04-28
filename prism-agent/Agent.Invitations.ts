import { OutOfBandInvitation } from "./protocols/invitation/v2/OutOfBandInvitation.js";
import {
  AgentDIDHigherFunctions,
  AgentInvitations as AgentInvitationsClass,
  InvitationType,
  PrismOnboardingInvitation,
} from "./types/index.js";
import {
  AgentError,
  Pluto,
  Service as DIDDocumentService,
  ServiceEndpoint as DIDDocumentServiceEndpoint,
} from "domain/index.js";
import {
  findProtocolTypeByValue,
  ProtocolType,
} from "./protocols/ProtocolTypes.js";
import { Api } from "../domain/models/Api.js";
import { ConnectionsManager } from "./connectionsManager/ConnectionsManager.js";
import { DIDCommConnectionRunner } from "./protocols/connection/DIDCommConnectionRunner.js";
import { DIDCommInvitationRunner } from "./protocols/invitation/v2/DIDCommInvitationRunner.js";

export class AgentInvitations implements AgentInvitationsClass {
  constructor(
    private pluto: Pluto,
    private api: Api,
    private agentDIDHigherFunctions: AgentDIDHigherFunctions,
    private connection: ConnectionsManager
  ) {}

  async parseInvitation(str: string): Promise<InvitationType> {
    const json = JSON.parse(str);
    const typeString = findProtocolTypeByValue(json.type);

    switch (typeString) {
      case ProtocolType.PrismOnboarding:
        return this.parsePrismInvitation(str);
      case ProtocolType.Didcomminvitation:
        return this.parseOOBInvitation(new URL(str));
    }

    throw new AgentError.UnknownInvitationTypeError();
  }

  async acceptDIDCommInvitation(invitation: OutOfBandInvitation) {
    if (!this.connection.mediationHandler.mediator) {
      throw new AgentError.NoMediatorAvailableError();
    }

    const ownDID = await this.agentDIDHigherFunctions.createNewPeerDID(
      [],
      true
    );

    const pair = await new DIDCommConnectionRunner(
      invitation,
      this.pluto,
      ownDID,
      this.connection
    ).run();

    await this.connection.addConnection(pair);
  }

  async acceptInvitation(invitation: PrismOnboardingInvitation): Promise<void> {
    if (!invitation.from) {
      throw new AgentError.UnknownInvitationTypeError();
    }
    interface SendDID {
      did: string;
    }
    const body: SendDID = {
      did: invitation.from.toString(),
    };
    const response = await this.api.request(
      "POST",
      invitation.onboardEndpoint,
      new Map(),
      new Map(),
      body
    );
    if (response.httpStatus != 200) {
      throw new AgentError.FailedToOnboardError();
    }
  }

  async parsePrismInvitation(str: string): Promise<PrismOnboardingInvitation> {
    try {
      const prismOnboarding =
        OutOfBandInvitation.parsePrismOnboardingInvitationFromJson(str);
      const url = prismOnboarding.onboardEndpoint;
      const services: DIDDocumentService[] = [
        new DIDDocumentService(
          "#didcomm-1",
          ["DIDCommMessaging"],
          new DIDDocumentServiceEndpoint(url, ["DIDCommMessaging"])
        ),
      ];
      const updateMediator = true;
      const did = await this.agentDIDHigherFunctions.createNewPeerDID(
        services,
        updateMediator
      );
      prismOnboarding.from = did;
      return prismOnboarding;
    } catch (e) {
      if (e instanceof Error) {
        throw new AgentError.UnknownInvitationTypeError(e.message);
      } else {
        throw e;
      }
    }
  }

  async parseOOBInvitation(str: URL): Promise<OutOfBandInvitation> {
    return new DIDCommInvitationRunner(str).run();
  }
}
