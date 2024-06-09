import { OutOfBandInvitation } from "./protocols/invitation/v2/OutOfBandInvitation";
import {
  AgentDIDHigherFunctions,
  AgentInvitations as AgentInvitationsClass,
  InvitationType,
  PrismOnboardingInvitation,
} from "./types";
import {
  Service as DIDDocumentService,
  ServiceEndpoint as DIDDocumentServiceEndpoint,
} from "../domain";
import { AgentError } from "../domain/models/Errors";
import {
  findProtocolTypeByValue,
  ProtocolType,
} from "./protocols/ProtocolTypes";
import { Api } from "../domain/models/Api";
import { ConnectionsManager } from "./connectionsManager/ConnectionsManager";
import { DIDCommConnectionRunner } from "./protocols/connection/DIDCommConnectionRunner";
import { Pluto } from "../domain/buildingBlocks/Pluto";
import { DIDCommInvitationRunner } from "./protocols/invitation/v2/DIDCommInvitationRunner";

/**
 * An extension for the Edge agent that groups the functionality to parse, manage and
 *  respond to Cloud Agent onboarding and didcomm v2 invitations
 *
 * @export
 * @class AgentInvitations
 * @typedef {AgentInvitations}
 */
export class AgentInvitations implements AgentInvitationsClass {
  /**
   * Creates an instance of AgentInvitations.
   *
   * @constructor
   * @param {Pluto} pluto
   * @param {Api} api
   * @param {AgentDIDHigherFunctions} agentDIDHigherFunctions
   * @param {ConnectionsManager} connection
   */
  constructor(
    private pluto: Pluto,
    private api: Api,
    private agentDIDHigherFunctions: AgentDIDHigherFunctions,
    private connection: ConnectionsManager
  ) { }

  /**
   * Asyncronously parse an invitation from a valid json string
   *
   * @async
   * @param {string} str
   * @returns {Promise<InvitationType>}
   */
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

  async acceptInvitation(invitation: InvitationType, optionalAlias?: string): Promise<void> {
    if (invitation.type === ProtocolType.Didcomminvitation) {
      return this.acceptDIDCommInvitation(invitation, optionalAlias);
    }

    if (invitation instanceof PrismOnboardingInvitation) {
      return this.acceptPrismOnboardingInvitation(invitation);
    }

    throw new AgentError.InvitationIsInvalidError();
  }

  /**
   * Asyncronously accept a didcomm v2 invitation, will create a pair between the Agent
   *  its connecting with and the current owner's did
   *
   * @async
   * @param {OutOfBandInvitation} invitation
   * @returns {*}
   */
  // NOTE: 1. acceptDIDCommInvitation takes an invite and establishes a connection
  async acceptDIDCommInvitation(invitation: OutOfBandInvitation, optionalAlias?: string) {
    if (!this.connection.mediationHandler.mediator) {
      throw new AgentError.NoMediatorAvailableError();
    }

    const ownDID = await this.agentDIDHigherFunctions.createNewPeerDID(
      [],
      true
    );

    // NOTE: 2. the invitation is set up
    const pair = await new DIDCommConnectionRunner(
      invitation,
      this.pluto,
      ownDID,
      this.connection,
      optionalAlias
    ).run();

    // QUESTION: what is a "connection" or "pair" here?
    // QUESTION: what is needed for such a pair to exist?
    // NOTE: 3. the pair from processing the invite is ... stored?
    await this.connection.addConnection(pair);
  }

  /**
   * Asyncronously accept an onboarding invitation, used to onboard the current DID in the Cloud Agent.
   *
   * @async
   * @param {PrismOnboardingInvitation} invitation
   * @returns {Promise<void>}
   */
  async acceptPrismOnboardingInvitation(invitation: PrismOnboardingInvitation): Promise<void> {
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

  /**
   * Asyncronously parse a prismOnboarding invitation from a string
   *
   * @async
   * @param {string} str
   * @returns {Promise<PrismOnboardingInvitation>}
   */
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

  /**
   * Asyncronously parse an out of band invitation from a URI as the oob come in format of valid URL
   *
   * @async
   * @param {URL} str
   * @returns {Promise<OutOfBandInvitation>}
   */
  async parseOOBInvitation(str: URL): Promise<OutOfBandInvitation> {
    return new DIDCommInvitationRunner(str).run();
  }
}
