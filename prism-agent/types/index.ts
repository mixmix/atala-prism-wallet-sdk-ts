import { VerifiableCredential } from "domain/models/index.js";
import { OutOfBandInvitation } from "../protocols/invitation/v2/OutOfBandInvitation.js";
import {
  DID,
  Mediator,
  Message,
  Service as DIDDocumentService,
  Signature,
} from "../../domain/index.js";
import { Castor, DIDPair, Mercury, Pluto } from "domain/index.js";
import { CancellableTask } from "../helpers/Task.js";
import { OfferCredential } from "../protocols/issueCredential/OfferCredential.js";
import { RequestCredential } from "../protocols/issueCredential/RequestCredential.js";
import { IssueCredential } from "../protocols/issueCredential/IssueCredential.js";
import { RequestPresentation } from "../protocols/proofPresentation/RequestPresentation.js";
import { Presentation } from "../protocols/proofPresentation/Presentation.js";
interface InvitationInterface {
  type: InvitationTypes;
  from?: DID;
}

export enum InvitationTypes {
  OUTOFBAND,
  PRISM_ONBOARD,
}

export type InvitationType = PrismOnboardingInvitation | OutOfBandInvitation;

export class PrismOnboardingInvitation implements InvitationInterface {
  public type: InvitationTypes = InvitationTypes.PRISM_ONBOARD;

  constructor(
    public onboardEndpoint: string,
    public from?: DID,
    type?: InvitationTypes
  ) {
    if (type) {
      this.type = type;
    }
  }
}

export interface AgentCredentials {
  verifiableCredentials(): Promise<VerifiableCredential[]>;
  prepareRequestCredentialWithIssuer(
    offer: OfferCredential
  ): Promise<RequestCredential>;
  processIssuedCredentialMessage(
    message: IssueCredential
  ): Promise<VerifiableCredential>;
  createPresentationForRequestProof(
    request: RequestPresentation,
    credential: VerifiableCredential
  ): Promise<Presentation>;
}

export interface AgentDIDHigherFunctions {
  signWith(did: DID, message: Uint8Array): Promise<Signature>;

  createNewPeerDID(
    services: DIDDocumentService[],
    updateMediator: boolean
  ): Promise<DID>;

  createNewPrismDID(
    alias: string,
    services: DIDDocumentService[],
    keyPathIndex?: number
  ): Promise<DID>;
}

export interface AgentInvitations {
  acceptDIDCommInvitation(invitation: OutOfBandInvitation): Promise<void>;

  parseInvitation(str: string): Promise<InvitationType>;

  acceptInvitation(invitation: PrismOnboardingInvitation): Promise<void>;

  parsePrismInvitation(str: string): Promise<PrismOnboardingInvitation>;

  parseOOBInvitation(str: URL): Promise<OutOfBandInvitation>;
}

export type EventCallback = (messages: Message[]) => void;
export enum ListenerKey {
  "MESSAGE" = "message",
  "CONNECTION" = "connection",
}

export interface AgentMessageEvents {
  addListener(eventName: ListenerKey, callback: EventCallback): void;
  removeListener(eventName: ListenerKey, callback: EventCallback): void;
  emit(eventName: ListenerKey, data: any): void;
  // startFetchingMessages(iterationPeriod: number): void;
  // stopFetchingMessages(): void;
  // sendMessage(message: Message): Promise<Message | undefined>;
}

export interface ConnectionsManager {
  castor: Castor;
  mercury: Mercury;
  pluto: Pluto;
  mediationHandler: MediatorHandler;
  pairings: DIDPair[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cancellables: CancellableTask<any>[];

  stopAllEvents(): void;

  addConnection(paired: DIDPair): Promise<void>;

  removeConnection(pair: DIDPair): Promise<void>;

  awaitMessages(): Promise<Array<Message>>;

  awaitMessageResponse(id: string): Promise<Message | undefined>;

  sendMessage(message: Message): Promise<Message | undefined>;

  startMediator(): Promise<void>;

  registerMediator(hostDID: DID): Promise<void>;
}

export interface MediatorStore {
  storeMediator(mediator: Mediator): Promise<void>;

  getAllMediators(): Promise<Mediator[]>;
}

export abstract class MediatorHandler {
  abstract mediatorDID: DID;

  abstract mediator?: Mediator;

  abstract bootRegisteredMediator(): Promise<Mediator | undefined>;

  abstract achieveMediation(host: DID): Promise<Mediator>;

  abstract updateKeyListWithDIDs(dids: DID[]): Promise<void>;

  abstract pickupUnreadMessages(
    limit: number
  ): Promise<Array<{ attachmentId: string; message: Message }>>;

  abstract registerMessagesAsRead(ids: string[]): Promise<void>;
}
