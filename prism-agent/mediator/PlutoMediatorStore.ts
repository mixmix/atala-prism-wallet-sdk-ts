import { Mediator, Pluto } from "domain/index.js";
import { MediatorStore } from "../types/index.js";

export class PublicMediatorStore implements MediatorStore {
  constructor(private pluto: Pluto) {}

  async storeMediator(mediator: Mediator): Promise<void> {
    const response = await this.pluto.storeMediator(
      mediator.mediatorDID,
      mediator.hostDID,
      mediator.routingDID
    );
    return response;
  }

  async getAllMediators(): Promise<Mediator[]> {
    return this.pluto.getAllMediators();
  }
}
