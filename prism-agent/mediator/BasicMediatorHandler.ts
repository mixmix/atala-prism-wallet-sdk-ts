import { Mercury, AgentError, DID, Mediator, Message } from "domain/index.js";
import { MediationGrant } from "../protocols/mediation/MediationGrant.js";
import { MediationKeysUpdateList } from "../protocols/mediation/MediationKeysUpdateList.js";
import { MediationRequest } from "../protocols/mediation/MediationRequest.js";
import { PickupReceived } from "../protocols/pickup/PickupReceived.js";
import { PickupRequest } from "../protocols/pickup/PickupRequest.js";
import { PickupRunner } from "../protocols/pickup/PickupRunner.js";
import { MediatorHandler, MediatorStore } from "../types/index.js";

export class BasicMediatorHandler implements MediatorHandler {
  public mediator?: Mediator;

  constructor(
    public mediatorDID: DID,
    public mercury: Mercury,
    public store: MediatorStore
  ) {}

  static fromMediator(
    mediator: Mediator,
    mercury: Mercury,
    store: MediatorStore
  ): BasicMediatorHandler {
    const mediatorHandler = new BasicMediatorHandler(
      mediator.mediatorDID,
      mercury,
      store
    );
    mediatorHandler.mediator = mediator;
    return mediatorHandler;
  }

  async bootRegisteredMediator(): Promise<Mediator | undefined> {
    if (!this.mediator) {
      const mediators = await this.store.getAllMediators();
      const mediator = mediators.slice(0, 1)[0];
      if (mediator) {
        this.mediator = mediator;
      }
    }
    return this.mediator;
  }

  async achieveMediation(host: DID): Promise<Mediator> {
    const mediator = await this.bootRegisteredMediator();
    if (!mediator) {
      const mediationRequest = new MediationRequest(
        host,
        this.mediatorDID
      ).makeMessage();

      const message: Message | undefined =
        await this.mercury.sendMessageParseMessage(mediationRequest);

      if (!message) {
        //TODO: Improve this error
        throw new Error("Trying to achieve mediation returned empty data");
      }

      const grandMessage = MediationGrant.fromMessage(message);
      const routingDID = DID.fromString(grandMessage.body.routing_did);

      const mediator: Mediator = {
        hostDID: host,
        routingDID: routingDID,
        mediatorDID: this.mediatorDID,
      };

      await this.store.storeMediator(mediator);

      this.mediator = mediator;

      return mediator;
    }

    return mediator;
  }
  async updateKeyListWithDIDs(dids: DID[]): Promise<void> {
    if (!this.mediator) {
      throw new AgentError.NoMediatorAvailableError();
    }
    const keyListUpdateMessage: Message = new MediationKeysUpdateList(
      this.mediator.hostDID,
      this.mediator.mediatorDID,
      dids
    ).makeMessage();
    await this.mercury.sendMessage(keyListUpdateMessage);
  }
  async pickupUnreadMessages(
    limit: number
  ): Promise<Array<{ attachmentId: string; message: Message }>> {
    if (!this.mediator) {
      throw new AgentError.NoMediatorAvailableError();
    }
    const request = new PickupRequest(
      { limit: limit },
      this.mediator.hostDID,
      this.mediator.mediatorDID
    ).makeMessage();

    const message = await this.mercury.sendMessageParseMessage(request);
    if (!message) {
      return [];
    }
    return new PickupRunner(message, this.mercury).run();
  }
  async registerMessagesAsRead(ids: string[]): Promise<void> {
    if (!this.mediator) {
      throw new AgentError.NoMediatorAvailableError();
    }
    const message = new PickupReceived(
      {
        messageIdList: ids,
      },
      this.mediator.hostDID,
      this.mediator.mediatorDID
    ).makeMessage();
    await this.mercury.sendMessage(message);
  }
}
